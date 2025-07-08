# フロントエンド開発セットアップ

このドキュメントでは、SNSチャットアプリケーションのフロントエンド開発に必要なセットアップ手順を説明します。

## ディレクトリの作成

1. `src/frontend` ディレクトリを作成しました。
   ```bash
   mkdir src/frontend
   ```

## Reactプロジェクトの初期化

1. `create-react-app`を使用して、TypeScriptテンプレートでReactプロジェクトを初期化しました。
   ```bash
   npx create-react-app src/frontend --template typescript --yes
   ```

## Axiosのインストールと設定

1. フロントエンドプロジェクト内でAxiosをインストールしました。
   ```bash
   cd src/frontend
   npm install axios
   ```

2. `src/frontend/src/api/axiosConfig.ts` ファイルを作成し、Axiosの基本設定を行いました。
   ```typescript
   import axios from 'axios';

   const apiClient = axios.create({
     baseURL: 'http://http://172.25.139.146/:3000/api', // バックエンドAPIのベースURLを設定
     headers: {
       'Content-Type': 'application/json',
     },
   });

   export default apiClient;
   ```

## 開発サーバーの起動

1. 開発サーバーを起動して、アプリケーションをブラウザで確認します。
   ```bash
   npm start
   ```

これにより、フロントエンドからバックエンドAPIを呼び出す準備が整いました。次のステップとして、UIコンポーネントの作成やルーティングの設定を行います。

## 使用したコマンド

以下は、フロントエンド開発のセットアップ中に使用したコマンドの一覧です。

1. ディレクトリの作成:
   ```bash
   mkdir src/frontend
   ```

2. Reactプロジェクトの初期化:
   ```bash
   npx create-react-app src/frontend --template typescript --yes
   ```

3. Axiosのインストール:
   ```bash
   cd src/frontend
   npm install axios
   ```

4. 開発サーバーの起動:
   ```bash
   npm start
   ```

これらのコマンドを使用して、フロントエンドの基本的なセットアップを完了しました。 

### ルーター設定

`useRouter`を使用する際は、最新のNext.jsの機能と互換性を持たせるために、`next/router`ではなく`next/navigation`からインポートしてください。

```javascript
import { useRouter } from 'next/navigation';
```

`useRouter`を使用するすべてのコンポーネントがクライアントコンポーネントであることを確認するために、ファイルの先頭に`'use client';`を追加してください。 