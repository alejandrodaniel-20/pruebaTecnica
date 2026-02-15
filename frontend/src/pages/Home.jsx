import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-[#5C6B7A] mb-6">Gestión de Inmuebles</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <Link
          to="/users"
          className="block p-6 bg-white/90 rounded-xl shadow-sm border border-[#E8E4DF] hover:border-[#B8D4E8] hover:shadow-md transition"
        >
          <h2 className="text-lg font-semibold text-[#5C6B7A]">Usuarios</h2>
          <p className="text-[#5C6B7A]/80 text-sm mt-2">Gestionar usuarios registrados</p>
        </Link>
        <Link
          to="/inmuebles"
          className="block p-6 bg-white/90 rounded-xl shadow-sm border border-[#E8E4DF] hover:border-[#B8D4E8] hover:shadow-md transition"
        >
          <h2 className="text-lg font-semibold text-[#5C6B7A]">Inmuebles</h2>
          <p className="text-[#5C6B7A]/80 text-sm mt-2">Ver y gestionar ventas de inmuebles</p>
        </Link>
      </div>
    </div>
  );
}
