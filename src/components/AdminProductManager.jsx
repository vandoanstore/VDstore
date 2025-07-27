import React, { useState, useEffect } from 'react';

const STORAGE_KEY = 'productsData';
const categories = [
  'Chăn', 'Ga', 'Gối', 'Đệm', 'Quạt', 'Chiếu', 'Màn', 'Sản phẩm khác'
];

const defaultProducts = {
  'Chăn': [],
  'Ga': [],
  'Gối': [],
  'Đệm': [],
  'Quạt': [],
  'Chiếu': [],
  'Màn': [],
  'Sản phẩm khác': []
};

const defaultDescriptionFields = [
  { label: 'Kích thước', value: '' },
  { label: 'Tên', value: '' },
  { label: 'Màu sắc', value: '' },
  { label: 'Hãng', value: '' },
];

const AdminProductManager = () => {
  const [products, setProducts] = useState(defaultProducts);
  const [form, setForm] = useState({
    name: '', price: '', img: '', sold: '', category: categories[0], detail: '',
    code: '', warranty: '', status: '', hotline: '',
    description: defaultDescriptionFields.map(f => ({ ...f }))
  });
  const [editIdx, setEditIdx] = useState(null);
  const [editCat, setEditCat] = useState('');
  const [editForm, setEditForm] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    let parsed = defaultProducts;
    try {
      if (saved) {
        const temp = JSON.parse(saved);
        if (
          typeof temp === 'object' &&
          categories.every(cat => Array.isArray(temp[cat]))
        ) {
          parsed = temp;
        }
      }
    } catch (e) {
      parsed = defaultProducts;
    }
    setProducts(parsed);
  }, []);

  const saveProducts = (newProducts) => {
    setProducts(newProducts);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newProducts));
  };

  const handleDescriptionChange = (idx, value) => {
    const newDesc = form.description.map((item, i) =>
      i === idx ? { ...item, value } : item
    );
    setForm({ ...form, description: newDesc });
  };

  const handleAdd = () => {
    if (!form.name || !form.price || !form.category) return;
    const newProducts = { ...products };
    newProducts[form.category] = [
      ...newProducts[form.category],
      {
        name: form.name,
        price: form.price,
        img: form.img,
        sold: form.sold,
        details: {
          code: form.code,
          warranty: form.warranty,
          status: form.status,
          hotline: form.hotline,
          description: form.description,
          detail: form.detail
        }
      }
    ];
    setForm({
      name: '', price: '', img: '', sold: '', category: form.category, detail: '',
      code: '', warranty: '', status: '', hotline: '',
      description: defaultDescriptionFields.map(f => ({ ...f }))
    });
    saveProducts(newProducts);
  };

  const handleDelete = (cat, idx) => {
    const newProducts = { ...products };
    newProducts[cat] = newProducts[cat].filter((_, i) => i !== idx);
    saveProducts(newProducts);
    setEditIdx(null);
    setEditForm(null);
  };
  const handleEdit = (cat, idx) => {
    const p = products[cat][idx];
    setEditCat(cat);
    setEditIdx(idx);
    setEditForm({
      name: p.name,
      price: p.price,
      img: p.img,
      sold: p.sold,
      code: p.details?.code || '',
      warranty: p.details?.warranty || '',
      status: p.details?.status || '',
      hotline: p.details?.hotline || '',
      detail: p.details?.detail || '',
      description: p.details?.description
        ? p.details.description.map((d, i) => ({
            label: d.label || defaultDescriptionFields[i]?.label || '',
            value: d.value || ''
          }))
        : defaultDescriptionFields.map(f => ({ ...f }))
    });
  };

  const handleEditDescriptionChange = (idx, value) => {
    if (!editForm) return;
    const newDesc = editForm.description.map((item, i) =>
      i === idx ? { ...item, value } : item
    );
    setEditForm({ ...editForm, description: newDesc });
  };

  const handleEditSave = () => {
    if (!editForm || !editCat || editIdx === null) return;
    const newProducts = { ...products };
    newProducts[editCat][editIdx] = {
      name: editForm.name,
      price: editForm.price,
      img: editForm.img,
      sold: editForm.sold,
      details: {
        code: editForm.code,
        warranty: editForm.warranty,
        status: editForm.status,
        hotline: editForm.hotline,
        description: editForm.description,
        detail: editForm.detail
      }
    };
    saveProducts(newProducts);
    setEditIdx(null);
    setEditForm(null);
  };

  const handleEditCancel = () => {
    setEditIdx(null);
    setEditForm(null);
  };
return (
  <div style={{
    maxWidth: 800,
    margin: '40px auto',
    background: '#c2c2c2ff',
    padding: 32,
    borderRadius: 16,
    boxShadow: '0 4px 24px rgba(30,58,138,0.08)'
  }}>
    <h2 style={{ color: '#1e3a8a', textAlign: 'center', marginBottom: 28, letterSpacing: 1 }}>Quản lý sản phẩm</h2>
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: 16,
      marginBottom: 20,
      alignItems: 'flex-end'
    }}>
      <div style={{ flex: 1, minWidth: 180 }}>
        <label style={{ fontWeight: 500, color: '#1e3a8a' }}>Tên sản phẩm</label>
        <input
          placeholder="Tên sản phẩm"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #e5e7eb', marginTop: 4 }}
        />
      </div>
      <div style={{ flex: 1, minWidth: 120 }}>
        <label style={{ fontWeight: 500, color: '#1e3a8a' }}>Giá</label>
        <input
          placeholder="Giá"
          value={form.price}
          onChange={e => setForm({ ...form, price: e.target.value })}
          style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #e5e7eb', marginTop: 4 }}
        />
      </div>
      <div style={{ flex: 1, minWidth: 220 }}>
        <label style={{ fontWeight: 500, color: '#1e3a8a' }}>Link ảnh</label>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input
            placeholder="Link ảnh"
            value={form.img}
            onChange={e => setForm({ ...form, img: e.target.value })}
            style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #e5e7eb', marginTop: 4 }}
          />
          {form.img && (
            <img
              src={form.img}
              alt="preview"
              style={{ width: 40, height: 40, objectFit: 'cover', border: '1px solid #eee', borderRadius: 6, background: '#f3f4f6' }}
              onError={e => (e.target.style.display = 'none')}
            />
          )}
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 100 }}>
        <label style={{ fontWeight: 500, color: '#1e3a8a' }}>Đã bán</label>
        <input
          placeholder="Đã bán"
          value={form.sold}
          onChange={e => setForm({ ...form, sold: e.target.value })}
          style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #e5e7eb', marginTop: 4 }}
        />
      </div>
      <div style={{ flex: 1, minWidth: 120 }}>
        <label style={{ fontWeight: 500, color: '#1e3a8a' }}>Bảo hành</label>
        <input
          placeholder="Bảo hành"
          value={form.warranty}
          onChange={e => setForm({ ...form, warranty: e.target.value })}
          style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #e5e7eb', marginTop: 4 }}
        />
      </div>
      <div style={{ flex: 1, minWidth: 120 }}>
        <label style={{ fontWeight: 500, color: '#1e3a8a' }}>Trạng thái</label>
        <input
          placeholder="Trạng thái"
          value={form.status}
          onChange={e => setForm({ ...form, status: e.target.value })}
          style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #e5e7eb', marginTop: 4 }}
        />
      </div>
      <div style={{ flex: 1, minWidth: 160 }}>
        <label style={{ fontWeight: 500, color: '#1e3a8a' }}>Chi tiết sản phẩm</label>
        <input
          type="text"
          placeholder="Chi tiết sản phẩm"
          value={form.detail}
          onChange={e => setForm({ ...form, detail: e.target.value })}
          style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #e5e7eb', marginTop: 4 }}
        />
      </div>
      <div style={{ minWidth: 120 }}>
        <label style={{ fontWeight: 500, color: '#1e3a8a' }}>Danh mục</label>
        <select
          value={form.category}
          onChange={e => setForm({ ...form, category: e.target.value })}
          style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #e5e7eb', marginTop: 4 }}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <button
        onClick={handleAdd}
        style={{
          background: 'linear-gradient(90deg,#1e3a8a 60%,#2563eb 100%)',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          padding: '10px 24px',
          fontWeight: 700,
          fontSize: 16,
          letterSpacing: 1,
          boxShadow: '0 2px 8px rgba(30,58,138,0.08)',
          cursor: 'pointer',
          marginLeft: 8,
          marginTop: 24,
          height: 44
        }}
      >
        Thêm sản phẩm
      </button>
    </div>
    <div style={{ marginBottom: 20 }}>
      <h4 style={{ color: '#1e3a8a', marginBottom: 8 }}>Thông tin sản phẩm chi tiết</h4>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {form.description.map((item, idx) => (
          <input
            key={item.label}
            style={{ flex: '1 1 180px', padding: 8, borderRadius: 6, border: '1px solid #e5e7eb' }}
            placeholder={item.label}
            value={item.value}
            onChange={e => handleDescriptionChange(idx, e.target.value)}
          />
        ))}
      </div>
    </div>
    {categories.map(cat => (
      <div key={cat} style={{ marginBottom: 32 }}>
        <h3 style={{ color: '#1e3a8a', marginBottom: 8 }}>{cat}</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {products[cat]?.map((p, idx) => (
            <li key={idx} style={{
              marginBottom: 12,
              background: '#f3f6fa',
              borderRadius: 8,
              padding: 12,
              display: 'flex',
              alignItems: 'center',
              gap: 12
            }}>
          {editIdx === idx && editCat === cat ? (
            <div style={{
              background: '#bcbcbcff',
              borderRadius: 10,
              padding: 16,
              boxShadow: '0 2px 8px rgba(30,58,138,0.08)',
              marginBottom: 8,
              display: 'flex',
              flexWrap: 'wrap',
              gap: 12
            }}>
              <div style={{ flex: 1, minWidth: 160 }}>
                <label style={{ color: '#1e3a8a', fontWeight: 500 }}>Tên sản phẩm</label>
                <input
                  value={editForm.name}
                  onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                  style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #e5e7eb', marginTop: 4 }}
                />
              </div>
              <div style={{ flex: 1, minWidth: 100 }}>
                <label style={{ color: '#1e3a8a', fontWeight: 500 }}>Giá</label>
                <input
                  value={editForm.price}
                  onChange={e => setEditForm({ ...editForm, price: e.target.value })}
                  style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #e5e7eb', marginTop: 4 }}
                />
              </div>
              <div style={{ flex: 1, minWidth: 180 }}>
                <label style={{ color: '#1e3a8a', fontWeight: 500 }}>Link ảnh</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <input
                    value={editForm.img}
                    onChange={e => setEditForm({ ...editForm, img: e.target.value })}
                    style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #e5e7eb', marginTop: 4 }}
                  />
                  {editForm.img && (
                    <img
                      src={editForm.img}
                      alt="preview"
                      style={{ width: 40, height: 40, objectFit: 'cover', border: '1px solid #eee', borderRadius: 6, background: '#f3f4f6' }}
                      onError={e => (e.target.style.display = 'none')}
                    />
                  )}
                </div>
              </div>
              <div style={{ flex: 1, minWidth: 80 }}>
                <label style={{ color: '#1e3a8a', fontWeight: 500 }}>Đã bán</label>
                <input
                  value={editForm.sold}
                  onChange={e => setEditForm({ ...editForm, sold: e.target.value })}
                  style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #e5e7eb', marginTop: 4 }}
                />
              </div>
              <div style={{ flex: 1, minWidth: 100 }}>
                <label style={{ color: '#1e3a8a', fontWeight: 500 }}>Bảo hành</label>
                <input
                  value={editForm.warranty}
                  onChange={e => setEditForm({ ...editForm, warranty: e.target.value })}
                  style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #e5e7eb', marginTop: 4 }}
                />
              </div>
              <div style={{ flex: 1, minWidth: 100 }}>
                <label style={{ color: '#1e3a8a', fontWeight: 500 }}>Trạng thái</label>
                <input
                  value={editForm.status}
                  onChange={e => setEditForm({ ...editForm, status: e.target.value })}
                  style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #e5e7eb', marginTop: 4 }}
                />
              </div>
              <div style={{ flex: 1, minWidth: 140 }}>
                <label style={{ color: '#1e3a8a', fontWeight: 500 }}>Chi tiết sản phẩm</label>
                <input
                  value={editForm.detail}
                  onChange={e => setEditForm({ ...editForm, detail: e.target.value })}
                  style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #e5e7eb', marginTop: 4 }}
                />
              </div>
              <div style={{ width: '100%', marginTop: 8 }}>
                <label style={{ color: '#1e3a8a', fontWeight: 500 }}>Thông tin sản phẩm chi tiết</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 4 }}>
                  {editForm.description.map((item, i) => (
                                    <input
                            key={item.label}
                            style={{ flex: '1 1 120px', padding: 8, borderRadius: 6, border: '1px solid #e5e7eb' }}
                            placeholder={item.label}
                            value={item.value}
                            onChange={e => handleEditDescriptionChange(i, e.target.value)}
                          />
                        ))}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
                      <button
                        onClick={handleEditSave}
                        style={{
                          background: '#2563eb',
                          color: '#fff',
                          border: 'none',
                          borderRadius: 6,
                          padding: '8px 24px',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >Lưu</button>
                      <button
                        onClick={handleEditCancel}
                        style={{
                          background: '#e5e7eb',
                          color: '#1e3a8a',
                          border: 'none',
                          borderRadius: 6,
                          padding: '8px 24px',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >Hủy</button>
                    </div>
                  </div>
                ) : (
                <>
                  <img src={p.img} alt={p.name} style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 6, background: '#fff', border: '1px solid #e5e7eb' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, color: '#1e3a8a' }}>{p.name}</div>
                    <div style={{ color: '#374151', fontSize: 15 }}>
                      Giá: <b>{p.price}đ</b> | Đã bán: {p.sold} | {p.details && (
                        <>
                        Bảo hành: {p.details.warranty} | Trạng thái: {p.details.status} | Chi tiết: {p.details.detail}
                        </>
                      )}
                    </div>
                  </div>
                  <button
                    style={{
                      background: '#2563eb',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 6,
                      padding: '6px 16px',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                    onClick={() => handleEdit(cat, idx)}
                  >Sửa</button>
                  <button
                    style={{
                      background: '#e11d48',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 6,
                      padding: '6px 16px',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                    onClick={() => handleDelete(cat, idx)}
                  >Xóa</button>
                </>
              )}
            </li>
          ))}
          {products[cat].length === 0 && <li style={{ color: '#6b7280', fontStyle: 'italic' }}>Chưa có sản phẩm</li>}
        </ul>
      </div>
    ))}
  </div>
);
}
export default AdminProductManager;
