import ProductList from './ProductList';
import emailjs from 'emailjs-com'; // Thêm dòng này ở đầu file
import React, { useState, useEffect } from 'react'; // <-- thêm useEffect ở đây

const menuItems = [
  'Trang chủ',
  'Sản phẩm Chăn - Ga - Gối - Đệm',
  'Sản phẩm quạt',
  'Sản phẩm chiếu',
  'Phân loại sản phẩm',
  'Liên hệ'
];

const megaMenuData = {
  'Sản phẩm Chăn - Ga - Gối - Đệm': [
    {
      title: 'Chăn',
      items: ['Chăn bông', 'Chăn lông', 'Chăn hè', 'Chăn trẻ em']
    },
    {
      title: 'Ga',
      items: ['Ga cotton', 'Ga lụa', 'Ga chống thấm', 'Ga trẻ em']
    },
    {
      title: 'Gối',
      items: ['Gối thường', 'Gối ôm', 'Gối trẻ em']
    },
    {
      title: 'Đệm',
      items: ['Sông Hồng', 'Đệm Haviko', 'Đệm cao su', 'Đệm bông ép', 'Đệm trẻ em']
    }
  ],
  'Sản phẩm quạt': [
    {
      title: 'Quạt rút',
      items: ['Quạt rút cao', 'Quạt rút vừa', 'Quạt đứng thấp', 'Quạt điều hòa']
    },
    {
      title: 'Quạt treo tường',
      items: ['Quạt treo tường', 'Quạt trần', 'Quạt treo mini', 'Quạt tích điện']
    },
    {
      title: 'Quạt bàn',
      items: ['Quạt bàn nhỏ', 'Quạt bàn lớn', 'Quạt tản', 'Quạt đảo trần']
    },
    {
      title: 'Quạt khác',
      items: ['Quạt hút gió', 'Cánh quạt', 'Motor quạt', 'Điều khiển quạt']
    }
  ],
  'Sản phẩm chiếu': [
    {
      title: 'Chiếu trúc',
      items: ['Chiếu trúc cao cấp', 'Chiếu trúc thường', 'Chiếu trúc trẻ em']
    },
    {
      title: 'Chiếu thường',
      items: ['Chiếu đơn', 'Chiếu đôi']
    },
    {
      title: 'Chiếu lụa',
      items: ['Chiếu lụa cao cấp', 'Chiếu lụa thường', 'Chiếu lụa trẻ em']
    },
    {
      title: 'Phụ kiện chiếu',
      items: ['Bao chiếu', 'Gối chiếu', 'Tấm lót chiếu']
    }
  ]
};

// Ý tưởng phân loại sản phẩm: theo loại, đối tượng, thương hiệu
const productCategories = [
  { label: 'Chăn', value: 'Chăn' },
  { label: 'Ga', value: 'Ga' },
  { label: 'Gối', value: 'Gối' },
  { label: 'Đệm', value: 'Đệm' },
  { label: 'Quạt', value: 'Quạt' },
  { label: 'Chiếu', value: 'Chiếu' },
  { label: 'Phụ kiện', value: 'Sản phẩm khác' },
  { label: 'Cho trẻ em', value: 'Trẻ em' },
  { label: 'Cho người lớn', value: 'Người lớn' },
  { label: 'Thương hiệu Sông Hồng', value: 'Sông Hồng' },
  { label: 'Thương hiệu Haviko', value: 'Haviko' }
];

const contactInfo = [
  {
    icon: '📍',
    label: 'Địa chỉ',
    value: 'Khu 7, xã Văn Lang (xã Vô Tranh cũ), huyện Hạ Hòa, tỉnh Phú Thọ'
  },
  {
    icon: '📞',
    label: 'Số điện thoại',
    value: '0388 351 709'
  },
  {
    icon: '✉️',
    label: 'Email',
    value: 'thanhck302@gmail.com'
  },
  {
    icon: '⏰',
    label: 'Giờ làm việc',
    value: 'Thứ 2 – CN: 8h00 – 20h00'
  }
];

const socialLinks = [
  {
    icon: 'facebook',
    url: 'https://facebook.com',
    color: '#1877f3'
  },
  {
    icon: 'instagram',
    url: 'https://instagram.com',
    color: '#e4405f'
  },
  {
    icon: 'zalo',
    url: 'https://zalo.me',
    color: '#0084ff'
  },
  {
    icon: 'tiktok',
    url: 'https://tiktok.com',
    color: '#000'
  }
];

const SocialIcon = ({ type, color }) => {
  switch (type) {
    case 'facebook':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill={color}><circle cx="12" cy="12" r="12"/><path d="M15.5 8.5h-2v-1c0-.5.2-.8.8-.8h1.2V5.2C15.2 5.1 14.4 5 13.7 5c-2 0-2.7 1.2-2.7 2.6v.9H9v2.1h2v5.3h2.5v-5.3h1.7l.3-2.1z" fill="#fff"/></svg>
      );
    case 'instagram':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill={color}><circle cx="12" cy="12" r="12"/><circle cx="12" cy="12" r="5" fill="#fff"/><circle cx="17" cy="7" r="1.2" fill={color}/></svg>
      );
    case 'zalo':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill={color}><circle cx="12" cy="12" r="12"/><text x="12" y="16" textAnchor="middle" fontSize="10" fill="#fff" fontFamily="Arial">Zalo</text></svg>
      );
    case 'tiktok':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill={color}><circle cx="12" cy="12" r="12"/><text x="12" y="16" textAnchor="middle" fontSize="10" fill="#fff" fontFamily="Arial">TikTok</text></svg>
      );
    default:
      return null;
  }
};

function getAllProducts() {
  try {
    const data = localStorage.getItem('productsData');
    if (data) {
      const parsed = JSON.parse(data);
      let all = [];
      Object.values(parsed).forEach(arr => {
        if (Array.isArray(arr)) all = all.concat(arr);
      });
      return all;
    }
  } catch (e) {}
  return [];
}

const AdvancedFilterBox = ({ onFilter, onClose }) => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    name: '',
    size: '',
    color: '',
    priceFrom: '',
    priceTo: '',
    brand: ''
  });

  useEffect(() => {
    setProducts(getAllProducts());
  }, []);

  const getUnique = (field) => {
    const values = [];
    products.forEach(p => {
      if (field === 'name') {
        if (p.name && !values.includes(p.name)) values.push(p.name);
      } else if (field === 'brand') {
        const brand = p.details?.description?.find(d => d.label === 'Hãng')?.value;
        if (brand && !values.includes(brand)) values.push(brand);
      } else if (field === 'size') {
        const size = p.details?.description?.find(d => d.label === 'Kích thước')?.value;
        if (size && !values.includes(size)) values.push(size);
      } else if (field === 'color') {
        const color = p.details?.description?.find(d => d.label === 'Màu sắc')?.value;
        if (color && !values.includes(color)) values.push(color);
      }
    });
    return values;
  };

  const handleFilter = () => {
    let filtered = products;
    if (filters.name) filtered = filtered.filter(p => p.name === filters.name);
    if (filters.size) filtered = filtered.filter(p =>
      p.details?.description?.find(d => d.label === 'Kích thước' && d.value === filters.size)
    );
    if (filters.color) filtered = filtered.filter(p =>
      p.details?.description?.find(d => d.label === 'Màu sắc' && d.value === filters.color)
    );
    if (filters.brand) filtered = filtered.filter(p =>
      p.details?.description?.find(d => d.label === 'Hãng' && d.value === filters.brand)
    );
    if (filters.priceFrom) filtered = filtered.filter(p =>
      Number(p.price.replace(/\D/g, '')) >= Number(filters.priceFrom)
    );
    if (filters.priceTo) filtered = filtered.filter(p =>
      Number(p.price.replace(/\D/g, '')) <= Number(filters.priceTo)
    );
    onFilter(filtered);
  };

  return (
    <div
      className="category-box"
      style={{
        position: 'absolute',
        top: '56px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: '#cfceceff',
        boxShadow: '0 8px 32px rgba(30,58,138,0.12)',
        borderRadius: '18px',
        padding: '28px 32px 20px 32px',
        zIndex: 1000,
        minWidth: 600,
        maxWidth: '95vw'
      }}
    >
      <div style={{ fontWeight: 700, color: '#1e3a8a', marginBottom: 18, fontSize: '1.2rem', textAlign: 'center', letterSpacing: 1 }}>
        <span role="img" aria-label="filter" style={{ marginRight: 8 }}>🛠️</span>
        Bộ lọc sản phẩm nâng cao
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontWeight: 500, color: '#1e3a8a', fontSize: 14, marginBottom: 2, display: 'block' }}>
              <span role="img" aria-label="name">📦</span> Tên sản phẩm
            </label>
            <select value={filters.name} onChange={e => setFilters(f => ({ ...f, name: e.target.value }))} style={{ width: '100%', padding: 6, borderRadius: 6 }}>
              <option value="">-- Chọn tên --</option>
              {getUnique('name').map(name => <option key={name} value={name}>{name}</option>)}
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ fontWeight: 500, color: '#1e3a8a', fontSize: 14, marginBottom: 2, display: 'block' }}>
              <span role="img" aria-label="size">📏</span> Kích thước
            </label>
            <select value={filters.size} onChange={e => setFilters(f => ({ ...f, size: e.target.value }))} style={{ width: '100%', padding: 6, borderRadius: 6 }}>
              <option value="">-- Chọn kích thước --</option>
              {getUnique('size').map(size => <option key={size} value={size}>{size}</option>)}
            </select>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontWeight: 500, color: '#1e3a8a', fontSize: 14, marginBottom: 2, display: 'block' }}>
              <span role="img" aria-label="color">🎨</span> Màu sắc
            </label>
            <select value={filters.color} onChange={e => setFilters(f => ({ ...f, color: e.target.value }))} style={{ width: '100%', padding: 6, borderRadius: 6 }}>
              <option value="">-- Chọn màu sắc --</option>
              {getUnique('color').map(color => <option key={color} value={color}>{color}</option>)}
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ fontWeight: 500, color: '#1e3a8a', fontSize: 14, marginBottom: 2, display: 'block' }}>
              <span role="img" aria-label="brand">🏷️</span> Hãng
            </label>
            <select value={filters.brand} onChange={e => setFilters(f => ({ ...f, brand: e.target.value }))} style={{ width: '100%', padding: 6, borderRadius: 6 }}>
              <option value="">-- Chọn hãng --</option>
              {getUnique('brand').map(brand => <option key={brand} value={brand}>{brand}</option>)}
            </select>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontWeight: 500, color: '#1e3a8a', fontSize: 14, marginBottom: 2, display: 'block' }}>
              <span role="img" aria-label="price">💰</span> Giá từ
            </label>
            <input
              type="number"
              placeholder="Tối thiểu"
              value={filters.priceFrom}
              onChange={e => setFilters(f => ({ ...f, priceFrom: e.target.value }))}
              style={{ width: '100%', padding: 6, borderRadius: 6, border: '1px solid #e5e7eb' }}
              min={0}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ fontWeight: 500, color: '#1e3a8a', fontSize: 14, marginBottom: 2, display: 'block' }}>
              <span role="img" aria-label="price">💵</span> Đến
            </label>
            <input
              type="number"
              placeholder="Tối đa"
              value={filters.priceTo}
              onChange={e => setFilters(f => ({ ...f, priceTo: e.target.value }))}
              style={{ width: '100%', padding: 6, borderRadius: 6, border: '1px solid #e5e7eb' }}
              min={0}
            />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
          <button
            onClick={handleFilter}
            style={{
              flex: 1,
              background: 'linear-gradient(90deg,#1e3a8a 60%,#2563eb 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '10px 0',
              fontWeight: 700,
              fontSize: 16,
              letterSpacing: 1,
              boxShadow: '0 2px 8px rgba(30,58,138,0.08)',
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
          >
            <span role="img" aria-label="search" style={{ marginRight: 6 }}>🔎</span>
            Lọc sản phẩm
          </button>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              background: '#f3f4f6',
              color: '#1e3a8a',
              border: 'none',
              borderRadius: 8,
              padding: '10px 0',
              fontWeight: 600,
              fontSize: 16,
              cursor: 'pointer'
            }}
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

const ContactModal = ({ onClose }) => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      await emailjs.send(
        'service_9053cdv', // service ID
        'template_ki8o787', // template ID
        {
          name: form.name,
          email: form.email,
          message: form.message,
          text: `Khách liên hệ từ website. Tên: ${form.name}, Email: ${form.email}, Nội dung: ${form.message}`
        },
        'T4hhw4qecN_5Z5g-q' // public API key
      );
      setSent(true);
      setTimeout(() => setSent(false), 2000);
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setError('Gửi liên hệ thất bại, vui lòng thử lại!');
    }
  };

  return (
    <div className="contact-modal-overlay" onClick={onClose}>
      <div className="contact-modal" onClick={e => e.stopPropagation()}>
        <h2 className="contact-title">Liên hệ với chúng tôi</h2>
        <div className="contact-content">
          <div className="contact-info">
            {contactInfo.map((item, idx) => (
              <div key={idx} className="contact-row">
                <span className="contact-icon">{item.icon}</span>
                <span className="contact-label">{item.label}:</span>
                <span className="contact-value">{item.value}</span>
              </div>
            ))}
            <div className="contact-social">
              {socialLinks.map(link => (
                <a
                  key={link.icon}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn"
                  style={{ background: link.color }}
                  aria-label={link.icon}
                >
                  <SocialIcon type={link.icon} color={link.color} />
                </a>
              ))}
            </div>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Họ tên"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              required
            />
            <textarea
              placeholder="Nội dung liên hệ"
              value={form.message}
              onChange={e => setForm({ ...form, message: e.target.value })}
              required
              rows={3}
            />
            <button type="submit" className="contact-submit">Gửi liên hệ</button>
            {sent && <div className="contact-sent">Đã gửi liên hệ thành công!</div>}
            {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
          </form>
          <div className="contact-map">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1151.4703848221288!2d104.9595785666804!3d21.51671837123957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313360ddcdae98f5%3A0xc024d15b9889de2d!2zVsO0IFRyYW5oLCBI4bqhIEjDsmEsIFBow7ogVGjhu40sIFZp4buHdCBOYW0!5e1!3m2!1svi!2s!4v1753603565840!5m2!1svi!2s"
            width="100%"
            height="180"
            style={{ border: 0, borderRadius: 12 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          </div>
        </div>
        <button className="contact-close" onClick={onClose}>&times;</button>
      </div>
      {/* ...style giữ nguyên... */}
    </div>
  );
};

const Navigation = () => {
  const [showContact, setShowContact] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);
  const [selectedProductName, setSelectedProductName] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showCategoryBox, setShowCategoryBox] = useState(false);
  const [filterProducts, setFilterProducts] = useState(null);
  // Đóng mega menu khi click ra ngoài
  React.useEffect(() => {
    if (!activeMegaMenu) return;
    const handleClick = (e) => {
      if (!e.target.closest('.mega-menu') && !e.target.closest('.nav-link-mega')) {
        setActiveMegaMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [activeMegaMenu]);

  const handleMenuClick = (item) => {
    if (item === 'Trang chủ') {
      window.location.href = '/';
      return;
    }
    if (item === 'Liên hệ') setShowContact(true);
    if (item === 'Phân loại sản phẩm') {
      setShowCategoryBox(!showCategoryBox);
      setActiveMegaMenu(null);
      return;
    }
    if (megaMenuData[item]) setActiveMegaMenu(activeMegaMenu === item ? null : item);
  };

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    setSelectedProductName(null);
    setShowCategoryBox(false);
  };

  // Khi click vào sản phẩm con (ví dụ "Chăn bông")
  const handleSubItemClick = (subItem, parentTitle) => {
    setSelectedProductName(subItem);
    setSelectedCategory(parentTitle);
    setActiveMegaMenu(null);
    setShowCategoryBox(false);
  };

  return (
    <>
      <nav className="navigation">
        <div className="container">
          <ul className="nav-menu">
            {menuItems.map((item, index) => (
              <li key={index} className="nav-item" style={{ position: 'relative' }}>
                <button
                  className={`nav-link${megaMenuData[item] ? ' nav-link-mega' : ''}`}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#ffffffff',
                    fontSize: '1rem',
                    fontWeight: 500,
                    padding: '8px 16px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    margin: '0 auto',
                    textTransform: 'uppercase'
                  }}
                  onClick={() => {
                    if (item === 'Phân loại sản phẩm') setShowCategoryBox(!showCategoryBox);
                    else handleMenuClick(item);
                  }}
                  onMouseEnter={() => megaMenuData[item] && setActiveMegaMenu(item)}
                >
                  {item}
                </button>
                {megaMenuData[item] && activeMegaMenu === item && (
                  <div className="mega-menu" onMouseLeave={() => setActiveMegaMenu(null)}>
                    <div className="mega-menu-inner">
                      {megaMenuData[item].map((col, idx) => (
                        <div className="mega-menu-col" key={col.title}>
                          <div className="mega-menu-title">{col.title}</div>
                          <ul className="mega-menu-list">
                            {col.items.map((sub, i) => (
                              <li key={sub}>
                                <a
                                  href="#"
                                  className="mega-menu-link"
                                  onClick={() => handleSubItemClick(sub, col.title)}
                                >
                                  {sub}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {/* Hộp phân loại sản phẩm */}
                {item === 'Phân loại sản phẩm' && showCategoryBox && (
                  <AdvancedFilterBox
                    onFilter={prods => { setFilterProducts(prods); setShowCategoryBox(false); }}
                    onClose={() => setShowCategoryBox(false)}
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>
      {showContact && <ContactModal onClose={() => setShowContact(false)} />}
      {/* Hiển thị sản phẩm theo phân loại nếu chọn */}
      {selectedCategory && !selectedProductName && (
        <ProductList category={selectedCategory} />
      )}
      {/* Hiển thị sản phẩm theo tên sản phẩm con và category nếu chọn từ mega menu */}
      {selectedProductName && selectedCategory && (
        <ProductList category={selectedCategory} filterName={selectedProductName} />
      )}
      {filterProducts && (
        <ProductList category={null} filterName={null} products={filterProducts} />
      )}      
      {/* ...style giữ nguyên... */}
    </>
  );
};

export default Navigation;