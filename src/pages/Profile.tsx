import { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

export default function Profile() {
  const [messagesUsed] = useState(0);
  const [messagesLimit] = useState(10);
  const [subscription] = useState<string | null>(null);

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Мой профиль
          </h1>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="md:col-span-1 p-6 border-border/50 bg-card/50 backdrop-blur text-center">
              <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-primary/30">
                <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-3xl font-bold">
                  U
                </AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold mb-2">Пользователь</h2>
              <p className="text-sm text-muted-foreground mb-4">user@example.com</p>
              
              {subscription ? (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30">
                  <Icon name="Crown" size={16} className="text-primary" />
                  <span className="text-sm font-semibold text-primary">Premium</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted">
                  <Icon name="User" size={16} className="text-muted-foreground" />
                  <span className="text-sm font-semibold text-muted-foreground">Бесплатный</span>
                </div>
              )}
            </Card>

            <Card className="md:col-span-2 p-6 border-border/50 bg-card/50 backdrop-blur">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Icon name="BarChart" size={24} className="text-primary" />
                Статистика использования
              </h3>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-semibold">Сообщений сегодня</span>
                    <span className="text-sm font-bold text-primary">{messagesUsed}/{messagesLimit}</span>
                  </div>
                  <Progress value={(messagesUsed / messagesLimit) * 100} className="h-3" />
                  <p className="text-xs text-muted-foreground mt-2">
                    Осталось {messagesLimit - messagesUsed} бесплатных сообщений
                  </p>
                </div>

                {!subscription && (
                  <div className="p-4 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/30">
                    <div className="flex items-start gap-3">
                      <Icon name="Sparkles" size={24} className="text-primary flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">Получи безлимитный доступ</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Оформи подписку и общайся с ИИ без ограничений
                        </p>
                        <Button asChild size="sm" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                          <Link to="/subscriptions">
                            <Icon name="Zap" size={16} className="mr-2" />
                            Выбрать план
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-muted">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon name="MessageSquare" size={20} className="text-primary" />
                      <span className="text-sm text-muted-foreground">Всего сообщений</span>
                    </div>
                    <p className="text-2xl font-bold">156</p>
                  </div>

                  <div className="p-4 rounded-lg bg-muted">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon name="Calendar" size={20} className="text-secondary" />
                      <span className="text-sm text-muted-foreground">Дней с нами</span>
                    </div>
                    <p className="text-2xl font-bold">23</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <Card className="mt-8 p-6 border-border/50 bg-card/50 backdrop-blur">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Icon name="Settings" size={24} className="text-primary" />
              Настройки
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted hover:bg-muted/80 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <Icon name="Bell" size={20} className="text-muted-foreground" />
                  <span className="font-medium">Уведомления</span>
                </div>
                <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-muted hover:bg-muted/80 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <Icon name="Lock" size={20} className="text-muted-foreground" />
                  <span className="font-medium">Безопасность</span>
                </div>
                <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-muted hover:bg-muted/80 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <Icon name="HelpCircle" size={20} className="text-muted-foreground" />
                  <span className="font-medium">Помощь и поддержка</span>
                </div>
                <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
