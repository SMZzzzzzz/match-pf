'use client';

import React from 'react';
import { useAuth } from '@/components/AuthProvider';
import AuthGuard from '@/components/AuthGuard';
import BottomNavigation from '@/components/BottomNavigation';
import { Clock, MessageSquare, Heart, Calendar } from 'lucide-react';

const TimelinePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50 pb-20">
        {/* ヘッダー */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-md mx-auto px-4 py-4">
            <div className="flex items-center">
              <Clock className="w-6 h-6 text-blue-600 mr-2" />
              <h1 className="text-lg font-semibold text-gray-900">
                タイムライン
              </h1>
            </div>
          </div>
        </div>

        {/* コンテンツエリア */}
        <div className="max-w-md mx-auto px-4 py-6">
          {/* デモ投稿 */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
            <div className="flex items-start mb-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold mr-3">
                管
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">管理者</h3>
                <p className="text-xs text-gray-500">2時間前</p>
              </div>
            </div>
            
            <p className="text-gray-700 mb-3">
              新しい倉庫案件が追加されました！夏の繁忙期に向けて、多くの方のご応募をお待ちしています。未経験の方も大歓迎です。
            </p>
            
            <div className="flex items-center space-x-4 text-gray-500">
              <button className="flex items-center space-x-1 hover:text-blue-600">
                <Heart className="w-4 h-4" />
                <span className="text-sm">5</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-blue-600">
                <MessageSquare className="w-4 h-4" />
                <span className="text-sm">2</span>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
            <div className="flex items-start mb-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-semibold mr-3">
                田
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">田中太郎</h3>
                <p className="text-xs text-gray-500">1日前</p>
              </div>
            </div>
            
            <p className="text-gray-700 mb-3">
              今日も1日お疲れさまでした！新しい現場に慣れるのに時間がかかりましたが、先輩方に丁寧に教えていただいて助かりました。
            </p>
            
            <div className="flex items-center space-x-4 text-gray-500">
              <button className="flex items-center space-x-1 hover:text-blue-600">
                <Heart className="w-4 h-4" />
                <span className="text-sm">8</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-blue-600">
                <MessageSquare className="w-4 h-4" />
                <span className="text-sm">3</span>
              </button>
            </div>
          </div>

          {/* 機能説明 */}
          <div className="text-center py-8">
            <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-2">タイムライン機能</p>
            <p className="text-sm text-gray-400">社内掲示板のような投稿機能です</p>
            <p className="text-sm text-gray-400">今後、投稿・コメント機能を追加予定</p>
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

export default TimelinePage; 