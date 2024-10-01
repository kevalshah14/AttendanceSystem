'use client';

import React, { useState, useEffect, useCallback } from 'react';
import QRCode from 'react-qr-code';
import { Button } from '@/components/ui/button';
import {
  AlertCircle,
  CheckCircle,
  MapPin,
  Loader2,
  LogOut,
  Save,
  Trash,
} from 'lucide-react';

interface GeofenceArea {
  lat: number;
  lng: number;
  radius: number;
}

interface AttendanceRecord {
  name: string;
  asuId: string;
  date: string;
  ip: string;
}

export function DynamicGeofenceAttendanceSystemComponent() {
  const [geofence, setGeofence] = useState<GeofenceArea | null>(null);
  const [isSettingGeofence, setIsSettingGeofence] = useState(false);
  const [temporaryLink, setTemporaryLink] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [loadingRecords, setLoadingRecords] = useState(false);

  const setGeofenceLocation = useCallback(() => {
    setIsSettingGeofence(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const newGeofence: GeofenceArea = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            radius: 0.1, // 100 meters radius
          };

          // Save geofence to backend
          const response = await fetch('/api/geofence', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newGeofence),
          });

          const data = await response.json();
          const attendanceId = data.attendanceId; // Backend returns this

          setGeofence(newGeofence);
          setIsSettingGeofence(false);
          setMessage('Geofence set successfully. You can now take attendance.');

          // Generate temporary link with attendanceId
          const tempLink = `/attendance/${attendanceId}`;
          setTemporaryLink(tempLink);
        },
        (error) => {
          console.error('Error getting location:', error);
          setIsSettingGeofence(false);
          setMessage('Unable to set geofence. Please ensure location services are enabled.');
        }
      );
    } else {
      setIsSettingGeofence(false);
      setMessage('Geolocation is not supported by your browser.');
    }
  }, []);

  const fetchAttendanceRecords = useCallback(async () => {
    try {
      setLoadingRecords(true);
      const response = await fetch('/api/attendance');
      if (response.ok) {
        const data = await response.json();
        setAttendanceRecords(data.records);
      } else {
        console.error('Failed to fetch attendance records.');
      }
    } catch (error) {
      console.error('Error fetching attendance records:', error);
    } finally {
      setLoadingRecords(false);
    }
  }, []);

  const clearAttendanceRecords = useCallback(async () => {
    const confirmed = window.confirm('Are you sure you want to clear all attendance records?');
    if (confirmed) {
      const response = await fetch('/api/attendance', {
        method: 'DELETE',
      });
      if (response.ok) {
        setAttendanceRecords([]);
        setMessage('Attendance records have been cleared.');
      } else {
        setMessage('Failed to clear attendance records.');
      }
    }
  }, []);

  const saveAttendanceRecords = useCallback(() => {
    if (attendanceRecords.length === 0) {
      alert('No attendance records to save.');
      return;
    }

    // Define the header of the CSV file
    const headers = ['Name', 'ASU ID', 'Date', 'IP'];

    // Map the attendance records to CSV rows
    const csvRows = attendanceRecords.map((record) => [
      record.name,
      record.asuId,
      new Date(record.date).toLocaleString(),
      record.ip,
    ]);

    // Combine headers and rows
    const csvContent = [headers, ...csvRows]
      .map((row) => row.map((item) => `"${item}"`).join(','))
      .join('\n');

    // Create a Blob from the CSV content
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    // Create a temporary link to trigger the download
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute(
      'download',
      `attendance_records_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [attendanceRecords]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isAuthenticated) {
      fetchAttendanceRecords();

      intervalId = setInterval(() => {
        fetchAttendanceRecords();
      }, 5000); // Fetch every 5 seconds
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isAuthenticated, fetchAttendanceRecords]);

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';

  // Password protection logic
  const checkPassword = () => {
    // Replace 'yourpassword' with your actual password or store it securely
    const correctPassword = 'yourpassword';
    if (passwordInput === correctPassword) {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasswordInput('');
    setGeofence(null);
    setTemporaryLink(null);
    setAttendanceRecords([]);
    setMessage('');
  };

  // Move the background image to a CSS class
  const containerClassName =
    'min-h-screen bg-robotics bg-cover bg-center bg-no-repeat';

  if (!isAuthenticated) {
    return (
      <div className={containerClassName}>
        <div className="w-full max-w-md mx-auto mt-20 p-6 border rounded-md shadow-md bg-white/30 backdrop-blur-md">
          <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
            Instructor Login
          </h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Enter Password:
              </label>
              <input
                type="password"
                id="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/50 backdrop-blur-md"
              />
            </div>
            <Button
              className="w-full bg-blue-500 hover:bg-blue-600 text-white"
              onClick={checkPassword}
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={containerClassName}>
      <div className="w-full max-w-5xl mx-auto p-6">
        <div className="bg-white/30 backdrop-blur-md rounded-lg shadow-lg">
          <div className="flex flex-col items-center p-6">
            <h1 className="text-3xl font-bold text-gray-800 flex items-center">
              <MapPin className="w-8 h-8 mr-2" />
              RAS545: Robotics Systems 1 Attendance
            </h1>
            <p className="text-lg mt-2 text-gray-700">Geofence-Based Attendance Tracking</p>
            <Button
              variant="secondary"
              className="mt-4 self-end bg-white/50 backdrop-blur-md text-gray-800 hover:bg-white/70"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
          <div className="p-6 space-y-8">
            {/* Geofence and Attendance Link Section */}
            <GeofenceSection
              geofence={geofence}
              isSettingGeofence={isSettingGeofence}
              message={message}
              temporaryLink={temporaryLink}
              setGeofenceLocation={setGeofenceLocation}
              baseUrl={baseUrl}
            />

            {/* Attendance Records Section */}
            <AttendanceRecordsSection
              attendanceRecords={attendanceRecords}
              loadingRecords={loadingRecords}
              saveAttendanceRecords={saveAttendanceRecords}
              clearAttendanceRecords={clearAttendanceRecords}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Separate components to prevent unnecessary re-renders
const GeofenceSection = React.memo(function GeofenceSection({
  geofence,
  isSettingGeofence,
  message,
  temporaryLink,
  setGeofenceLocation,
  baseUrl,
}: {
  geofence: GeofenceArea | null;
  isSettingGeofence: boolean;
  message: string;
  temporaryLink: string | null;
  setGeofenceLocation: () => void;
  baseUrl: string;
}) {
  return (
    <div className="bg-white/30 backdrop-blur-md rounded-lg shadow-lg p-6">
      {!geofence ? (
        <div className="text-center">
          <Button
            onClick={setGeofenceLocation}
            disabled={isSettingGeofence}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white transform transition-transform duration-200 hover:scale-105"
          >
            {isSettingGeofence ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Setting Geofence...
              </>
            ) : (
              <>
                <MapPin className="w-4 h-4 mr-2" />
                Set Class Location
              </>
            )}
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-4">
          <div className="p-3 rounded-md bg-green-50 text-green-700 flex items-center space-x-2">
            <CheckCircle className="w-5 h-5" />
            <span>{message}</span>
          </div>
          <div className="text-center">
            <p className="text-gray-700">
              <MapPin className="inline-block w-5 h-5 mr-1 text-blue-500" />
              <strong>Geofence Center:</strong> {geofence.lat.toFixed(4)}, {geofence.lng.toFixed(4)}
            </p>
          </div>
          {temporaryLink && (
            <div className="text-center">
              <p className="text-gray-700">
                <strong>Attendance Link:</strong>
              </p>
              <a
                href={temporaryLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline break-all"
              >
                {baseUrl + temporaryLink}
              </a>
              <p className="text-sm text-gray-500 mt-2">
                Share this link or QR code with your students.
              </p>
              {/* Display the QR code */}
              <div className="mt-4 flex justify-center">
                <div className="bg-white/50 backdrop-blur-md p-2 rounded-md shadow-md">
                  <QRCode
                    value={baseUrl + temporaryLink}
                    size={150}
                    bgColor="rgba(255, 255, 255, 0)"
                    fgColor="#000000"
                    level="Q"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
});

const AttendanceRecordsSection = React.memo(function AttendanceRecordsSection({
  attendanceRecords,
  loadingRecords,
  saveAttendanceRecords,
  clearAttendanceRecords,
}: {
  attendanceRecords: AttendanceRecord[];
  loadingRecords: boolean;
  saveAttendanceRecords: () => void;
  clearAttendanceRecords: () => void;
}) {
  return (
    <div className="bg-white/30 backdrop-blur-md rounded-lg shadow-lg p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 md:mb-0">
          Attendance Records
        </h3>
        <div className="space-x-2">
          <Button
            onClick={saveAttendanceRecords}
            className="bg-green-500 hover:bg-green-600 text-white transform transition-transform duration-200 hover:scale-105"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Attendance
          </Button>
          <Button
            variant="destructive"
            onClick={clearAttendanceRecords}
            className="bg-red-500 hover:bg-red-600 text-white transform transition-transform duration-200 hover:scale-105"
          >
            <Trash className="w-4 h-4 mr-2" />
            Clear Attendance
          </Button>
        </div>
      </div>
      {loadingRecords ? (
        <div className="flex items-center justify-center py-10">
          <Loader2 className="w-6 h-6 mr-2 animate-spin text-blue-500" />
          <span className="text-gray-700">Loading attendance records...</span>
        </div>
      ) : attendanceRecords.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">ASU ID</th>
                <th className="px-4 py-2 border">Date</th>
                <th className="px-4 py-2 border">IP Address</th>
              </tr>
            </thead>
            <tbody>
              {attendanceRecords.map((record, index) => (
                <tr
                  key={index}
                  className="text-center hover:bg-white/50 transition-colors"
                >
                  <td className="px-4 py-2 border">{record.name}</td>
                  <td className="px-4 py-2 border">{record.asuId}</td>
                  <td className="px-4 py-2 border">
                    {new Date(record.date).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 border">{record.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-600">No attendance records available.</p>
      )}
    </div>
  );
});
