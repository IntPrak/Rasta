import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { useLocation } from '../contexts/LocationContext';
import { useRouteData } from '../contexts/RouteDataContext';
import { MapPin, Navigation } from 'lucide-react';
import { useLocation as useRouterLocation } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for Leaflet icons
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Custom icons
const userIcon = new L.Icon({
  iconUrl: 'https://cdn.jsdelivr.net/npm/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://cdn.jsdelivr.net/npm/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://cdn.jsdelivr.net/npm/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const busIcon = new L.Icon({
  iconUrl: 'https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdn.jsdelivr.net/npm/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const cityCoordinates: { [key: string]: [number, number] } = {
  'Chennai': [13.0827, 80.2707],
  'Madurai': [9.9252, 78.1198],
  'Coimbatore': [11.0168, 76.9558],
  'Trichy': [10.7905, 78.7047],
  'Salem': [11.6643, 78.1460],
  'Bangalore': [12.9716, 77.5946],
  'Tirunelveli': [8.7139, 77.7567],
  'Tirupathi': [13.6288, 79.4192],
  'Kanyakumari': [8.0883, 77.5385],
  'Kumbakonam': [10.9602, 79.3845],
  'Thanjavur': [10.7870, 79.1378],
  'Ooty': [11.4102, 76.6950],
  'Puducherry': [11.9416, 79.8083]
};

const busPositions: { [key: string]: L.LatLngExpression } = {
  'Chennai-Madurai': [12.2406, 78.9831],
  'Chennai-Coimbatore': [11.6643, 78.1460],
  'Bangalore-Chennai': [13.0569, 80.1962]
};

interface RoutePoint {
  name: string;
  coords: [number, number];
}

const LiveTracking: React.FC = () => {
  const routerLocation = useRouterLocation();
  const { userLocation, locationPermissionGranted, requestLocationPermission, locationError } = useLocation();
  const { routes, stops } = useRouteData();
  const [selectedFrom, setSelectedFrom] = useState('');
  const [selectedTo, setSelectedTo] = useState('');
  const [mapCenter, setMapCenter] = useState<[number, number]>([11.1271, 78.6569]); // Center of TN
  const [busPosition, setBusPosition] = useState<L.LatLngExpression | null>(null);
  const [routePath, setRoutePath] = useState<RoutePoint[]>([]);
  const [userToDestinationPath, setUserToDestinationPath] = useState<L.LatLngExpression[]>([]);

  useEffect(() => {
    // Handle route from navigation state
    const state = routerLocation.state as { from: string; to: string; routeNo: string } | null;
    if (state?.from && state?.to) {
      setSelectedFrom(state.from);
      setSelectedTo(state.to);
    }
  }, [routerLocation.state]);

  useEffect(() => {
    if (userLocation) {
      setMapCenter([userLocation.lat, userLocation.lng]);
      
      if (cityCoordinates[selectedTo]) {
        setUserToDestinationPath([
          [userLocation.lat, userLocation.lng],
          cityCoordinates[selectedTo]
        ]);
      }
    } else if (selectedFrom && selectedTo) {
      const fromCoords = cityCoordinates[selectedFrom];
      const toCoords = cityCoordinates[selectedTo];
      
      if (fromCoords && toCoords) {
        setMapCenter([
          (fromCoords[0] + toCoords[0]) / 2,
          (fromCoords[1] + toCoords[1]) / 2
        ]);
      }
    }
  }, [userLocation, selectedFrom, selectedTo]);

  useEffect(() => {
    if (selectedFrom && selectedTo) {
      const routeKey = `${selectedFrom}-${selectedTo}`;
      setBusPosition(busPositions[routeKey] || null);
      
      const path: RoutePoint[] = [];
      
      if (cityCoordinates[selectedFrom] && cityCoordinates[selectedTo]) {
        path.push({ name: selectedFrom, coords: cityCoordinates[selectedFrom] });
        
        const potentialMidpoints = Object.keys(cityCoordinates).filter(city => 
          city !== selectedFrom && city !== selectedTo
        );
        
        if (potentialMidpoints.length > 0) {
          const midpoint = potentialMidpoints[Math.floor(Math.random() * potentialMidpoints.length)];
          path.push({ name: midpoint, coords: cityCoordinates[midpoint] });
        }
        
        path.push({ name: selectedTo, coords: cityCoordinates[selectedTo] });
      }
      
      setRoutePath(path);
    }
  }, [selectedFrom, selectedTo]);

  const handleTrackBus = () => {
    if (!selectedFrom || !selectedTo) {
      alert('Please select both starting point and destination');
      return;
    }

    if (!locationPermissionGranted) {
      requestLocationPermission();
    } else {
      const routeKey = `${selectedFrom}-${selectedTo}`;
      setBusPosition(busPositions[routeKey] || null);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <MapPin className="h-6 w-6 text-indigo-600 mr-2" />
          Live Bus Tracking
        </h2>

        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <div>
            <label htmlFor="from" className="block font-medium text-gray-700 mb-1">From</label>
            <select
              id="from"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2 border"
              value={selectedFrom}
              onChange={(e) => setSelectedFrom(e.target.value)}
            >
              <option value="">Select starting point</option>
              {stops.filter(stop => stop !== selectedTo).map((stop) => (
                <option key={`from-${stop}`} value={stop}>
                  {stop}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="to" className="block font-medium text-gray-700 mb-1">To</label>
            <select
              id="to"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2 border"
              value={selectedTo}
              onChange={(e) => setSelectedTo(e.target.value)}
            >
              <option value="">Select destination</option>
              {stops.filter(stop => stop !== selectedFrom).map((stop) => (
                <option key={`to-${stop}`} value={stop}>
                  {stop}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-end">
            <button
              onClick={handleTrackBus}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            >
              Track Bus
            </button>
          </div>
        </div>

        {locationError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p>{locationError}</p>
            <button 
              onClick={requestLocationPermission}
              className="text-indigo-600 underline mt-1"
            >
              Allow location access
            </button>
          </div>
        )}

        <div className="h-[500px] w-full overflow-hidden rounded-lg border border-gray-300">
          <MapContainer
            center={mapCenter}
            zoom={7}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {userLocation && (
              <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
                <Popup>
                  Your current location
                </Popup>
              </Marker>
            )}
            
            {busPosition && (
              <Marker position={busPosition} icon={busIcon}>
                <Popup>
                  Bus: {selectedFrom} to {selectedTo}
                  <br />
                  On time
                </Popup>
              </Marker>
            )}
            
            {routePath.map((point, index) => (
              <Marker 
                key={`point-${index}`} 
                position={point.coords}
              >
                <Popup>{point.name}</Popup>
              </Marker>
            ))}
            
            {routePath.length > 1 && (
              <Polyline
                positions={routePath.map(point => point.coords)}
                color="blue"
                weight={4}
              />
            )}
            
            {userLocation && userToDestinationPath.length > 0 && (
              <Polyline
                positions={userToDestinationPath}
                color="green"
                weight={4}
                dashArray="5, 10"
              />
            )}
          </MapContainer>
        </div>

        <div className="mt-4 grid md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="font-semibold text-gray-800 mb-2">Bus Details</h3>
            
            {routes.filter(route => 
              route.from === selectedFrom && route.to === selectedTo
            ).slice(0, 1).map(route => (
              <div key={route.id} className="space-y-2">
                <p><span className="font-medium">Route Number:</span> {route.routeNo}</p>
                <p><span className="font-medium">Type:</span> {route.type}</p>
                <p><span className="font-medium">Distance:</span> {route.distance} km</p>
                <p><span className="font-medium">Estimated Time:</span> {Math.ceil(route.distance / 50)} hours</p>
                <p><span className="font-medium">Status:</span> <span className="text-green-600">On Time</span></p>
              </div>
            ))}
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="font-semibold text-gray-800 mb-2">Legend</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-blue-500 mr-2"></div>
                <p>Bus route to your nearest stop</p>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-500 mr-2"></div>
                <p>Your route to destination</p>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-500 mr-2"></div>
                <p>Bus location</p>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-blue-700 mr-2"></div>
                <p>Your location</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveTracking;