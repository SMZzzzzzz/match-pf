import { User, Job, ChatRoom, Message } from '@/types';

// JSONデータのインポート
import usersData from '@/data/users.json';
import jobsData from '@/data/jobs.json';
import chatRoomsData from '@/data/chatRooms.json';
import messagesData from '@/data/messages.json';

// 型アサーション
const users = usersData as User[];
const jobs = jobsData as Job[];
const chatRooms = chatRoomsData as ChatRoom[];
const messages = messagesData as Message[];

// ユーザー関連の関数
export const getUsers = (): User[] => users;

export const getUserById = (id: string): User | undefined => 
  users.find(user => user.id === id);

export const getUserByEmail = (email: string): User | undefined =>
  users.find(user => user.email === email);

export const authenticateUser = (email: string, password: string): User | null => {
  // デモ用：パスワードは "password" で固定
  if (password !== 'password') return null;
  return getUserByEmail(email) || null;
};

// 案件関連の関数
export const getJobs = (): Job[] => jobs;

export const getJobById = (id: string): Job | undefined =>
  jobs.find(job => job.id === id);

// チャットルーム関連の関数
export const getChatRooms = (): ChatRoom[] => chatRooms;

export const getChatRoomById = (id: string): ChatRoom | undefined =>
  chatRooms.find(room => room.id === id);

export const findOrCreateDirectChatRoom = (userId1: string, userId2: string): ChatRoom | null => {
  // 既存のチャットルームを検索
  const existingRoom = chatRooms.find(room => 
    !room.isGroup && 
    room.participants.includes(userId1) && 
    room.participants.includes(userId2)
  );
  
  if (existingRoom) return existingRoom;
  
  // 新しいチャットルームを作成（実際のアプリでは永続化が必要）
  const newRoom: ChatRoom = {
    id: `room_${Date.now()}`,
    name: null,
    isGroup: false,
    participants: [userId1, userId2],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  chatRooms.push(newRoom);
  return newRoom;
};

// メッセージ関連の関数
export const getMessages = (): Message[] => messages;

export const getMessagesByRoomId = (roomId: string): Message[] =>
  messages.filter(message => message.chatRoomId === roomId);

export const addMessage = (message: Omit<Message, 'id' | 'sentAt'>): Message => {
  const newMessage: Message = {
    ...message,
    id: `msg_${Date.now()}`,
    sentAt: new Date().toISOString()
  };
  
  messages.push(newMessage);
  return newMessage;
};

// ローカルストレージキー
export const STORAGE_KEYS = {
  AUTH_USER: 'auth_user',
  CHAT_MESSAGES: 'chat_messages',
  FAVORITE_JOBS: 'favorite_jobs'
} as const; 