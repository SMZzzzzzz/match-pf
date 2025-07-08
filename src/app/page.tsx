'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import { Loader2 } from 'lucide-react';

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        // 認証済みの場合はユーザーリストページへリダイレクト
        router.push('/userlist');
      } else {
        // 未認証の場合はログインページへリダイレクト
        router.push('/login');
      }
    }
  }, [isAuthenticated, isLoading, router]);

  // リダイレクト中の読み込み画面
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <p className="mt-2 text-gray-600">読み込み中...</p>
      </div>
    </div>
  );
}
