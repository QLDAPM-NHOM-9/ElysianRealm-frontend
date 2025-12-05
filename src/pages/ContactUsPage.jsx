import React from 'react';
import Button from '../components/common/Button.jsx';
import Input from '../components/common/Input.jsx';

const ContactUsPage = () => {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold text-brand-primary mb-8 text-center font-serif">Liên hệ với chúng tôi</h1>
      
      <div className="grid md:grid-cols-2 gap-12">
        {/* Thông tin liên hệ */}
        <div>
          <h3 className="text-2xl font-bold text-text-primary mb-4">Thông tin</h3>
          <p className="text-text-secondary mb-4">
            Chúng tôi luôn sẵn sàng lắng nghe bạn. Hãy để lại lời nhắn hoặc ghé thăm văn phòng của chúng tôi.
          </p>
          <ul className="space-y-4 text-text-primary font-medium">
            <li>📍 123 Đường Mộng Mơ, Quận 1, TP.HCM</li>
            <li>📧 hello@elysianrealm.com</li>
            <li>📞 +84 123 456 789</li>
          </ul>
        </div>

        {/* Form liên hệ */}
        <form className="bg-white p-6 rounded-2xl shadow-lg border border-border-primary">
          <Input id="name" label="Tên của bạn" placeholder="Nguyễn Văn A" className="mb-4" />
          <Input id="email" label="Email" placeholder="email@example.com" className="mb-4" />
          <div className="mb-6">
            <label className="block text-sm font-medium text-text-primary mb-2">Lời nhắn</label>
            <textarea 
              rows="4" 
              className="w-full px-4 py-3 border border-border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
              placeholder="Bạn cần hỗ trợ gì?"
            ></textarea>
          </div>
          <Button className="w-full">Gửi tin nhắn</Button>
        </form>
      </div>
    </div>
  );
};

export default ContactUsPage;