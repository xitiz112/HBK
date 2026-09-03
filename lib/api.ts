import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import type { ZodType } from "zod";

import { getAdminSessionFromRequest } from "@/lib/auth";

export function json<T>(data: T, status = 200) {
  return NextResponse.json(data, { status });
}

export function apiError(message: string, status = 400, extra?: Record<string, unknown>) {
  return NextResponse.json({ error: message, ...extra }, { status });
}

export async function parseJsonBody<T>(request: Request, schema: ZodType<T>) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return { error: apiError("Invalid JSON body", 400) as NextResponse };
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return {
      error: apiError("Validation failed", 422, {
        issues: parsed.error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      }) as NextResponse,
    };
  }

  return { data: parsed.data };
}

export async function requireAdminApi(request: Request) {
  const session = await getAdminSessionFromRequest(request);
  if (!session) {
    return { error: apiError("Unauthorized", 401) as NextResponse };
  }
  return { session };
}

export function handlePrismaError(error: unknown) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2025") {
      return apiError("Not found", 404);
    }
    if (error.code === "P2002") {
      return apiError("A record with that unique value already exists.", 409);
    }
  }
  console.error(error);
  return apiError("Internal server error", 500);
}
