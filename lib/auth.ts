import "server-only";

import { timingSafeEqual } from "node:crypto";
import { cookies, headers } from "next/headers";
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

export async function signAdminToken(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(payload.userId)
    .setIssuer("hbk-associates-admin")
    .setIssuedAt()
    .setExpirationTime("12h")
    .sign(getSessionSecret());
}

export async function verifyAdminToken(token: string): Promise<SessionPayload | null> {
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

export async function createAdminSession(payload: SessionPayload) {
  const token = await signAdminToken(payload);
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 12,
    path: "/",
  });

  return token;
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete({ name: SESSION_COOKIE, path: "/" });
  cookieStore.delete({ name: SESSION_COOKIE, path: "/admin" });
  cookieStore.delete({ name: CSRF_COOKIE, path: "/" });
  cookieStore.delete({ name: CSRF_COOKIE, path: "/admin" });
}

function readCookieFromHeader(request: Request, name: string) {
  const header = request.headers.get("cookie");
  if (!header) {
    return null;
  }

  for (const part of header.split(";")) {
    const [key, ...rest] = part.trim().split("=");
    if (key === name) {
      try {
        return decodeURIComponent(rest.join("="));
      } catch {
        return rest.join("=");
      }
    }
  }

  return null;
}

export async function getAdminSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) {
    return null;
  }
  return verifyAdminToken(token);
}

export async function getAdminSessionFromRequest(request: Request) {
  const header = request.headers.get("authorization");
  if (header?.startsWith("Bearer ")) {
    const fromHeader = await verifyAdminToken(header.slice(7).trim());
    if (fromHeader) {
      return fromHeader;
    }
  }

  const fromRequest = readCookieFromHeader(request, SESSION_COOKIE);
  if (fromRequest) {
    const session = await verifyAdminToken(fromRequest);
    if (session) {
      return session;
    }
  }

  return getAdminSession();
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

  const headerStore = await headers();
  return headerStore.get("x-hbk-admin-csrf") ?? "";
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
