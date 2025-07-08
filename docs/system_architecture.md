# SNS Chat システム設計書

## 1. 概要
SNSチャットアプリケーションのシステム構成とアーキテクチャを定義します。

---

## 2. 技術スタック

### 2.1 フロントエンド
- **Next.js 15.3.5** (App Router)
- **React 18.3.1** + TypeScript
- **Tailwind CSS 4** (スタイリング)
- **Lucide React** (アイコン)
- **@emotion/react, @emotion/styled** (動的スタイリング)

### 2.2 バックエンド
- **Node.js** + **Express 4.18.2**
- **Prisma 6.10.1** (ORM)
- **PostgreSQL** (データベース)
- **express-session** + **cookie-parser** (セッション管理)

### 2.3 開発・運用
- **npm workspaces** (モノレポ管理)
- **concurrently** (並行実行)
- **TypeScript** (型安全性)
- **Docker** (コンテナ化)

---

## 3. モノレポ構成

### 3.1 プロジェクト構造
```
sns-chat/                           # ルートディレクトリ
├── apps/                          # アプリケーション群
│   ├── backend/                   # Express APIサーバー
│   │   ├── package.json          # バックエンド依存関係
│   │   └── src/
│   │       ├── server.js         # エントリーポイント
│   │       ├── prismaClient.js   # Prisma設定
│   │       └── routes/
│   │           ├── user.js       # ユーザー関連API
│   │           └── chat.js       # チャット関連API
│   └── frontend/                  # Next.js Webアプリ
│       ├── package.json          # フロントエンド依存関係
│       ├── app/                  # App Router構成
│       │   ├── layout.tsx        # 共通レイアウト
│       │   ├── page.tsx          # トップページ
│       │   ├── register/         # 新規登録
│       │   ├── userlist/         # ユーザー一覧
│       │   ├── talk/             # トーク一覧
│       │   ├── chat/[userId]/    # 1対1チャット
│       │   ├── timeline/         # タイムライン
│       │   ├── notifications/    # 通知
│       │   └── settings/         # 設定
│       ├── components/           # 共通コンポーネント
│       │   ├── AuthProvider.tsx  # 認証管理
│       │   └── BottomNavigation.tsx # ナビゲーション
│       ├── public/               # 静的ファイル
│       ├── next.config.js        # Next.js設定
│       ├── tsconfig.json         # TypeScript設定
│       ├── postcss.config.mjs    # PostCSS設定
│       └── .gitignore            # Git除外設定
├── packages/                      # 共通パッケージ群
│   └── shared/                   # 共通型定義・ユーティリティ
│       ├── package.json          # 共通パッケージ依存関係
│       ├── index.ts              # 型定義エクスポート
│       └── tsconfig.json         # TypeScript設定
├── prisma/                       # データベース定義
│   └── schema.prisma             # Prismaスキーマ
├── docs/                         # プロジェクト文書
│   ├── system_architecture.md    # システム設計書（本文書）
│   ├── ui_design.md             # UI設計書
│   ├── features.md              # 機能一覧
│   └── README.md                # プロジェクト概要
├── package.json                  # ワークスペース管理
├── package-lock.json             # 依存関係ロック
├── .env                         # 環境変数
├── Dockerfile                   # Docker設定
└── docker-compose.yml           # Docker Compose設定
```

### 3.2 ワークスペース設定
```json
{
  "name": "sns-chat",
  "private": true,
  "workspaces": ["apps/*", "packages/*"],
  "scripts": {
    "dev": "concurrently \"npm run dev:backend\" \"npm run dev:frontend\"",
    "dev:backend": "npm run dev --workspace=apps/backend",
    "dev:frontend": "npm run dev --workspace=apps/frontend",
    "build": "npm run build --workspace=apps/frontend",
    "prisma:generate": "prisma generate",
    "prisma:push": "prisma db push"
  }
}
```

### 3.3 共通型定義（packages/shared）
```typescript
// 共通インターフェース
export interface User {
  id: string;
  username: string;
  email: string;
  nickname: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatRoom {
  id: string;
  name?: string;
  isGroup: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  id: string;
  chatRoomId: string;
  senderId: string;
  content: string;
  messageType: string;
  sentAt: Date;
  sender: User;
}

// API型定義
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
```

---

## 4. フロントエンド構成

### 4.1 基本構成
- **Next.js App Router**
- `apps/frontend/app/` にルーティング構成
- APIは `/api/` を使わず、Expressを別で構築
- デザインは Tailwind CSS + コーポレートカラー
- UIデザインの詳細はui_design.mdを参照のこと

### 4.2 認証システム
- **AuthProvider**: React Context APIを使用したグローバル認証状態管理
- **認証ガード**: 未認証ユーザーの自動リダイレクト
- **セッション管理**: express-sessionとcookieによる認証状態維持

### 4.3 ナビゲーション
- **BottomNavigation**: 5つのタブ（メンバー、トーク、タイムライン、お知らせ、設定）
- **レスポンシブ対応**: スマホサイズでテキスト短縮（タイムライン→TL、お知らせ→通知）
- **アイコン統一**: Lucide Reactアイコンを使用

### 4.4 チャット機能UI
- **1対1チャット画面**: 動的ルーティング `/chat/[userId]`
- **メッセージ表示**: 
  - 自分の発言：右寄せ（青色吹き出し）
  - 相手の発言：左寄せ（白色吹き出し）
  - 発言者アイコン（頭文字）とニックネーム表示
  - 時刻表示（メッセージ枠外の右下）
  - 日付区切り表示
- **リアルタイム更新**: メッセージ送信後の自動更新
- **楽観的UI**: 送信中の即座なUI反映

---

## 5. バックエンド構成

### 5.1 基本構成
- Expressで構築し、APIとして `/api/` を公開
- Prismaを使ってPostgreSQLと接続
- セッションは `express-session + cookie-parser` で管理

### 5.2 認証システム
- **requireAuth middleware**: 全APIエンドポイントでの認証チェック
- **セッション管理**: express-sessionによるサーバーサイドセッション
- **CORS設定**: フロントエンドとの通信許可

### 5.3 チャットAPI
#### 5.3.1 チャットルーム管理
- **POST /api/chat/rooms/direct**: 1対1チャットルーム作成・取得
  - 既存ルーム検索ロジック
  - 新規ルーム作成（participants自動追加）
  - 参加者情報の完全取得

#### 5.3.2 メッセージ管理
- **GET /api/chat/rooms/:roomId/messages**: メッセージ一覧取得
  - 参加者権限チェック
  - ページネーション対応
  - 送信者情報の完全取得
- **POST /api/chat/rooms/:roomId/messages**: メッセージ送信
  - 権限チェック
  - チャットルーム更新日時の自動更新

#### 5.3.3 チャットルーム一覧
- **GET /api/chat/rooms**: ユーザーのチャットルーム一覧
  - 最新メッセージ情報付き
  - 更新日時順ソート

### 5.4 エラーハンドリング
- 詳細なエラーログ出力
- 適切なHTTPステータスコード
- フロントエンド向けエラーメッセージ

---

## 6. データベース

### 6.1 基本構成
- PostgreSQL（ローカル開発ではWSL2上で稼働）
- Prismaでスキーマを定義し、migrationで初期化
- テーブル定義はdb_schema.mdを参照のこと

### 6.2 チャット関連テーブル
```sql
-- チャットルーム
CREATE TABLE chat_rooms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255),
    is_group BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- チャット参加者
CREATE TABLE chat_participants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    chat_room_id UUID REFERENCES chat_rooms(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_read_at TIMESTAMP,
    UNIQUE(chat_room_id, user_id)
);

-- メッセージ
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    chat_room_id UUID REFERENCES chat_rooms(id) ON DELETE CASCADE,
    sender_id UUID REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    message_type VARCHAR(50) DEFAULT 'text',
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 6.3 テストデータ
- 3つのテストユーザー
- 2つの1対1チャットルーム
- 1つのグループチャットルーム
- リアルタイムスタンプ付きメッセージ

---

## 7. セッション認証方式

### 7.1 基本構成
- express-session でセッションクッキーを発行
- サーバーにセッション情報を保持（メモリ or Redisなど、将来的に切り替え可能）

### 7.2 認証フロー
1. ユーザーログイン → セッション作成
2. フロントエンドでAuthProvider初期化
3. 各APIリクエストでセッション検証
4. 認証失敗時の自動リダイレクト

---

## 8. 開発・運用戦略

### 8.1 モノレポの利点
- **統一された開発環境**: 全体を一つのIDEで管理
- **共通型定義の共有**: packages/sharedでAPIインターフェース統一
- **統一されたCI/CD**: 単一のパイプラインで全体管理
- **依存関係の統一管理**: バージョン競合の回避
- **原子的コミット**: フロント・バック同時変更の追跡

### 8.2 本番環境での検討事項

#### 8.2.1 モノレポ継続のメリット
- **小〜中規模チーム**: 1-5人のチームでは管理しやすい
- **密結合なAPI**: フロントとバックが密に連携する場合
- **統一リリース**: 機能追加時にフロント・バック同時リリース
- **スタートアップ段階**: 迅速な開発・イテレーション

#### 8.2.2 マルチレポ分割の検討タイミング
- **チーム規模拡大**: 10人以上、専門チーム分離時
- **独立デプロイ**: フロント・バックの独立したリリースサイクル
- **技術スタック分離**: 異なる技術での置き換え時
- **マイクロサービス化**: バックエンドの複数サービス分割時

#### 8.2.3 本番運用での構成選択肢

**選択肢A: モノレポ継続**
```
本番環境:
├── Frontend: Vercel/Netlify (静的ホスティング)
├── Backend: AWS ECS/Heroku (コンテナ)
└── Database: AWS RDS/PostgreSQL

メリット: 開発効率、型安全性、統一管理
デメリット: スケーラビリティ制限
```

**選択肢B: マルチレポ分割**
```
Frontend Repository:
├── Next.js アプリ
└── 独立デプロイ

Backend Repository:
├── Express API
└── 独立デプロイ

Shared Repository:
└── 共通型定義パッケージ
```

### 8.3 推奨アプローチ
**現段階**: モノレポ継続を推奨
- 開発チームが小規模
- 機能開発の速度を重視
- 型安全性の恩恵が大きい

**将来的な分割タイミング**:
- チームが5人以上に拡大
- フロント・バックで異なるリリースサイクルが必要
- マイクロサービス化が必要

---

## 9. 開発順序

### 9.1 データベース優先開発
- データ駆動型開発とします。そのためデータベースを最初に構築します。
- テストユーザーだけは最初に作成します。
  - ユーザ名：テスト、パスワード：test1、メールアドレス：test1@gmail.com
  - 追加テストユーザー：user1, user2（パスワード：test123）

### 9.2 バックエンド開発
- バックエンド処理を作成します。DBはpostgreSQLでデータベース更新はORMのPrismaを前提に構築します。
- 基本となるAPIを先に作成します。全てのテーブルにおいて登録、更新、削除、呼び出しがあればいいです。

### 9.3 フロントエンド開発
- ui_design.mdをもとにフロントエンドを作成します。
- 認証システムから開始し、ナビゲーション、チャット機能の順で実装

### 9.4 チャット機能実装順序
1. **データベーススキーマ**: ChatRoom, ChatParticipant, Message追加
2. **バックエンドAPI**: チャット関連エンドポイント実装
3. **フロントエンド基盤**: AuthProvider, BottomNavigation
4. **チャットUI**: 1対1チャット画面実装
5. **統合テスト**: 全機能の動作確認

---

## 10. 今後の拡張（保留）

| 機能              | 採用検討状況 | 補足                           |
|-------------------|--------------|--------------------------------|
| Socket.IOによるリアルタイム通信 | 保留         | 既読や通知などに活用予定         |
| グループチャット機能 | 実装可能     | データベース構造は対応済み       |
| ファイル/画像送信  | 保留         | message_typeで対応準備済み      |
| 既読機能          | 実装可能     | last_read_atカラム準備済み      |
| プッシュ通知      | 保留         | Socket.IO実装後に検討           |
| Firebase連携      | 保留         | 通知やクラウドストレージ用途     |
| Docker対応         | 実装済み     | 開発環境での統一化完了           |

---

## 11. 重要な実装ポイント

### 11.1 チャットルーム検索ロジック
- 複雑なPrismaクエリの回避
- 確実な1対1チャット判定
- 参加者情報の完全取得

### 11.2 UIレスポンシブ対応
- Tailwind CSSの条件分岐クラス
- flex-row-reverseとmarginの適切な組み合わせ
- モバイルファーストデザイン

### 11.3 エラーハンドリング
- フロントエンド・バックエンド両方での適切なエラー処理
- 詳細なログ出力
- ユーザーフレンドリーなエラーメッセージ

### 11.4 型安全性
- packages/sharedによる型定義の統一
- TypeScriptによる開発時型チェック
- APIリクエスト・レスポンスの型安全性

---

## 12. モノレポ vs マルチレポ比較

### 12.1 判断基準

| 項目              | モノレポ | マルチレポ |
|-------------------|----------|------------|
| 開発チーム規模     | 1-5人     | 5人以上    |
| リリースサイクル   | 統一     | 独立      |
| 型安全性          | 高       | 中        |
| デプロイの複雑性   | 低       | 高        |
| スケーラビリティ   | 中       | 高        |
| 技術スタック多様性 | 低       | 高        |

### 12.2 現在の推奨
**モノレポ継続** - 以下の理由により：
- 開発効率の最大化
- 型安全性の確保
- 小規模チームでの管理しやすさ
- 迅速な機能開発

---

## 13. 補足

- テスト用ユーザーやシードデータの挿入には直接SQL文を使用
- `.env` にはセッションキー、DB接続情報、APIキー等を記載
- 開発環境：バックエンドはWSL、フロントエンドはWindows

---

## 14. 参考リンク

- [Prisma公式](https://www.prisma.io/)
- [Express公式](https://expressjs.com/)
- [Next.js公式](https://nextjs.org/)
- [Tailwind CSS公式](https://tailwindcss.com/)
- [Lucide React公式](https://lucide.dev/)