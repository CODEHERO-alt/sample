import { Link } from "wouter";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4">
      <div className="max-w-md w-full text-center">
        <div className="mx-auto w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mb-6">
          <AlertTriangle className="h-10 w-10 text-destructive" />
        </div>
        
        <h1 className="font-serif text-4xl font-bold text-foreground mb-4">
          404 Not Found
        </h1>
        
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <Link href="/" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium text-primary-foreground bg-primary hover:bg-primary/90 transition-all duration-200 shadow-lg shadow-primary/20">
          Return Home
        </Link>
      </div>
    </div>
  );
}
