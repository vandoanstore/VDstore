import React, { useState, useEffect } from 'react';

const defaultProductsData = {};

function getProductsData() {
  try {
    const data = localStorage.getItem('productsData');
    if (data) {
      const parsed = JSON.parse(data);
      if (typeof parsed === 'object' && parsed !== null) return parsed;
    }
  } catch (e) {
    console.error('Lỗi đọc dữ liệu sản phẩm:', e);
  }
  return defaultProductsData;
}

const ProductList = ({ category, filterName, products }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productsData, setProductsData] = useState(getProductsData());

  // Lấy danh sách sản phẩm theo category và filter theo tên nếu có
  let productList = [];
  try {
    if (Array.isArray(products)) {
      productList = products.filter(
        p => p && typeof p === 'object' && (!filterName || p.name === filterName)
      );
    } else if (category && productsData[category]) {
      productList = productsData[category].filter(
        p => p && typeof p === 'object' && (!filterName || p.name === filterName)
      );
    }
  } catch (e) {
    console.error('Lỗi xử lý danh sách sản phẩm:', e);
    productList = [];
  }

  // Nếu localStorage thay đổi (admin thêm/xóa sản phẩm), cập nhật lại
  useEffect(() => {
    function handleStorage() {
      setProductsData(getProductsData());
    }
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  useEffect(() => {
    setProductsData(getProductsData());
  }, [category, filterName]);

  // Nếu không có sản phẩm, hiển thị thông báo
  if (!Array.isArray(productList) || productList.length === 0) {
    return (
      <div className="product-list">
        <h4>
          {filterName
            ? `Sản phẩm "${filterName}" thuộc danh mục "${category}"`
            : Array.isArray(products)
              ? `Kết quả lọc sản phẩm`
              : `Sản phẩm ${category || ''}`}
        </h4>
        <div className="no-products">Chưa có sản phẩm cho mục này.</div>
      </div>
    );
  }

  return (
    <div className="product-list">
      <h4>
        {filterName
          ? `Sản phẩm "${filterName}" thuộc danh mục "${category}"`
          : Array.isArray(products)
            ? `Kết quả lọc sản phẩm`
            : `Sản phẩm ${category || ''}`}
      </h4>
      <div className="products-grid">
        {productList.map((product, idx) => (
          <div
            key={idx}
            className="product-card"
            onClick={() => setSelectedProduct(product)}
            style={{ cursor: 'pointer' }}
          >
            <img src={product?.img || ''} alt={product?.name || ''} />
            <div className="product-info">
              <span className="product-name">{product?.name || ''}</span>
              <span className="product-price">Giá: {product?.price || ''} đồng</span>
              {product?.discount && (
                <span className="product-discount">{product.discount}</span>
              )}
              <span className="product-sold"> Đã bán: {product?.sold || ''}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal hiển thị chi tiết sản phẩm */}
      {selectedProduct && selectedProduct.details && (
        <div className="product-details-modal">
          <div className="details-content">
            <button
              className="close-btn"
              onClick={() => setSelectedProduct(null)}
              style={{ float: 'right', fontSize: 18, cursor: 'pointer' }}
            >
              &times;
            </button>
            <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start', marginTop: 24 }}>
              <img
                src={selectedProduct?.img || ''}
                alt={selectedProduct?.name || ''}
                style={{
                  width: '400px',
                  height: '400px',
                  objectFit: 'contain',
                  borderRadius: '8px',
                  background: '#fff',
                  boxShadow: '0 2px 12px rgba(30,58,138,0.08)'
                }}
              />
              <div>
                <h3 style={{ color: '#1e3a8a', marginBottom: 8 }}>{selectedProduct?.name || ''}</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 16 }}>
                  <tbody>
                    <tr>
                      <td style={{ fontWeight: 'bold', padding: '4px 8px', border: '1px solid #e5e7eb' }}>Bảo hành:</td>
                      <td style={{ padding: '4px 8px', border: '1px solid #e5e7eb' }}>{selectedProduct.details?.warranty || ''}</td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: 'bold', padding: '4px 8px', border: '1px solid #e5e7eb' }}>Trạng thái:</td>
                      <td style={{ padding: '4px 8px', border: '1px solid #e5e7eb' }}>{selectedProduct.details?.status || ''}</td>
                    </tr>
                  </tbody>
                </table>
                <h4 style={{ color: '#1e3a8a', marginBottom: 8 }}>Thông tin sản phẩm</h4>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <tbody>
                    {(selectedProduct.details?.description || []).map((item, i) => (
                      <tr key={i}>
                        <td style={{ fontWeight: 'bold', padding: '4px 8px', border: '1px solid #e5e7eb' }}>{item.label}:</td>
                        <td style={{ padding: '4px 8px', border: '1px solid #e5e7eb' }}>{item.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {selectedProduct.details?.detail && (
                  <div style={{ marginTop: 16, color: '#374151', fontSize: 16 }}>
                    <h4 style={{ color: '#1e3a8a', marginBottom: 8 }}>Chi tiết sản phẩm</h4>
                    <div>{selectedProduct.details.detail}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
