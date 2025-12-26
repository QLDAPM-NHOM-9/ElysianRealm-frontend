import React, { useState } from 'react';
import Button from '../components/common/Button.jsx';
import Input from '../components/common/Input.jsx';
import Spinner from '../components/common/Spinner.jsx';
import toast from 'react-hot-toast';
import axiosClient from '../services/axiosClient.js';

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error('Vui lòng điền đầy đủ thông tin');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axiosClient.post('/auth/contact', formData);
      toast.success(response.data.message);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Contact form error:', error);
      const errorMessage = error.response?.data?.message || 'Có lỗi xảy ra. Vui lòng thử lại.';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

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
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-lg border border-border-primary">
          <Input
            id="name"
            name="name"
            label="Tên của bạn"
            placeholder="Nguyễn Văn A"
            value={formData.name}
            onChange={handleChange}
            disabled={isLoading}
            className="mb-4"
            required
          />
          <Input
            id="email"
            name="email"
            type="email"
            label="Email"
            placeholder="email@example.com"
            value={formData.email}
            onChange={handleChange}
            disabled={isLoading}
            className="mb-4"
            required
          />
          <div className="mb-6">
            <label className="block text-sm font-medium text-text-primary mb-2">Lời nhắn</label>
            <textarea
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              disabled={isLoading}
              className="w-full px-4 py-3 border border-border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
              placeholder="Bạn cần hỗ trợ gì?"
              required
            ></textarea>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? <Spinner size="sm" className="mx-auto" /> : 'Gửi tin nhắn'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ContactUsPage;
