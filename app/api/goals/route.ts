import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET: Lấy danh sách mục tiêu từ database
export async function GET() {
  try {
    const goals = await prisma.goal.findMany({
      orderBy: { id: 'desc' },
    });
    return NextResponse.json(goals, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Không thể lấy dữ liệu mục tiêu' }, { status: 500 });
  }
}

// POST: Thêm mới một mục tiêu
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, progress, status } = body;

    const newGoal = await prisma.goal.create({
      data: {
        title: title || 'Mục tiêu mới',
        progress: progress ? parseInt(progress) : 0,
        status: status || 'Đang thực hiện',
      },
    });

    return NextResponse.json(newGoal, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Không thể tạo mục tiêu mới' }, { status: 500 });
  }
}

// DELETE: Xóa một mục tiêu dựa vào ID
export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: 'Thiếu ID mục tiêu cần xóa' }, { status: 400 });
    }

    await prisma.goal.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ message: 'Xóa mục tiêu thành công' }, { status: 200 });
  } catch (error) {
    console.error('Lỗi khi xóa mục tiêu:', error);
    return NextResponse.json({ error: 'Không thể xóa mục tiêu' }, { status: 500 });
  }
}