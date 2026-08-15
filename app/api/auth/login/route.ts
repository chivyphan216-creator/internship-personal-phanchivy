import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || user.password !== password) {
      return NextResponse.json({ error: 'Email hoặc mật khẩu không chính xác!' }, { status: 401 });
    }

    return NextResponse.json({ message: 'Đăng nhập thành công', user });
  } catch (error: any) {
    console.error('Lỗi đăng nhập:', error);
    return NextResponse.json({ error: 'Lỗi server khi đăng nhập' }, { status: 500 });
  }
}