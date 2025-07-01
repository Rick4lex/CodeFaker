
'use client';

import { useFormState } from 'react-dom';
import { login } from '@/lib/admin-actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { KeyRound } from 'lucide-react';

export default function LoginPage() {
  const [state, formAction] = useFormState(login, undefined);

  return (
    <main className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
           <div className="mx-auto h-12 w-12 text-primary mb-4 flex items-center justify-center bg-primary/10 rounded-full"> <KeyRound className="h-6 w-6"/> </div>
          <CardTitle>Acceso de Administrador</CardTitle>
          <CardDescription>Introduce la contraseña para continuar</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
              />
            </div>
            {state?.error && (
              <p className="text-sm font-medium text-destructive">{state.error}</p>
            )}
            <Button type="submit" className="w-full">
              Iniciar Sesión
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
