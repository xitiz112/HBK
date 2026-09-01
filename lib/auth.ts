import "server-only";

import { randomBytes, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtVerify, SignJWT } from "jose";

const SESSION_COOKIE = "hbk-admin-session";
const CSRF_COOKIE = "hbk-admin-csrf";

type SessionPayload = {
  userId: string;
  email: string;
  name: string;
};

function getSessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("ADMIN_SESSION_SECRET must be configured in production.");
    }

    return new TextEncoder().encode("local-development-secret-change-me");
  }

  return new TextEncoder().encode(secret);
}

export async function createAdminSession(payload: SessionPayload) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(payload.userId)
    .setIssuer("hbk-associates-admin")
    .setIssuedAt()
    .setExpirationTime("12h")
    .sign(getSessionSecret());

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/admin",
    maxAge: 60 * 60 * 12,
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete({ name: SESSION_COOKIE, path: "/admin" });
  cookieStore.delete({ name: CSRF_COOKIE, path: "/admin" });
}

export async function getAdminSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (!token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(token, getSessionSecret(), {
      issuer: "hbk-associates-admin",
    });
    return {
      userId: String(payload.userId),
      email: String(payload.email),
      name: String(payload.name),
    };
  } catch {
    return null;
  }
}

export async function requireAdminSession() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return session;
}

export async function getOrCreateAdminCsrfToken() {
  const cookieStore = await cookies();
  const existing = cookieStore.get(CSRF_COOKIE)?.value;

  if (existing) {
    return existing;
  }

  const token = randomBytes(32).toString("hex");
  cookieStore.set(CSRF_COOKIE, token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/admin",
    maxAge: 60 * 60 * 12,
  });

  return token;
}

export async function assertAdminCsrfToken(formData: FormData, failureRedirect: string) {
  const cookieStore = await cookies();
  const cookieToken = cookieStore.get(CSRF_COOKIE)?.value;
  const formToken = String(formData.get("csrfToken") ?? "");

  if (!cookieToken || !formToken) {
    redirect(failureRedirect);
  }

  const cookieBuffer = Buffer.from(cookieToken);
  const formBuffer = Buffer.from(formToken);

  if (
    cookieBuffer.length !== formBuffer.length ||
    !timingSafeEqual(cookieBuffer, formBuffer)
  ) {
    redirect(failureRedirect);
  }
}
