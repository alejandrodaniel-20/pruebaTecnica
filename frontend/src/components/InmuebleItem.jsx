import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

export default function InmuebleItem({ house, onDelete }) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm('¿Eliminar este inmueble?')) return;
    setDeleting(true);
    try {
      await api.delete(`/houses/${house.id}`);
      onDelete?.(house.id);
    } catch (err) {
      alert(err.response?.data?.error || 'Error al eliminar');
    } finally {
      setDeleting(false);
    }
  };
  const isVendido = house.status === 'vendido';

  return (
    <div
      className={`p-4 rounded-xl border transition ${
        isVendido
          ? 'bg-[#F5F3EF] border-[#E8E4DF] opacity-90'
          : 'bg-white/90 border-[#E8E4DF] hover:border-[#B8D4E8]'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-medium text-[#5C6B7A]">{house.address}</p>
          <p className="text-lg font-semibold text-[#7BA3C7] mt-1">
            ${Number(house.price).toLocaleString()}
          </p>
          <p className="text-sm text-[#5C6B7A]/80 mt-1">
            Vendedor: {house.User?.name || 'N/A'}
          </p>
          <span
            className={`inline-block mt-2 px-2 py-1 rounded-lg text-xs font-medium ${
              isVendido ? 'bg-[#F5D0C5] text-[#B5655A]' : 'bg-[#C5E0B4] text-[#4A7C59]'
            }`}
          >
            {isVendido ? 'Vendido' : 'Disponible'}
          </span>
        </div>
        <div className="flex gap-2 shrink-0">
          <Link
            to={`/inmuebles/${house.id}/edit`}
            className="px-3 py-1.5 text-sm bg-[#B8D4E8]/50 text-[#5C6B7A] rounded-lg hover:bg-[#B8D4E8] transition"
          >
            Editar
          </Link>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="px-3 py-1.5 text-sm bg-[#F5D0C5] text-[#B5655A] rounded-lg hover:bg-[#F0C4B8] disabled:opacity-50 transition"
          >
            {deleting ? '...' : 'Eliminar'}
          </button>
        </div>
      </div>
    </div>
  );
}
