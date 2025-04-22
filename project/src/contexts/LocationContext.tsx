import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

type Coordinates = {
  lat: number;
  lng: number;
} | null;

interface LocationContextType {
  userLocation: Coordinates;
  locationError: string | null;
  locationPermissionGranted: boolean;
  requestLocationPermission: () => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export function useLocation() {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
}

interface LocationProviderProps {
  children: ReactNode;
}

export function LocationProvider({ children }: LocationProviderProps) {
  const [userLocation, setUserLocation] = useState<Coordinates>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [locationPermissionGranted, setLocationPermissionGranted] = useState<boolean>(false);

  const handleLocationSuccess = (position: GeolocationPosition) => {
    setUserLocation({
      lat: position.coords.latitude,
      lng: position.coords.longitude
    });
    setLocationPermissionGranted(true);
    setLocationError(null);
  };

  const handleLocationError = (error: GeolocationPositionError) => {
    setLocationError(
      error.code === 1
        ? 'Location permission denied. Please enable location services.'
        : 'Unable to determine your location. Please try again.'
    );
    setLocationPermissionGranted(false);
  };

  const requestLocationPermission = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
      return;
    }

    setLocationError(null);
    
    navigator.geolocation.getCurrentPosition(
      handleLocationSuccess,
      handleLocationError,
      { enableHighAccuracy: true }
    );
    
    // Watch position for continuous tracking
    const watchId = navigator.geolocation.watchPosition(
      handleLocationSuccess,
      handleLocationError,
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  };

  // Try to get location when the app loads
  useEffect(() => {
    requestLocationPermission();
  }, []);

  const value = {
    userLocation,
    locationError,
    locationPermissionGranted,
    requestLocationPermission
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
}