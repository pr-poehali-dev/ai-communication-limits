import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

export default function Subscriptions() {
  const { toast } = useToast();

  const handleSubscribe = (plan: string) => {
    toast({
      title: 'Подписка активирована!',
      description: `План "${plan}" успешно оформлен`,
    });
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Выбери свой план
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Получи безлимитный доступ к ИИ и забудь про ограничения
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="p-8 border-border/50 bg-card/50 backdrop-blur hover:border-primary/50 transition-all hover:scale-105">
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center mb-4">
                  <Icon name="Zap" size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Месяц</h3>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    990₽
                  </span>
                  <span className="text-muted-foreground">/месяц</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Icon name="Check" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Безлимитные сообщения</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="Check" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Быстрые ответы</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="Check" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Приоритетная поддержка</span>
                </li>
              </ul>

              <Button 
                onClick={() => handleSubscribe('Месяц')}
                className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
              >
                Оформить
              </Button>
            </Card>

            <Card className="p-8 border-secondary bg-gradient-to-b from-secondary/20 to-card/50 backdrop-blur relative overflow-hidden hover:scale-105 transition-all">
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-gradient-to-br from-secondary to-accent rounded-full blur-3xl opacity-30" />
              
              <div className="relative">
                <div className="absolute -top-4 right-0 bg-gradient-to-r from-secondary to-accent text-white text-xs font-bold px-3 py-1 rounded-full">
                  ПОПУЛЯРНЫЙ
                </div>
                
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-secondary to-secondary/50 flex items-center justify-center mb-4">
                    <Icon name="Sparkles" size={32} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Полгода</h3>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-4xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                      4990₽
                    </span>
                    <span className="text-muted-foreground">/6 месяцев</span>
                  </div>
                  <p className="text-sm text-secondary mt-2 font-semibold">Экономия 16%</p>
                </div>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <Icon name="Check" size={20} className="text-secondary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Все из плана "Месяц"</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon name="Check" size={20} className="text-secondary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Ранний доступ к новым функциям</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon name="Check" size={20} className="text-secondary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Персональные настройки ИИ</span>
                  </li>
                </ul>

                <Button 
                  onClick={() => handleSubscribe('Полгода')}
                  className="w-full bg-gradient-to-r from-secondary to-accent hover:opacity-90"
                >
                  Оформить
                </Button>
              </div>
            </Card>

            <Card className="p-8 border-border/50 bg-card/50 backdrop-blur hover:border-accent/50 transition-all hover:scale-105">
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-accent to-accent/50 flex items-center justify-center mb-4">
                  <Icon name="Crown" size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Год</h3>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-4xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                    8990₽
                  </span>
                  <span className="text-muted-foreground">/год</span>
                </div>
                <p className="text-sm text-accent mt-2 font-semibold">Экономия 24%</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Icon name="Check" size={20} className="text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Все из плана "Полгода"</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="Check" size={20} className="text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">VIP поддержка 24/7</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="Check" size={20} className="text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">API доступ</span>
                </li>
              </ul>

              <Button 
                onClick={() => handleSubscribe('Год')}
                className="w-full bg-gradient-to-r from-accent to-primary hover:opacity-90"
              >
                Оформить
              </Button>
            </Card>
          </div>

          <div className="mt-16 text-center">
            <p className="text-muted-foreground mb-4">
              💳 Принимаем все способы оплаты • 🔒 Безопасные платежи • ❌ Отмена в любой момент
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
