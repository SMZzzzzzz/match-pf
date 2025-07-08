'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import AuthGuard from '@/components/AuthGuard';
import BottomNavigation from '@/components/BottomNavigation';
import { getUsers } from '@/lib/data';
import { User } from '@/types';
import { Users, MessageCircle } from 'lucide-react';

type TabType = 'users' | 'groups';

const tabs: { id: TabType; label: string }[] = [
  { id: 'users', label: 'ユーザー' },
  { id: 'groups', label: 'グループ' }
];

const UserCard: React.FC<{ user: User; onClick: () => void }> = ({ user, onClick }) => {
  // ユーザーアイコン（頭文字）
  const getInitial = (nickname: string): string => {
    return nickname.charAt(0).toUpperCase();
  };

  return (
    <div
      onClick={onClick}
      className="flex items-center p-4 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 cursor-pointer"
    >
      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-lg mr-4">
        {getInitial(user.nickname)}
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-gray-900 truncate">
          {user.nickname}
        </h3>
        <p className="text-sm text-gray-500 truncate">
          {user.role === 'admin' ? '管理者' : 'アルバイト'} • {user.email}
        </p>
      </div>
      
      <MessageCircle className="w-5 h-5 text-gray-400 ml-2" />
    </div>
  );
};

const UserListPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('users');
  const { user: currentUser } = useAuth();
  const router = useRouter();

  // 全ユーザーを取得（自分以外）
  const allUsers = getUsers().filter(user => user.id !== currentUser?.id);

  const handleUserClick = (user: User) => {
    // 1対1チャット画面への遷移
    router.push(`/chat/${user.id}`);
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50 pb-20">
        {/* ヘッダー */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-md mx-auto px-4 py-4">
            <div className="flex items-center">
              <Users className="w-6 h-6 text-blue-600 mr-2" />
              <h1 className="text-lg font-semibold text-gray-900">
                メンバー
              </h1>
            </div>
            
            {/* タブ切り替え */}
            <div className="flex mt-4 bg-gray-100 rounded-lg p-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* コンテンツエリア */}
        <div className="max-w-md mx-auto px-4 py-6">
          {activeTab === 'users' && (
            <div className="space-y-3">
              {allUsers.length > 0 ? (
                allUsers.map((user) => (
                  <UserCard
                    key={user.id}
                    user={user}
                    onClick={() => handleUserClick(user)}
                  />
                ))
              ) : (
                <div className="text-center py-12">
                  <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">他のユーザーが見つかりません</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'groups' && (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-2">グループ機能</p>
              <p className="text-sm text-gray-400">近日公開予定</p>
            </div>
          )}
        </div>

        {/* 現在のユーザー情報（デバッグ用） */}
        {currentUser && (
          <div className="max-w-md mx-auto px-4 py-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-blue-700">
                <span className="font-medium">ログイン中:</span> {currentUser.nickname} ({currentUser.role === 'admin' ? '管理者' : 'アルバイト'})
              </p>
            </div>
          </div>
        )}

        <BottomNavigation />
      </div>
    </AuthGuard>
  );
};

export default UserListPage; 