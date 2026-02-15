import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

export default function UserItem({ user, onDelete }) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`¿Eliminar al usuario ${user.name}?`)) return;
    setDeleting(true);
    try {
      await api.delete(`/users/${user.id}`);
      onDelete(user.id);
    } catch (err) {
      alert(err.response?.data?.error || 'Error al eliminar');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white/90 rounded-xl border border-[#E8E4DF] hover:border-[#B8D4E8] transition">
      <div>
        <p className="font-medium text-[#5C6B7A]">{user.name}</p>
        <p className="text-sm text-[#5C6B7A]/80">{user.email}</p>
        <span
          className={`inline-block mt-1 px-2 py-0.5 rounded-lg text-xs font-medium ${
            user.isActive ? 'bg-[#C5E0B4] text-[#4A7C59]' : 'bg-[#F5D0C5] text-[#B5655A]'
          }`}
        >
          {user.isActive ? 'Activo' : 'Inactivo'}
        </span>
      </div>
      <div className="flex gap-2">
        <Link
          to={`/users/${user.id}/edit`}
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
  );
}
