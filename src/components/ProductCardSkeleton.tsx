
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function ProductCardSkeleton() {
  return (
    <Card className="flex flex-col h-full overflow-hidden bg-card">
      <CardHeader className="p-0">
        <Skeleton className="w-full h-56 sm:h-64 rounded-t-lg rounded-b-none" />
      </CardHeader>
      <CardContent className="flex-grow p-6 space-y-4">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </CardContent>
      <CardFooter className="p-6 pt-0 flex justify-between items-center">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-10 w-1/3" />
      </CardFooter>
    </Card>
  );
}
