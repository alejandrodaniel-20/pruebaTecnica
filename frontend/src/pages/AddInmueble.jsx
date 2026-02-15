import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { RiMapPinLine, RiMoneyDollarCircleLine } from 'react-icons/ri';
import api from '../services/api';
import FormCard from '../components/FormCard';

const inputClass = 'border border-[#E8E4DF] outline-none focus:ring-2 focus:ring-[#B8D4E8] focus:border-transparent text-[#5C6B7A] font-medium text-sm rounded-lg w-full p-2.5 px-8';

export default function AddInmueble() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ address: '', price: '', status: 'disponible' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/houses', { ...form, price: Number(form.price) });
      navigate('/inmuebles');
    } catch (err) {
      setError(err.response?.data?.error || 'Error al registrar inmueble');
    }
  };

  return (
    <FormCard title="REGISTRAR NUEVA VENTA">
      <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
        {error && <p className="text-rose-500 text-sm mb-4">{error}</p>}
        <div className="mb-4">
          <label htmlFor="address" className="block mb-2 text-sm font-semibold text-[#5C6B7A]">Dirección</label>
          <div className="relative">
            <RiMapPinLine className="absolute left-2 top-1/2 -translate-y-1/2 text-[#9BA8B5] text-lg" />
            <input
              type="text"
              id="address"
              placeholder="Ej: Av. Principal 123"
              required
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className={inputClass}
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block mb-2 text-sm font-semibold text-[#5C6B7A]">Precio</label>
          <div className="relative">
            <RiMoneyDollarCircleLine className="absolute left-2 top-1/2 -translate-y-1/2 text-[#9BA8B5] text-lg" />
            <input
              type="number"
              id="price"
              placeholder="0"
              min="0"
              step="0.01"
              required
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className={inputClass}
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="status" className="block mb-2 text-sm font-semibold text-[#5C6B7A]">Estado</label>
          <select
            id="status"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            className="border border-[#E8E4DF] outline-none focus:ring-2 focus:ring-[#B8D4E8] focus:border-transparent text-[#5C6B7A] font-medium text-sm rounded-lg w-full p-2.5"
          >
            <option value="disponible">Disponible</option>
            <option value="vendido">Vendido</option>
          </select>
        </div>
        <div className="flex gap-3">
          <button type="submit" className="text-[#5C6B7A] bg-[#B8D4E8] hover:bg-[#C5E0B4] focus:ring-2 focus:ring-[#D4C4E8] font-medium rounded-lg text-sm px-5 py-2.5 transition">
            Guardar
          </button>
          <Link to="/inmuebles" className="text-[#5C6B7A] font-medium text-sm hover:text-[#7BA3C7] py-2.5 transition">
            Cancelar
          </Link>
        </div>
      </form>
    </FormCard>
  );
}
