# 🎨 UI設計書（マッチングプラットフォーム）

## 基本方針

- **モダンでクリーンなデザイン**: Tailwind CSSによるユーティリティファースト
- **レスポンシブデザイン**: モバイルファーストアプローチ
- **アクセシビリティ**: 適切なコントラスト比とフォーカス管理
- **ユーザビリティ**: 直感的な操作とフィードバック

### 配色システム
- **プライマリカラー**: Blue-600 (#2563eb) - ボタン、アクティブ状態
- **セカンダリカラー**: Gray-600 (#4b5563) - テキスト、アイコン
- **背景カラー**: Gray-50 (#f9fafb) - 全体背景
- **ホワイト**: #ffffff - カード、メッセージ背景
- **アクセントカラー**: Blue-100 (#dbeafe) - 自分のアイコン背景
- **成功色**: Green-500 (#10b981) - 成功メッセージ
- **警告色**: Yellow-500 (#f59e0b) - 警告メッセージ
- **エラー色**: Red-500 (#ef4444) - エラーメッセージ

### タイポグラフィ
- **フォント**: システムフォント（font-sans）
- **本文**: text-sm (14px) - メッセージ内容、説明文
- **見出し**: font-medium - ユーザー名、タイトル
- **補助テキスト**: text-xs (12px) - 時刻、ステータス
- **大見出し**: text-lg (18px) - ページタイトル

---

## 🔐 認証画面設計

### ログイン画面
```typescript
// 構成要素
- プラットフォームロゴ
- メールアドレス入力フィールド
- パスワード入力フィールド
- ログインボタン
- 新規登録リンク

// スタイリング
- 中央配置レイアウト
- 白背景カード
- シャドウ効果
- フォーカスリング
```

#### 実装詳細
- **フォーム検証**: リアルタイムバリデーション
- **エラー表示**: 入力フィールド下にエラーメッセージ
- **ローディング状態**: ボタンでスピナー表示
- **レスポンシブ**: モバイルで画面幅いっぱいに拡張

---

## 💼 案件管理UI設計

### 案件一覧画面
```typescript
// カード設計
- 案件タイトル: font-medium text-lg
- 期間: text-sm text-gray-600
- 勤務地: text-sm text-gray-600
- 時給: text-lg font-bold text-blue-600
- 募集人数: text-sm
- お気に入りアイコン: Heart（塗りつぶし/アウトライン）

// レイアウト
- グリッドレイアウト（デスクトップ: 2列、モバイル: 1列）
- カード間のスペース: gap-4
- ホバー効果: shadow-lg
```

#### 実装詳細
```typescript
// 案件カード
<div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200 p-6">
  <div className="flex justify-between items-start mb-4">
    <h3 className="text-lg font-medium text-gray-900">{job.title}</h3>
    <button className="text-gray-400 hover:text-red-500">
      <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500' : ''}`} />
    </button>
  </div>
  
  <div className="space-y-2 mb-4">
    <div className="flex items-center text-sm text-gray-600">
      <Calendar className="w-4 h-4 mr-2" />
      {job.period}
    </div>
    <div className="flex items-center text-sm text-gray-600">
      <MapPin className="w-4 h-4 mr-2" />
      {job.location}
    </div>
  </div>
  
  <div className="flex justify-between items-center">
    <span className="text-lg font-bold text-blue-600">
      ¥{job.hourlyWage}/時
    </span>
    <span className="text-sm text-gray-500">
      募集{job.recruitNumber}名
    </span>
  </div>
</div>
```

### 案件詳細画面
- **ヘッダー**: 案件タイトル + お気に入りボタン
- **基本情報**: 期間、勤務地、時給、募集人数
- **詳細説明**: 業務内容の詳細
- **アクションボタン**: 応募ボタン（将来実装）
- **チャットボタン**: 管理者との1対1チャット

---

## 🧭 ナビゲーション設計

### 下部ナビゲーション（実装済み）

**5つのタブ構成**:
1. **案件** (Briefcase) - 案件一覧
2. **ユーザー** (Users) - ユーザー一覧
3. **トーク** (MessageCircle) - チャット機能
4. **通知** (Bell) - お知らせ機能
5. **設定** (Settings) - 設定画面

#### 実装詳細
```typescript
// レスポンシブ対応
- デスクトップ: フルラベル表示
- モバイル(sm未満): 短縮ラベル（通知→通知、タイムライン→TL）

// 状態管理
- アクティブタブ: blue-600 + blue-50背景
- 非アクティブタブ: gray-500 + hover:gray-700

// アイコンライブラリ
- Lucide React使用（軽量、一貫性）
```

#### 実装コード
```typescript
<nav className="bg-white border-t border-gray-200 px-4 py-2">
  <div className="flex justify-around">
    {navigation.map((item) => {
      const isActive = pathname === item.href || 
        (item.href === '/talk' && pathname.startsWith('/chat'));
      
      return (
        <Link
          key={item.name}
          href={item.href}
          className={`flex flex-col items-center py-2 px-3 rounded-md ${
            isActive
              ? 'text-blue-600 bg-blue-50'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <item.icon className="w-6 h-6 mb-1" />
          <span className="text-xs">
            {item.name}
          </span>
        </Link>
      );
    })}
  </div>
</nav>
```

---

## 💬 チャット機能UI設計

### ユーザー一覧画面（トーク）
```typescript
// ユーザーカード設計
- アイコン: 頭文字表示（8x8サイズ）
- ユーザー名: font-medium
- ニックネーム: text-sm text-gray-600
- ロール表示: バッジ形式
- 最終ログイン: text-xs text-gray-400

// レイアウト
- リスト形式
- 区切り線: border-b
- ホバー効果: hover:bg-gray-50
```

#### 実装詳細
```typescript
<div className="bg-white">
  {users.map((user) => (
    <Link
      key={user.id}
      href={`/chat/${user.id}`}
      className="flex items-center p-4 hover:bg-gray-50 border-b border-gray-200 last:border-b-0"
    >
      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-4">
        <span className="text-lg font-medium text-gray-600">
          {user.nickname.charAt(0)}
        </span>
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-gray-900">{user.nickname}</h3>
          <span className={`px-2 py-1 text-xs rounded-full ${
            user.role === 'admin' 
              ? 'bg-blue-100 text-blue-800' 
              : 'bg-gray-100 text-gray-800'
          }`}>
            {user.role === 'admin' ? '管理者' : '作業者'}
          </span>
        </div>
        <p className="text-sm text-gray-600">{user.username}</p>
      </div>
    </Link>
  ))}
</div>
```

### 1対1チャット画面（実装済み）

#### ヘッダー設計
```typescript
// 構成要素
- 戻るボタン（ArrowLeft）
- 相手のアイコン（頭文字）
- 相手の名前 + オンライン状態
- メニューボタン（MoreVertical）

// スタイリング
- 白背景 + 下ボーダー
- シャドウ効果
- レスポンシブパディング
```

#### メッセージエリア設計
**吹き出しUI実装**:

```typescript
// 自分のメッセージ（右寄せ）
- 背景: bg-blue-600（青色）
- テキスト: text-white
- 配置: justify-end + flex-row-reverse
- 角丸: rounded-br-sm（右下角を直角に）

// 相手のメッセージ（左寄せ）
- 背景: bg-white + border
- テキスト: text-gray-900
- 配置: justify-start + flex-row
- 角丸: rounded-bl-sm（左下角を直角に）
```

**メッセージ表示の実装**:
```typescript
<div className={`flex items-end space-x-2 ${isMyMessage ? 'justify-end' : 'justify-start'}`}>
  {!isMyMessage && (
    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
      <span className="text-sm font-medium text-gray-600">
        {message.sender.nickname.charAt(0)}
      </span>
    </div>
  )}
  
  <div className="flex flex-col max-w-xs lg:max-w-md">
    {!isMyMessage && (
      <span className="text-xs text-gray-500 mb-1">
        {message.sender.nickname}
      </span>
    )}
    
    <div className={`px-4 py-2 rounded-lg ${
      isMyMessage 
        ? 'bg-blue-600 text-white rounded-br-sm' 
        : 'bg-white border border-gray-200 text-gray-900 rounded-bl-sm'
    }`}>
      {message.content}
    </div>
    
    <span className={`text-xs text-gray-400 mt-1 ${
      isMyMessage ? 'text-right mr-2' : 'text-left ml-2'
    }`}>
      {formatTime(message.sentAt)}
    </span>
  </div>
  
  {isMyMessage && (
    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
      <span className="text-sm font-medium text-blue-600">
        {message.sender.nickname.charAt(0)}
      </span>
    </div>
  )}
</div>
```

#### メッセージ入力エリア
```typescript
// 構成
- テキスト入力: rounded-full + focus:ring
- 送信ボタン: 条件付きスタイル + Send アイコン
- 添付ファイルボタン: Paperclip アイコン（将来実装）

// 状態管理
- 送信中: disabled + visual feedback
- 楽観的UI: 即座な表示更新
- エラー処理: 入力内容復元
```

### 日付・時刻表示設計

#### フォーマット仕様
```typescript
// 日付区切り
- 今日: "今日"
- 昨日: "昨日"
- それ以外: "2024/01/15"形式

// 時刻表示
- フォーマット: "HH:MM"（24時間制）
- ロケール: ja-JP
```

---

## 👥 ユーザー管理UI設計

### ユーザー一覧画面
```typescript
// 検索バー
- 検索アイコン: Search
- プレースホルダー: "ユーザーを検索..."
- リアルタイム検索

// ユーザーカード
- プロフィール画像: 頭文字アイコン
- ユーザー名: font-medium
- ニックネーム: text-sm text-gray-600
- ロールバッジ: 管理者/作業者
- チャットボタン: MessageCircle アイコン
```

#### 実装詳細
```typescript
// 検索機能
const [searchTerm, setSearchTerm] = useState('');
const filteredUsers = users.filter(user =>
  user.nickname.toLowerCase().includes(searchTerm.toLowerCase()) ||
  user.username.toLowerCase().includes(searchTerm.toLowerCase())
);

// 検索バー
<div className="relative mb-4">
  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
  <input
    type="text"
    placeholder="ユーザーを検索..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
  />
</div>
```

---

## 📱 レスポンシブデザイン設計

### ブレークポイント戦略
```css
/* Tailwind CSS ブレークポイント */
- sm: 640px以上（タブレット）
- md: 768px以上（中型タブレット）
- lg: 1024px以上（デスクトップ）
- xl: 1280px以上（大型デスクトップ）

/* 案件カード幅制御 */
- モバイル: w-full （全幅）
- タブレット: sm:w-1/2（2列）
- デスクトップ: lg:w-1/3（3列）

/* メッセージ幅制御 */
- モバイル: max-w-xs (20rem)
- デスクトップ: lg:max-w-md (28rem)
```

### モバイル最適化
- **タッチ対応**: 適切なタッチターゲットサイズ（44px以上）
- **スクロール**: 慣性スクロール対応
- **キーボード**: 入力時のビューポート調整
- **フォント**: 読みやすいフォントサイズ

#### 実装例
```typescript
// レスポンシブグリッド
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  {jobs.map((job) => (
    <JobCard key={job.id} job={job} />
  ))}
</div>

// レスポンシブナビゲーション
<nav className="bg-white border-t border-gray-200 px-2 sm:px-4 py-2">
  <div className="flex justify-around max-w-screen-lg mx-auto">
    {navigation.map((item) => (
      <Link
        key={item.name}
        href={item.href}
        className="flex flex-col items-center py-2 px-1 sm:px-3 rounded-md"
      >
        <item.icon className="w-5 h-5 sm:w-6 sm:h-6 mb-1" />
        <span className="text-xs sm:text-sm">
          {item.name}
        </span>
      </Link>
    ))}
  </div>
</nav>
```

---

## 🎨 コンポーネント設計

### 共通コンポーネント

#### ボタンコンポーネント
```typescript
// Primary Button
<button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
  プライマリボタン
</button>

// Secondary Button
<button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors duration-200">
  セカンダリボタン
</button>

// Outline Button
<button className="border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200">
  アウトラインボタン
</button>
```

#### 入力フィールド
```typescript
// Text Input
<input
  type="text"
  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
  placeholder="プレースホルダー"
/>

// Error State
<input
  type="text"
  className="w-full px-3 py-2 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
/>
<p className="text-sm text-red-600 mt-1">エラーメッセージ</p>
```

#### カードコンポーネント
```typescript
// Basic Card
<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
  <h3 className="text-lg font-medium mb-4">カードタイトル</h3>
  <p className="text-gray-600">カードの内容</p>
</div>

// Interactive Card
<div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200 p-6 cursor-pointer">
  <h3 className="text-lg font-medium mb-4">インタラクティブカード</h3>
  <p className="text-gray-600">ホバー効果付き</p>
</div>
```

---

## 🔄 アニメーション・トランジション

### 基本トランジション
```css
/* ホバー効果 */
.transition-all { transition: all 0.2s ease-in-out; }
.transition-colors { transition: color 0.2s ease-in-out; }
.transition-shadow { transition: box-shadow 0.2s ease-in-out; }

/* フェードイン */
.fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
```

### メッセージアニメーション
```typescript
// 新しいメッセージの表示アニメーション
<div className="animate-fade-in">
  <MessageBubble message={message} />
</div>

// 送信中のローディングアニメーション
<div className="flex items-center space-x-2">
  <div className="animate-pulse w-2 h-2 bg-gray-400 rounded-full"></div>
  <div className="animate-pulse w-2 h-2 bg-gray-400 rounded-full animation-delay-200"></div>
  <div className="animate-pulse w-2 h-2 bg-gray-400 rounded-full animation-delay-400"></div>
</div>
```

---

## 📊 データ表示設計

### 統計情報表示
```typescript
// 案件統計
<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
  <div className="bg-white p-6 rounded-lg shadow-sm">
    <div className="text-2xl font-bold text-blue-600">12</div>
    <div className="text-sm text-gray-600">募集中の案件</div>
  </div>
  <div className="bg-white p-6 rounded-lg shadow-sm">
    <div className="text-2xl font-bold text-green-600">5</div>
    <div className="text-sm text-gray-600">応募済み</div>
  </div>
</div>
```

### 空状態の表示
```typescript
// データなし状態
<div className="text-center py-12">
  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
    <Search className="w-8 h-8 text-gray-400" />
  </div>
  <h3 className="text-lg font-medium text-gray-900 mb-2">
    案件が見つかりません
  </h3>
  <p className="text-gray-600">
    検索条件を変更してください
  </p>
</div>
```

---

## 🚀 パフォーマンス最適化

### 画像最適化
```typescript
// Next.js Image コンポーネント
import Image from 'next/image';

<Image
  src="/profile-image.jpg"
  alt="プロフィール画像"
  width={48}
  height={48}
  className="rounded-full"
  priority // 重要な画像に対して
/>
```

### 遅延読み込み
```typescript
// React.lazy を使用した遅延読み込み
const ChatPage = React.lazy(() => import('./ChatPage'));

// 使用時
<Suspense fallback={<div>読み込み中...</div>}>
  <ChatPage />
</Suspense>
```

---

## 💡 今後の改善点

### 短期的改善
- **ダークモード**: 完全なダークモード対応
- **アニメーション**: より滑らかなアニメーション
- **アクセシビリティ**: キーボードナビゲーション強化
- **パフォーマンス**: 仮想スクロール導入

### 中期的改善
- **デザインシステム**: 統一されたデザインシステム構築
- **コンポーネントライブラリ**: 共通コンポーネントの体系化
- **テーマ機能**: カスタマイズ可能なテーマ
- **国際化**: 多言語対応

### 長期的改善
- **PWA化**: オフライン対応
- **ネイティブアプリ**: React Native版の開発
- **音声UI**: 音声操作対応
- **AI統合**: チャットボット機能

---

## 📝 デザインガイドライン

### DO's（推奨）
- **一貫性**: 統一されたスタイリング
- **階層**: 明確な情報階層
- **フィードバック**: 適切なユーザーフィードバック
- **アクセシビリティ**: 包括的なデザイン

### DON'Ts（非推奨）
- **過度な装飾**: 機能性を損なう装飾
- **不統一**: 一貫性のないデザイン
- **小さなタッチターゲット**: 44px未満のボタン
- **低コントラスト**: 読みにくい色の組み合わせ

---

このUI設計書により、マッチングプラットフォームの一貫性のある美しいユーザーインターフェースを実現し、優れたユーザー体験を提供します。
