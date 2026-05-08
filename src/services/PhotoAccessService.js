import { db } from '../utils/firebase';
// اگر فائر بیس فلیٹ فائلز ہیں تو ہم لوکل اسٹوریج بیک اپ بھی رکھتے ہیں تاکہ ٹیسٹنگ میں ایرر نہ آئے
import { secureStorage } from '../utils/secureStorage';

export const PhotoAccessService = {
  // ۱۔ تصویر دیکھنے کی درخواست بھیجنا
  sendRequest: async (senderId, receiverId) => {
    try {
      // لوکل ٹیسٹنگ کے لیے اسٹوریج میں محفوظ کریں
      const requests = secureStorage.getItem('photo_requests') || [];
      
      // چیک کریں کہ پہلے سے درخواست موجود تو نہیں
      const exists = requests.find(r => r.from === senderId && r.to === receiverId);
      if (exists) return { success: true, status: exists.status };

      const newRequest = {
        id: `${senderId}_${receiverId}`,
        from: senderId,
        to: receiverId,
        status: 'pending', // pending, approved, rejected
        timestamp: Date.now()
      };

      requests.push(newRequest);
      secureStorage.setItem('photo_requests', requests);

      // یہاں فائر بیس پروڈکشن کوڈ اٹیچ ہوگا:
      // await db.collection('photo_requests').doc(newRequest.id).set(newRequest);

      return { success: true, status: 'pending' };
    } catch (error) {
      console.error("Error sending photo request:", error);
      return { success: false, error };
    }
  },

  // ۲۔ درخواست کی منظوری (خاتون کے لیے ون ٹیپ ایکشن)
  respondToRequest: async (requestId, status) => {
    try {
      const requests = secureStorage.getItem('photo_requests') || [];
      const updatedRequests = requests.map(r => {
        if (r.id === requestId) {
          return { ...r, status: status }; // 'approved' or 'rejected'
        }
        return r;
      });

      secureStorage.setItem('photo_requests', updatedRequests);
      return { success: true };
    } catch (error) {
      console.error("Error updating photo request:", error);
      return { success: false, error };
    }
  },

  // ۳۔ تصویر کی پرمیشن اسٹیٹس چیک کرنا (اصلی جادو یہاں ہے)
  checkPermission: (currentUserId, targetUser) => {
    // رولز جو صارف کو بیزار نہیں کریں گے:
    
    // رول ۱: اگر یہ صارف کی اپنی پروفائل ہے تو تصویر صاف دکھائیں
    if (currentUserId === targetUser.id) return 'approved';

    // رول ۲: اگر ٹارگٹ صارف مرد ہے، تو تصویر ہمیشہ صاف دکھائیں (کوئی پرائیویسی رکاوٹ نہیں)
    if (targetUser.gender === 'male') return 'approved';

    // رول ۳: اگر خاتون نے اپنی پروفائل پر سیکیورٹی آپشن "فوٹو بلر" آن ہی نہ کیا ہو
    if (targetUser.photoBlurred === false) return 'approved';

    // رول ۴: باہمی پسندیدگی (Mutual Match) - سب سے آسان راستہ
    // اگر دونوں نے ایک دوسرے کو لائیک کیا ہوا ہے تو تصویر آٹو انلاک ہوگی
    const matches = secureStorage.getItem('mutual_matches') || [];
    const isMutual = matches.some(m => 
      (m.user1 === currentUserId && m.user2 === targetUser.id) || 
      (m.user2 === currentUserId && m.user1 === targetUser.id)
    );
    if (isMutual) return 'approved';

    // رول ۵: مینوئل ریکویسٹ کی اسٹیٹس چیک کریں
    const requests = secureStorage.getItem('photo_requests') || [];
    const found = requests.find(r => r.from === currentUserId && r.to === targetUser.id);
    
    return found ? found.status : 'none'; // none = کوئی ریکویسٹ نہیں بھیجی گئی
  }
};
