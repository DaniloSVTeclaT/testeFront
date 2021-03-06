import React, { createContext, useCallback, useContext, useState } from 'react';

import api from '../services/api';


interface User {
  id: string;
  name: string;
  avatar_url: string;
}
interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
   user: User;
   signIn(credentials: SignInCredentials): Promise<void>;
   signOut(): void;
}
let gotoken = ''

const AuthContext = createContext<AuthContextData>({} as AuthContextData);
const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@GoBarber:token');
    const user = localStorage.getItem('@GoBarber:user');
    
    if (token && user) {
      return { token, user: JSON.parse(user) };
    }
    gotoken = String(localStorage.getItem('@GoBarber:token'))

  
    
    return {} as AuthState;
  });
  
  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    const { token, user } = response.data;
    console.log(response.data)
    localStorage.setItem('@GoBarber:token', token);
    localStorage.setItem('@GoBarber:user', JSON.stringify(user));
    
    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@GoBarber:token');
    localStorage.removeItem('@GoBarber:user');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}


export { AuthProvider, useAuth,gotoken};