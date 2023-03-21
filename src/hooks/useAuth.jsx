import axios from 'axios';
import { createContext, useContext } from 'react';
import { clearToken } from '../utils/tokenHandler';
import { useNavigate } from 'react-router-dom';

axios.defaults.withCredentials = true;

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const login = async (username, password) => {
    const response = await axios
      .post('http://localhost:5050/api/login/admin', {
        email: username,
        password: password,
      })
      .then((response) => {
        const res = response.data;
        return res;
      })
      .catch((error) => {});

    return await response;
  };

  const logout = () => {
    clearToken();
    navigate('/admin/login');
  };

  return (
    <AuthContext.Provider value={{ login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
