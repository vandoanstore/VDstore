import React, { useState } from 'react';
import AdminLogin from './components/AdminLogin';
import AdminProductManager from './components/AdminProductManager';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import ChatBox from './components/ChatBox';
import ProductList from './components/ProductList';

// Tìm category chứa sản phẩm theo tên
function findProductCategory(productName) {
  
  try {
    const data = localStorage.getItem('productsData');
    if (data) {
      const parsed = JSON.parse(data);
      for (const cat in parsed) {
        if (parsed[cat].some(p => p.name === productName)) {
          return cat;
        }
      }
    }
  } catch (e) {}
  return null;
}

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Chăn');
  const [searchResult, setSearchResult] = useState(null);

  // Xử lý tìm kiếm sản phẩm từ Header
  const handleSearch = (productName) => {
    const category = findProductCategory(productName);
    if (category) {
      setSearchResult({ category, name: productName });
    } else {
      setSearchResult({ category: null, name: productName });
    }
  };

  // Khi chọn danh mục từ sidebar, xóa kết quả tìm kiếm
  const handleSelectCategory = (cat) => {
    setSelectedCategory(cat);
    setSearchResult(null);
  };

  return (
    <div className="App">
      <Header onLoginClick={() => setShowLogin(true)} onSearch={handleSearch} />
      <Navigation />
      {showLogin && !isAdmin && (
        <AdminLogin onLogin={(success) => { setIsAdmin(success); setShowLogin(false); }} />
      )}
      {isAdmin && (
        <AdminProductManager onLogout={() => setIsAdmin(false)} />
      )}
      <div className="container">
        <div className="layout">
          <Sidebar onSelectCategory={handleSelectCategory} />
          <div className="main-area">
            {/* Hiển thị kết quả tìm kiếm nếu có, nếu không thì theo danh mục */}
            {searchResult && searchResult.category ? (
              <ProductList category={searchResult.category} filterName={searchResult.name} />
            ) : searchResult ? (
              <div style={{ textAlign: 'center', margin: '32px 0', color: '#ef4444' }}>
                Không tìm thấy sản phẩm "{searchResult.name}"
              </div>
            ) : (
              <ProductList category={selectedCategory} />
            )}
            {/* Nếu muốn giữ MainContent, hãy để cả hai hoặc dùng điều kiện */}
            {/* <MainContent /> */}
          </div>
        </div>
      </div>
      <Footer />
      <ChatBox />
    </div>
  );
}

export default App;