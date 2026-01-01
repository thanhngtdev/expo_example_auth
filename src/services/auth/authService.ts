import ZustandSession from '../zustand/session';

export interface User {
  id: string;
  username: string;
  email?: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

class AuthService {
  /**
   * Simulate login API call - accepts any username/password
   */
  async login(credentials: LoginCredentials): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, accept any non-empty username/password
      if (!credentials.username.trim() || !credentials.password.trim()) {
        return {
          success: false,
          error: 'Username and password are required'
        };
      }

      const user: User = {
        id: `user_${Date.now()}`,
        username: credentials.username,
        email: `${credentials.username}@example.com`
      };

      // Save user to session store
      ZustandSession.getState().save('user', user);
      ZustandSession.getState().save('isAuthenticated', true);

      return {
        success: true,
        user
      };
    } catch (error) {
      return {
        success: false,
        error: 'Login failed. Please try again.'
      };
    }
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    // Clear user session
    ZustandSession.getState().save('user', undefined);
    ZustandSession.getState().save('isAuthenticated', false);
  }

  /**
   * Check if user is currently authenticated
   */
  isAuthenticated(): boolean {
    return ZustandSession.getState().isAuthenticated ?? false;
  }

  /**
   * Get current user
   */
  getCurrentUser(): User | undefined {
    return ZustandSession.getState().user;
  }
}

export const authService = new AuthService();