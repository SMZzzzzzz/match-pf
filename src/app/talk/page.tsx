'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AuthGuard from '@/components/AuthGuard';

const TalkPage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    // トークページにアクセスしたらユーザーリストにリダイレクト
    router.push('/userlist');
  }, [router]);

  return (
    <AuthGuard>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">リダイレクト中...</p>
      </div>
    </AuthGuard>
  );
};

export default TalkPage; 