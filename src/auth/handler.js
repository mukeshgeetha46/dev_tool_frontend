import { useDispatch } from 'react-redux';
import { login, logout } from './actions';
import { useNavigate } from 'react-router-dom';

// Custom hook for handling login/logout
export const useAuthActions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (data) => {
    dispatch(login(data.user));
    localStorage.setItem('serviceToken', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    localStorage.removeItem('serviceToken');
    localStorage.removeItem('user');
  };

  return { handleLogin, handleLogout };
};
