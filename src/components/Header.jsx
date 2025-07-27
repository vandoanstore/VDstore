import React, { useState, useRef } from 'react';

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

const Header = ({ onLoginClick, onSearch }) => {
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggest, setShowSuggest] = useState(false);
  const inputRef = useRef();

  // Lấy toàn bộ sản phẩm mỗi lần nhập
  const handleChange = e => {
    const value = e.target.value;
    setSearch(value);
    if (value.trim().length === 0) {
      setSuggestions([]);
      setShowSuggest(false);
      return;
    }
    const allProducts = getAllProducts();
    const filtered = allProducts.filter(p =>
      p.name.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filtered.slice(0, 8)); // Hiện tối đa 8 gợi ý
    setShowSuggest(true);
  };

  // Khi chọn gợi ý hoặc bấm nút tìm kiếm
  const handleSearch = (name) => {
    setSearch(name || search);
    setShowSuggest(false);
    if (onSearch) onSearch(name || search);
  };

  // Ẩn gợi ý khi click ra ngoài
  React.useEffect(() => {
    const handleClick = (e) => {
      if (!inputRef.current?.contains(e.target)) setShowSuggest(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <header className="header">
      <div className="header-top">
        <div className="container">
          <div className="header-top-content">
            <div className="logo-section">
              <div className="logo">
                <i className="logo-icon" style={{
                  backgroundImage: 'url(https://as1.ftcdn.net/v2/jpg/03/28/50/10/1000_F_328501059_KnS1tUQ0z8rhkkVaJBnHPeOHw090qZ70.jpg)',
                  backgroundSize: 'cover',
                  width: '90px',
                  height: '80px',
                  display: 'inline-block'
                }}></i>
                <span>Vân Đoan</span>
              </div>
              <span className="slogan">Chăn ga gối đệm</span>
            </div>
            <div className="search-section" ref={inputRef} style={{ position: 'relative' }}>
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Tìm kiếm sản phẩm..."
                  value={search}
                  onChange={handleChange}
                  onFocus={() => search && setShowSuggest(true)}
                  style={{ position: 'relative', zIndex: 2 }}
                />
                <button className="search-btn" onClick={() => handleSearch()}>
                  Tìm kiếm
                </button>
              </div>
              {showSuggest && suggestions.length > 0 && (
                <ul
                  className="search-suggestions"
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    background: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0 0 8px 8px',
                    boxShadow: '0 2px 8px rgba(30,58,138,0.08)',
                    zIndex: 10,
                    listStyle: 'none',
                    margin: 0,
                    padding: '4px 0',
                    maxHeight: 260,
                    overflowY: 'auto'
                  }}
                >
                  {suggestions.map((p, idx) => (
                    <li
                      key={idx}
                      style={{
                        padding: '8px 16px',
                        cursor: 'pointer',
                        borderBottom: '1px solid #f3f4f6',
                        color: '#1e3a8a'
                      }}
                      onClick={() => handleSearch(p.name)}
                    >
                      {p.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="contact-section">
              <div className="hotline">
                <i className="fas fa-phone"></i>
                <span>0388.351.709</span>
              </div>
              <button
                className="login-btn"
                onClick={onLoginClick}
                style={{
                  marginLeft: '16px',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  border: 'none',
                  background: '#1e3a8a',
                  color: '#fff',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Đăng nhập
              </button>
              <div className="cart">
                <i className="fas fa-shopping-cart"></i>
                <span className="cart-count">0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
