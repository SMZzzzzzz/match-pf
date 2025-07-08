'use client';

import React from 'react';
import { useAuth } from '@/components/AuthProvider';
import AuthGuard from '@/components/AuthGuard';
import BottomNavigation from '@/components/BottomNavigation';
import { Bell, Info, Calendar, MessageCircle, Briefcase } from 'lucide-react';

const NotificationsPage: React.FC = () => {
  const { user } = useAuth();

  const notifications = [
    {
      id: 1,
      type: 'system',
      title: '新機能のお知らせ',
      message: 'タイムライン機能が追加されました。ぜひご活用ください。',
      time: '1時間前',
      isRead: false
    },
    {
      id: 2,
      type: 'job',
      title: '新しい案件が追加されました',
      message: 'EC物流センター出荷作業の募集が開始されました。',
      time: '3時間前',
      isRead: false
    },
    {
      id: 3,
      type: 'chat',
      title: '新しいメッセージ',
      message: '管理者からメッセージが届いています。',
      time: '5時間前',
      isRead: true
    },
    {
      id: 4,
      type: 'system',
      title: 'メンテナンスのお知らせ',
      message: '2024/07/10 深夜にシステムメンテナンスを行います。',
      time: '1日前',
      isRead: true
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'system':
        return <Info className="w-5 h-5 text-blue-500" />;
      case 'job':
        return <Briefcase className="w-5 h-5 text-green-500" />;
      case 'chat':
        return <MessageCircle className="w-5 h-5 text-purple-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'system':
        return 'システム';
      case 'job':
        return '案件';
      case 'chat':
        return 'メッセージ';
      default:
        return 'その他';
    }
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50 pb-20">
        {/* ヘッダー */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-md mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Bell className="w-6 h-6 text-blue-600 mr-2" />
                <h1 className="text-lg font-semibold text-gray-900">
                  お知らせ
                </h1>
              </div>
              
              <div className="flex items-center">
                <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
                  {notifications.filter(n => !n.isRead).length} 未読
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 通知リスト */}
        <div className="max-w-md mx-auto px-4 py-6">
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-white rounded-lg border p-4 transition-all hover:shadow-md ${
                  !notification.isRead 
                    ? 'border-blue-200 bg-blue-50' 
                    : 'border-gray-200'
                }`}
              >
                <div className="flex items-start">
                  <div className="mr-3 mt-1">
                    {getIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        notification.type === 'system' ? 'bg-blue-100 text-blue-600' :
                        notification.type === 'job' ? 'bg-green-100 text-green-600' :
                        notification.type === 'chat' ? 'bg-purple-100 text-purple-600' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {getTypeLabel(notification.type)}
                      </span>
                      
                      <span className="text-xs text-gray-500">
                        {notification.time}
                      </span>
                    </div>
                    
                    <h3 className={`font-medium mb-1 ${
                      !notification.isRead ? 'text-gray-900' : 'text-gray-700'
                    }`}>
                      {notification.title}
                    </h3>
                    
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {notification.message}
                    </p>
                    
                    {!notification.isRead && (
                      <div className="mt-2">
                        <span className="inline-block w-2 h-2 bg-blue-500 rounded-full"></span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 機能説明 */}
          <div className="text-center py-8 mt-6 border-t border-gray-200">
            <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-2">お知らせ機能</p>
            <p className="text-sm text-gray-400">システムからの重要な通知や</p>
            <p className="text-sm text-gray-400">新着メッセージの通知を表示します</p>
          </div>
        </div>

        {/* ユーザー情報 */}
        {user && (
          <div className="max-w-md mx-auto px-4 py-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-blue-700">
                <span className="font-medium">ログイン中:</span> {user.nickname}
              </p>
            </div>
          </div>
        )}

        <BottomNavigation />
      </div>
    </AuthGuard>
  );
};

export default NotificationsPage; 