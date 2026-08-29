export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma';

// GET: Lấy danh sách mục tiêu từ database
export async function GET() {
  try {
    const goals = await prisma.goal.findMany({
      orderBy: { id: 'desc' },
    });
    return NextResponse.json(goals, { status: 200 });
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu mục tiêu:', error);
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
    console.error('Lỗi khi tạo mục tiêu mới:', error);
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

// PUT: Cập nhật thông tin mục tiêu dựa vào ID
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, title, progress, status } = body;

    if (!id) {
      return NextResponse.json({ error: 'Thiếu ID mục tiêu cần sửa' }, { status: 400 });
    }

    const updatedGoal = await prisma.goal.update({
      where: { id: Number(id) },
      data: {
        ...(title && { title }),
        ...(progress !== undefined && { progress: parseInt(progress) }),
        ...(status && { status }),
      },
    });

    return NextResponse.json(updatedGoal, { status: 200 });
  } catch (error) {
    console.error('Lỗi khi cập nhật mục tiêu:', error);
    return NextResponse.json({ error: 'Không thể cập nhật mục tiêu' }, { status: 500 });
  }
}