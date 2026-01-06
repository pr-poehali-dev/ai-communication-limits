import { Link, useLocation } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

export default function Navigation() {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Icon name="Sparkles" size={24} className="text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              AI Chat
            </span>
          </Link>
          
          <div className="flex items-center gap-2">
            <Button
              variant={isActive('/') ? 'default' : 'ghost'}
              asChild
              className="transition-all"
            >
              <Link to="/">
                <Icon name="Home" size={18} className="mr-2" />
                Главная
              </Link>
            </Button>
            
            <Button
              variant={isActive('/chat') ? 'default' : 'ghost'}
              asChild
              className="transition-all"
            >
              <Link to="/chat">
                <Icon name="MessageSquare" size={18} className="mr-2" />
                Чат
              </Link>
            </Button>
            
            <Button
              variant={isActive('/subscriptions') ? 'default' : 'ghost'}
              asChild
              className="transition-all"
            >
              <Link to="/subscriptions">
                <Icon name="CreditCard" size={18} className="mr-2" />
                Подписки
              </Link>
            </Button>
            
            <Button
              variant={isActive('/profile') ? 'default' : 'ghost'}
              asChild
              className="transition-all"
            >
              <Link to="/profile">
                <Icon name="User" size={18} className="mr-2" />
                Профиль
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
