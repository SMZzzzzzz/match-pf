# マッチングプラットフォーム システム設計書

## 1. 概要
倉庫作業に特化したマッチングプラットフォームのシステム構成とアーキテクチャを定義します。

---

## 2. 技術スタック

### 2.1 フロントエンド
- **Next.js 15.3.5** (App Router)
- **React 19.0.0** + TypeScript 5
- **Tailwind CSS 4** (スタイリング)
- **Lucide React** (アイコン)
- **@emotion/react, @emotion/styled** (動的スタイリング)

### 2.2 開発・運用
- **Turbopack** (高速開発サーバー)
- **ESLint** (コード品質管理)
- **PostCSS** (CSS プリプロセッサー)
- **Vercel** (デプロイ・ホスティング)

### 2.3 データ管理
- **JSONファイル** (データストレージ)
- **LocalStorage** (セッション管理)
- **React Context API** (状態管理)

---

## 3. プロジェクト構成

### 3.1 ディレクトリ構造
```
match_pf/                           # ルートディレクトリ
├── src/                           # ソースコード
│   ├── app/                       # Next.js App Router
│   │   ├── layout.tsx            # 共通レイアウト
│   │   ├── page.tsx              # ダッシュボード
│   │   ├── globals.css           # グローバルスタイル
│   │   ├── chat/                 # チャット機能
│   │   │   └── [userId]/         # 1対1チャット
│   │   │       └── page.tsx      # チャット画面
│   │   ├── jobs/                 # 案件管理
│   │   │   └── page.tsx          # 案件一覧
│   │   ├── login/                # 認証
│   │   │   └── page.tsx          # ログイン画面
│   │   ├── register/             # 新規登録
│   │   │   └── page.tsx          # 登録画面
│   │   ├── userlist/             # ユーザー管理
│   │   │   └── page.tsx          # ユーザー一覧
│   │   ├── notifications/        # 通知
│   │   │   └── page.tsx          # 通知一覧
│   │   ├── timeline/             # タイムライン
│   │   │   └── page.tsx          # タイムライン
│   │   └── settings/             # 設定
│   │       └── page.tsx          # 設定画面
│   ├── components/               # 再利用可能コンポーネント
│   │   ├── AuthProvider.tsx      # 認証プロバイダー
│   │   ├── AuthGuard.tsx         # 認証ガード
│   │   └── BottomNavigation.tsx  # 下部ナビゲーション
│   ├── data/                     # JSONデータファイル
│   │   ├── users.json            # ユーザーデータ
│   │   ├── jobs.json             # 案件データ
│   │   ├── messages.json         # メッセージデータ
│   │   └── chatRooms.json        # チャットルームデータ
│   ├── lib/                      # ユーティリティ
│   │   └── data.ts               # データ操作関数
│   └── types/                    # TypeScript型定義
│       └── index.ts              # 共通型定義
├── public/                       # 静的ファイル
│   ├── next.svg                  # Next.jsロゴ
│   └── vercel.svg                # Vercelロゴ
├── docs/                         # プロジェクト文書
│   ├── system_architecture.md    # システム設計書（本文書）
│   ├── ui_design.md             # UI設計書
│   ├── features.md              # 機能仕様書
│   └── frontend_setup.md        # フロントエンド設定
├── package.json                  # 依存関係・スクリプト
├── package-lock.json             # 依存関係ロック
├── next.config.ts                # Next.js設定
├── tsconfig.json                 # TypeScript設定
├── postcss.config.mjs            # PostCSS設定
├── eslint.config.mjs             # ESLint設定
└── README.md                     # プロジェクト概要
```

### 3.2 設定ファイル
```json
// package.json
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

### 3.3 共通型定義（src/types/index.ts）
```typescript
// ユーザー型定義
export interface User {
  id: string;
  username: string;
  email: string;
  nickname: string;
  role: 'admin' | 'worker';
  createdAt: string;
  updatedAt: string;
}

// 案件型定義
export interface Job {
  id: string;
  title: string;
  period: string;
  location: string;
  hourlyWage: number;
  recruitNumber: number;
  description: string;
  isFavorite: boolean;
  status: string;
  createdAt: string;
}

// チャットルーム型定義
export interface ChatRoom {
  id: string;
  name: string | null;
  isGroup: boolean;
  participants: string[];
  createdAt: string;
  updatedAt: string;
}

// メッセージ型定義
export interface Message {
  id: string;
  chatRoomId: string;
  senderId: string;
  content: string;
  messageType: 'text';
  sentAt: string;
}

// 送信者情報付きメッセージ型定義
export interface MessageWithSender extends Message {
  sender: User;
}

// API レスポンス型定義
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// 認証状態型定義
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
```

---

## 4. フロントエンド構成

### 4.1 基本構成
- **Next.js 15.3.5 App Router**
- **TypeScript 5** で型安全性を確保
- **Tailwind CSS 4** でモダンなスタイリング
- **Turbopack** で高速な開発体験

### 4.2 認証システム
- **AuthProvider**: React Context APIを使用したグローバル認証状態管理
- **AuthGuard**: 未認証ユーザーの自動リダイレクト
- **セッション管理**: LocalStorageによる認証状態維持

```typescript
// AuthProvider の実装例
const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // セッション復元
  useEffect(() => {
    const savedUserId = localStorage.getItem(STORAGE_KEYS.AUTH_USER);
    if (savedUserId) {
      const user = getUserById(savedUserId);
      if (user) {
        dispatch({ type: 'RESTORE_SESSION', payload: user });
      }
    }
  }, []);

  // ログイン・ログアウト機能
  const login = async (email: string, password: string) => {
    const user = authenticateUser(email, password);
    if (user) {
      localStorage.setItem(STORAGE_KEYS.AUTH_USER, user.id);
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    }
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
    dispatch({ type: 'LOGOUT' });
  };
};
```

### 4.3 ナビゲーション
- **BottomNavigation**: 5つのタブ（案件、ユーザー、トーク、通知、設定）
- **レスポンシブ対応**: スマホサイズでテキスト短縮
- **アクティブ状態管理**: URLパスによる自動判定

```typescript
const navigation = [
  { name: '案件', href: '/jobs', icon: Briefcase },
  { name: 'ユーザー', href: '/userlist', icon: Users },
  { name: 'トーク', href: '/talk', icon: MessageCircle },
  { name: '通知', href: '/notifications', icon: Bell },
  { name: '設定', href: '/settings', icon: Settings }
];
```

### 4.4 チャット機能UI
- **1対1チャット画面**: 動的ルーティング `/chat/[userId]`
- **リアルタイム更新**: メッセージ送信後の自動更新
- **楽観的UI**: 送信中の即座なUI反映

```typescript
// チャット画面の実装例
export default function ChatPage({ params }: { params: { userId: string } }) {
  const [messages, setMessages] = useState<MessageWithSender[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setIsLoading(true);
    try {
      const sentMessage = await sendMessage(params.userId, newMessage);
      setMessages(prev => [...prev, sentMessage]);
      setNewMessage('');
    } catch (error) {
      console.error('メッセージ送信エラー:', error);
    } finally {
      setIsLoading(false);
    }
  };
};
```

---

## 5. データ管理システム

### 5.1 データストレージ
- **JSONファイル**: `/src/data/` 配下に配置
- **静的データ**: ビルド時に含まれる
- **クライアントサイド**: ブラウザ上で動作

### 5.2 データ操作（src/lib/data.ts）
```typescript
// ユーザー認証
export const authenticateUser = (email: string, password: string): User | null => {
  const users = getUsersData();
  return users.find(user => 
    user.email === email && password === 'password'
  ) || null;
};

// チャットルーム管理
export const findOrCreateDirectRoom = (user1Id: string, user2Id: string): ChatRoom => {
  const rooms = getChatRoomsData();
  const existingRoom = rooms.find(room => 
    !room.isGroup && 
    room.participants.includes(user1Id) && 
    room.participants.includes(user2Id)
  );
  
  if (existingRoom) return existingRoom;
  
  // 新しいルームを作成
  const newRoom: ChatRoom = {
    id: generateId(),
    name: null,
    isGroup: false,
    participants: [user1Id, user2Id],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  return newRoom;
};

// メッセージ送信
export const sendMessage = async (
  chatRoomId: string,
  senderId: string,
  content: string
): Promise<Message> => {
  const newMessage: Message = {
    id: generateId(),
    chatRoomId,
    senderId,
    content,
    messageType: 'text',
    sentAt: new Date().toISOString()
  };
  
  // メッセージをローカルストレージに保存
  const messages = getMessagesData();
  messages.push(newMessage);
  localStorage.setItem('messages', JSON.stringify(messages));
  
  return newMessage;
};
```

### 5.3 データ構造

#### ユーザーデータ（users.json）
```json
[
  {
    "id": "user1",
    "username": "test",
    "email": "test@example.com",
    "nickname": "テスト",
    "role": "admin",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

#### 案件データ（jobs.json）
```json
[
  {
    "id": "job1",
    "title": "大型物流センター 仕分け作業",
    "period": "2024/07/15 - 2024/08/31",
    "location": "東京都江東区",
    "hourlyWage": 1200,
    "recruitNumber": 5,
    "description": "大型物流センターでの商品仕分け作業です。",
    "isFavorite": false,
    "status": "募集中",
    "createdAt": "2024-07-01T00:00:00.000Z"
  }
]
```

---

## 6. セキュリティ設計

### 6.1 認証・認可
- **認証ガード**: `AuthGuard`コンポーネントによる認証チェック
- **ロールベースアクセス**: 管理者と作業者の区別
- **セッション管理**: LocalStorageによる認証状態維持

### 6.2 入力検証
- **フォーム検証**: React Hook Formによる入力検証
- **XSS対策**: Reactの自動エスケープ機能
- **型安全性**: TypeScriptによる型チェック

### 6.3 プライバシー保護
- **個人情報保護**: 必要最小限の情報のみ保持
- **匿名化**: GitHubでのnoreplyメールアドレス使用
- **データ暗号化**: 将来的な実装予定

---

## 7. パフォーマンス最適化

### 7.1 Next.js最適化
- **App Router**: 新しいルーティングシステム
- **Turbopack**: 高速な開発サーバー
- **自動コード分割**: ページ単位での分割
- **画像最適化**: Next.js Image コンポーネント

### 7.2 React最適化
- **React 19**: 最新の機能とパフォーマンス改善
- **useMemo/useCallback**: 不要な再計算を防止
- **Context最適化**: AuthProviderの効率的な実装

### 7.3 CSS最適化
- **Tailwind CSS 4**: 使用されるクラスのみをビルド
- **Emotion**: 動的スタイリングの最適化
- **PostCSS**: CSS後処理による最適化

---

## 8. 開発・デプロイ フロー

### 8.1 開発環境
```bash
# 開発サーバー起動
npm run dev

# ビルド
npm run build

# 本番サーバー起動
npm run start

# リントチェック
npm run lint
```

### 8.2 デプロイ
- **Vercel**: 本番環境のホスティング
- **GitHub連携**: 自動デプロイ
- **プレビュー環境**: プルリクエストでのプレビュー
- **環境変数**: Vercelでの環境変数管理

### 8.3 品質管理
- **ESLint**: コード品質チェック
- **TypeScript**: 型チェック
- **Git hooks**: コミット前の自動チェック

---

## 9. 拡張性・保守性

### 9.1 モジュラー設計
- **コンポーネント分割**: 再利用可能なコンポーネント
- **カスタムフック**: ロジックの共通化
- **型定義**: 一元的な型管理

### 9.2 将来的な拡張
- **API化**: バックエンドAPIの導入
- **データベース**: PostgreSQLへの移行
- **リアルタイム**: WebSocketによるリアルタイム通信
- **モバイルアプリ**: React Nativeでの展開

### 9.3 監視・ログ
- **エラー監視**: Sentryなどのエラー追跡
- **アクセス解析**: Google Analyticsなどの導入
- **パフォーマンス監視**: Core Web Vitalsの測定

---

## 10. 今後の課題

### 10.1 短期的課題
- データ永続化（現在はLocalStorageのみ）
- リアルタイム通信（現在は手動更新）
- ファイルアップロード機能
- プッシュ通知機能

### 10.2 中期的課題
- バックエンドAPIの構築
- データベース設計・移行
- 認証システムの強化
- パフォーマンス最適化

### 10.3 長期的課題
- スケーラビリティの向上
- マルチテナント対応
- 国際化対応
- アクセシビリティの向上

---

## 11. 技術的制約・前提条件

### 11.1 制約事項
- **データ永続化**: JSONファイルベース（リロード時にデータ消失）
- **リアルタイム性**: ページ更新による手動更新
- **スケーラビリティ**: 小規模利用を想定
- **セキュリティ**: 開発段階のセキュリティレベル

### 11.2 前提条件
- **Node.js**: 18.0以上
- **ブラウザ**: モダンブラウザ対応
- **ネットワーク**: インターネット接続必須
- **デバイス**: レスポンシブデザイン対応

---

## 12. まとめ

このマッチングプラットフォームは、Next.js 15.3.5を基盤とした現代的なWebアプリケーションとして設計されています。JSONファイルベースのシンプルな構成により、迅速な開発と展開を可能にしながら、将来的な拡張性も考慮した設計となっています。

継続的な改善と機能追加により、実用的なマッチングプラットフォームとしての価値を提供していきます。