import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiChevronLeft, FiCreditCard, FiCalendar, FiLock } from 'react-icons/fi';
import Button from '../../components/common/Button.jsx';
import Input from '../../components/common/Input.jsx';
import Select from '../../components/common/Select.jsx';
import Checkbox from '../../components/common/Checkbox.jsx';

const RegisterPaymentPage = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic lưu thẻ...
    // Sau khi lưu, điều hướng đến trang chủ hoặc trang chào mừng
    navigate('/'); 
  };

  return (
    <div className="max-w-md mx-auto">
      {/* Nút Quay lại */}
      <Link to="/register" className="inline-flex items-center gap-2 text-text-secondary font-medium mb-6 hover:text-text-primary">
        <FiChevronLeft />
        Back
      </Link>

      {/* Header */}
      <h2 className="text-4xl font-bold text-text-primary mb-2">Add a payment method</h2>
      <p className="text-text-secondary mb-8">Let's get you all st up so you can access your personal account.</p>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        
        {/* Card Number (Dùng Input với iconRight) */}
        <Input
          id="cardNumber" label="Card Number"
          placeholder="4321 4321 4321 4321"
          defaultValue="4321 4321 4321 4321"
          iconRight={<FiCreditCard className="text-xl" />}
          className="mb-4"
        />

        {/* Exp. Date & CVC */}
        <div className="flex gap-4 mb-4">
          <Input
            id="expDate" label="Exp. Date" placeholder="02/27"
            defaultValue="02/27"
            className="w-1/2"
          />
          <Input
            id="cvc" label="CVC" placeholder="123"
            defaultValue="123"
            iconRight={<FiLock />}
            className="w-1/2"
          />
        </div>

        {/* Name on Card */}
        <Input
          id="cardName" label="Name on Card" placeholder="John Doe"
          defaultValue="John Doe"
          className="mb-4"
        />

        {/* Country or Region (Dùng Select) */}
        <Select
          id="country" label="Country or Region"
          className="mb-6"
          defaultValue="United States"
        >
          <option>United States</option>
          <option>Vietnam</option>
          <option>Canada</option>
          <option>United Kingdom</option>
        </Select>

        {/* Securely save (Dùng Checkbox) */}
        <Checkbox
          id="saveCard"
          label="Securely save my information for 1-click checkout"
          className="mb-6"
          defaultChecked
        />

        {/* Nút Add payment method (Dùng Button) */}
        <Button
          type="submit"
          className="w-full transition duration-300 ease-in-out hover:scale-105"
        >
          Add payment method
        </Button>
      </form>
      
      {/* Disclaimer */}
      <p className="text-center text-xs text-text-tertiary mt-8">
        By confirming your subscription, you allow The Outdoor Inn Crowd Limited to charge your card for this payment and future payments in accordance with their terms.
      </p>
    </div>
  );
};

export default RegisterPaymentPage;