import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function Index() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <div className="inline-block mb-6 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30">
            <span className="text-sm font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              ✨ Новое поколение ИИ-ассистентов
            </span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent leading-tight">
            Общайся с ИИ
            <br />
            без ограничений
          </h1>
          
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Мощный искусственный интеллект на основе GPT для решения любых задач. 
            Получи 10 бесплатных сообщений каждый день.
          </p>
          
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity text-lg px-8">
              <Link to="/chat">
                <Icon name="MessageSquare" size={20} className="mr-2" />
                Начать общение
              </Link>
            </Button>
            
            <Button asChild size="lg" variant="outline" className="text-lg px-8 border-primary/30 hover:bg-primary/10">
              <Link to="/subscriptions">
                <Icon name="Zap" size={20} className="mr-2" />
                Безлимит
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      <section className="py-20 px-4 bg-gradient-to-b from-transparent to-muted/30">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Почему выбирают нас?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 border-border/50 bg-card/50 backdrop-blur hover:border-primary/50 transition-all hover:scale-105">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center mb-6">
                <Icon name="Zap" size={28} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Молниеносно быстро</h3>
              <p className="text-muted-foreground">
                Получай ответы за секунды. Наша инфраструктура обеспечивает минимальную задержку.
              </p>
            </Card>
            
            <Card className="p-8 border-border/50 bg-card/50 backdrop-blur hover:border-secondary/50 transition-all hover:scale-105">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-secondary to-secondary/50 flex items-center justify-center mb-6">
                <Icon name="Brain" size={28} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Умный ИИ</h3>
              <p className="text-muted-foreground">
                На базе новейших моделей GPT. Понимает контекст и дает точные ответы.
              </p>
            </Card>
            
            <Card className="p-8 border-border/50 bg-card/50 backdrop-blur hover:border-accent/50 transition-all hover:scale-105">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-accent/50 flex items-center justify-center mb-6">
                <Icon name="Shield" size={28} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Безопасность</h3>
              <p className="text-muted-foreground">
                Твои данные защищены. Все сообщения шифруются и хранятся конфиденциально.
              </p>
            </Card>
          </div>
        </div>
      </section>
      
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Готов начать?
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Попробуй бесплатно 10 сообщений в день или получи безлимитный доступ с подпиской
          </p>
          <Button asChild size="lg" className="bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 transition-opacity text-lg px-10">
            <Link to="/chat">
              <Icon name="Rocket" size={20} className="mr-2" />
              Начать сейчас
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
