import React from 'react'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Về chúng tôi</h4>
            <p>Chuyên cung cấp chăn - ga - gối - đệm chính hãng </p>
            <p>Các sản phẩm về quạt và các thiết bị điện gia dụng khác.</p>
          </div>
          <div className="footer-section">
            <h4>Liên hệ</h4>
            <p>Hotline: 038.835.1709</p>
            <p>Hotline: 038.602.8692</p>
            <p>Email: thanhck302@gmail.com</p>
            <p>Địa chỉ: Khu 7, xã Văn Lang (xã vô Tranh cũ), huyện Hạ Hòa, tỉnh Phú Thọ</p>
          </div>
          <div className="footer-section">
            <h4>Theo dõi chúng tôi</h4>
            <div className="social-links">
              <a href="#"><i className="fab fa-facebook"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-youtube"></i></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Vân Đoan. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
