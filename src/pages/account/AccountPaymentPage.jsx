import React, { useState } from 'react';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import AddCardModal from '../../components/modals/AddCardModal.jsx';

// Component con: Thẻ đã lưu
const SavedCard = ({ id, digits, expiry, onDelete }) => (
  <div className="p-6 rounded-2xl shadow-sm bg-brand-primary text-white relative group transition-transform hover:-translate-y-1">
    <button 
      onClick={() => onDelete(id)}
      className="absolute top-4 right-4 p-2 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/30"
      title="Xóa thẻ"
    >
      <FiTrash2 className="w-4 h-4 text-white" />
    </button>
    
    <p className="text-xs uppercase opacity-70 tracking-wider">Card</p>
    <p className="text-2xl font-semibold tracking-wider my-4">•••• •••• •••• {digits}</p>
    <div className="flex justify-between items-center">
      <div>
        <p className="text-xs opacity-70">Valid Thru</p>
        <p className="font-medium">{expiry}</p>
      </div>
      <span className="font-bold text-2xl italic">VISA</span>
    </div>
  </div>
);

// Component con: Nút thêm thẻ
const AddCardButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="h-full min-h-[180px] w-full border-2 border-dashed border-border-primary rounded-2xl
               flex flex-col items-center justify-center text-text-secondary
               hover:bg-brand-pale hover:border-brand-primary hover:text-brand-primary transition-colors"
  >
    <FiPlus className="w-8 h-8 mb-2" />
    <span className="font-medium">Add a new card</span>
  </button>
);

const AccountPaymentPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // State lưu danh sách thẻ
  const [cards, setCards] = useState([
    { id: 1, digits: '4321', expiry: '02/27' }
  ]);

  // Hàm thêm thẻ mới (Được gọi từ AddCardModal - Cần sửa Modal để truyền data ra)
  // Tạm thời ta giả lập thêm thẻ khi đóng modal thành công
  const handleAddCard = () => {
    const newCard = {
      id: Date.now(),
      digits: Math.floor(1000 + Math.random() * 9000).toString(), // Random 4 số cuối
      expiry: '12/28'
    };
    setCards([...cards, newCard]);
    setIsModalOpen(false);
  };

  const handleDeleteCard = (id) => {
    if (window.confirm('Bạn có chắc muốn xóa thẻ này?')) {
      setCards(cards.filter(card => card.id !== id));
    }
  };

  return (
    <div>
      <h3 className="text-2xl font-bold text-text-primary mb-6">Payment methods</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Render danh sách thẻ */}
        {cards.map(card => (
          <SavedCard 
            key={card.id} 
            {...card} 
            onDelete={handleDeleteCard}
          />
        ))}

        {/* Nút thêm thẻ */}
        <AddCardButton onClick={() => setIsModalOpen(true)} />
      </div>

      {/* Modal */}
      {/* Lưu ý: Bạn cần cập nhật AddCardModal để nó nhận prop 'onSubmit' và gọi nó khi form submit */}
      <AddCardModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        // Giả sử AddCardModal đã được nâng cấp để hỗ trợ prop này (như PaymentOptions)
        // Nếu chưa, bạn có thể sửa AddCardModal hoặc dùng tạm cách này:
        // Truyền hàm đóng modal, và trong Modal khi submit thành công thì gọi onClose.
        // Để đơn giản ở đây, tôi giả định Modal sẽ xử lý logic. 
        // Nhưng tốt nhất là sửa AddCardModal để truyền data ra ngoài.
      />
      
      {/* --- MẸO NHANH: Sửa logic Modal ngay tại đây để test --- */}
      {/* Trong thực tế, bạn nên vào src/components/modals/AddCardModal.jsx 
        và sửa nút "Add Card" thành type="button" và onClick={props.onAdd}
      */}
    </div>
  );
};

export default AccountPaymentPage;