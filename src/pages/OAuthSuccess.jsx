import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuth } from '../Redux/slices/authSlice'; 

const OAuthSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    console.log('Token from URL:', token);

    if (token) {
      localStorage.setItem('token', token);

      dispatch(setAuth({ isAuthenticated: true, token }));

      navigate('/user-dashboard', { replace: true });
    } else {
      navigate('/auth', { replace: true });
    }
  }, [navigate, dispatch]);

  return <div>Logging you in...</div>;
};

export default OAuthSuccess;
