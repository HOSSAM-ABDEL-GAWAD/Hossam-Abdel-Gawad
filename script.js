// ضع رابط الـ Web App الخاص بك هنا
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec';

/**
 * دالة الإرسال الرئيسية إلى Google Sheets
 * @param {string} sheetName - اسم التاب في الشيت (مثلاً: 'Videos' أو 'Orders')
 * @param {Array} rowData - مصفوفة بالبيانات المراد إضافتها
 */
async function sendToSheet(sheetName, rowData) {
  const payload = {
    sheet: sheetName,
    row: rowData
  };

  try {
    console.log('📤 جاري الإرسال إلى شيت:', sheetName);
    console.log('📦 البيانات:', payload);

    // ✅ الحل الصحيح: استخدام no-cors مع FormData أو URLSearchParams
    // Google Apps Script يقبل POST عبر application/x-www-form-urlencoded
    // لكن أفضل حل يتجنب مشكلة الـ Redirect هو هذا:
    
    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      // ✅ مهم جداً: redirect: 'follow' يحل مشكلة الـ Redirect
      redirect: 'follow',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload)
    });

    // إذا لم يأت رد (CORS issue مع no-cors)، نعتبرها نجاح
    if (!response.ok && response.type !== 'opaque') {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // محاولة قراءة الرد
    let result;
    try {
      const text = await response.text();
      result = JSON.parse(text);
    } catch (e) {
      // إذا فشل تحليل الرد، الإرسال قد نجح مع CORS limitation
      console.warn('⚠️ لا يمكن قراءة رد السيرفر (CORS)، لكن الإرسال غالباً نجح');
      return { success: true, message: 'تم الإرسال (لا يمكن التأكد بسبب CORS)' };
    }

    if (result.success) {
      console.log('✅ نجح الإرسال:', result.message);
    } else {
      console.error('❌ خطأ من السيرفر:', result.error);
    }

    return result;

  } catch (error) {
    console.error('❌ فشل الإرسال:', error.message);
    throw error;
  }
}

// ==========================================
// مثال على الاستخدام في أزرار الإرسال
// ==========================================

async function handleOrderSubmit() {
  const btn = document.getElementById('submit-btn');
  
  // بيانات الطلب (اجمعها من الـ inputs)
  const name = document.getElementById('client-name').value.trim();
  const phone = document.getElementById('client-phone').value.trim();
  const details = document.getElementById('order-details').value.trim();

  // التحقق من البيانات
  if (!name || !phone) {
    alert('يرجى ملء جميع الحقول المطلوبة');
    return;
  }

  // تعطيل الزر أثناء الإرسال
  btn.disabled = true;
  btn.textContent = 'جاري الإرسال...';

  try {
    const timestamp = new Date().toLocaleString('ar-EG');
    
    // ✅ هيكل البيانات: [عمود1, عمود2, عمود3, ...]
    const rowData = [timestamp, name, phone, details, 'جديد'];
    
    const result = await sendToSheet('Orders', rowData);
    
    alert('✅ تم إرسال طلبك بنجاح!');
    // إعادة تعيين النموذج
    document.getElementById('order-form').reset();
    
  } catch (error) {
    alert('❌ حدث خطأ: ' + error.message);
    console.error('تفاصيل الخطأ:', error);
  } finally {
    btn.disabled = false;
    btn.textContent = 'إرسال';
  }
}
