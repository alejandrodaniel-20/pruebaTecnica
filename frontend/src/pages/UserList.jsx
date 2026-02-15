import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import UserItem from '../components/UserItem';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    try {
      const { data } = await api.get('/users');
      setUsers(data);
    } catch (err) {
      setError(err.response?.data?.error || 'Error al cargar usuarios');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  if (loading) return <p className="text-[#5C6B7A]">Cargando usuarios...</p>;
  if (error) return <p className="text-rose-500">{error}</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#5C6B7A]">Usuarios</h1>
        <Link
          to="/users/add"
          className="px-4 py-2 bg-[#B8D4E8] hover:bg-[#9AC4DE] text-[#5C6B7A] font-medium rounded-lg transition"
        >
          Agregar usuario
        </Link>
      </div>
      <div className="space-y-3">
        {users.length === 0 ? (
          <p className="text-[#5C6B7A]/80 py-8 text-center">No hay usuarios registrados.</p>
        ) : (
          users.map((user) => (
            <UserItem key={user.id} user={user} onDelete={handleDelete} />
          ))
        )}
      </div>
    </div>
  );
}
