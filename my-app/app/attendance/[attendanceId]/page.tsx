'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  AlertCircle,
  CheckCircle,
  Loader2,
  MapPin,
} from 'lucide-react';

interface GeofenceArea {
  lat: number;
  lng: number;
  radius: number;
}

export default function AttendancePage({ params }: { params: { attendanceId: string } }) {
  const { attendanceId } = params;

  const [geofence, setGeofence] = useState<GeofenceArea | null>(null);
  const [isWithinGeofence, setIsWithinGeofence] = useState(false);
  const [name, setName] = useState('');
  const [asuId, setAsuId] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ipAddress, setIpAddress] = useState('0.0.0.0');
  const [loadingGeofence, setLoadingGeofence] = useState(true);
  const [asuIdError, setAsuIdError] = useState('');

  useEffect(() => {
    if (attendanceId) {
      fetchGeofenceData();
      fetchIpAddress();
    }
  }, [attendanceId]);

  const fetchGeofenceData = async () => {
    try {
      setLoadingGeofence(true);
      const response = await fetch(`/api/geofence?attendanceId=${attendanceId}`);
      if (response.ok) {
        const data = await response.json();
        setGeofence(data);
        checkLocation(data);
      } else {
        setMessage('Invalid or expired attendance link.');
      }
    } catch (error) {
      console.error('Error fetching geofence:', error);
      setMessage('An error occurred while fetching geofence data.');
    } finally {
      setLoadingGeofence(false);
    }
  };

  const checkLocation = (geofenceData: GeofenceArea) => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const distance = calculateDistance(
            position.coords.latitude,
            position.coords.longitude,
            geofenceData.lat,
            geofenceData.lng
          );
          setIsWithinGeofence(distance <= geofenceData.radius);
          setMessage(
            distance <= geofenceData.radius
              ? "You're within the class area. You can submit your attendance."
              : "You're outside the class area. Attendance can only be submitted from within the class."
          );
        },
        (error) => {
          console.error('Error getting location:', error);
          setMessage('Unable to determine your location. Please enable location services.');
        }
      );
    } else {
      setMessage('Geolocation is not supported by your browser.');
    }
  };

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance * 1000; // Convert to meters
  };

  const deg2rad = (deg: number) => {
    return deg * (Math.PI / 180);
  };

  const fetchIpAddress = async () => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      setIpAddress(data.ip);
    } catch (error) {
      console.error('Error fetching IP address:', error);
    }
  };

  const validateAsuId = (id: string) => {
    if (!/^\d{10}$/.test(id)) {
      setAsuIdError('ASU ID must be exactly 10 digits.');
      return false;
    } else {
      setAsuIdError('');
      return true;
    }
  };

  const handleAsuIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAsuId(value);
    validateAsuId(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAsuId(asuId)) {
      return;
    }
    if (isWithinGeofence) {
      setIsSubmitting(true);
      try {
        // Submit attendance to backend
        const response = await fetch('/api/attendance', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, asuId, attendanceId, ip: ipAddress }),
        });
        if (response.ok) {
          setMessage(`Attendance submitted for ${name} (ASU ID: ${asuId})`);
          setName('');
          setAsuId('');
        } else {
          setMessage('Failed to submit attendance.');
        }
      } catch (error) {
        console.error('Error submitting attendance:', error);
        setMessage('An error occurred while submitting attendance.');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setMessage('You must be within the class area to submit attendance.');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat p-4"
      style={{ backgroundImage: 'url(/images/robotics-bg.jpg)' }}
    >
      <div className="w-full max-w-md bg-white/30 backdrop-blur-md rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-center mb-6">
          <MapPin className="w-6 h-6 text-blue-500 mr-2" />
          <h1 className="text-2xl font-semibold text-gray-800 text-center">
            Submit Attendance
          </h1>
        </div>
        {message && (
          <div
            className={`mb-4 p-3 rounded-md flex items-center space-x-2 ${
              isWithinGeofence ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'
            }`}
          >
            {isWithinGeofence ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <span>{message}</span>
          </div>
        )}
        {loadingGeofence ? (
          <div className="flex items-center justify-center py-10">
            <Loader2 className="w-6 h-6 mr-2 animate-spin text-blue-500" />
            <span className="text-gray-700">Loading geofence data...</span>
          </div>
        ) : geofence ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name" className="text-gray-800">
                Name
              </Label>
              <Input
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1 bg-white/50 backdrop-blur-md"
              />
            </div>
            <div>
              <Label htmlFor="asuId" className="text-gray-800">
                ASU ID
              </Label>
              <Input
                id="asuId"
                placeholder="Enter your 10-digit ASU ID"
                value={asuId}
                onChange={handleAsuIdChange}
                required
                className="mt-1 bg-white/50 backdrop-blur-md"
              />
              {asuIdError && <p className="text-red-500 text-sm mt-1">{asuIdError}</p>}
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white transform transition-transform duration-200 hover:scale-105"
              disabled={!isWithinGeofence || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Attendance'
              )}
            </Button>
          </form>
        ) : (
          <div className="text-center text-red-600 font-semibold">
            Unable to load geofence data.
          </div>
        )}
      </div>
    </div>
  );
}
