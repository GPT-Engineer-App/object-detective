import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from 'lucide-react';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/live-feed', label: 'Live Feed' },
  { path: '/history', label: 'History' },
  { path: '/settings', label: 'Settings' },
];

const Layout = ({ children }) => {
  const location = useLocation();

  const NavContent = ({ mobile = false }) => (
    <nav className={`flex ${mobile ? 'flex-col space-y-4' : 'space-x-4'}`}>
      {navItems.map((item) => (
        <Button
          key={item.path}
          variant={location.pathname === item.path ? "default" : "ghost"}
          asChild
        >
          <Link to={item.path}>{item.label}</Link>
        </Button>
      ))}
    </nav>
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* Desktop Navigation */}
      <header className="hidden md:block border-b">
        <div className="container mx-auto py-4">
          <NavContent />
        </div>
      </header>

      {/* Mobile Navigation */}
      <header className="md:hidden border-b">
        <div className="container mx-auto py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Object Detection App</h1>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <NavContent mobile />
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto py-4 px-4 md:px-0">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t">
        <div className="container mx-auto py-2 flex justify-around">
          {navItems.map((item) => (
            <Button
              key={item.path}
              variant="ghost"
              className={`flex-1 ${location.pathname === item.path ? 'bg-accent' : ''}`}
              asChild
            >
              <Link to={item.path}>{item.label}</Link>
            </Button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Layout;