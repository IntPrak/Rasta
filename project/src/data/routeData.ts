// This is a simplified version of the route data provided in the prompt
// In a real app, this would come from an API or database

export const busStops = [
  'Chennai', 'Madurai', 'Coimbatore', 'Trichy', 'Salem', 
  'Bangalore', 'Tirunelveli', 'Tirupathi', 'Kanyakumari', 
  'Kumbakonam', 'Thanjavur', 'Nagercoil', 'Erode', 
  'Dindigul', 'Vellore', 'Puducherry', 'Ooty', 
  'Tuticorin', 'Karaikudi', 'Tiruppur', 'Rameswaram'
];

export const busRoutes = [
  {
    id: 1,
    routeNo: '460UD',
    from: 'Chennai',
    to: 'Coimbatore',
    distance: 510,
    type: 'ULTRA',
    departureTimings: ['17.00', '18.30', '19.30', '20.15', '20.45', '21.00', '21.15', '21.45', '22.15', '22.30']
  },
  {
    id: 2,
    routeNo: '460AC',
    from: 'Chennai',
    to: 'Coimbatore',
    distance: 510,
    type: 'A/C',
    departureTimings: ['21.00', '22.00']
  },
  {
    id: 3,
    routeNo: '137UD',
    from: 'Chennai',
    to: 'Madurai',
    distance: 459,
    type: 'ULTRA',
    departureTimings: ['00.30', '04.00', '05.30', '06.15', '07.30', '07.45', '08.00', '08.30', '09.30', '10.00', '10.30', '10.45', '11.30', '13.00', '18.15', '18.45', '19.00', '19.15', '19.30', '20.15', '20.30', '20.35', '20.45', '21.15', '21.30', '21.45', '21.50', '22.00', '22.15', '22.30', '22.45', '22.50', '23.00', '23.15', '23.30', '23.45']
  },
  {
    id: 4,
    routeNo: '137AC',
    from: 'Chennai',
    to: 'Madurai',
    distance: 459,
    type: 'A/C',
    departureTimings: ['09.00', '21.00', '21.30']
  },
  {
    id: 5,
    routeNo: '123UD',
    from: 'Chennai',
    to: 'Trichy',
    distance: 331,
    type: 'ULTRA',
    departureTimings: ['03.00', '04.00', '04.30', '06.00', '06.15', '06.30', '06.45', '07.00', '07.30', '07.45', '08.00', '08.45', '09.15', '09.30', '09.45', '10.30', '10.45', '17.00', '18.00', '20.30', '21.25', '21.45', '22.10', '22.16', '22.20', '22.30', '22.45', '23.05', '23.20', '23.25', '23.30']
  },
  {
    id: 6,
    routeNo: '123AC',
    from: 'Chennai',
    to: 'Trichy',
    distance: 331,
    type: 'A/C',
    departureTimings: ['10.00', '11.00', '22.30', '22.45']
  },
  {
    id: 7,
    routeNo: '422UD',
    from: 'Chennai',
    to: 'Salem',
    distance: 341,
    type: 'ULTRA',
    departureTimings: ['05.00', '06.30', '08.00', '08.45', '09.30', '10.20', '10.50', '11.15', '12.00', '12.30', '20.00', '20.35', '21.00', '21.35', '22.00', '22.10', '22.35', '23.00', '23.30', '23.45']
  },
  {
    id: 8,
    routeNo: '422AC',
    from: 'Chennai',
    to: 'Salem',
    distance: 341,
    type: 'A/C',
    departureTimings: ['13.00', '23.00']
  },
  {
    id: 9,
    routeNo: '831UD',
    from: 'Chennai',
    to: 'Bangalore',
    via: 'Hosur',
    distance: 360,
    type: 'ULTRA',
    departureTimings: ['05.30', '06.00', '06.15', '06.30', '07.00', '07.15', '07.30', '08.00', '08.15', '08.30', '09.00', '09.30', '09.45', '10.00', '10.15', '10.30', '10.45', '11.00', '11.15', '11.35', '12.01', '12.30', '12.45', '13.00', '14.00', '14.30', '15.00', '19.45', '20.30', '20.45', '21.00', '21.15', '21.30', '21.35', '21.45', '22.15', '22.45', '23.15', '23.15']
  },
  {
    id: 10,
    routeNo: '180UD',
    from: 'Chennai',
    to: 'Tirunelveli',
    distance: 622,
    type: 'ULTRA',
    departureTimings: ['17.50', '18.10', '18.30', '18.45', '19.00', '19.20', '19.35', '19.50', '20.00', '20.30', '20.45', '21.00']
  },
  {
    id: 11,
    routeNo: '180AC',
    from: 'Chennai',
    to: 'Tirunelveli',
    distance: 622,
    type: 'A/C',
    departureTimings: ['19.00']
  },
  {
    id: 12,
    routeNo: '198UD',
    from: 'Chennai',
    to: 'Nagercoil',
    distance: 698,
    type: 'ULTRA',
    departureTimings: ['13.45', '14.15', '15.35', '16.15', '17.00', '17.50', '18.15', '18.30', '19.00', '19.15', '20.00', '20.45', '21.15', '21.30', '21.45', '23.00']
  },
  {
    id: 13,
    routeNo: '198AC',
    from: 'Chennai',
    to: 'Nagercoil',
    distance: 698,
    type: 'A/C',
    departureTimings: ['18.00']
  },
  {
    id: 14,
    routeNo: '282UD',
    from: 'Chennai',
    to: 'Kanyakumari',
    distance: 718,
    type: 'ULTRA',
    departureTimings: ['13.30', '16.45', '18.45', '19.30', '21.00']
  },
  {
    id: 15,
    routeNo: '303UD',
    from: 'Chennai',
    to: 'Kumbakonam',
    distance: 307,
    type: 'ULTRA',
    departureTimings: ['01.30', '06.30', '08.30', '09.15', '10.30', '11.00', '12.05', '12.30', '13.00', '13.50', '14.05', '15.15', '15.45', '20.00', '20.45', '22.01', '22.35', '23.00']
  },
  {
    id: 16,
    routeNo: '323UD',
    from: 'Chennai',
    to: 'Thanjavur',
    distance: 351,
    type: 'ULTRA',
    departureTimings: ['05.30', '08.15', '09.00', '10.00', '12.45', '13.30', '14.15', '17.30', '20.00', '20.15', '20.30', '21.15', '21.30', '21.45', '22.00', '22.15', '22.30', '23.30']
  },
  {
    id: 17,
    routeNo: '323AC',
    from: 'Chennai',
    to: 'Thanjavur',
    distance: 391,
    type: 'A/C',
    departureTimings: ['11.30', '22.00']
  },
  {
    id: 18,
    routeNo: '911UD',
    from: 'Chennai',
    to: 'Tirupathi',
    distance: 160,
    type: 'ULTRA',
    departureTimings: ['06.00', '06.30', '15.30', '16.00']
  },
  {
    id: 19,
    routeNo: '803UD',
    from: 'Chennai',
    to: 'Puducherry',
    distance: 173,
    type: 'ULTRA',
    departureTimings: ['04.00', '04.30', '05.00', '05.15', '05.30', '05.45', '06.00', '06.05', '06.15', '06.20', '06.30', '06.45', '07.00', '07.30', '08.30', '13.00', '13.45', '14.00', '14.45', '17.00']
  },
  {
    id: 20,
    routeNo: '166UD',
    from: 'Chennai',
    to: 'Rameswaram',
    distance: 581,
    type: 'ULTRA',
    departureTimings: ['17.45']
  },
  {
    id: 21,
    routeNo: '166AC',
    from: 'Chennai',
    to: 'Rameswaram',
    distance: 581,
    type: 'A/C',
    departureTimings: ['18.30']
  },
  {
    id: 22,
    routeNo: '470UD',
    from: 'Chennai',
    to: 'Tiruppur',
    distance: 467,
    type: 'ULTRA',
    departureTimings: ['20.45', '22.45']
  },
  {
    id: 23,
    routeNo: '460UD',
    from: 'Coimbatore',
    to: 'Chennai',
    distance: 510,
    type: 'ULTRA',
    departureTimings: ['17.30', '18.30', '19.30', '20.00', '20.30', '21.05', '21.15', '21.30', '22.00', '22.30']
  },
  {
    id: 24,
    routeNo: '460AC',
    from: 'Coimbatore',
    to: 'Chennai',
    distance: 510,
    type: 'A/C',
    departureTimings: ['21.00', '22.00']
  },
  {
    id: 25,
    routeNo: '838UD',
    from: 'Coimbatore',
    to: 'Bangalore',
    distance: 377,
    type: 'ULTRA',
    departureTimings: ['09.00', '09.30', '10.00', '20.30', '21.15', '22.00', '22.30', '22.45']
  }
];

// Simplified bus location data - this would be dynamic in a real app
export const busLocations = {
  '460UD': { lat: 13.0827, lng: 80.2707 }, // Chennai
  '137UD': { lat: 13.1067, lng: 80.2378 }, // Near Chennai
  '123UD': { lat: 12.9830, lng: 80.1899 }, // Heading to Trichy
  '422UD': { lat: 13.0569, lng: 80.1962 }, // Heading to Salem
  '831UD': { lat: 12.9249, lng: 80.1000 }, // Heading to Bangalore
  '180UD': { lat: 13.0500, lng: 80.2121 }, // Heading to Tirunelveli
};