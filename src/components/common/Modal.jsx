import React from 'react';
import { FiX } from 'react-icons/fi';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    // Lớp phủ (Overlay)
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      {/* Hộp nội dung Modal */}
      <div
        className="bg-bg-primary rounded-2xl shadow-xl w-full max-w-lg relative"
        onClick={(e) => e.stopPropagation()} // Ngăn click bên trong modal đóng modal
      >
        {/* Header Modal */}
        <div className="flex justify-between items-center p-6 border-b border-border-primary">
          <h3 className="text-xl font-bold text-text-primary">{title}</h3>
          <button
            onClick={onClose}
            className="text-text-tertiary hover:text-text-primary"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        {/* Nội dung (Body) Modal */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;

/*
  CÁCH DÙNG:
  const [isOpen, setIsOpen] = useState(false);
  ...
  <Modal 
    isOpen={isOpen} 
    onClose={() => setIsOpen(false)} 
    title="Tiêu đề Modal"
  >
    <p>Đây là nội dung bên trong modal.</p>
    <Button onClick={() => setIsOpen(false)}>Đóng</Button>
  </Modal>
*/