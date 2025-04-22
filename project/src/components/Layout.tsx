import React from 'react';
import { Outlet, Link, useLocation as useRouterLocation } from 'react-router-dom';
import { Bus, MapPin, Clock } from 'lucide-react';

const Layout = () => {
  const location = useRouterLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path ? 'bg-blue-500' : 'hover:bg-indigo-700';
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-indigo-900 text-white py-4 px-6">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Bus className="h-6 w-6" />
            <span className="text-xl font-bold">Rasta - TN Bus Navigator</span>
          </Link>
          
          <nav className="hidden md:flex space-x-2">
            <Link 
              to="/route-finder" 
              className={`px-4 py-2 rounded-md transition-colors ${isActive('/route-finder')}`}
            >
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5" />
                <span>Route Finder</span>
              </div>
            </Link>
            
            <Link 
              to="/live-tracking" 
              className={`px-4 py-2 rounded-md transition-colors ${isActive('/live-tracking')}`}
            >
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5" />
                <span>Live Tracking</span>
              </div>
            </Link>
            
            <Link 
              to="/bus-timings" 
              className={`px-4 py-2 rounded-md transition-colors ${isActive('/bus-timings')}`}
            >
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Bus Timings</span>
              </div>
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow bg-gray-50 p-4">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-indigo-900 text-white py-8 px-6">
        <div className="container mx-auto grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Rasta - TN Bus Navigator</h3>
            <p className="text-indigo-200">
              Bus route navigator and tracker for Tamil Nadu State Transport Corporation.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Devs</h3>
            <ul className="space-y-2 text-indigo-200">
              <li>Abhijit Harsh</li>
              <li>Prakhar Jain</li>
              <li>Vaibhav Rai</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Contact Info</h3>
            <ul className="space-y-2 text-indigo-200">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-0.5" />
                <span>SRMIST, Kattankulathur, Chengalpattu, Tamil Nadu</span>
              </li>
              <li className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                <span>Phone number: 7989613318</span>
              </li>
              <li className="flex items-center">
                <Bus className="h-5 w-5 mr-2" />
                <span>Support: ah3812@srmist.edu.in</span>
              </li>
            </ul>
          </div>
        </div>
      </footer>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-indigo-900 text-white py-2">
        <div className="flex justify-around">
          <Link 
            to="/route-finder" 
            className={`flex flex-col items-center px-4 py-1 ${location.pathname === '/route-finder' ? 'text-blue-300' : ''}`}
          >
            <MapPin className="h-6 w-6" />
            <span className="text-xs">Routes</span>
          </Link>
          
          <Link 
            to="/live-tracking" 
            className={`flex flex-col items-center px-4 py-1 ${location.pathname === '/live-tracking' ? 'text-blue-300' : ''}`}
          >
            <MapPin className="h-6 w-6" />
            <span className="text-xs">Tracking</span>
          </Link>
          
          <Link 
            to="/bus-timings" 
            className={`flex flex-col items-center px-4 py-1 ${location.pathname === '/bus-timings' ? 'text-blue-300' : ''}`}
          >
            <Clock className="h-6 w-6" />
            <span className="text-xs">Timings</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Layout;