import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FiCheckCircle, FiXCircle, FiLoader } from 'react-icons/fi';
import Button from '../components/common/Button.jsx';
import axiosClient from '../services/axiosClient.js';

const PaymentReturnPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState('verifying'); // 'verifying', 'success', 'failed'
  const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        // Get all VNPay parameters from URL
        const params = {};
        for (let [key, value] of searchParams.entries()) {
          params[key] = value;
        }

        // Send parameters to backend for verification using axiosClient
        // axiosClient will handle the base URL and authorization headers
        const result = await axiosClient.get('/payments/vnpay-return', {
          params: params // axios will convert this to query parameters
        });

        if (result && result.success) {
          setPaymentStatus('success');
          setPaymentData(result);
        } else {
          setPaymentStatus('failed');
          setPaymentData(result || {
            message: 'Thanh toán thất bại hoặc bị hủy'
          });
        }

      } catch (error) {
        console.error('Payment verification error:', error);
        setPaymentStatus('failed');
        setPaymentData({
          message: 'Không thể xác minh thanh toán. Vui lòng liên hệ hỗ trợ.',
          error: error?.response?.data?.message || error?.message || 'Lỗi không xác định'
        });
      }
    };

    verifyPayment();
  }, [searchParams]);

  const handleContinue = () => {
    if (paymentStatus === 'success') {
      navigate('/account/history');
    } else {
      navigate('/');
    }
  };

  if (paymentStatus === 'verifying') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full mx-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiLoader className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Đang xác minh thanh toán</h2>
          <p className="text-gray-600">Vui lòng đợi trong giây lát...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full mx-4">
        {paymentStatus === 'success' ? (
          <>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiCheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Thanh toán thành công!</h2>
            <p className="text-gray-600 mb-4">
              Cảm ơn bạn đã thanh toán. Đơn hàng của bạn đã được xác nhận.
            </p>
            {paymentData?.bookingNumber && (
              <p className="text-sm text-gray-500 mb-4">
                Mã đơn hàng: <span className="font-mono font-bold">{paymentData.bookingNumber}</span>
              </p>
            )}
          </>
        ) : (
          <>
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiXCircle className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Thanh toán thất bại</h2>
            <p className="text-gray-600 mb-4">
              {paymentData?.message || 'Có lỗi xảy ra trong quá trình thanh toán.'}
            </p>
            {paymentData?.responseCode && (
              <p className="text-sm text-gray-500 mb-4">
                Mã lỗi: {paymentData.responseCode}
              </p>
            )}
          </>
        )}

        <Button onClick={handleContinue} className="w-full">
          {paymentStatus === 'success' ? 'Xem lịch sử đặt chỗ' : 'Về trang chủ'}
        </Button>
      </div>
    </div>
  );
};

export default PaymentReturnPage;
