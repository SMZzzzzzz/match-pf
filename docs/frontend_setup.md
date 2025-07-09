# マッチングプラットフォーム フロントエンド開発セットアップ

このドキュメントでは、マッチングプラットフォームのフロントエンド開発に必要なセットアップ手順を説明します。

## 📋 プロジェクト概要

- **プロジェクト名**: match_pf
- **プラットフォーム**: 倉庫作業特化マッチングプラットフォーム
- **アーキテクチャ**: Next.js 15.3.5 (App Router)
- **データ管理**: JSONファイルベース

---

## 🛠️ 技術スタック

### コア技術
- **Next.js**: 15.3.5 (App Router)
- **React**: 19.0.0
- **TypeScript**: 5
- **Tailwind CSS**: 4

### 追加ライブラリ
- **Lucide React**: アイコンライブラリ
- **@emotion/react**: 動的スタイリング
- **@emotion/styled**: Styled Components

### 開発ツール
- **Turbopack**: 高速開発サーバー
- **ESLint**: コード品質管理
- **PostCSS**: CSS プリプロセッサー

---

## 📁 プロジェクト構成

```
match_pf/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # 共通レイアウト
│   │   ├── page.tsx            # ダッシュボード
│   │   ├── globals.css         # グローバルスタイル
│   │   ├── chat/[userId]/      # 1対1チャット
│   │   ├── jobs/               # 案件管理
│   │   ├── login/              # 認証
│   │   ├── userlist/           # ユーザー管理
│   │   ├── notifications/      # 通知
│   │   ├── timeline/           # タイムライン
│   │   └── settings/           # 設定
│   ├── components/             # 共通コンポーネント
│   │   ├── AuthProvider.tsx    # 認証プロバイダー
│   │   ├── AuthGuard.tsx       # 認証ガード
│   │   └── BottomNavigation.tsx # 下部ナビゲーション
│   ├── data/                   # JSONデータファイル
│   │   ├── users.json          # ユーザーデータ
│   │   ├── jobs.json           # 案件データ
│   │   ├── messages.json       # メッセージデータ
│   │   └── chatRooms.json      # チャットルームデータ
│   ├── lib/                    # ユーティリティ
│   │   └── data.ts             # データ操作関数
│   └── types/                  # TypeScript型定義
│       └── index.ts            # 共通型定義
├── public/                     # 静的ファイル
├── docs/                       # プロジェクト文書
├── package.json                # 依存関係管理
├── next.config.ts              # Next.js設定
├── tsconfig.json               # TypeScript設定
├── postcss.config.mjs          # PostCSS設定
├── eslint.config.mjs           # ESLint設定
└── README.md                   # プロジェクト概要
```

---

## 🚀 開発環境のセットアップ

### 前提条件
- **Node.js**: 18.0 以上
- **npm**: 8.0 以上
- **Git**: 最新版

### 1. プロジェクトのクローン
```bash
# GitHubからクローン
git clone https://github.com/SMZzzzzzz/match-pf.git
cd match_pf
```

### 2. 依存関係のインストール
```bash
# パッケージインストール
npm install
```

### 3. 開発サーバーの起動
```bash
# Turbopackを使用した高速開発サーバー起動
npm run dev

# ブラウザで http://localhost:3000 を開く
```

---

## 📦 package.json の設定

### 依存関係
```json
{
  "name": "match_pf",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@emotion/react": "^11.14.0",
    "@emotion/styled": "^11.14.1",
    "lucide-react": "^0.525.0",
    "next": "15.3.5",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "15.3.5",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
```

---

## ⚙️ 設定ファイル

### Next.js設定 (next.config.ts)
```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
};

export default nextConfig;
```

### TypeScript設定 (tsconfig.json)
```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "ES6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### Tailwind CSS設定 (postcss.config.mjs)
```javascript
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}

export default config
```

### ESLint設定 (eslint.config.mjs)
```javascript
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals"),
];

export default eslintConfig;
```

---

## 🎨 スタイリング設定

### グローバルスタイル (src/app/globals.css)
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* カスタムスタイル */
@layer base {
  html {
    font-family: system-ui, sans-serif;
  }
}

@layer components {
  .btn-primary {
    @apply bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200;
  }
  
  .btn-secondary {
    @apply bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors duration-200;
  }
  
  .card {
    @apply bg-white rounded-lg shadow-sm border border-gray-200 p-6;
  }
  
  .input-field {
    @apply w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent;
  }
}
```

### Tailwind CSS カスタム設定
```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config
```

---

## 🔧 開発に使用するコマンド

### 基本コマンド
```bash
# 開発サーバー起動（Turbopack使用）
npm run dev

# 本番ビルド
npm run build

# 本番サーバー起動
npm run start

# ESLint実行
npm run lint
```

### 型チェック
```bash
# TypeScript型チェック
npx tsc --noEmit

# 型定義ファイル生成
npx tsc --declaration --emitDeclarationOnly
```

### パッケージ管理
```bash
# 新しいパッケージインストール
npm install <package-name>

# 開発依存関係のインストール
npm install -D <package-name>

# パッケージのアップデート
npm update
```

---

## 📝 開発ガイドライン

### ディレクトリ構造のルール
1. **ページ**: `src/app/` 配下に配置
2. **コンポーネント**: `src/components/` 配下に配置
3. **ユーティリティ**: `src/lib/` 配下に配置
4. **型定義**: `src/types/` 配下に配置
5. **データ**: `src/data/` 配下にJSONファイル

### ファイル命名規則
- **コンポーネント**: PascalCase (例: `AuthProvider.tsx`)
- **ページ**: kebab-case (例: `page.tsx`)
- **ユーティリティ**: camelCase (例: `data.ts`)
- **型定義**: camelCase (例: `index.ts`)

### React Components
```typescript
// 基本的なコンポーネント構造
'use client';

import React from 'react';
import { ComponentProps } from '@/types';

interface Props extends ComponentProps {
  // プロパティ定義
}

const ComponentName: React.FC<Props> = ({ ...props }) => {
  // コンポーネントロジック
  
  return (
    <div className="component-styles">
      {/* JSX */}
    </div>
  );
};

export default ComponentName;
```

---

## 🔐 認証設定

### AuthProvider設定
```typescript
// src/components/AuthProvider.tsx
'use client';

import { createContext, useContext, useReducer, useEffect } from 'react';
import { User, AuthState } from '@/types';
import { getUserById } from '@/lib/data';

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 認証ロジック実装
};
```

### 認証ガード
```typescript
// src/components/AuthGuard.tsx
'use client';

import { useAuth } from './AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <>{children}</> : null;
};
```

---

## 📊 データ管理

### JSONファイルの配置
```
src/data/
├── users.json          # ユーザーデータ
├── jobs.json           # 案件データ
├── messages.json       # メッセージデータ
└── chatRooms.json      # チャットルームデータ
```

### データ操作関数
```typescript
// src/lib/data.ts
import { User, Job, Message, ChatRoom } from '@/types';

// ユーザーデータの取得
export const getUsersData = (): User[] => {
  // JSONファイルからデータを読み込み
};

// 案件データの取得
export const getJobsData = (): Job[] => {
  // JSONファイルからデータを読み込み
};

// メッセージ送信
export const sendMessage = async (
  chatRoomId: string,
  senderId: string,
  content: string
): Promise<Message> => {
  // メッセージ送信ロジック
};
```

---

## 🔄 状態管理

### React Context API
```typescript
// src/contexts/AppContext.tsx
'use client';

import { createContext, useContext, useReducer } from 'react';
import { AppState, AppAction } from '@/types';

const AppContext = createContext<AppContextType | null>(null);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // アプリケーション状態管理
};
```

---

## 🧪 テスト設定

### テストデータ
```typescript
// テストユーザー
const testUsers = [
  {
    id: 'user1',
    username: 'test',
    email: 'test@example.com',
    password: 'password',
    nickname: 'テスト',
    role: 'admin'
  },
  // 他のテストユーザー...
];

// テスト案件
const testJobs = [
  {
    id: 'job1',
    title: '大型物流センター 仕分け作業',
    period: '2024/07/15 - 2024/08/31',
    location: '東京都江東区',
    hourlyWage: 1200,
    recruitNumber: 5,
    description: '大型物流センターでの商品仕分け作業です。',
    isFavorite: false,
    status: '募集中'
  },
  // 他のテスト案件...
];
```

---

## 🚀 デプロイ設定

### Vercel設定
```bash
# Vercel CLIインストール
npm install -g vercel

# Vercelにログイン
vercel login

# プロジェクトデプロイ
vercel --prod
```

### 環境変数設定
```env
# .env.local
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Match Platform
```

---

## 🛠️ 開発環境のトラブルシューティング

### よくある問題と解決方法

#### Node.js バージョン問題
```bash
# Node.js バージョン確認
node --version

# 推奨バージョン: 18.0以上
# nvmを使用してバージョン管理
nvm use 18
```

#### パッケージインストールエラー
```bash
# node_modules削除
rm -rf node_modules

# package-lock.json削除
rm package-lock.json

# 再インストール
npm install
```

#### TypeScript型エラー
```bash
# 型チェック実行
npx tsc --noEmit

# Next.jsの型定義再生成
rm -rf .next
npm run dev
```

---

## 📈 パフォーマンス最適化

### 推奨設定
```typescript
// next.config.ts
const nextConfig = {
  // 画像最適化
  images: {
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif'],
  },
  
  // 圧縮設定
  compress: true,
  
  // 実験的機能
  experimental: {
    turbo: {
      // Turbopack設定
    },
  },
};
```

### 開発時のベストプラクティス
1. **React DevTools**: 開発時のデバッグに使用
2. **Lighthouse**: パフォーマンス測定
3. **Bundle Analyzer**: バンドルサイズ分析
4. **ESLint**: コード品質維持

---

## 📚 参考資料

### ドキュメント
- [Next.js 15 Documentation](https://nextjs.org/docs)
- [React 19 Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

### 関連ファイル
- `docs/features.md` - 機能仕様書
- `docs/system_architecture.md` - システム設計書
- `docs/ui_design.md` - UI設計書
- `README.md` - プロジェクト概要

---

## 🔄 更新履歴

- **2024/XX/XX**: 初版作成
- **2024/XX/XX**: Next.js 15.3.5対応
- **2024/XX/XX**: Turbopack対応
- **2024/XX/XX**: 型定義整備

---

このセットアップガイドに従うことで、マッチングプラットフォームの開発環境を効率的に構築できます。開発中に問題が発生した場合は、トラブルシューティングセクションを参照してください。 