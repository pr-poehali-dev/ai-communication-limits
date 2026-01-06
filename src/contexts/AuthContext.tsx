import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: number;
  email: string;
  messages_today: number;
  messages_limit: number;
  subscription_type?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (sessionToken: string, userData: User) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async (token: string) => {
    try {
      const response = await fetch('https://functions.poehali.dev/f04de2ce-16df-44d2-97bd-081adc42db25', {
        method: 'GET',
        headers: {
          'X-Session-Token': token,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        localStorage.removeItem('session_token');
        localStorage.removeItem('user');
        setUser(null);
      }
    } catch (error) {
      console.error('Failed to fetch user:', error);
      setUser(null);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('session_token');
    if (token) {
      fetchUser(token);
    }
    setIsLoading(false);
  }, []);

  const login = (sessionToken: string, userData: User) => {
    localStorage.setItem('session_token', sessionToken);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = async () => {
    const token = localStorage.getItem('session_token');
    if (token) {
      try {
        await fetch('https://functions.poehali.dev/f04de2ce-16df-44d2-97bd-081adc42db25', {
          method: 'POST',
          headers: {
            'X-Session-Token': token,
          },
        });
      } catch (error) {
        console.error('Logout error:', error);
      }
    }

    localStorage.removeItem('session_token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const refreshUser = async () => {
    const token = localStorage.getItem('session_token');
    if (token) {
      await fetchUser(token);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
