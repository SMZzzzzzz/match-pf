# ⚙️ 機能仕様書（マッチングプラットフォームWebアプリ）

## 目的

倉庫作業に特化したマッチングプラットフォームを構築する。
業態としては倉庫で働く人が多く、アルバイトや短期パートなど人の入れ替わりの多い業種となっている。
自社のなかでいくつかの案件があり、案件の一覧を表示して既存アルバイトのユーザーが案件を選んでエントリーする仕組みとしたい。
また、エントリー後は管理者ユーザーとチャットを行う機能を設け、希望条件や期間などのやりとりをトーク内で行う。

---

## 技術スタック

### フロントエンド
- **Next.js 15.3.5** - React フレームワーク（App Router）
- **React 19.0.0** - UI ライブラリ
- **TypeScript 5** - 型安全性
- **Tailwind CSS 4** - モダンなスタイリング
- **Lucide React** - アイコンライブラリ
- **@emotion/react, @emotion/styled** - 動的スタイリング

### 開発環境
- **Turbopack** - 高速開発サーバー
- **ESLint** - コード品質管理
- **PostCSS** - CSS プリプロセッサー

### データ管理
- **JSONファイル** - データストレージ（`src/data/`）
- **LocalStorage** - 認証セッション管理
- **React Context API** - グローバル状態管理

---

## プロジェクト構成

```
match_pf/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── chat/[userId]/      # 1対1チャット
│   │   ├── jobs/               # 案件一覧
│   │   ├── login/              # ログイン
│   │   ├── notifications/      # 通知
│   │   ├── settings/           # 設定
│   │   ├── timeline/           # タイムライン
│   │   ├── userlist/           # ユーザー一覧
│   │   └── page.tsx            # ダッシュボード
│   ├── components/             # 再利用可能コンポーネント
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
├── docs/                       # プロジェクト文書
└── public/                     # 静的ファイル
```

---

## 機能一覧

### 🔐 認証・ユーザー管理

#### 実装済み機能
- **認証システム**: メールアドレス＋パスワードでのログイン
- **AuthProvider**: React Context APIによるグローバル認証状態管理
- **認証ガード**: 未認証ユーザーの自動リダイレクト
- **セッション管理**: LocalStorageによる認証状態維持
- **ロールベース認証**: 管理者（admin）と作業者（worker）の区別

#### 機能詳細
- ユーザー登録（事前一括登録を前提）
- メールアドレス＋パスワードでログイン
- プロフィール管理
  - 氏名、ニックネーム、メールアドレス
  - ロール（admin/worker）
  - 作成日時・更新日時
- 自動ログアウト機能
- プライバシー保護設定

---

### 💼 案件管理機能

#### 実装済み機能
- **案件一覧表示**: カード形式UI
- **案件詳細表示**: 詳細情報の表示
- **お気に入り機能**: 案件のお気に入り登録・解除
- **案件検索・フィルター**: 条件による絞り込み

#### 案件項目
- **案件名**: 業務内容のタイトル
- **期間**: 開始日〜終了日
- **勤務地**: 作業場所
- **時給**: 時間当たりの報酬
- **募集人数**: 必要な人員数
- **備考欄**: 詳細な作業内容・条件
- **お気に入り**: ユーザーごとのお気に入り状態
- **ステータス**: 募集状況（募集中、募集終了など）

#### 表示方法
- カード形式UIで実装、1案件1カード
- レスポンシブデザイン対応
- 無限スクロール対応予定

---

### 💬 チャット機能

#### 実装済み機能
- **1対1チャット**: 完全実装
  - 動的ルーティング `/chat/[userId]`
  - チャットルーム自動作成・取得
  - リアルタイムメッセージ送受信
  - 楽観的UI更新
- **メッセージ表示**: 完全実装
  - 自分の発言：右寄せ（青色吹き出し）
  - 相手の発言：左寄せ（白色吹き出し）
  - 発言者アイコン（頭文字）とニックネーム表示
  - 時刻表示（メッセージ枠外の右下）
  - 日付区切り表示
- **チャット画面UI**: 完全実装
  - レスポンシブデザイン
  - メッセージ自動スクロール
  - 送信状態表示
  - エラーハンドリング

#### 機能詳細
- **メッセージ送信**: テキストメッセージの送受信
- **チャットルーム管理**: 参加者の管理
- **メッセージ履歴**: 過去の会話履歴の保持
- **リアルタイム更新**: 新しいメッセージの自動表示
- **通知機能**: 新着メッセージの通知

---

### 🧭 ナビゲーション機能

#### 実装済み機能
- **下部ナビゲーション**: 5つのタブ構成
  - 案件（Briefcase）- 案件一覧
  - ユーザー（Users）- ユーザー一覧  
  - トーク（MessageCircle）- チャット機能
  - 通知（Bell）- お知らせ機能
  - 設定（Settings）- 設定画面
- **アクティブ状態管理**: URLパスによる自動判定
- **レスポンシブ対応**: スマホサイズでテキスト短縮
- **Lucide Reactアイコン**: 統一されたアイコンデザイン

---

### 👥 ユーザー管理機能

#### 実装済み機能
- **ユーザー一覧**: 登録ユーザーの表示
- **ユーザー検索**: 名前・ニックネームでの検索
- **プロフィール表示**: ユーザー情報の詳細表示
- **チャット開始**: ユーザー一覧からのチャット開始

#### 機能詳細
- ユーザー情報の表示（氏名、ニックネーム、ロール）
- アイコン表示（頭文字アイコン）
- オンライン状態表示（将来実装予定）
- ユーザー検索・フィルター

---

### 📱 その他の機能

#### 実装済み機能
- **レスポンシブデザイン**: モバイル・デスクトップ対応
- **ダークモード対応**: 基本的なテーマ切り替え
- **アクセシビリティ**: 基本的なWCAG対応
- **プライバシー保護**: 個人情報の適切な管理

#### 実装予定機能
- **お知らせ機能**: 運営からの通知
- **タイムライン機能**: 社内掲示板
- **設定機能**: ユーザー設定・プリファレンス
- **プッシュ通知**: リアルタイム通知

---

## データ構造

### ユーザーデータ（users.json）
```typescript
interface User {
  id: string;
  username: string;
  email: string;
  nickname: string;
  role: 'admin' | 'worker';
  createdAt: string;
  updatedAt: string;
}
```

### 案件データ（jobs.json）
```typescript
interface Job {
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
```

### チャットルームデータ（chatRooms.json）
```typescript
interface ChatRoom {
  id: string;
  name: string | null;
  isGroup: boolean;
  participants: string[];
  createdAt: string;
  updatedAt: string;
}
```

### メッセージデータ（messages.json）
```typescript
interface Message {
  id: string;
  chatRoomId: string;
  senderId: string;
  content: string;
  messageType: 'text';
  sentAt: string;
}
```

---

## テストデータ

### テストユーザー
- **テスト用管理者**: test@example.com（password: password）
- **テスト用作業者**: user1@example.com（password: password）
- **テスト用作業者**: user2@example.com（password: password）

### テスト案件
- 大型物流センター 仕分け作業
- 食品倉庫 ピッキング作業
- アパレル倉庫 検品・梱包
- 家電量販店 配送準備作業
- EC物流センター 出荷作業

### テストチャット
- 各ユーザー間の1対1チャット
- 複数のテストメッセージ
- 日付区切りのテスト

---

## 開発・デプロイ

### 開発環境
```bash
# 開発サーバー起動
npm run dev

# ビルド
npm run build

# 本番サーバー起動
npm run start

# コード品質チェック
npm run lint
```

### デプロイ環境
- **Vercel**: 本番環境のホスティング
- **GitHub**: ソースコード管理
- **自動デプロイ**: GitHub連携による自動デプロイ

---

## 今後の拡張予定

### 短期的改善
- プッシュ通知機能
- 案件応募機能
- 案件ステータス管理
- ユーザープロフィール編集

### 中期的改善
- グループチャット機能
- ファイル共有機能
- 案件検索の高度化
- 管理者ダッシュボード

### 長期的改善
- 外部システム連携
- API化
- マルチテナント対応
- データ分析機能

---

## セキュリティ・プライバシー

### 実装済み
- 認証ガード機能
- セッション管理
- 入力値検証
- XSS対策

### 今後の実装
- CSRF対策
- レート制限
- データ暗号化
- 監査ログ

