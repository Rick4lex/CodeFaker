
'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

export function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render a placeholder to prevent layout shift and hydration errors
    return <div className="fixed bottom-4 right-4 h-12 w-12 rounded-full bg-muted animate-pulse z-50" />;
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="fixed bottom-4 right-4 h-12 w-12 rounded-full shadow-lg border-border bg-card hover:bg-accent hover:text-accent-foreground z-50"
      aria-label={theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
    >
      {theme === 'dark' ? (
        <Sun className="h-6 w-6" />
      ) : (
        <Moon className="h-6 w-6" />
      )}
    </Button>
  );
}
