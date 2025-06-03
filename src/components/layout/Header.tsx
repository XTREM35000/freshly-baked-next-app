
import { Link } from 'react-router-dom';
import { UserAvatarMenu } from './UserAvatarMenu';
import { ThemeToggle } from '@/components/ui/theme-toggle';

export function Header() {
  return (
    <header className="bg-white dark:bg-background border-b border-gray-200 dark:border-gray-800 px-4 py-3">
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-md bg-gradient-primary">
            <span className="text-sm font-bold text-white">G3</span>
          </div>
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            Gogo AutoAssure
          </span>
        </Link>
        
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <UserAvatarMenu />
        </div>
      </div>
    </header>
  );
}
