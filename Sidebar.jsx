import React from 'react';

const categories = [
  { name: 'Chăn', icon: 'fas fa-star' },
  { name: 'Ga', icon: 'fas fa-fire' },
  { name: 'Gối', icon: 'fas fa-crown' },
  { name: 'Đệm', icon: 'fas fa-heart' },
  { name: 'Quạt', icon: 'fas fa-bolt' },
  { name: 'Chiếu', icon: 'fas fa-tags' },
  { name: 'Màn', icon: 'fas fa-running' },
  { name: 'Sản phẩm khác', icon: 'fas fa-dumbbell' }
];

const Sidebar = ({ onSelectCategory }) => (
  <aside className="sidebar">
    <h3 className="sidebar-title">DANH MỤC SẢN PHẨM</h3>
    <ul className="category-list">
      {categories.map((category, index) => (
        <li key={index} className="category-item">
          <button
            type="button"
            className="category-link"
            onClick={() => onSelectCategory(category.name)}
            style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', padding: 0, cursor: 'pointer' }}
          >
            <i className={category.icon}></i>
            <span>{category.name}</span>
          </button>
        </li>

      ))}
      <li className="category-item">
        <button
          type="button"
          className="category-link"
          onClick={() => onSelectCategory('Tất cả')}
          style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', padding: 0, cursor: 'pointer' }}
        >
          <i className="fas fa-newspaper"></i>
          <span>Tất cả</span>
        </button> 
      </li>
      <li className="category-item">
        <button
          type="button"
          className="category-link"
          onClick={() => onSelectCategory('Khuyến mãi')}
          style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', padding: 0, cursor: 'pointer' }}
        >
          <i className="fas fa-tags"></i>
          <span>Khuyến mãi</span>
        </button>
      </li>
      <li className="category-item">
        <button
          type="button"
          className="category-link"
          onClick={() => onSelectCategory('Mới nhất')}
          style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', padding: 0, cursor: 'pointer' }}
        >
          <i className="fas fa-newspaper"></i>
          <span>Mới nhất</span>
        </button>
      </li>
    </ul>
  </aside>
);

export default Sidebar;