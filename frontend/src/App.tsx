import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import Login from './pages/Login';
import Register from './pages/Register';
import CustomerDashboard from './pages/CustomerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ClaimDetail from './pages/ClaimDetail';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Landing from './pages/Landing';
import Coverage from './pages/Coverage';
import Claims from './pages/Claims';

function App() {
  const { token, user } = useSelector((state: RootState) => state.auth);

  return (
    <Router>
      <div className="min-h-[100dvh] bg-background text-on-surface overflow-x-hidden selection:bg-primary/30 selection:text-white">
        {token && <Navbar />}
        <main className={token ? "container mx-auto px-4 py-32" : ""}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/coverage" element={<Coverage />} />
            <Route path="/claims" element={<Claims />} />
            <Route path="/login" element={!token ? <Login /> : <Navigate to={user?.role === 'admin' ? '/admin/dashboard' : '/dashboard'} />} />
            <Route path="/register" element={!token ? <Register /> : <Navigate to="/dashboard" />} />
            
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<CustomerDashboard />} />
              <Route path="/claims/:id" element={<ClaimDetail />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Route>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
