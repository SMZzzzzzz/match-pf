'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { User, AuthState } from '@/types';
import { authenticateUser, getUserById, STORAGE_KEYS } from '@/lib/data';

// 認証アクション型定義
type AuthAction = 
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'RESTORE_SESSION'; payload: User };

// 認証コンテキスト型定義
interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

// 初期状態
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true
};

// 認証リデューサー
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, isLoading: true };
    case 'LOGIN_SUCCESS':
      return {
        user: action.payload,
        isAuthenticated: true,
        isLoading: false
      };
    case 'LOGIN_FAILURE':
      return {
        user: null,
        isAuthenticated: false,
        isLoading: false
      };
    case 'LOGOUT':
      return {
        user: null,
        isAuthenticated: false,
        isLoading: false
      };
    case 'RESTORE_SESSION':
      return {
        user: action.payload,
        isAuthenticated: true,
        isLoading: false
      };
    default:
      return state;
  }
};

// 認証コンテキスト作成
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProviderコンポーネント
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // セッション復元
  useEffect(() => {
    const restoreSession = () => {
      try {
        const savedUserId = localStorage.getItem(STORAGE_KEYS.AUTH_USER);
        if (savedUserId) {
          const user = getUserById(savedUserId);
          if (user) {
            dispatch({ type: 'RESTORE_SESSION', payload: user });
            return;
          }
        }
      } catch (error) {
        console.error('セッション復元エラー:', error);
      }
      
      // セッション復元失敗時
      dispatch({ type: 'LOGIN_FAILURE', payload: 'セッションが見つかりません' });
    };

    restoreSession();
  }, []);

  // ログイン関数
  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
      // デモ用認証（実際のアプリではAPIコールが必要）
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const user = authenticateUser(email, password);
      
      if (user) {
        localStorage.setItem(STORAGE_KEYS.AUTH_USER, user.id);
        dispatch({ type: 'LOGIN_SUCCESS', payload: user });
        return { success: true };
      } else {
        dispatch({ type: 'LOGIN_FAILURE', payload: 'メールアドレスまたはパスワードが正しくありません' });
        return { success: false, error: 'メールアドレスまたはパスワードが正しくありません' };
      }
    } catch {
      const errorMessage = 'ログインに失敗しました';
      dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  // ログアウト関数
  const logout = () => {
    localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
    dispatch({ type: 'LOGOUT' });
  };

  const value: AuthContextType = {
    ...state,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// カスタムフック
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 