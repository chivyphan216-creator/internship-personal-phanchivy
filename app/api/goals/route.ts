import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const goals = await prisma.goal.findMany();
    return NextResponse.json(goals);
  } catch (error: any) {
    console.error('Lỗi lấy danh sách mục tiêu:', error);
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 });
  }
}