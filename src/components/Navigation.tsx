import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Wrench, ClipboardList } from "lucide-react";

const Navigation = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex h-16 justify-start">
          <div className="flex space-x-8">
            <Link
              to="/"
              className={cn(
                "inline-flex items-center px-1 pt-1 text-sm font-medium",
                isActive("/")
                  ? "border-b-2 border-primary text-primary"
                  : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
              )}
            >
              <ClipboardList className="w-4 h-4 mr-2" />
              Records
            </Link>
            <Link
              to="/build"
              className={cn(
                "inline-flex items-center px-1 pt-1 text-sm font-medium",
                isActive("/build")
                  ? "border-b-2 border-primary text-primary"
                  : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
              )}
            >
              <Wrench className="w-4 h-4 mr-2" />
              Build
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;