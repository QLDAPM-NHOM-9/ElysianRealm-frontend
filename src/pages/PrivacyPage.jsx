import React from 'react';

const PrivacyPage = () => {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold text-brand-primary mb-8 font-serif">Chính Sách Bảo Mật</h1>

      <div className="space-y-8 text-text-secondary leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-text-primary mb-4">1. Giới Thiệu</h2>
          <p>
            Elysian Realm ("chúng tôi," "của chúng tôi," hoặc "Công ty") cam kết bảo vệ quyền riêng tư của bạn. Chính sách Bảo mật này giải thích cách chúng tôi thu thập, sử dụng, tiết lộ và bảo vệ thông tin của bạn khi bạn truy cập trang web và sử dụng dịch vụ của chúng tôi.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text-primary mb-4">2. Thông Tin Chúng Tôi Thu Thập</h2>
          <p className="mb-3"><strong>Thông Tin Cá Nhân:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Tên, địa chỉ email, số điện thoại</li>
            <li>Địa chỉ gửi thư và sở thích du lịch</li>
            <li>Thông tin thanh toán và hóa đơn</li>
            <li>Lịch sử đặt chỗ và sở thích</li>
            <li>Thông tin hồ sơ và hình đại diện</li>
          </ul>

          <p className="mt-4 mb-3"><strong>Thông Tin Thu Thập Tự Động:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Loại trình duyệt và hệ điều hành</li>
            <li>Địa chỉ IP và mã định danh thiết bị</li>
            <li>Các trang đã truy cập và thời gian ở mỗi trang</li>
            <li>Các truy vấn tìm kiếm và dữ liệu tương tác</li>
            <li>Cookies và các công nghệ theo dõi tương tự</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text-primary mb-4">3. Cách Chúng Tôi Sử Dụng Thông Tin của Bạn</h2>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Xử lý và thực hiện đặt chỗ và đặt phòng của bạn</li>
            <li>Gửi xác nhận, cập nhật và hỗ trợ khách hàng</li>
            <li>Cải thiện trang web và dịch vụ của chúng tôi</li>
            <li>Cá nhân hóa trải nghiệm và đề xuất của bạn</li>
            <li>Thực hiện các hoạt động marketing và khuyến mãi</li>
            <li>Tuân thủ các nghĩa vụ pháp lý</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text-primary mb-4">4. Chia Sẻ Thông Tin của Bạn</h2>
          <p className="mb-3">
            Chúng tôi có thể chia sẻ thông tin của bạn với:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Các hãng hàng không, khách sạn và công ty du lịch (để thực hiện đặt chỗ)</li>
            <li>Các bộ xử lý thanh toán và tổ chức tài chính</li>
            <li>Các nhà cung cấp dịch vụ và nhà thầu</li>
            <li>Các cơ quan pháp lý khi được yêu cầu bởi pháp luật</li>
          </ul>
          <p className="mt-4">
            Chúng tôi không bán, trao đổi hoặc cho thuê thông tin cá nhân của bạn cho bên thứ ba cho mục đích marketing.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text-primary mb-4">5. Bảo Mật Dữ Liệu</h2>
          <p>
            Chúng tôi thực hiện các biện pháp bảo mật tiêu chuẩn ngành để bảo vệ thông tin cá nhân của bạn, bao gồm mã hóa SSL, máy chủ an toàn và kiểm soát truy cập. Tuy nhiên, không có phương thức truyền tải qua Internet nào an toàn 100%. Vui lòng sử dụng mật khẩu mạnh và bảo vệ thông tin tài khoản của bạn.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text-primary mb-4">6. Quyền và Lựa Chọn của Bạn</h2>
          <p className="mb-3">
            Bạn có quyền:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Truy cập, cập nhật hoặc xóa thông tin cá nhân của bạn</li>
            <li>Hủy đăng ký khỏi thông tin liên lạc marketing</li>
            <li>Vô hiệu hóa cookies trong cài đặt trình duyệt của bạn</li>
            <li>Yêu cầu thông tin về dữ liệu chúng tôi lưu trữ về bạn</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text-primary mb-4">7. Cookies và Theo Dõi</h2>
          <p>
            Chúng tôi sử dụng cookies để nâng cao trải nghiệm của bạn, ghi nhớ sở thích và phân tích việc sử dụng trang web. Bạn có thể kiểm soát cài đặt cookie trong trình duyệt của mình. Việc vô hiệu hóa cookies có thể hạn chế một số chức năng của trang web.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text-primary mb-4">8. Liên Kết Bên Thứ Ba</h2>
          <p>
            Trang web của chúng tôi có thể chứa liên kết đến các trang web bên ngoài. Chúng tôi không chịu trách nhiệm về các thực hành bảo mật hoặc nội dung của các trang web bên thứ ba. Vui lòng xem xét chính sách bảo mật của họ trước khi cung cấp thông tin cá nhân.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text-primary mb-4">9. Bảo Mật Trẻ Em</h2>
          <p>
            Dịch vụ của chúng tôi không hướng đến trẻ em dưới 13 tuổi. Chúng tôi không cố ý thu thập thông tin cá nhân từ trẻ em. Nếu chúng tôi phát hiện việc thu thập như vậy, chúng tôi sẽ thực hiện các bước để xóa thông tin và chấm dứt tài khoản của trẻ.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text-primary mb-4">10. Liên Hệ Với Chúng Tôi</h2>
          <p>
            Nếu bạn có câu hỏi về Chính sách Bảo mật này hoặc các thực hành bảo mật của chúng tôi, vui lòng liên hệ với chúng tôi tại:
          </p>
          <div className="mt-4 bg-gray-50 p-4 rounded-lg border border-border-primary">
            <p><strong>Elysian Realm</strong></p>
            <p>Email: privacy@elysianrealm.com</p>
            <p>Địa chỉ: 123 Đường Mộng Mơ, Quận 1, TP.HCM</p>
            <p>Điện thoại: +84 123 456 789</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text-primary mb-4">11. Cập Nhật Chính Sách</h2>
          <p>
            Chúng tôi có thể cập nhật Chính sách Bảo mật này theo thời gian để phản ánh các thay đổi trong thực hành của chúng tôi hoặc yêu cầu pháp lý. Chúng tôi sẽ thông báo cho bạn về các thay đổi quan trọng bằng cách đăng chính sách đã cập nhật lên trang web của chúng tôi. Việc tiếp tục sử dụng dịch vụ của chúng tôi cấu thành việc chấp nhận chính sách đã cập nhật.
          </p>
          <p className="mt-4 text-sm text-text-tertiary">
            Cập nhật lần cuối: 26 tháng 12 năm 2025
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPage;
