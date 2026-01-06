import { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Привет! Я твой ИИ-ассистент. Чем могу помочь?',
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [messagesLeft, setMessagesLeft] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSend = async () => {
    if (!input.trim()) return;
    
    if (messagesLeft <= 0) {
      toast({
        title: 'Лимит исчерпан',
        description: 'Оформи подписку для безлимитного общения',
        variant: 'destructive',
      });
      return;
    }

    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setMessagesLeft((prev) => prev - 1);

    setTimeout(() => {
      const aiMessage: Message = {
        id: messages.length + 2,
        text: 'Это демо-версия. Подключи GPT API для полноценного общения! Я могу помочь с программированием, написанием текстов, анализом данных и многим другим.',
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <div className="flex-1 pt-24 pb-6 px-4">
        <div className="container mx-auto h-full flex flex-col max-w-4xl">
          <Card className="mb-4 p-4 border-primary/30 bg-gradient-to-r from-primary/10 to-secondary/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold">Сообщений осталось сегодня</span>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {messagesLeft}/10
              </span>
            </div>
            <Progress value={messagesLeft * 10} className="h-2" />
          </Card>

          <Card className="flex-1 flex flex-col border-border/50 bg-card/50 backdrop-blur overflow-hidden">
            <ScrollArea className="flex-1 p-6">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-r from-primary to-secondary text-white'
                          : 'bg-muted text-foreground'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-2xl px-4 py-3">
                      <div className="flex gap-2">
                        <div className="w-2 h-2 rounded-full bg-foreground/40 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 rounded-full bg-foreground/40 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 rounded-full bg-foreground/40 animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            <div className="p-4 border-t border-border/50">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Напиши сообщение..."
                  className="flex-1 bg-background border-border/50"
                  disabled={isLoading || messagesLeft <= 0}
                />
                <Button
                  onClick={handleSend}
                  disabled={isLoading || messagesLeft <= 0 || !input.trim()}
                  className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                >
                  <Icon name="Send" size={20} />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
