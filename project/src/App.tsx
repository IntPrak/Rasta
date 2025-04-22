import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import RouteFinder from './pages/RouteFinder';
import LiveTracking from './pages/LiveTracking';
import BusTimings from './pages/BusTimings';
import { LocationProvider } from './contexts/LocationContext';
import { RouteDataProvider } from './contexts/RouteDataContext';

function App() {
  return (
    <Router>
      <LocationProvider>
        <RouteDataProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Navigate to="/route-finder" replace />} />
              <Route path="route-finder" element={<RouteFinder />} />
              <Route path="live-tracking" element={<LiveTracking />} />
              <Route path="bus-timings" element={<BusTimings />} />
            </Route>
          </Routes>
        </RouteDataProvider>
      </LocationProvider>
    </Router>
  );
}

export default App;