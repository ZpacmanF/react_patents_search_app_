import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/authStore';
import Layout from './components/Layout';
import Login from './pages/Login';
import Patents from './pages/Patents';
import PatentDetails from './pages/PatentDetails';
import NewPatent from './pages/NewPatent';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const token = useAuthStore((state) => state.token);
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route index element={<Patents />} />
          <Route path="patents/new" element={<NewPatent />} />
          <Route path="patents/:id" element={<PatentDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;