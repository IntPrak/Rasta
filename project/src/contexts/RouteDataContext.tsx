import React, { createContext, useState, useContext, ReactNode } from 'react';
import { busRoutes, busStops } from '../data/routeData';

export interface BusRoute {
  id: number;
  routeNo: string;
  from: string;
  to: string;
  via?: string;
  distance: number;
  type: string;
  departureTimings: string[];
}

export interface BusSchedule {
  busNo: string;
  route: string;
  arrivalTime: string;
  departureTime: string;
  status: string;
}

interface RouteDataContextType {
  routes: BusRoute[];
  stops: string[];
  selectedRoute: BusRoute | null;
  selectedRoutes: BusRoute[];
  busSchedules: BusSchedule[];
  setSelectedRoute: (route: BusRoute | null) => void;
  findRoutes: (from: string, to: string) => BusRoute[];
  getBusSchedules: (stop: string, day: string, timePeriod: string) => BusSchedule[];
}

const RouteDataContext = createContext<RouteDataContextType | undefined>(undefined);

export function useRouteData() {
  const context = useContext(RouteDataContext);
  if (context === undefined) {
    throw new Error('useRouteData must be used within a RouteDataProvider');
  }
  return context;
}

interface RouteDataProviderProps {
  children: ReactNode;
}

export function RouteDataProvider({ children }: RouteDataProviderProps) {
  const [selectedRoute, setSelectedRoute] = useState<BusRoute | null>(null);
  const [selectedRoutes, setSelectedRoutes] = useState<BusRoute[]>([]);
  const [busSchedules, setBusSchedules] = useState<BusSchedule[]>([]);
  
  const findRoutes = (from: string, to: string): BusRoute[] => {
    const matchedRoutes = busRoutes.filter(route => 
      route.from.toLowerCase() === from.toLowerCase() && 
      route.to.toLowerCase() === to.toLowerCase()
    );
    
    setSelectedRoutes(matchedRoutes);
    return matchedRoutes;
  };
  
  const getBusSchedules = (stop: string, day: string, timePeriod: string): BusSchedule[] => {
    // In a real app, we would fetch this data from an API
    // For now, we'll return mock data based on the filters
    
    // Generate some schedules based on the selected filters
    const mockSchedules: BusSchedule[] = [];
    
    // Find routes that include this stop
    const relevantRoutes = busRoutes.filter(route => 
      route.from === stop || route.to === stop
    );
    
    relevantRoutes.forEach(route => {
      // Generate arrival and departure times
      const baseHour = (route.departureTimings.length > 0 && route.departureTimings[0]) 
        ? parseInt(route.departureTimings[0].split('.')[0]) 
        : Math.floor(Math.random() * 24);
      
      const arrivalHour = (baseHour - 1 + 24) % 24;
      const schedule: BusSchedule = {
        busNo: route.routeNo,
        route: `${route.from} - ${route.to}`,
        arrivalTime: `${arrivalHour.toString().padStart(2, '0')}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
        departureTime: `${baseHour.toString().padStart(2, '0')}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
        status: Math.random() > 0.2 ? 'On Time' : 'Delayed'
      };
      
      mockSchedules.push(schedule);
    });
    
    setBusSchedules(mockSchedules);
    return mockSchedules;
  };

  const value = {
    routes: busRoutes,
    stops: busStops,
    selectedRoute,
    selectedRoutes,
    busSchedules,
    setSelectedRoute,
    findRoutes,
    getBusSchedules
  };
  
  return (
    <RouteDataContext.Provider value={value}>
      {children}
    </RouteDataContext.Provider>
  );
}