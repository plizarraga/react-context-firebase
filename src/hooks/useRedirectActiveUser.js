import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useRedirectActiveUser = (user, redirectTo = '/dashboard') => {
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(redirectTo);
    }
  }, [user]);
};
