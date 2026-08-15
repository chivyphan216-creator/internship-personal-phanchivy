import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Thiếu email hoặc mật khẩu' }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: 'Email này đã được sử dụng!' }, { status: 400 });
    }

    const user = await prisma.user.create({
      data: { email, password, name: name || 'Thành viên' },
    });

    return NextResponse.json({ message: 'Đăng ký thành công', user }, { status: 201 });
  } catch (error: any) {
    console.error('Lỗi đăng ký:', error);
    return NextResponse.json({ error: 'Lỗi server khi đăng ký' }, { status: 500 });
  }
}