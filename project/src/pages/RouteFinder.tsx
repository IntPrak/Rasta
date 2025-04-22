import React, { useState } from 'react';
import { useRouteData, BusRoute } from '../contexts/RouteDataContext';
import { Bus, Clock, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RouteFinder = () => {
  const navigate = useNavigate();
  const { stops, findRoutes } = useRouteData();
  const [startingPoint, setStartingPoint] = useState('');
  const [destination, setDestination] = useState('');
  const [foundRoutes, setFoundRoutes] = useState<BusRoute[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFindRoutes = () => {
    if (!startingPoint || !destination) {
      setErrorMessage('Please select both starting point and destination');
      setFoundRoutes([]);
      return;
    }

    if (startingPoint === destination) {
      setErrorMessage('Starting point and destination cannot be the same');
      setFoundRoutes([]);
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    // Simulate API call
    setTimeout(() => {
      const routes = findRoutes(startingPoint, destination);
      
      if (routes.length === 0) {
        setErrorMessage('No routes found. Try a different location.');
      } else {
        setFoundRoutes(routes);
      }
      
      setIsLoading(false);
    }, 800);
  };

  const handleViewOnMap = (route: BusRoute) => {
    navigate('/live-tracking', { 
      state: { 
        from: route.from,
        to: route.to,
        routeNo: route.routeNo
      }
    });
  };

  return (
    <div className="container mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center space-x-2 mb-6">
          <Bus className="h-6 w-6 text-indigo-600" />
          <h2 className="text-2xl font-bold text-gray-800">Bus Route Finder</h2>
        </div>

        <div className="grid md:grid-cols-12 gap-4">
          <div className="md:col-span-5 space-y-4">
            <div>
              <label htmlFor="startingPoint" className="block font-medium text-gray-700 mb-1">
                Starting Point
              </label>
              <div className="flex">
                <select
                  id="startingPoint"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2 border"
                  value={startingPoint}
                  onChange={(e) => setStartingPoint(e.target.value)}
                >
                  <option value="">Select starting point</option>
                  {stops.map((stop) => (
                    <option key={`from-${stop}`} value={stop}>
                      {stop}
                    </option>
                  ))}
                </select>
                <button 
                  className="bg-blue-500 text-white p-2 rounded-md ml-2"
                  title="Use current location"
                >
                  <MapPin className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="destination" className="block font-medium text-gray-700 mb-1">
                Destination
              </label>
              <select
                id="destination"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2 border"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              >
                <option value="">Select destination</option>
                {stops.map((stop) => (
                  <option key={`to-${stop}`} value={stop}>
                    {stop}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleFindRoutes}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            >
              Find Routes
            </button>
          </div>

          <div className="md:col-span-7">
            <div className="bg-gray-50 rounded-lg p-4 h-full">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Route Information</h3>
              
              {isLoading ? (
                <div className="flex justify-center items-center h-40">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
                </div>
              ) : errorMessage ? (
                <div className="text-red-500 mt-4">{errorMessage}</div>
              ) : foundRoutes.length > 0 ? (
                <div className="space-y-4 mt-4">
                  {foundRoutes.map((route) => (
                    <div key={route.id} className="bg-white p-4 rounded-md shadow-sm border border-gray-200">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="inline-block bg-indigo-100 text-indigo-800 text-xs font-semibold px-2 py-1 rounded-full mb-2">
                            {route.type} - {route.routeNo}
                          </span>
                          <h4 className="font-medium text-gray-800">
                            {route.from} to {route.to}
                            {route.via && <span className="text-sm text-gray-500 ml-1">via {route.via}</span>}
                          </h4>
                          <p className="text-sm text-gray-600">Distance: {route.distance} km</p>
                        </div>
                        <div className="flex items-center text-green-600">
                          <Clock className="h-4 w-4 mr-1" />
                          <span className="text-sm font-medium">{route.departureTimings.length} Departures</span>
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <p className="text-sm font-medium text-gray-700 mb-1">Departure Times:</p>
                        <div className="flex flex-wrap gap-1">
                          {route.departureTimings.slice(0, 8).map((time, index) => (
                            <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                              {time.replace('.', ':')}
                            </span>
                          ))}
                          {route.departureTimings.length > 8 && (
                            <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                              +{route.departureTimings.length - 8} more
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => handleViewOnMap(route)}
                        className="mt-3 text-sm text-blue-600 hover:underline flex items-center"
                      >
                        <MapPin className="h-4 w-4 mr-1" />
                        View on map
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-500 mt-4">
                  Select starting point and destination to find available routes.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteFinder;