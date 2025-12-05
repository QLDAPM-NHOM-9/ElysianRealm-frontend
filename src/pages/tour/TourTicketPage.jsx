import React from 'react';
import { FiDownload, FiShare2, FiMapPin, FiCalendar, FiClock, FiUser, FiFlag } from 'react-icons/fi';
import Button from '../../components/common/Button.jsx';
import logoIcon from '../../assets/icons/Elysia.png';

const TicketFooter = () => (
  <div className="bg-bg-primary p-6 rounded-lg shadow-sm border border-border-primary mt-8">
    <h3 className="text-xl font-bold text-text-primary mb-4">Điều khoản & Điều kiện</h3>
    <p className="text-sm text-text-secondary space-y-3">
      Vui lòng mang theo vé này (bản in hoặc điện tử) đến điểm tập trung đúng giờ.
      Tour không hoàn hủy trong vòng 24h trước giờ khởi hành.
    </p>
    <h3 className="text-xl font-bold text-text-primary mt-6 mb-4">Liên hệ</h3>
    <p className="text-sm text-text-secondary">
      Hotline: 1900 123 456 <br/> Email: support@elysianrealm.com
    </p>
  </div>
);

const TourTicketPage = () => {
  // Dữ liệu giả lập cho vé vừa đặt
  const ticketData = {
      id: "BK-789012",
      tourName: "Hành trình di sản miền Trung",
      location: "Da Nang, Vietnam",
      duration: "4 Ngày 3 Đêm",
      startDate: "10/12/2025",
      meetingPoint: "Sân bay Đà Nẵng",
      guests: "2 Người lớn",
      totalPrice: 665
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
            <p className="text-text-secondary text-sm">Mã đặt chỗ</p>
            <span className="text-3xl font-bold text-brand-secondary">#{ticketData.id}</span>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" isIconOnly={true} className="w-12 h-12 rounded-lg"><FiShare2 /></Button>
          <Button variant="primary" className="px-6 h-12 rounded-lg flex items-center gap-2">
            <FiDownload /> Tải vé
          </Button>
        </div>
      </div>

      {/* Vé Tour */}
      <div className="bg-bg-primary rounded-2xl shadow-lg border border-border-primary p-8">
        <h2 className="text-2xl font-bold text-text-primary mb-1">{ticketData.tourName}</h2>
        <div className="flex items-center gap-2 text-text-secondary mb-6">
          <FiMapPin className="w-4 h-4" />
          <span>{ticketData.location}</span>
        </div>

        {/* Thông tin chi tiết */}
        <div className="flex flex-col md:flex-row border border-border-primary rounded-lg overflow-hidden">
          {/* Phần trái: Chi tiết */}
          <div className="flex-1 p-6">
            <div className="grid grid-cols-2 gap-6 mb-6 pb-6 border-b border-border-primary">
              <div>
                <p className="text-xs text-text-secondary uppercase mb-1">Ngày khởi hành</p>
                <div className="flex items-center gap-2">
                    <FiCalendar className="text-brand-primary" />
                    <span className="text-xl font-bold text-text-primary">{ticketData.startDate}</span>
                </div>
              </div>
              <div>
                <p className="text-xs text-text-secondary uppercase mb-1">Thời lượng</p>
                <div className="flex items-center gap-2">
                    <FiClock className="text-brand-primary" />
                    <span className="text-xl font-bold text-text-primary">{ticketData.duration}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-xs text-text-secondary uppercase mb-1">Khách hàng</p>
                <div className="flex items-center gap-2">
                  <FiUser className="text-text-primary" />
                  <span className="font-semibold text-text-primary">James Doe</span>
                </div>
                <p className="text-sm text-text-secondary pl-6">{ticketData.guests}</p>
              </div>
              <div>
                <p className="text-xs text-text-secondary uppercase mb-1">Điểm tập trung</p>
                <div className="flex items-center gap-2">
                  <FiFlag className="text-text-primary" />
                  <span className="font-semibold text-text-primary">{ticketData.meetingPoint}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Phần phải: Barcode */}
          <div className="w-full md:w-48 bg-brand-pale/30 border-t md:border-t-0 md:border-l border-dashed border-border-primary flex flex-col items-center justify-center p-6 gap-4">
            <img src={logoIcon} alt="Elysian Realm" className="h-12 w-12 rounded-full" />
            <div className="text-center">
                <p className="text-xs text-text-secondary">Quét mã để check-in</p>
            </div>
            <img src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${ticketData.id}`} alt="Barcode" className="w-24 mix-blend-multiply" />
          </div>
        </div>
      </div>

      <TicketFooter />
    </div>
  );
};

export default TourTicketPage;