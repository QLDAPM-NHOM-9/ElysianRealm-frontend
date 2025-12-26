import React, { useState, useEffect } from 'react';
import { FiCheckCircle, FiCircle } from 'react-icons/fi';

import Button from '../common/Button.jsx';
import Spinner from '../common/Spinner.jsx'; // Import Spinner

// Component con: Nút chọn (Pay in full / Pay part now)
const PaymentRadioOption = ({ title, description, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full p-4 border rounded-lg flex items-center gap-4 text-left transition-colors
      ${isActive ? 'bg-brand-pale border-brand-primary' : 'bg-bg-primary border-border-primary hover:bg-gray-50'}
    `}
  >
    {isActive
      ? <FiCheckCircle className="w-6 h-6 text-brand-primary flex-shrink-0" />
      : <FiCircle className="w-6 h-6 text-text-tertiary flex-shrink-0" />
    }
    <div>
      <h5 className="font-semibold text-text-primary">{title}</h5>
      <p className="text-sm text-text-secondary">{description}</p>
    </div>
  </button>
);

// Component con: Online payment option (VNPay)
const OnlinePaymentOption = ({ isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full p-4 border rounded-lg flex items-center gap-4 text-left transition-colors
      ${isActive ? 'bg-brand-pale border-brand-primary' : 'bg-bg-primary border-border-primary hover:bg-gray-50'}
    `}
  >
    {isActive
      ? <FiCheckCircle className="w-6 h-6 text-brand-primary flex-shrink-0" />
      : <FiCircle className="w-6 h-6 text-text-tertiary flex-shrink-0" />
    }
    <div className="flex-1">
      <h5 className="font-semibold text-text-primary">Thanh toán online (VNPay)</h5>
      <p className="text-sm text-text-secondary">Thanh toán an toàn qua VNPay</p>
    </div>
    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
      <span className="text-lg font-bold text-blue-600">VNP</span>
    </div>
  </button>
);

// Component con: Cash payment option (Deposit)
const CashPaymentOption = ({ isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full p-4 border rounded-lg flex items-center gap-4 text-left transition-colors
      ${isActive ? 'bg-brand-pale border-brand-primary' : 'bg-bg-primary border-border-primary hover:bg-gray-50'}
    `}
  >
    {isActive
      ? <FiCheckCircle className="w-6 h-6 text-brand-primary flex-shrink-0" />
      : <FiCircle className="w-6 h-6 text-text-tertiary flex-shrink-0" />
    }
    <div className="flex-1">
      <h5 className="font-semibold text-text-primary">Thanh toán tiền mặt</h5>
      <p className="text-sm text-text-secondary">Thanh toán tại văn phòng</p>
    </div>
    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
      <span className="text-lg font-bold text-blue-600">₫</span>
    </div>
  </button>
);

// Component con: VNPay Payment Integration
const VNPayPayment = ({ bookingId, total, onSuccess, onCancel, isProcessing }) => {
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Convert USD total back to VND for VNPay (since frontend displays in USD but VNPay needs VND)
  const amountInVND = Math.round(total * 23000); // Convert back to VND

  const handleVNPayPayment = async () => {
    try {
      setIsRedirecting(true);

      const response = await fetch('/api/v1/payments/vnpay/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          bookingId: bookingId,
          orderInfo: `Payment for booking ${bookingId}`,
          amount: amountInVND // Send VND amount to backend
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create payment URL');
      }

      const data = await response.json();

      // Redirect to VNPay payment page
      window.location.href = data.paymentUrl;

    } catch (error) {
      console.error('VNPay payment error:', error);
      setIsRedirecting(false);
      // Handle error - show message to user
      alert('Không thể tạo liên kết thanh toán. Vui lòng thử lại.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl font-bold text-blue-600">VNP</span>
        </div>
        <h4 className="text-lg font-bold text-text-primary mb-2">Thanh toán qua VNPay</h4>
        <p className="text-sm text-text-secondary mb-4">
          Bạn sẽ được chuyển hướng đến trang thanh toán an toàn của VNPay
        </p>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h5 className="font-semibold text-blue-900 mb-2">Thông tin thanh toán</h5>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm">Mã booking:</span>
            <span className="font-mono font-bold">{bookingId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm">Số tiền:</span>
            <span className="font-bold text-lg text-green-600">{total.toLocaleString()} USD</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm">Tương đương:</span>
            <span className="font-bold text-lg text-blue-600">{amountInVND.toLocaleString()} VND</span>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
        <div className="flex items-center gap-2 mb-2">
          <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
          </svg>
          <span className="font-semibold text-yellow-800">Lưu ý</span>
        </div>
        <p className="text-sm text-yellow-700">
          Bạn sẽ được chuyển hướng đến website của VNPay để hoàn tất thanh toán. Vui lòng không đóng trình duyệt cho đến khi thanh toán hoàn tất.
        </p>
      </div>

      <div className="flex gap-3">
        <Button
          onClick={handleVNPayPayment}
          className="flex-1"
          disabled={isProcessing || isRedirecting}
        >
          {isRedirecting ? (
            <>
              <Spinner size="sm" className="border-white mr-2" />
              Đang chuyển hướng...
            </>
          ) : (
            'Thanh toán với VNPay'
          )}
        </Button>
        <Button
          variant="outline"
          onClick={onCancel}
          disabled={isProcessing || isRedirecting}
          className="flex-1"
        >
          Hủy
        </Button>
      </div>
    </div>
  );
};

// --- COMPONENT CHÍNH ---
const PaymentOptions = ({ onSubmit, isProcessing, total, type = 'tour', bookingId }) => {
  const [paymentMethod, setPaymentMethod] = useState('vnpay'); // 'vnpay' hoặc 'cash'
  const [showVNPayPayment, setShowVNPayPayment] = useState(false);

  const handleSubmit = () => {
    if (paymentMethod === 'vnpay') {
      // For VNPay, trigger booking creation first
      onSubmit({
        method: paymentMethod,
        paymentCompleted: false // Will be completed after VNPay payment
      });
    } else {
      // Cash payment - direct processing with deposit
      onSubmit({
        method: paymentMethod,
        depositRatio: 0.3,
        paymentCompleted: false // Cash = deposit = chưa thanh toán
      });
    }
  };

  const handleVNPaySuccess = () => {
    onSubmit({
      method: paymentMethod,
      paymentCompleted: true // VNPay payment completed
    });
    setShowVNPayPayment(false);
  };

  const handleVNPayCancel = () => {
    setShowVNPayPayment(false);
  };

  // Auto-show VNPay payment interface when bookingId is available
  useEffect(() => {
    if (paymentMethod === 'vnpay' && bookingId && !showVNPayPayment) {
      setShowVNPayPayment(true);
    }
  }, [paymentMethod, bookingId, showVNPayPayment]);

  return (
    <div className="bg-bg-primary p-6 rounded-lg shadow-sm">
      <h3 className="text-xl font-bold text-text-primary mb-6">Phương thức thanh toán</h3>

      {/* Lựa chọn phương thức thanh toán */}
      <div className="space-y-4 mb-6">
        <OnlinePaymentOption
          isActive={paymentMethod === 'vnpay'}
          onClick={() => setPaymentMethod('vnpay')}
        />
        <CashPaymentOption
          isActive={paymentMethod === 'cash'}
          onClick={() => setPaymentMethod('cash')}
        />
      </div>

      {/* Thông tin về phương thức được chọn */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        {paymentMethod === 'vnpay' ? (
          <div>
            <h4 className="font-semibold text-text-primary mb-2">Thanh toán online với VNPay</h4>
            <p className="text-sm text-text-secondary">
              Thanh toán an toàn và bảo mật qua cổng thanh toán VNPay. Hỗ trợ tất cả ngân hàng và ví điện tử.
            </p>
          </div>
        ) : (
          <div>
            <h4 className="font-semibold text-text-primary mb-2">Thanh toán tiền mặt</h4>
            <p className="text-sm text-text-secondary">
              Bạn chỉ cần thanh toán 30% đặt cọc. Phần còn lại (70%) sẽ thanh toán khi nhận {type === 'tour' ? 'tour' : 'vé máy bay'} tại văn phòng hoặc địa điểm tập trung.
            </p>
          </div>
        )}
      </div>

      {/* Show VNPay payment or confirm button */}
      {showVNPayPayment && bookingId ? (
        <VNPayPayment
          bookingId={bookingId}
          total={total}
          onSuccess={handleVNPaySuccess}
          onCancel={handleVNPayCancel}
          isProcessing={isProcessing}
        />
      ) : (
        <Button
          variant="primary"
          className="w-full text-lg"
          onClick={handleSubmit}
          disabled={isProcessing}
        >
          {isProcessing ? <Spinner size="md" className="border-white" /> : 'Xác nhận và thanh toán'}
        </Button>
      )}
    </div>
  );
};

export default PaymentOptions;
