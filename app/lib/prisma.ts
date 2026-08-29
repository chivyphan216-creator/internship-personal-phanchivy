import { PrismaClient } from '@prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'
import { createClient } from '@libsql/client'

// Dùng 'file:./dev.db' làm fallback để vượt qua vòng kiểm tra URL của Next.js lúc build
const libsql = createClient({
  url: process.env.DATABASE_URL || 'file:./dev.db',
  authToken: process.env.TURSO_AUTH_TOKEN,
})

const adapter = new PrismaLibSql(libsql as any)

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({ adapter: adapter as any })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma