import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ensureBranches, getBranches, saveBranch, saveCustomProduct } from '../lib/localStore.js';

function normalizeId(text) {
  return String(text || '')
    .trim()
    .toUpperCase()
    .replace(/\s+/g, '-')
    .replace(/[^A-Z0-9\-]/g, '')
    .slice(0, 32);
}

export default function AdminProductCreate() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    id: '',
    name: '',
    brand: '',
    category: '',
    subcategory: '',
    price: '',
    description: '',
    image: '',
    stock: 0,
    useBranchStock: false,
  });
  const [branchStocks, setBranchStocks] = useState([]);
  const [newBranchName, setNewBranchName] = useState('');
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const branches = useMemo(() => getBranches(), [branchStocks.length]);

  const handleChange = (evt) => {
    const { name, value, type, checked } = evt.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleAddBranch = () => {
    const created = saveBranch(newBranchName);
    if (created) {
      setBranchStocks((prev) => [...prev, { branchId: created.id, qty: 0 }]);
      setNewBranchName('');
    }
  };

  const handleSetBranchQty = (branchId, qty) => {
    const parsed = Number(qty) || 0;
    setBranchStocks((prev) => {
      const next = [...prev];
      const idx = next.findIndex((b) => b.branchId === branchId);
      if (idx >= 0) next[idx] = { ...next[idx], qty: parsed };
      else next.push({ branchId, qty: parsed });
      return next;
    });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setError(null);
    const id = normalizeId(form.id || form.name);
    if (!id || !form.name || !form.category || !form.price) {
      setError('Completa los campos obligatorios (ID/Nombre, Categoría, Precio).');
      return;
    }
    const price = Number(form.price);
    if (!Number.isFinite(price) || price <= 0) {
      setError('Precio inválido.');
      return;
    }
    const base = {
      id,
      name: form.name.trim(),
      brand: form.brand.trim(),
      category: form.category.trim().toLowerCase(),
      subcategory: form.subcategory.trim().toLowerCase(),
      price,
      description: form.description.trim(),
      image: form.image.trim(),
    };
    let record;
    setIsSaving(true);
    try {
      if (form.useBranchStock) {
        // Persist any ad-hoc branches typed by the user list first
        ensureBranches([]);
        const filtered = branchStocks.filter((b) => (Number(b.qty) || 0) > 0);
        record = saveCustomProduct({ ...base, stockByBranch: filtered });
      } else {
        const stock = Math.max(0, Number(form.stock) || 0);
        record = saveCustomProduct({ ...base, stock });
      }
      navigate('/admin');
    } catch (e) {
      setError(e?.message || 'Error guardando el producto');
    } finally {
      setIsSaving(false);
    }
    return record;
  };

  return (
    <div className="container py-4">
      <div className="mb-3 d-flex align-items-center justify-content-between">
        <div>
          <h1 className="h4 m-0">Crear producto</h1>
          <p className="text-muted m-0">Completa los datos y guarda para agregar al catálogo.</p>
        </div>
        <Link to="/admin" className="btn btn-outline-secondary">Volver</Link>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="card p-3 p-md-4" style={{ borderRadius: '1rem' }}>
        <div className="row g-3">
          <div className="col-12 col-md-4">
            <label className="form-label">ID</label>
            <input name="id" className="form-control" value={form.id} onChange={handleChange} placeholder="EJ: CAB-SHA-100" />
          </div>
          <div className="col-12 col-md-8">
            <label className="form-label">Nombre</label>
            <input name="name" className="form-control" value={form.name} onChange={handleChange} required />
          </div>

          <div className="col-12 col-sm-6 col-md-4">
            <label className="form-label">Marca</label>
            <input name="brand" className="form-control" value={form.brand} onChange={handleChange} />
          </div>
          <div className="col-12 col-sm-6 col-md-4">
            <label className="form-label">Categoría</label>
            <input name="category" className="form-control" value={form.category} onChange={handleChange} required />
          </div>
          <div className="col-12 col-sm-6 col-md-4">
            <label className="form-label">Subcategoría</label>
            <input name="subcategory" className="form-control" value={form.subcategory} onChange={handleChange} />
          </div>

          <div className="col-12 col-sm-6 col-md-4">
            <label className="form-label">Precio</label>
            <input name="price" type="number" min="0" step="1" className="form-control" value={form.price} onChange={handleChange} required />
          </div>
          <div className="col-12 col-md-8">
            <label className="form-label">Imagen (URL o ruta pública)</label>
            <input name="image" className="form-control" value={form.image} onChange={handleChange} placeholder="/images/... o https://..." />
          </div>

          <div className="col-12">
            <label className="form-label">Descripción</label>
            <textarea name="description" className="form-control" rows="3" value={form.description} onChange={handleChange} />
          </div>

          <div className="col-12">
            <div className="form-check form-switch">
              <input className="form-check-input" type="checkbox" id="useBranchStock" name="useBranchStock" checked={form.useBranchStock} onChange={handleChange} />
              <label className="form-check-label" htmlFor="useBranchStock">Gestionar stock por sucursales</label>
            </div>
          </div>

          {!form.useBranchStock && (
            <div className="col-12 col-sm-6 col-md-4">
              <label className="form-label">Stock total</label>
              <input name="stock" type="number" min="0" step="1" className="form-control" value={form.stock} onChange={handleChange} />
            </div>
          )}

          {form.useBranchStock && (
            <div className="col-12">
              <div className="card p-3" style={{ borderRadius: '.75rem' }}>
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <h2 className="h6 m-0">Stock por sucursal</h2>
                  <div className="input-group" style={{ maxWidth: 360 }}>
                    <input className="form-control" placeholder="Nueva sucursal" value={newBranchName} onChange={(e) => setNewBranchName(e.target.value)} />
                    <button type="button" className="btn btn-outline-secondary" onClick={handleAddBranch}>Agregar</button>
                  </div>
                </div>
                {branches.length === 0 && (
                  <p className="text-muted m-0">No hay sucursales creadas aún.</p>
                )}
                {branches.length > 0 && (
                  <div className="row g-2">
                    {branches.map((b) => (
                      <div key={b.id} className="col-12 col-sm-6 col-md-4">
                        <label className="form-label">{b.name}</label>
                        <input
                          type="number"
                          className="form-control"
                          min="0"
                          step="1"
                          value={branchStocks.find((x) => x.branchId === b.id)?.qty ?? 0}
                          onChange={(e) => handleSetBranchQty(b.id, e.target.value)}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="col-12 d-flex gap-2">
            <button type="submit" className="btn btn-primary" disabled={isSaving}>
              {isSaving ? 'Guardando…' : 'Guardar producto'}
            </button>
            <Link to="/admin" className="btn btn-outline-secondary">Cancelar</Link>
          </div>
        </div>
      </form>
    </div>
  );
}

