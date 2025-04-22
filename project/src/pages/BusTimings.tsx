import React, { useState, useEffect } from 'react';
import { Clock, Search, ArrowDown, ArrowUp } from 'lucide-react';
import { useRouteData, BusSchedule } from '../contexts/RouteDataContext';

const BusTimings = () => {
  const { stops, getBusSchedules } = useRouteData();
  const [selectedStop, setSelectedStop] = useState('');
  const [selectedDay, setSelectedDay] = useState('Today');
  const [timePeriod, setTimePeriod] = useState('All Day');
  const [schedules, setSchedules] = useState<BusSchedule[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSortClick = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedSchedules = [...schedules].sort((a, b) => {
    if (!sortField) return 0;
    
    if (sortField === 'busNo') {
      const numA = parseInt(a.busNo.replace(/\D/g, ''));
      const numB = parseInt(b.busNo.replace(/\D/g, ''));
      return sortDirection === 'asc' ? numA - numB : numB - numA;
    }
    
    if (sortField === 'arrivalTime' || sortField === 'departureTime') {
      const timeA = a[sortField as keyof BusSchedule] as string;
      const timeB = b[sortField as keyof BusSchedule] as string;
      return sortDirection === 'asc' ? timeA.localeCompare(timeB) : timeB.localeCompare(timeA);
    }
    
    const fieldA = a[sortField as keyof BusSchedule];
    const fieldB = b[sortField as keyof BusSchedule];
    
    if (typeof fieldA === 'string' && typeof fieldB === 'string') {
      return sortDirection === 'asc' ? fieldA.localeCompare(fieldB) : fieldB.localeCompare(fieldA);
    }
    
    return 0;
  });

  const days = ['Today', 'Tomorrow', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const periods = ['All Day', 'Morning (6AM-12PM)', 'Afternoon (12PM-6PM)', 'Evening (6PM-12AM)', 'Night (12AM-6AM)'];

  const handleShowTimings = () => {
    if (!selectedStop) {
      alert('Please select a bus stop');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const result = getBusSchedules(selectedStop, selectedDay, timePeriod);
      setSchedules(result);
      setIsLoading(false);
    }, 800);
  };

  useEffect(() => {
    if (stops.length > 0 && !selectedStop) {
      setSelectedStop(stops[0]);
    }
  }, [stops]);

  return (
    <div className="container mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center space-x-2 mb-6">
          <Clock className="h-6 w-6 text-indigo-600" />
          <h2 className="text-2xl font-bold text-gray-800">Bus Timings & Schedules</h2>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <div>
            <label htmlFor="busStop" className="block font-medium text-gray-700 mb-1">
              Bus Stop
            </label>
            <select
              id="busStop"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2 border"
              value={selectedStop}
              onChange={(e) => setSelectedStop(e.target.value)}
            >
              <option value="">Select bus stop</option>
              {stops.map((stop) => (
                <option key={stop} value={stop}>
                  {stop}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="day" className="block font-medium text-gray-700 mb-1">
              Day
            </label>
            <select
              id="day"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2 border"
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
            >
              {days.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="timePeriod" className="block font-medium text-gray-700 mb-1">
              Time Period
            </label>
            <select
              id="timePeriod"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2 border"
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value)}
            >
              {periods.map((period) => (
                <option key={period} value={period}>
                  {period}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={handleShowTimings}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 flex items-center justify-center"
            >
              <Search className="h-5 w-5 mr-2" />
              Show Timings
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
          </div>
        ) : schedules.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSortClick('busNo')}
                  >
                    <div className="flex items-center">
                      Bus No.
                      {sortField === 'busNo' && (
                        sortDirection === 'asc' ? <ArrowUp className="h-4 w-4 ml-1" /> : <ArrowDown className="h-4 w-4 ml-1" />
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSortClick('route')}
                  >
                    <div className="flex items-center">
                      Route
                      {sortField === 'route' && (
                        sortDirection === 'asc' ? <ArrowUp className="h-4 w-4 ml-1" /> : <ArrowDown className="h-4 w-4 ml-1" />
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSortClick('arrivalTime')}
                  >
                    <div className="flex items-center">
                      Arrival Time
                      {sortField === 'arrivalTime' && (
                        sortDirection === 'asc' ? <ArrowUp className="h-4 w-4 ml-1" /> : <ArrowDown className="h-4 w-4 ml-1" />
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSortClick('departureTime')}
                  >
                    <div className="flex items-center">
                      Departure Time
                      {sortField === 'departureTime' && (
                        sortDirection === 'asc' ? <ArrowUp className="h-4 w-4 ml-1" /> : <ArrowDown className="h-4 w-4 ml-1" />
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSortClick('status')}
                  >
                    <div className="flex items-center">
                      Status
                      {sortField === 'status' && (
                        sortDirection === 'asc' ? <ArrowUp className="h-4 w-4 ml-1" /> : <ArrowDown className="h-4 w-4 ml-1" />
                      )}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedSchedules.map((schedule, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {schedule.busNo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {schedule.route}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {schedule.arrivalTime}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {schedule.departureTime}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        schedule.status === 'On Time' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {schedule.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-gray-50 p-8 rounded-lg text-center">
            <p className="text-gray-600">
              Select a bus stop and click "Show Timings" to view the bus schedule.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusTimings;