import { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { RiMailLine, RiUserLine } from 'react-icons/ri';
import api from '../services/api';
import FormCard from '../components/FormCard';
import InputPassword from '../components/InputPassword';

const inputClass = 'border border-[#E8E4DF] outline-none focus:ring-2 focus:ring-[#B8D4E8] focus:border-transparent text-[#5C6B7A] font-medium text-sm rounded-lg w-full p-2.5 px-8';

export default function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', isActive: true });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/users')
      .then(({ data }) => {
        const user = data.find((u) => u.id === Number(id));
        if (user) setForm({ name: user.name, email: user.email, password: '', isActive: user.isActive });
      })
      .catch(() => setError('Usuario no encontrado'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const payload = { name: form.name, email: form.email, isActive: form.isActive };
      if (form.password) payload.password = form.password;
      await api.put(`/users/${id}`, payload);
      navigate('/users');
    } catch (err) {
      setError(err.response?.data?.error || 'Error al actualizar usuario');
    }
  };

  if (loading) return <p className="text-[#5C6B7A]">Cargando...</p>;

  return (
    <FormCard title="EDITAR USUARIO">
      <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
        {error && <p className="text-rose-500 text-sm mb-4">{error}</p>}
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2 text-sm font-semibold text-[#5C6B7A]">Nombre</label>
          <div className="relative">
            <RiUserLine className="absolute left-2 top-1/2 -translate-y-1/2 text-[#9BA8B5] text-lg" />
            <input
              type="text"
              id="name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={inputClass}
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 text-sm font-semibold text-[#5C6B7A]">Email</label>
          <div className="relative">
            <RiMailLine className="absolute left-2 top-1/2 -translate-y-1/2 text-[#9BA8B5] text-lg" />
            <input
              type="email"
              id="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={inputClass}
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2 text-sm font-semibold text-[#5C6B7A]">Nueva contraseña (opcional)</label>
          <InputPassword
            id="password"
            placeholder="Dejar vacío para no cambiar"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>
        <div className="flex items-center gap-2 mb-4">
          <input
            type="checkbox"
            id="isActive"
            checked={form.isActive}
            onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
            className="rounded border-[#E8E4DF]"
          />
          <label htmlFor="isActive" className="text-sm font-semibold text-[#5C6B7A]">Usuario activo</label>
        </div>
        <div className="flex gap-3">
          <button type="submit" className="text-[#5C6B7A] bg-[#B8D4E8] hover:bg-[#C5E0B4] focus:ring-2 focus:ring-[#D4C4E8] font-medium rounded-lg text-sm px-5 py-2.5 transition">
            Guardar
          </button>
          <Link to="/users" className="text-[#5C6B7A] font-medium text-sm hover:text-[#7BA3C7] py-2.5 transition">
            Cancelar
          </Link>
        </div>
      </form>
    </FormCard>
  );
}
