'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Briefcase, 
  MessageCircle, 
  Clock, 
  Bell, 
  Settings,
  LogOut
} from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';

interface NavItem {
  id: string;
  label: string;
  shortLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
}

const navItems: NavItem[] = [
  {
    id: 'jobs',
    label: '案件',
    shortLabel: '案件',
    icon: Briefcase,
    href: '/jobs'
  },
  {
    id: 'talk',
    label: 'トーク',
    shortLabel: 'トーク',
    icon: MessageCircle,
    href: '/talk'
  },
  {
    id: 'timeline',
    label: 'タイムライン',
    shortLabel: 'TL',
    icon: Clock,
    href: '/timeline'
  },
  {
    id: 'notifications',
    label: 'お知らせ',
    shortLabel: '通知',
    icon: Bell,
    href: '/notifications'
  },
  {
    id: 'settings',
    label: '設定',
    shortLabel: '設定',
    icon: Settings,
    href: '/settings'
  }
];

const BottomNavigation: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { logout, user } = useAuth();

  // 現在のパスがアクティブかどうかを判定
  const isActive = (href: string): boolean => {
    if (href === '/talk' && pathname.startsWith('/chat')) {
      return true; // チャット画面もトークタブとして認識
    }
    if (href === '/talk' && pathname === '/userlist') {
      return true; // ユーザーリストもトークタブとして認識
    }
    return pathname === href;
  };

  const handleNavigation = (href: string) => {
    router.push(href);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="max-w-md mx-auto">
        <div className="flex justify-around items-center py-2">
          {navItems.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.href)}
                className={`flex flex-col items-center justify-center min-w-0 flex-1 py-2 px-1 text-xs font-medium transition-colors duration-200 ${
                  active
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className={`w-5 h-5 mb-1 ${active ? 'text-blue-600' : 'text-gray-500'}`} />
                {/* デスクトップ: フルラベル、モバイル: 短縮ラベル */}
                <span className="hidden sm:block truncate">
                  {item.label}
                </span>
                <span className="sm:hidden truncate">
                  {item.shortLabel}
                </span>
              </button>
            );
          })}
          
          {/* ログアウトボタン */}
          <button
            onClick={handleLogout}
            className="flex flex-col items-center justify-center min-w-0 flex-1 py-2 px-1 text-xs font-medium text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors duration-200"
            title={`${user?.nickname || 'ユーザー'}としてログアウト`}
          >
            <LogOut className="w-5 h-5 mb-1" />
            <span className="hidden sm:block truncate">ログアウト</span>
            <span className="sm:hidden truncate">終了</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BottomNavigation; 