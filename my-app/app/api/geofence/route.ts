import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const geofence = await request.json();
  const attendanceId = Math.random().toString(36).substr(2, 9);
  const expiresAt = new Date(Date.now() + 2 * 60 * 60 * 1000); // Expires in 2 hours

  await prisma.geofence.create({
    data: {
      attendanceId,
      lat: geofence.lat,
      lng: geofence.lng,
      radius: geofence.radius,
      expiresAt,
    },
  });

  return NextResponse.json({ attendanceId });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const attendanceId = searchParams.get('attendanceId');

  if (attendanceId) {
    const geofence = await prisma.geofence.findUnique({
      where: { attendanceId },
    });

    if (geofence && geofence.expiresAt > new Date()) {
      return NextResponse.json({
        lat: geofence.lat,
        lng: geofence.lng,
        radius: geofence.radius,
      });
    } else {
      return NextResponse.json({ message: 'Geofence expired or not found' }, { status: 404 });
    }
  } else {
    return NextResponse.json({ message: 'Attendance ID not provided' }, { status: 400 });
  }
}
