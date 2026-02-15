import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import InmuebleItem from '../components/InmuebleItem';

export default function InmuebleList() {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState(''); // '', 'disponible', 'vendido'
  const [searchAddress, setSearchAddress] = useState('');
  const [searchMinPrice, setSearchMinPrice] = useState('');
  const [searchMaxPrice, setSearchMaxPrice] = useState('');

  const fetchHouses = async () => {
    try {
      const params = statusFilter ? { status: statusFilter } : {};
      const { data } = await api.get('/houses', { params });
      setHouses(data);
    } catch (err) {
      setError(err.response?.data?.error || 'Error al cargar inmuebles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHouses();
  }, [statusFilter]);

  const filteredHouses = useMemo(() => {
    return houses.filter((h) => {
      const matchAddress =
        !searchAddress ||
        h.address?.toLowerCase().includes(searchAddress.toLowerCase());
      const price = Number(h.price);
      const min = searchMinPrice ? Number(searchMinPrice) : 0;
      const max = searchMaxPrice ? Number(searchMaxPrice) : Infinity;
      const matchPrice = price >= min && price <= max;
      return matchAddress && matchPrice;
    });
  }, [houses, searchAddress, searchMinPrice, searchMaxPrice]);

  const handleDelete = (id) => {
    setHouses(houses.filter((h) => h.id !== id));
  };

  if (loading) return <p className="text-[#5C6B7A]">Cargando inmuebles...</p>;
  if (error) return <p className="text-rose-500">{error}</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#5C6B7A]">Inmuebles</h1>
        <Link
          to="/inmuebles/add"
          className="px-4 py-2 bg-[#B8D4E8] hover:bg-[#9AC4DE] text-[#5C6B7A] font-medium rounded-lg transition"
        >
          Agregar inmueble
        </Link>
      </div>

      {/* Filtros */}
      <div className="mb-6 p-4 bg-white/90 rounded-xl border border-[#E8E4DF] space-y-4">
        <h2 className="font-medium text-[#5C6B7A]">Filtros</h2>
        <div className="flex flex-wrap gap-4 items-end">
          <div>
            <label className="block text-xs text-[#5C6B7A]/80 mb-1">Estado</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-[#E8E4DF] rounded-lg p-2 text-sm text-[#5C6B7A] focus:ring-2 focus:ring-[#B8D4E8] outline-none"
            >
              <option value="">Todos</option>
              <option value="disponible">Disponible</option>
              <option value="vendido">Vendido</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-[#5C6B7A]/80 mb-1">Dirección</label>
            <input
              type="text"
              placeholder="Buscar por dirección..."
              value={searchAddress}
              onChange={(e) => setSearchAddress(e.target.value)}
              className="border border-[#E8E4DF] rounded-lg p-2 text-sm w-48 text-[#5C6B7A] focus:ring-2 focus:ring-[#B8D4E8] outline-none"
            />
          </div>
          <div>
            <label className="block text-xs text-[#5C6B7A]/80 mb-1">Precio mín.</label>
            <input
              type="number"
              placeholder="0"
              value={searchMinPrice}
              onChange={(e) => setSearchMinPrice(e.target.value)}
              min="0"
              className="border border-[#E8E4DF] rounded-lg p-2 text-sm w-28 text-[#5C6B7A] focus:ring-2 focus:ring-[#B8D4E8] outline-none"
            />
          </div>
          <div>
            <label className="block text-xs text-[#5C6B7A]/80 mb-1">Precio máx.</label>
            <input
              type="number"
              placeholder="Sin límite"
              value={searchMaxPrice}
              onChange={(e) => setSearchMaxPrice(e.target.value)}
              min="0"
              className="border border-[#E8E4DF] rounded-lg p-2 text-sm w-28 text-[#5C6B7A] focus:ring-2 focus:ring-[#B8D4E8] outline-none"
            />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {filteredHouses.length === 0 ? (
          <p className="text-[#5C6B7A]/80 py-8 text-center">No hay inmuebles que coincidan.</p>
        ) : (
          filteredHouses.map((house) => (
            <InmuebleItem key={house.id} house={house} onDelete={handleDelete} />
          ))
        )}
      </div>
    </div>
  );
}