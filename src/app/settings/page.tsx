'use client';

import React from 'react';
import { useAuth } from '@/components/AuthProvider';
import AuthGuard from '@/components/AuthGuard';
import BottomNavigation from '@/components/BottomNavigation';
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  HelpCircle, 
  LogOut,
  ChevronRight
} from 'lucide-react';

const SettingsPage: React.FC = () => {
  const { user, logout } = useAuth();

  const settingsItems = [
    {
      id: 'profile',
      title: 'プロフィール設定',
      subtitle: 'ニックネーム、プロフィール画像等',
      icon: User,
      action: () => alert('プロフィール設定機能は近日実装予定です')
    },
    {
      id: 'notifications',
      title: '通知設定',
      subtitle: 'プッシュ通知、メール通知等',
      icon: Bell,
      action: () => alert('通知設定機能は近日実装予定です')
    },
    {
      id: 'privacy',
      title: 'プライバシー設定',
      subtitle: 'データの取り扱い、表示設定等',
      icon: Shield,
      action: () => alert('プライバシー設定機能は近日実装予定です')
    },
    {
      id: 'help',
      title: 'ヘルプ・サポート',
      subtitle: 'よくある質問、お問い合わせ',
      icon: HelpCircle,
      action: () => alert('ヘルプ機能は近日実装予定です')
    }
  ];

  const handleLogout = () => {
    if (confirm('ログアウトしてもよろしいですか？')) {
      logout();
    }
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50 pb-20">
        {/* ヘッダー */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-md mx-auto px-4 py-4">
            <div className="flex items-center">
              <Settings className="w-6 h-6 text-blue-600 mr-2" />
              <h1 className="text-lg font-semibold text-gray-900">
                設定
              </h1>
            </div>
          </div>
        </div>

        {/* ユーザー情報 */}
        {user && (
          <div className="max-w-md mx-auto px-4 py-6">
            <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-xl mr-4">
                  {user.nickname.charAt(0).toUpperCase()}
                </div>
                
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {user.nickname}
                  </h2>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  <span className={`inline-block mt-1 px-2 py-1 rounded-full text-xs ${
                    user.role === 'admin' 
                      ? 'bg-purple-100 text-purple-600' 
                      : 'bg-green-100 text-green-600'
                  }`}>
                    {user.role === 'admin' ? '管理者' : 'アルバイト'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 設定項目 */}
        <div className="max-w-md mx-auto px-4">
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            {settingsItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={item.action}
                  className={`w-full flex items-center p-4 hover:bg-gray-50 transition-colors ${
                    index !== settingsItems.length - 1 ? 'border-b border-gray-100' : ''
                  }`}
                >
                  <Icon className="w-5 h-5 text-gray-500 mr-3" />
                  
                  <div className="flex-1 text-left">
                    <h3 className="font-medium text-gray-900">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {item.subtitle}
                    </p>
                  </div>
                  
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              );
            })}
          </div>

          {/* ログアウトボタン */}
          <div className="mt-6">
            <button
              onClick={handleLogout}
              className="w-full bg-white border border-red-200 text-red-600 py-3 px-4 rounded-lg font-medium hover:bg-red-50 transition-colors flex items-center justify-center"
            >
              <LogOut className="w-5 h-5 mr-2" />
              ログアウト
            </button>
          </div>

          {/* アプリ情報 */}
          <div className="mt-6 text-center py-4">
            <p className="text-sm text-gray-500 mb-1">マッチングプラットフォーム</p>
            <p className="text-xs text-gray-400">Version 1.0.0</p>
          </div>
        </div>

        <BottomNavigation />
      </div>
    </AuthGuard>
  );
};

export default SettingsPage; 