import { secureStorage } from '../utils/secureStorage';

export const PaymentService = {
  // ۱۔ سبسکرپشن پلانز کا ڈیٹا
  getPlans: () => {
    return [
      {
        id: 'gold_monthly',
        name: 'گولڈ منتھلی',
        price: '999',
        duration: '30 دن',
        features: [
          'لامحدود براہ راست واٹس ایپ رابطے',
          'براہ راست فون نمبرز تک رسائی',
          'تصویر دیکھنے کی درخواستوں کا فوری انلاک',
          'پروفائل پر گولڈ پریمیم بیج',
          'سرچ رزلٹس میں پروفائل سب سے اوپر'
        ],
        popular: false
      },
      {
        id: 'diamond_three_months',
        name: 'ڈائمنڈ ۳ ماہ (سب سے مقبول)',
        price: '1999',
        duration: '90 دن',
        features: [
          'گولڈ پلان کے تمام فیچرز',
          '۳ گنا زیادہ میچز کی گارنٹی',
          'براہ راست واٹس ایپ اور کالز پر ترجیحی سپورٹ',
          'پروفائل کی روزانہ ۳ بار فری بوسٹنگ'
        ],
        popular: true
      }
    ];
  },

  // ۲۔ ادائیگی کی تصدیق کا سمیلیٹر (EasyPaisa / JazzCash)
  processPayment: async (paymentDetails) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // درست شدہ پاکستانی موبائل نمبر RegEx (پروڈکشن سیف)
        const phoneRegex = /^((\+92)|(0092)|(92)|(0))?3[0-9]{9}$/;
        
        if (!phoneRegex.test(paymentDetails.mobileNumber)) {
          resolve({ 
            success: false, 
            message: "برائے مہربانی درست ایزی پیسہ/جیز کیش موبائل نمبر درج کریں۔ (مثال: 03001234567)" 
          });
          return;
        }

        // رینڈم ٹرانزیکشن ID بنانا
        const txId = 'TXN' + Math.floor(10000000 + Math.random() * 90000000);
        
        // لوکل اسٹوریج میں صارف کی سبسکرپشن اپ ڈیٹ کرنا
        const currentUser = secureStorage.getItem('user_profile') || {};
        currentUser.isPremium = true;
        currentUser.premiumPlan = paymentDetails.planId;
        currentUser.premiumSince = Date.now();
        secureStorage.setItem('user_profile', currentUser);

        resolve({
          success: true,
          message: "ادائیگی کامیابی سے مکمل ہو گئی ہے! آپ کی پریمیم ممبرشپ فوری طور پر فعال کر دی گئی ہے۔",
          txId: txId
        });
      }, 2000); // ۲ سیکنڈ کا فیک لوڈنگ ٹائم
    });
  }
};
