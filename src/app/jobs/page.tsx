'use client';

import React, { useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import AuthGuard from '@/components/AuthGuard';
import BottomNavigation from '@/components/BottomNavigation';
import { getJobs } from '@/lib/data';
import { Job } from '@/types';
import { 
  Briefcase, 
  MapPin, 
  Calendar, 
  Users, 
  Heart, 
  Clock,
  DollarSign,
  MessageCircle
} from 'lucide-react';

const JobCard: React.FC<{
  job: Job;
  onToggleFavorite: (jobId: string) => void;
  onEntry: (job: Job) => void;
}> = ({ job, onToggleFavorite, onEntry }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4 shadow-sm hover:shadow-md transition-shadow">
      {/* ヘッダー */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {job.title}
          </h3>
          <div className="flex items-center text-sm text-green-600 bg-green-50 px-2 py-1 rounded-full w-fit">
            <Clock className="w-4 h-4 mr-1" />
            {job.status}
          </div>
        </div>
        
        <button
          onClick={() => onToggleFavorite(job.id)}
          className={`p-2 rounded-full transition-colors ${
            job.isFavorite
              ? 'text-red-500 bg-red-50 hover:bg-red-100'
              : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
          }`}
        >
          <Heart className={`w-5 h-5 ${job.isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* 詳細情報 */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center text-gray-600">
          <Calendar className="w-4 h-4 mr-2 text-blue-500" />
          <span className="text-sm">{job.period}</span>
        </div>
        
        <div className="flex items-center text-gray-600">
          <MapPin className="w-4 h-4 mr-2 text-blue-500" />
          <span className="text-sm">{job.location}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-600">
            <DollarSign className="w-4 h-4 mr-2 text-green-500" />
            <span className="text-sm font-medium">時給 {job.hourlyWage.toLocaleString()}円</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <Users className="w-4 h-4 mr-2 text-purple-500" />
            <span className="text-sm">募集 {job.recruitNumber}名</span>
          </div>
        </div>
      </div>

      {/* 説明文 */}
      <p className="text-gray-700 text-sm mb-4 leading-relaxed">
        {job.description}
      </p>

      {/* アクションボタン */}
      <div className="flex space-x-3">
        <button
          onClick={() => onEntry(job)}
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          エントリー・相談
        </button>
        
        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
          詳細
        </button>
      </div>
    </div>
  );
};

const JobsPage: React.FC = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<Job[]>(getJobs());
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // お気に入り切り替え
  const handleToggleFavorite = (jobId: string) => {
    setJobs(prevJobs =>
      prevJobs.map(job =>
        job.id === jobId ? { ...job, isFavorite: !job.isFavorite } : job
      )
    );
  };

  // エントリー処理
  const handleEntry = (job: Job) => {
    // 管理者との1対1チャットを開始
    alert(`${job.title}にエントリーしました！管理者との相談が開始されます。`);
    // 実際のアプリでは、管理者ユーザーとのチャット画面に遷移
    // router.push('/chat/admin');
  };

  // 表示する案件をフィルタリング
  const displayJobs = showFavoritesOnly ? jobs.filter(job => job.isFavorite) : jobs;

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50 pb-20">
        {/* ヘッダー */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-md mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Briefcase className="w-6 h-6 text-blue-600 mr-2" />
                <h1 className="text-lg font-semibold text-gray-900">
                  案件一覧
                </h1>
              </div>
              
              <button
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                className={`flex items-center px-3 py-1 rounded-full text-sm transition-colors ${
                  showFavoritesOnly
                    ? 'bg-red-100 text-red-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Heart className={`w-4 h-4 mr-1 ${showFavoritesOnly ? 'fill-current' : ''}`} />
                {showFavoritesOnly ? 'お気に入りのみ' : 'すべて'}
              </button>
            </div>

            {/* 統計情報 */}
            <div className="mt-4 flex space-x-4">
              <div className="bg-blue-50 rounded-lg px-3 py-2 flex-1">
                <p className="text-xs text-blue-600">全案件数</p>
                <p className="text-lg font-semibold text-blue-700">{jobs.length}</p>
              </div>
              
              <div className="bg-red-50 rounded-lg px-3 py-2 flex-1">
                <p className="text-xs text-red-600">お気に入り</p>
                <p className="text-lg font-semibold text-red-700">
                  {jobs.filter(job => job.isFavorite).length}
                </p>
              </div>

              <div className="bg-green-50 rounded-lg px-3 py-2 flex-1">
                <p className="text-xs text-green-600">募集中</p>
                <p className="text-lg font-semibold text-green-700">
                  {jobs.filter(job => job.status === '募集中').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 案件リスト */}
        <div className="max-w-md mx-auto px-4 py-6">
          {displayJobs.length > 0 ? (
            displayJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onToggleFavorite={handleToggleFavorite}
                onEntry={handleEntry}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-2">
                {showFavoritesOnly ? 'お気に入りの案件がありません' : '案件が見つかりません'}
              </p>
              {showFavoritesOnly && (
                <button
                  onClick={() => setShowFavoritesOnly(false)}
                  className="text-blue-600 text-sm hover:text-blue-700"
                >
                  すべての案件を表示
                </button>
              )}
            </div>
          )}
        </div>

        {/* ユーザー情報 */}
        {user && (
          <div className="max-w-md mx-auto px-4 py-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-blue-700">
                <span className="font-medium">ログイン中:</span> {user.nickname} ({user.role === 'admin' ? '管理者' : 'アルバイト'})
              </p>
            </div>
          </div>
        )}

        <BottomNavigation />
      </div>
    </AuthGuard>
  );
};

export default JobsPage; 