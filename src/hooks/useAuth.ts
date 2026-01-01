import { authService } from '@/src/services/auth/authService';
import ZustandSession from '@/src/services/zustand/session';
import { useEffect, useState } from 'react';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated());
  const [user, setUser] = useState(authService.getCurrentUser());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Subscribe to authentication state changes
    const unsubscribe = ZustandSession.subscribe(
      (state) => ({ isAuthenticated: state.isAuthenticated, user: state.user }),
      (newState) => {
        setIsAuthenticated(newState.isAuthenticated ?? false);
        setUser(newState.user);
        setIsLoading(false);
      }
    );

    // Initialize state
    setIsAuthenticated(authService.isAuthenticated());
    setUser(authService.getCurrentUser());
    setIsLoading(false);

    return unsubscribe;
  }, []);

  const login = async (username: string, password: string) => {
    const result = await authService.login({ username, password });
    return result;
  };

  const logout = async () => {
    await authService.logout();
  };

  return {
    isAuthenticated,
    user,
    isLoading,
    login,
    logout,
  };
};