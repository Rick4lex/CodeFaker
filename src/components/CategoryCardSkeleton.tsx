
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function CategoryCardSkeleton() {
  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg bg-card">
      <CardHeader className="p-0">
        <Skeleton className="w-full h-48 sm:h-56 rounded-t-lg rounded-b-none" />
      </CardHeader>
      <CardContent className="flex-grow p-6 space-y-3">
        <Skeleton className="h-7 w-1/2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  );
}
