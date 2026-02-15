import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import UserList from './pages/UserList';
import AddUser from './pages/AddUser';
import EditUser from './pages/EditUser';
import InmuebleList from './pages/InmuebleList';
import AddInmueble from './pages/AddInmueble';
import EditInmueble from './pages/EditInmueble';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="users" element={<UserList />} />
          <Route path="users/add" element={<AddUser />} />
          <Route path="users/:id/edit" element={<EditUser />} />
          <Route path="inmuebles" element={<InmuebleList />} />
          <Route path="inmuebles/add" element={<AddInmueble />} />
          <Route path="inmuebles/:id/edit" element={<EditInmueble />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
