// app/api/attendance/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


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
    const { name, asuId, attendanceId, ip } = await request.json();

    // Validate the attendanceId
    const geofenceExists = await prisma.geofence.findUnique({
      where: { attendanceId },
    });

    if (!geofenceExists) {
      return NextResponse.json({ message: 'Invalid attendance ID' }, { status: 400 });
    }

    await prisma.attendanceRecord.create({
      data: {
        name,
        asuId,
        attendanceId,
        ip,
      },
    });

    return NextResponse.json({ message: 'Attendance recorded' });
  } catch (error) {
    console.error('Error in POST /api/attendance:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    await prisma.attendanceRecord.deleteMany();
    return NextResponse.json({ message: 'All attendance records have been deleted.' });
  } catch (error) {
    console.error('Error in DELETE /api/attendance:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
