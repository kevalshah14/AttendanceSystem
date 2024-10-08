// app/api/attendance/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Utility function to extract the client's IP address from the request.
 * It checks various headers that might contain the real IP if the app is behind proxies.
 */
const getClientIp = (request: Request): string => {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    const ips = forwarded.split(',').map(ip => ip.trim());
    return ips[0];
  }
  // Fallback to connection remote address (may not work in some environments)
  // For Next.js Edge Middleware or Serverless functions, you might need different methods
  return '0.0.0.0';
};

export async function GET(request: Request) {
  try {
    const records = await prisma.attendanceRecord.findMany({
      orderBy: { date: 'desc' },
    });
    return NextResponse.json({ records });
  } catch (error) {
    console.error('Error in GET /api/attendance:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name, asuId, attendanceId } = await request.json();

    // Validate the required fields
    if (!name || !asuId || !attendanceId) {
      return NextResponse.json({ message: 'Missing required fields.' }, { status: 400 });
    }

    // Validate ASU ID: exactly 10 digits
    const asuIdRegex = /^\d{10}$/;
    if (!asuIdRegex.test(asuId)) {
      return NextResponse.json({ message: 'ASU ID must be exactly 10 digits.' }, { status: 400 });
    }

    // Retrieve the client's IP address server-side
    const ip = getClientIp(request);

    // Validate the attendanceId by checking if the corresponding geofence exists and is not expired
    const geofence = await prisma.geofence.findUnique({
      where: { attendanceId },
    });

    if (!geofence) {
      return NextResponse.json({ message: 'Invalid attendance ID.' }, { status: 400 });
    }

    // Optional: Check if the geofence has expired
    const now = new Date();
    if (geofence.expiresAt < now) {
      return NextResponse.json({ message: 'Attendance session has expired.' }, { status: 400 });
    }

    // Define the start and end of the current day (UTC)
    const startOfToday = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
    const startOfTomorrow = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1));

    // Check if an attendance record with the same IP and attendanceId exists today
    const existingRecord = await prisma.attendanceRecord.findFirst({
      where: {
        ip: ip,
        attendanceId: attendanceId,
        date: {
          gte: startOfToday,
          lt: startOfTomorrow,
        },
      },
    });

    if (existingRecord) {
      return NextResponse.json(
        { message: 'Attendance has already been submitted from your IP address today.' },
        { status: 409 }
      );
    }

    // Create a new attendance record
    const newAttendance = await prisma.attendanceRecord.create({
      data: {
        name,
        asuId,
        attendanceId,
        ip,
        date: now, // Automatically set to current date and time
      },
    });

    return NextResponse.json({ message: 'Attendance recorded successfully.' }, { status: 200 });
  } catch (error) {
    console.error('Error in POST /api/attendance:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(request: Request) {
  try {
    await prisma.attendanceRecord.deleteMany();
    return NextResponse.json({ message: 'All attendance records have been deleted.' }, { status: 200 });
  } catch (error) {
    console.error('Error in DELETE /api/attendance:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
