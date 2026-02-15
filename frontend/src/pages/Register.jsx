import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RiMailLine, RiUserLine } from 'react-icons/ri';
import api from '../services/api';
import FormCard from '../components/FormCard';
import InputPassword from '../components/InputPassword';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/auth/register', form);
      navigate('/login', { state: { message: 'Usuario creado. Ahora inicia sesión.' } });
    } catch (err) {
      setError(err.response?.data?.error || 'Error en el registro');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2] py-8">
      <FormCard title="REGISTRO">
        <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
          {error && <p className="text-rose-500 text-sm mb-4">{error}</p>}
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2 text-sm font-semibold text-[#5C6B7A]">Nombre</label>
            <div className="relative">
              <RiUserLine className="absolute left-2 top-1/2 -translate-y-1/2 text-[#9BA8B5] text-lg" />
              <input
                type="text"
                id="name"
                placeholder="Nombre completo"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="border border-[#E8E4DF] outline-none focus:ring-2 focus:ring-[#B8D4E8] focus:border-transparent text-[#5C6B7A] font-medium text-sm rounded-lg w-full p-2.5 px-8"
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
                placeholder="Correo electrónico"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="border border-[#E8E4DF] outline-none focus:ring-2 focus:ring-[#B8D4E8] focus:border-transparent text-[#5C6B7A] font-medium text-sm rounded-lg w-full p-2.5 px-8"
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 text-sm font-semibold text-[#5C6B7A]">Contraseña</label>
            <InputPassword
              id="password"
              placeholder="Contraseña"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <button type="submit" className="text-[#5C6B7A] bg-[#B8D4E8] hover:bg-[#C5E0B4] focus:ring-2 focus:ring-[#D4C4E8] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center transition">
              Registrarse
            </button>
          </div>
          <Link to="/login" className="text-[#5C6B7A] font-medium text-sm hover:text-[#7BA3C7] transition">
            ¿Ya tienes cuenta? Inicia sesión
          </Link>
        </form>
      </FormCard>
    </div>
  );
}
