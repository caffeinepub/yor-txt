import { useNavigate, useRouterState } from '@tanstack/react-router';
import { BookOpen, Home, LogIn, PenLine } from 'lucide-react';
import AuthStatus from './AuthStatus';

export default function Header() {
  const navigate = useNavigate();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/stories', label: 'Stories', icon: BookOpen },
    { path: '/login', label: 'Login', icon: LogIn },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-custom">
        <div className="flex h-16 items-center justify-between">
          <button
            onClick={() => navigate({ to: '/' })}
            className="flex items-center gap-2 text-lg font-semibold transition-colors hover:text-primary"
          >
            <PenLine className="h-6 w-6 text-primary" />
            <span className="hidden sm:inline">yor txt</span>
          </button>

          <nav className="flex items-center gap-1 sm:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate({ to: item.path })}
                  className={`flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </button>
              );
            })}
            <div className="ml-2 border-l border-border pl-2">
              <AuthStatus />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
