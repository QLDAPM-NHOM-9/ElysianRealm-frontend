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

// Component con: Online payment option (VietQR)
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
      <h5 className="font-semibold text-text-primary">Thanh toán online (VietQR)</h5>
      <p className="text-sm text-text-secondary">Thanh toán toàn bộ bằng QR Code</p>
    </div>
    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
      <span className="text-lg font-bold text-green-600">₫</span>
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

// Component con: VietQR Payment Simulation - More Realistic
const VietQRPayment = ({ onProcess, onCancel, isProcessing, total, type = 'tour' }) => {
  const [paymentState, setPaymentState] = useState('qr-scan'); // 'qr-scan' | 'confirming' | 'confirmed'
  const [transactionCode, setTransactionCode] = useState('');
  const [timer, setTimer] = useState(10); // Auto-confirmation timer

  // Auto-confirmation timer
  useEffect(() => {
    if (paymentState === 'confirming' && timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0 && paymentState === 'confirming') {
      setPaymentState('confirmed');
      setTimeout(() => {
        onProcess();
      }, 1000);
    }
  }, [paymentState, timer, onProcess]);

  // Start confirmation process after QR scan
  const handleScanComplete = () => {
    setPaymentState('confirming');
    // Don't start timer immediately - wait for user input
  };

  const handleConfirmTransaction = () => {
    if (transactionCode.trim()) {
      setPaymentState('confirming');
      setTimer(5); // Start 5-second confirmation
    }
  };

  const formatTimer = (seconds) => {
    return `${Math.floor(seconds / 60).toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* QR Code Section */}
      {paymentState === 'qr-scan' && (
        <>
          <div className="text-center">
            <div className="inline-block bg-white p-4 rounded-lg border-2 border-gray-300 shadow-lg mb-4">
              {/* Realistic QR Code Pattern */}
              <div className="w-40 h-40 bg-black p-2">
                <div className="w-full h-full bg-white relative">
                  {/* QR Code pattern semblance */}
                  <div className="absolute inset-2 border-2 border-black"></div>
                  <div className="absolute top-3 left-3 w-4 h-4 bg-black"></div>
                  <div className="absolute top-3 right-3 w-4 h-4 bg-black"></div>
                  <div className="absolute bottom-3 left-3 w-4 h-4 bg-black"></div>
                  <div className="grid grid-cols-5 gap-1 p-8">
                    {Array.from({length: 25}).map((_, i) => (
                      <div key={i} className={`${Math.random() > 0.6 ? 'bg-black' : 'bg-transparent'} w-full h-full`}></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <h4 className="text-lg font-bold text-text-primary mb-2">Quét mã VietQR</h4>
            <p className="text-sm text-text-secondary mb-4">Mở ứng dụng ngân hàng quét mã QR để thanh toán</p>

            {/* Banking Apps Row */}
            <div className="flex justify-center gap-3 mb-6">
              {['Vietcombank', 'MB Bank', 'Techcombank', 'Agribank'].map((bank) => (
                <div key={bank} className="bg-gray-100 px-3 py-2 rounded-md text-xs font-medium text-gray-700">
                  {bank}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">V</span>
              </div>
              <div>
                <h5 className="font-semibold text-blue-900">Vietcombank - Ngân hàng thương mại cổ phần Ngoại thương Việt Nam</h5>
                <p className="text-sm text-blue-700">Nhận chuyển khoản 24/7</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Số tiền:</span>
              <span className="font-bold text-lg text-green-600">${total}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">STK nhận:</span>
              <span className="font-mono font-bold">10234567890</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Nội dung:</span>
              <span className="font-mono font-bold">THANH TOAN {type.toUpperCase()}</span>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
              </svg>
              <span className="font-semibold text-yellow-800">Lưu ý quan trọng</span>
            </div>
            <p className="text-sm text-yellow-700">
              Sau khi chuyển khoản, nhập mã giao dịch để xác nhận thanh toán. Mã này có thể tìm thấy trong lịch sử chuyển khoản của ứng dụng ngân hàng.
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={handleScanComplete}
              className="flex-1"
              disabled={isProcessing}
            >
              Đã quét và chuyển khoản thành công
            </Button>
            <Button
              variant="outline"
              onClick={onCancel}
              disabled={isProcessing}
              className="flex-1"
            >
              Hủy
            </Button>
          </div>
        </>
      )}

      {/* Transaction Code Input */}
      {paymentState === 'confirming' && timer > 0 && (
        <div className="space-y-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
            </div>
            <h4 className="text-lg font-bold text-green-800 mb-2">Chờ xác nhận</h4>
            <p className="text-sm text-gray-600 mb-4">
              Đang xác minh giao dịch... {formatTimer(timer)}
            </p>
            <div className="bar-progress bg-gray-200 rounded-full h-2 mb-4">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-1000"
                style={{width: `${((10 - timer) / 10) * 100}%`}}
              ></div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Confirmed */}
      {paymentState === 'confirmed' && (
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
          </div>
          <h4 className="text-xl font-bold text-green-800">Thanh toán thành công!</h4>
          <p className="text-green-700">Đã nhận được {total}. Thanh toán hoàn tất.</p>
        </div>
      )}
    </div>
  );
};

// --- COMPONENT CHÍNH ---
const PaymentOptions = ({ onSubmit, isProcessing, total, type = 'tour' }) => {
  const [paymentMethod, setPaymentMethod] = useState('vietqr'); // 'vietqr' hoặc 'cash'
  const [showPaymentSimulation, setShowPaymentSimulation] = useState(false);

  const handleSubmit = () => {
    if (paymentMethod === 'vietqr') {
      // Show QR code simulation - online payment will be marked as PAID
      setShowPaymentSimulation(true);
    } else {
      // Cash payment - direct processing, marked as UNPAID (deposit only)
      onSubmit({
        method: paymentMethod,
        depositRatio: 0.3,
        paymentCompleted: false // Cash = deposit = chưa thanh toán
      });
    }
  };

  const handleVietQRComplete = () => {
    onSubmit({
      method: paymentMethod,
      paymentCompleted: true // Simulated successful payment
    });
    setShowPaymentSimulation(false);
  };

  const handleVietQRCancel = () => {
    setShowPaymentSimulation(false);
  };

  return (
    <div className="bg-bg-primary p-6 rounded-lg shadow-sm">
      <h3 className="text-xl font-bold text-text-primary mb-6">Phương thức thanh toán</h3>

      {/* Lựa chọn phương thức thanh toán */}
      <div className="space-y-4 mb-6">
        <OnlinePaymentOption
          isActive={paymentMethod === 'vietqr'}
          onClick={() => setPaymentMethod('vietqr')}
        />
        <CashPaymentOption
          isActive={paymentMethod === 'cash'}
          onClick={() => setPaymentMethod('cash')}
        />
      </div>

      {/* Thông tin về phương thức được chọn */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        {paymentMethod === 'vietqr' ? (
          <div>
            <h4 className="font-semibold text-text-primary mb-2">Thanh toán online</h4>
            <p className="text-sm text-text-secondary">
              Sau khi nhấn xác nhận, bạn sẽ thấy mã QR để thanh toán qua VietQR. Thanh toán sẽ được xử lý tức thì.
            </p>
          </div>
        ) : (
          <div>
            <h4 className="font-semibold text-text-primary mb-2">Thanh toán tiền mặt</h4>
            <p className="text-sm text-text-secondary">
              Bạn chỉ cần thanh toán 30% đặt cọc. Phần còn lại (70%) sẽ thanh toán khi nhận tour tại văn phòng hoặc địa điểm tập trung.
            </p>
          </div>
        )}
      </div>

      {/* Show VietQR simulation or confirm button */}
      {showPaymentSimulation ? (
        <VietQRPayment
          total={total}
          onProcess={handleVietQRComplete}
          onCancel={handleVietQRCancel}
          isProcessing={isProcessing}
          type={type}
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
