import bcrypt from "bcryptjs";

import { apiError, json, parseJsonBody } from "@/lib/api";
import { createAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/lib/schemas";

export async function POST(request: Request) {
  const parsed = await parseJsonBody(request, loginSchema);
  if (parsed.error) {
    return parsed.error;
  }

  const user = await prisma.adminUser.findUnique({
    where: { email: parsed.data.email },
  });

  if (!user) {
    return apiError("Invalid email or password", 401);
  }

  const matches = await bcrypt.compare(parsed.data.password, user.passwordHash);
  if (!matches) {
    return apiError("Invalid email or password", 401);
  }

  const token = await createAdminSession({
    userId: user.id,
    email: user.email,
    name: user.name,
  });

  return json({
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
  });
}
