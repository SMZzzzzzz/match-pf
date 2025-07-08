'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import AuthGuard from '@/components/AuthGuard';
import BottomNavigation from '@/components/BottomNavigation';
import { 
  getUserById, 
  findOrCreateDirectChatRoom, 
  getMessagesByRoomId, 
  addMessage 
} from '@/lib/data';
import { Message, MessageWithSender, User, ChatRoom } from '@/types';
import { ArrowLeft, Send, MoreVertical } from 'lucide-react';

// 日付フォーマット関数
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return '今日';
  } else if (date.toDateString() === yesterday.toDateString()) {
    return '昨日';
  } else {
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    });
  }
};

// 時刻フォーマット関数
const formatTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('ja-JP', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
};

// メッセージバブルコンポーネント
const MessageBubble: React.FC<{
  message: MessageWithSender;
  isMyMessage: boolean;
  showDate?: boolean;
}> = ({ message, isMyMessage, showDate }) => {
  const getInitial = (nickname: string): string => {
    return nickname.charAt(0).toUpperCase();
  };

  return (
    <div>
      {/* 日付区切り */}
      {showDate && (
        <div className="flex justify-center my-4">
          <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
            {formatDate(message.sentAt)}
          </span>
        </div>
      )}

      {/* メッセージバブル */}
      <div className={`flex items-start max-w-xs lg:max-w-md mb-4 ${
        isMyMessage ? 'flex-row-reverse ml-auto' : 'flex-row mr-auto'
      }`}>
        {/* アイコン */}
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${
          isMyMessage 
            ? 'bg-blue-100 text-blue-600 ml-2' 
            : 'bg-gray-100 text-gray-600 mr-2'
        }`}>
          {getInitial(message.sender.nickname)}
        </div>

        {/* メッセージコンテンツ */}
        <div className={`flex flex-col ${isMyMessage ? 'items-end' : 'items-start'}`}>
          {/* ニックネーム */}
          <div className={`text-xs text-gray-500 mb-1 ${
            isMyMessage ? 'mr-1' : 'ml-1'
          }`}>
            {message.sender.nickname}
          </div>

          {/* メッセージバブル */}
          <div className={`px-4 py-2 rounded-lg max-w-full break-words ${
            isMyMessage
              ? 'bg-blue-600 text-white rounded-br-sm'
              : 'bg-white border border-gray-200 text-gray-900 rounded-bl-sm'
          }`}>
            {message.content}
          </div>

          {/* 時刻表示 */}
          <div className={`text-xs text-gray-400 mt-1 ${
            isMyMessage ? 'mr-1' : 'ml-1'
          }`}>
            {formatTime(message.sentAt)}
          </div>
        </div>
      </div>
    </div>
  );
};

const ChatPage: React.FC = () => {
  const { userId } = useParams() as { userId: string };
  const { user: currentUser } = useAuth();
  const router = useRouter();
  
  const [targetUser, setTargetUser] = useState<User | null>(null);
  const [chatRoom, setChatRoom] = useState<ChatRoom | null>(null);
  const [messages, setMessages] = useState<MessageWithSender[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 自動スクロール
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // チャットデータの初期化
  useEffect(() => {
    if (!currentUser || !userId) return;

    // 対象ユーザーを取得
    const user = getUserById(userId);
    if (!user) {
      router.push('/userlist');
      return;
    }
    setTargetUser(user);

    // チャットルームを取得または作成
    const room = findOrCreateDirectChatRoom(currentUser.id, userId);
    if (!room) {
      console.error('チャットルームの作成に失敗しました');
      return;
    }
    setChatRoom(room);

    // メッセージを取得
    const roomMessages = getMessagesByRoomId(room.id);
    const messagesWithSender: MessageWithSender[] = roomMessages.map(msg => ({
      ...msg,
      sender: getUserById(msg.senderId) || currentUser
    }));
    setMessages(messagesWithSender);
  }, [currentUser, userId, router]);

  // メッセージ送信
  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !chatRoom || !currentUser || isSending) return;

    setIsSending(true);
    const messageContent = inputMessage.trim();
    setInputMessage(''); // 楽観的UI更新

    try {
      // メッセージを追加
      const newMessage = addMessage({
        chatRoomId: chatRoom.id,
        senderId: currentUser.id,
        content: messageContent,
        messageType: 'text'
      });

      // メッセージリストを更新
      const messageWithSender: MessageWithSender = {
        ...newMessage,
        sender: currentUser
      };
      setMessages(prev => [...prev, messageWithSender]);

    } catch (error) {
      console.error('メッセージ送信エラー:', error);
      setInputMessage(messageContent); // エラー時は入力内容を復元
    } finally {
      setIsSending(false);
    }
  };

  // Enterキーでの送信
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // 戻るボタン
  const handleBack = () => {
    router.push('/userlist');
  };

  if (!targetUser || !currentUser) {
    return (
      <AuthGuard>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <p className="text-gray-600">読み込み中...</p>
        </div>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <div className="flex flex-col h-screen bg-gray-50">
        {/* ヘッダー */}
        <div className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between max-w-md mx-auto">
            <div className="flex items-center">
              <button
                onClick={handleBack}
                className="mr-3 p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-semibold text-sm mr-3">
                {targetUser.nickname.charAt(0).toUpperCase()}
              </div>
              
              <div>
                <h1 className="font-medium text-gray-900">
                  {targetUser.nickname}
                </h1>
                <p className="text-xs text-gray-500">
                  {targetUser.role === 'admin' ? '管理者' : 'アルバイト'}
                </p>
              </div>
            </div>
            
            <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
              <MoreVertical className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* メッセージエリア */}
        <div className="flex-1 overflow-y-auto px-4 py-4 max-w-md mx-auto w-full">
          {messages.length > 0 ? (
            messages.map((message, index) => {
              const isMyMessage = message.senderId === currentUser.id;
              const prevMessage = index > 0 ? messages[index - 1] : null;
              const showDate = !prevMessage || 
                formatDate(message.sentAt) !== formatDate(prevMessage.sentAt);

              return (
                <MessageBubble
                  key={message.id}
                  message={message}
                  isMyMessage={isMyMessage}
                  showDate={showDate}
                />
              );
            })
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">
                {targetUser.nickname}さんとの会話を始めましょう
              </p>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* メッセージ入力エリア */}
        <div className="bg-white border-t border-gray-200 px-4 py-3">
          <div className="flex items-end space-x-2 max-w-md mx-auto">
            <div className="flex-1">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="メッセージを入力..."
                className="w-full px-4 py-2 border border-gray-300 rounded-full resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={1}
                style={{ minHeight: '40px', maxHeight: '120px' }}
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isSending}
              className={`p-2 rounded-full transition-colors ${
                inputMessage.trim() && !isSending
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>

        <BottomNavigation />
      </div>
    </AuthGuard>
  );
};

export default ChatPage; 