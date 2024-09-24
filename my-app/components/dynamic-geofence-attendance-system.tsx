'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircle, MapPin } from "lucide-react"

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
  const [name, setName] = useState('')
  const [asuId, setAsuId] = useState('')
  const [isWithinGeofence, setIsWithinGeofence] = useState(false)
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([])
  const [ipAddress, setIpAddress] = useState('0.0.0.0')
  const [geofence, setGeofence] = useState<GeofenceArea | null>(null)
  const [isSettingGeofence, setIsSettingGeofence] = useState(false)

  useEffect(() => {
    fetchIpAddress()
  }, [])

  useEffect(() => {
    if (geofence) {
      checkLocation()
    }
  }, [geofence])

  const setGeofenceLocation = () => {
    setIsSettingGeofence(true)
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newGeofence: GeofenceArea = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            radius: 0.1 // 100 meters radius
          }
          setGeofence(newGeofence)
          setIsSettingGeofence(false)
          setMessage("Geofence set successfully. You can now take attendance.")
        },
        (error) => {
          console.error("Error getting location:", error)
          setIsSettingGeofence(false)
          setMessage("Unable to set geofence. Please ensure location services are enabled.")
        }
      )
    } else {
      setIsSettingGeofence(false)
      setMessage("Geolocation is not supported by your browser.")
    }
  }

  const checkLocation = () => {
    if (!geofence) return

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const distance = calculateDistance(
            position.coords.latitude,
            position.coords.longitude,
            geofence.lat,
            geofence.lng
          )
          setIsWithinGeofence(distance <= geofence.radius)
          setMessage(distance <= geofence.radius 
            ? "You're within the class area. You can submit your attendance." 
            : "You're outside the class area. Attendance can only be submitted from within the class.")
        },
        (error) => {
          console.error("Error getting location:", error)
          setMessage("Unable to determine your location. Please enable location services.")
        }
      )
    } else {
      setMessage("Geolocation is not supported by your browser.")
    }
  }

  const fetchIpAddress = async () => {
    try {
      const response = await fetch('https://api.ipify.org?format=json')
      const data = await response.json()
      setIpAddress(data.ip)
    } catch (error) {
      console.error('Error fetching IP address:', error)
    }
  }

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371 // Radius of the Earth in kilometers
    const dLat = deg2rad(lat2 - lat1)
    const dLon = deg2rad(lon2 - lon1)
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    const distance = R * c // Distance in kilometers
    return distance
  }

  const deg2rad = (deg: number) => {
    return deg * (Math.PI/180)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isWithinGeofence) {
      setIsSubmitting(true)
      // Simulate API call and data storage
      setTimeout(() => {
        const newRecord: AttendanceRecord = {
          name,
          asuId,
          date: new Date().toLocaleString(),
          ip: ipAddress
        }
        setAttendanceRecords(prevRecords => [...prevRecords, newRecord])
        setMessage(`Attendance submitted for ${name} (ASU ID: ${asuId})`)
        setIsSubmitting(false)
        setName('')
        setAsuId('')
      }, 1500)
    } else {
      setMessage("You must be within the class area to submit attendance.")
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Dynamic Geofence Attendance System</CardTitle>
        <CardDescription>Set the class location and submit attendance</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            {!geofence ? (
              <div className="mb-4">
                <Button onClick={setGeofenceLocation} disabled={isSettingGeofence}>
                  {isSettingGeofence ? 'Setting Geofence...' : 'Set Class Location'}
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="asuId">ASU ID</Label>
                  <Input
                    id="asuId"
                    value={asuId}
                    onChange={(e) => setAsuId(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={!isWithinGeofence || isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit Attendance'}
                </Button>
              </form>
            )}
            {message && (
              <div className={`mt-4 p-2 rounded ${isWithinGeofence ? 'bg-green-100' : 'bg-yellow-100'}`}>
                {isWithinGeofence ? (
                  <CheckCircle className="inline-block mr-2 text-green-500" />
                ) : (
                  <AlertCircle className="inline-block mr-2 text-yellow-500" />
                )}
                {message}
              </div>
            )}
            {geofence && (
              <div className="mt-4 p-2 rounded bg-blue-100">
                <MapPin className="inline-block mr-2 text-blue-500" />
                Geofence center: {geofence.lat.toFixed(4)}, {geofence.lng.toFixed(4)}
              </div>
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Attendance Records</h3>
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {attendanceRecords.map((record, index) => (
                <div key={index} className="bg-gray-100 p-2 rounded">
                  <p><strong>Name:</strong> {record.name}</p>
                  <p><strong>ASU ID:</strong> {record.asuId}</p>
                  <p><strong>Date:</strong> {record.date}</p>
                  <p><strong>IP:</strong> {record.ip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}