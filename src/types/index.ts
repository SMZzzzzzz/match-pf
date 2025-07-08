// ユーザー型定義
export interface User {
  id: string;
  username: string;
  email: string;
  nickname: string;
  role: 'admin' | 'worker';
  createdAt: string;
  updatedAt: string;
}

// 案件型定義
export interface Job {
  id: string;
  title: string;
  period: string;
  location: string;
  hourlyWage: number;
  recruitNumber: number;
  description: string;
  isFavorite: boolean;
  status: string;
  createdAt: string;
}

// チャットルーム型定義
export interface ChatRoom {
  id: string;
  name: string | null;
  isGroup: boolean;
  participants: string[];
  createdAt: string;
  updatedAt: string;
}

// メッセージ型定義
export interface Message {
  id: string;
  chatRoomId: string;
  senderId: string;
  content: string;
  messageType: 'text';
  sentAt: string;
}

// 送信者情報付きメッセージ型定義
export interface MessageWithSender extends Message {
  sender: User;
}

// API レスポンス型定義
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// 認証状態型定義
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
} 