import { Outlet, Link, useNavigate } from 'react-router-dom';
import { clearAuth, getUser } from '../utils/auth';

export default function Layout() {
  const navigate = useNavigate();
  const user = getUser();

  const handleLogout = () => {
    clearAuth();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <nav className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-[#E8E4DF]">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex gap-6">
            <Link to="/" className="text-[#5C6B7A] hover:text-[#7BA3C7] font-medium transition">
              Inicio
            </Link>
            <Link to="/users" className="text-[#5C6B7A] hover:text-[#7BA3C7] font-medium transition">
              Usuarios
            </Link>
            <Link to="/inmuebles" className="text-[#5C6B7A] hover:text-[#7BA3C7] font-medium transition">
              Inmuebles
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-[#5C6B7A]">{user?.name}</span>
            <button
              onClick={handleLogout}
              className="text-sm text-rose-400 hover:text-rose-500 font-medium transition"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </nav>
      <main className="max-w-6xl mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
