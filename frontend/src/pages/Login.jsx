import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { setAuth } from '../utils/auth';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await api.post('/auth/login', form);
      setAuth(data.token, data.user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2] py-8">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-8 bg-white/90 rounded-xl shadow-md border border-[#E8E4DF] w-80">
        <h1 className="text-xl font-semibold text-[#5C6B7A]">Iniciar sesión</h1>
        {error && <p className="text-rose-500 text-sm">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border border-[#E8E4DF] rounded-lg p-2.5 focus:ring-2 focus:ring-[#B8D4E8] focus:border-transparent outline-none text-[#5C6B7A]"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="border border-[#E8E4DF] rounded-lg p-2.5 focus:ring-2 focus:ring-[#B8D4E8] focus:border-transparent outline-none text-[#5C6B7A]"
          required
        />
        <button type="submit" className="bg-[#B8D4E8] hover:bg-[#9AC4DE] text-[#5C6B7A] font-medium py-2.5 rounded-lg transition">
          Entrar
        </button>
        <Link to="/register" className="text-sm text-[#7BA3C7] hover:underline text-center">
          ¿No tienes cuenta? Regístrate
        </Link>
      </form>
    </div>
  );
}
