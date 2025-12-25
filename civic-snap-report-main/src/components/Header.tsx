import { Shield } from "lucide-react";

const Header = () => {
  return (
    <header className="gov-header">
      <div className="container flex items-center gap-3">
        <Shield className="h-7 w-7" />
        <div>
          <h1 className="text-lg font-semibold leading-tight">Smart Public Issue Reporting</h1>
          <p className="text-xs opacity-80">Civic Services Portal</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
