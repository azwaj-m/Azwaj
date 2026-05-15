import { secureStorage } from '../utils/secureStorage';

export const PaymentService = {
  getPlans: () => {
    return [
      {
        id: 'silver_1_month',
        name: 'SILVER',
        price: '$19.99',
        duration: '1 MONTH',
        badge: '🥈',
        popular: false
      },
      {
        id: 'gold_3_months',
        name: 'GOLD',
        price: '$39.99',
        duration: '3 MONTHS',
        badge: '👑',
        popular: true
      },
      {
        id: 'platinum_6_months',
        name: 'PLATINUM',
        price: '$59.99',
        duration: '6 MONTHS',
        badge: '💎',
        popular: false
      }
    ];
  },

  processPayment: async (paymentDetails) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const phoneRegex = /^((\+92)|(0092)|(92)|(0))?3[0-9]{9}$/;
        if (!phoneRegex.test(paymentDetails.mobileNumber)) {
          resolve({ 
            success: false, 
            message: "برائے مہربانی درست ایزی پیسہ/جیز کیش موبائل نمبر درج کریں۔" 
          });
          return;
        }

        const txId = 'TXN' + Math.floor(10000000 + Math.random() * 90000000);
        resolve({
          success: true,
          message: "ادائیگی کامیابی سے مکمل ہو گئی ہے! آپ کی پریمیم ممبرشپ فوری طور پر فعال کر دی گئی ہے۔",
          txId: txId
        });
      }, 2000);
    });
  }
};
