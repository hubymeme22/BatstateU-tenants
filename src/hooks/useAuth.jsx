import { createContext, useContext } from 'react';
import { clearToken } from '../utils/tokenHandler';
import { useNavigate } from 'react-router-dom';

import { loginAdmin, loginStudent } from '../services/request';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const login = async (username, password, type = '') => {
    let response = null;
    let userData = {
      username,
      password,
    };
    // Do login post request based on type
    if (type == 'admin') {
      userData = {
        email: username,
        password,
      };
      //AFTER VALIDATING, POST REQUEST ON USER/ADMIN
      response = await loginAdmin(userData);
    } else {
      response = await loginStudent(userData);
    }

    return await response;
  };

  const logout = (path) => {
    clearToken();
    navigate(path);
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
