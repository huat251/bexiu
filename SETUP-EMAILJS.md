# Hướng dẫn Setup EmailJS cho Form Liên Hệ

Form liên hệ đã được tích hợp **EmailJS** - dịch vụ miễn phí giúp gửi email trực tiếp từ website không cần backend!

## 📝 Các bước setup (5-10 phút)

### Bước 1: Tạo tài khoản EmailJS (Miễn phí)

1. Truy cập: https://www.emailjs.com/
2. Click **"Sign Up"** và đăng ký tài khoản
3. Xác nhận email

### Bước 2: Tạo Email Service

1. Đăng nhập vào https://dashboard.emailjs.com/
2. Click **"Add New Service"**
3. Chọn **Gmail** (hoặc email provider bạn dùng)
4. Đăng nhập vào Gmail của bạn và cho phép EmailJS truy cập
5. Copy **Service ID** (ví dụ: `service_abc123`)

### Bước 3: Tạo Email Template

1. Vào **Email Templates** tab
2. Click **"Create New Template"**
3. Dán template này vào:

```
Subject: 📬 Liên hệ mới từ {{from_name}} - BEXIU.STU

---

📧 TỪ: {{from_name}}
📱 SĐT: {{phone}}
📧 Email: {{from_email}}

💬 LỜI NHẮN:
{{message}}

🖼️ HÌNH ẢNH THAM KHẢO:
{{image_name}}

---
Email này được gửi từ form liên hệ trên website BEXIU.STU
```

4. Bật **"Save to Sent"** nếu muốn lưu lại emails đã gửi
5. Copy **Template ID** (ví dụ: `template_xyz789`)

### Bước 4: Lấy Public Key

1. Vào **Account** > **General**
2. Copy **Public Key** (ví dụ: `YOUR_PUBLIC_KEY_HERE`)

### Bước 5: Cập nhật Code

Mở file `get_yours.html` và tìm dòng:

```javascript
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
const SERVICE_ID = 'YOUR_SERVICE_ID';
const TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
```

Thay bằng các giá trị thực tế:

```javascript
const EMAILJS_PUBLIC_KEY = 'abc123xyz';        // Public Key từ bước 4
const SERVICE_ID = 'service_abc123';           // Service ID từ bước 2
const TEMPLATE_ID = 'template_xyz789';         // Template ID từ bước 3
```

Và sửa email nhận:

```javascript
to_email: 'your-email@example.com' // Thay bằng email của bạn
```

thành:

```javascript
to_email: 'bexiu.studio@gmail.com' // Email thật của bạn
```

### Bước 6: Test Form

1. Lưu file `get_yours.html`
2. Mở website trên browser
3. Điền form và gửi thử
4. Kiểm tra email (có thể trong Spam)

---

## 🎯 Lưu ý quan trọng

### ✅ Tính năng hiện có:
- ✅ Gửi thông tin liên hệ (tên, email, SĐT)
- ✅ Gửi lời nhắn
- ✅ **Upload hình ảnh** (hình sẽ được đính kèm dạng base64)
- ✅ Loading state khi gửi
- ✅ Thông báo thành công/lỗi
- ✅ Hoàn toàn miễn phí cho 200 emails/tháng

### ⚠️ Giới hạn:
- **200 emails/tháng** (miễn phí)
- **Attachment size**: Tối đa 5MB/hình
- **Có thể vào spam**: Yêu cầu người dùng check spam lần đầu

### 📈 Nâng cấp (nếu cần):
- Nếu nhận > 200 emails/tháng → Upgrade EmailJS ($7-15/tháng)
- Hoặc chuyển sang backend thật (Node.js/PHP/Python)

---

## 🔧 Troubleshooting

### Lỗi: "EMAILJS_PUBLIC_KEY is not defined"
→ Chưa thay YOUR_PUBLIC_KEY bằng key thật

### Lỗi: "Service ID not found"
→ SERVICE_ID chưa đúng, check lại dashboard

### Email không nhận được:
1. Kiểm tra Spam folder
2. Kiểm tra to_email có đúng không
3. Xem Console (F12) có lỗi gì không

### Hình ảnh không gửi được:
→ File quá lớn (>5MB), nén hình nhỏ lại

---

## 🚀 Options khác (nếu không dùng EmailJS)

### 1. Backend API (Professional)
```javascript
// Cần server Node.js/PHP/Python
fetch('https://your-api.com/send-email', {
    method: 'POST',
    body: formData
});
```

### 2. Google Sheets (Đơn giản)
- Lưu vào Google Sheets thay vì gửi email
- Dùng Google Apps Script
- Free unlimited entries

### 3. Formspree
- Tương tự EmailJS
- 50 submissions/tháng free
- https://formspree.io/

---

## 📧 Support

Nếu gặp vấn đề setup, có thể:
1. Check docs: https://www.emailjs.com/docs/
2. Video tutorial: https://www.youtube.com/results?search_query=emailjs+tutorial
3. Liên hệ qua GitHub Issues

---

**Chúc bạn setup thành công! ✨**
