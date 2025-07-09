# 🤝 Match Platform - マッチングプラットフォーム

<div align="center">
  <p>
    <img src="https://img.shields.io/badge/Next.js-15.3.5-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  </p>
</div>

## 📋 プロジェクト概要

**Match Platform** は、効率的な人材マッチングを実現するモダンなWebアプリケーションです。管理者と作業者を繋ぐプラットフォームとして、案件の投稿・応募からリアルタイムコミュニケーションまでを一元管理できます。

## ✨ 主な機能

### 🔐 認証・ユーザー管理
- **セキュアなログイン・登録システム**
- **ロールベースアクセス制御**（管理者・作業者）
- **プライバシー保護設定**

### 💼 案件管理
- **直感的な案件投稿・編集**
- **詳細な案件情報表示**（時給、期間、場所、募集人数）
- **お気に入り機能**
- **ステータス管理**

### 💬 コミュニケーション
- **リアルタイムチャット機能**
- **1対1 & グループチャット対応**
- **メッセージ履歴管理**
- **通知システム**

### 👥 ユーザー機能
- **ユーザー一覧・検索**
- **プロフィール管理**
- **タイムライン表示**
- **カスタマイズ可能な設定**

## 🛠️ 技術スタック

### Frontend
- **Next.js 15.3.5** - React フレームワーク
- **React 19.0.0** - UI ライブラリ
- **TypeScript** - 型安全性
- **Tailwind CSS** - モダンなスタイリング
- **Lucide React** - アイコンライブラリ

### 開発環境
- **ESLint** - コード品質管理
- **Turbopack** - 高速開発サーバー

## 🚀 クイックスタート

### 必要要件
- Node.js 18.0以上
- npm または yarn

### インストール

```bash
# リポジトリをクローン
git clone https://github.com/SMZzzzzzz/match-pf.git
cd match-pf

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev
```

### 利用可能なコマンド

```bash
npm run dev      # 開発サーバー起動 (Turbopack使用)
npm run build    # 本番ビルド
npm run start    # 本番サーバー起動
npm run lint     # コード品質チェック
```

## 📱 アプリケーション構成

```
src/
├── app/                    # Next.js App Router
│   ├── chat/              # チャット機能
│   ├── jobs/              # 案件管理
│   ├── login/             # 認証
│   ├── notifications/     # 通知
│   ├── settings/          # 設定
│   ├── timeline/          # タイムライン
│   └── userlist/          # ユーザー一覧
├── components/            # 再利用可能コンポーネント
│   ├── AuthProvider.tsx   # 認証プロバイダー
│   ├── AuthGuard.tsx      # 認証ガード
│   └── BottomNavigation.tsx # ナビゲーション
├── data/                  # モックデータ
├── lib/                   # ユーティリティ
└── types/                 # TypeScript型定義
```

## 🌟 特徴

### 🎨 モダンなUI/UX
- **レスポンシブデザイン**
- **ダークモード対応**
- **直感的なナビゲーション**
- **アクセシビリティ対応**

### 🔒 セキュリティ
- **認証ガード機能**
- **プライバシー保護**
- **ロールベースアクセス制御**

### ⚡ パフォーマンス
- **Next.js 15の最新機能活用**
- **Turbopack による高速開発**
- **TypeScript による型安全性**

## 🤝 コントリビューション

プロジェクトへの貢献を歓迎します！

1. このリポジトリをフォーク
2. 新しい機能ブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📄 ライセンス

このプロジェクトはプライベートリポジトリです。

## 🔗 リンク

- **GitHub**: [https://github.com/SMZzzzzzz/match-pf](https://github.com/SMZzzzzzz/match-pf)
- **デプロイ**: Vercel でホスティング予定

---

<div align="center">
  <p>🚀 <strong>Match Platform</strong> で効率的な人材マッチングを実現しましょう！</p>
</div>
