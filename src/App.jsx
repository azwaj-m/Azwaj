import React, { useState, useEffect } from 'react';
import Login from './pages/Login';
import Home from './pages/Home';
import { AuthService } from './services/AuthService';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    // ریل ٹائم فائر بیس لائف سائیکل سبسکرپشن (نہایت محفوظ)
    const unsubscribe = AuthService.monitorAuthState((user) => {
      setCurrentUser(user);
      if (initializing) setInitializing(false);
    });

    // ان سبسکرائب کلین اپ توسیعی لائف سائیکل
    return () => unsubscribe();
  }, [initializing]);

  if (initializing) {
    return (
      <div className="w-full min-h-screen bg-[#3D0A0A] flex flex-col justify-center items-center" dir="rtl">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D4AF37] mb-4"></div>
        <p className="text-white/70 text-sm font-bold">لوڈ ہو رہا ہے، براہ کرم انتظار کریں...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#3D0A0A]">
      {currentUser ? (
        <Home user={currentUser} onLogout={AuthService.logout} />
      ) : (
        <Login onLoginSuccess={(user) => setCurrentUser(user)} />
      )}
    </div>
  );
}

export default App;
