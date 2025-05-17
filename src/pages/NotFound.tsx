
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-neo-black px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-primary-gradient mb-6">404</h1>
        <div className="neo-card p-8">
          <p className="text-xl text-white mb-6">The page you're looking for doesn't exist in our learning universe.</p>
          <Button asChild className="bg-neo-purple hover:bg-neo-purple/80">
            <Link to="/">Return to Dashboard</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
