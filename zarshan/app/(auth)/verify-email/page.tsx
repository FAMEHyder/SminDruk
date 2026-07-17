"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Loader2, MailCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useAuth } from "@/lib/auth-context";
import { authApi } from "@/lib/services";
import { ApiRequestError } from "@/lib/api";

function VerifyEmailForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { loginWithTokens } = useAuth();
  const email = searchParams.get("email") || "";
  const devCode = searchParams.get("devCode") || "";

  const [code, setCode] = React.useState(devCode);
  const [loading, setLoading] = React.useState(false);
  const [resending, setResending] = React.useState(false);

  async function handleVerify() {
    if (!email) {
      toast.error("Missing email address. Please register again.");
      return;
    }
    if (code.length < 6) {
      toast.error("Please enter the full 6-digit code.");
      return;
    }
    setLoading(true);
    try {
      const result = await authApi.verifyEmail({ email, code });
      await loginWithTokens(result.accessToken, result.refreshToken, result.user);
      toast.success("Email verified! Redirecting to your dashboard...");
      router.push("/dashboard");
    } catch (error) {
      const message = error instanceof ApiRequestError ? error.message : "Verification failed. Please try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    if (!email) {
      toast.error("Missing email address. Please register again.");
      return;
    }
    setResending(true);
    try {
      const result = await authApi.resendVerification(email);
      if (result.devVerificationCode) {
        setCode(result.devVerificationCode);
        toast.success(`New code: ${result.devVerificationCode} (shown because no email server is configured yet)`);
      } else {
        toast.success("Verification code resent!");
      }
    } catch (error) {
      const message = error instanceof ApiRequestError ? error.message : "Could not resend the code.";
      toast.error(message);
    } finally {
      setResending(false);
    }
  }

  return (
    <div className="text-center">
      <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <MailCheck className="size-7" />
      </span>
      <h1 className="mt-6 text-2xl font-semibold tracking-tight">Verify your email</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        We sent a 6-digit verification code to <span className="font-medium text-foreground">{email || "your email"}</span>. Enter it below to activate your account.
      </p>
      {devCode && (
        <p className="mt-2 rounded-lg bg-amber-500/10 px-3 py-2 text-xs text-amber-600 dark:text-amber-400">
          No email server is configured yet, so your code has been pre-filled for local testing:{" "}
          <span className="font-semibold">{devCode}</span>
        </p>
      )}

      <div className="mt-8 flex justify-center">
        <InputOTP maxLength={6} value={code} onChange={setCode}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>

      <Button className="mt-6 w-full" onClick={handleVerify} disabled={loading}>
        {loading && <Loader2 className="size-4 animate-spin" />}
        {loading ? "Verifying..." : "Verify Email"}
      </Button>

      <p className="mt-6 text-sm text-muted-foreground">
        Didn&apos;t receive a code?{" "}
        <button
          onClick={handleResend}
          disabled={resending}
          className="font-medium text-primary hover:underline disabled:opacity-50"
        >
          {resending ? "Resending..." : "Resend code"}
        </button>
      </p>

      <p className="mt-2 text-sm text-muted-foreground">
        <Link href="/login" className="font-medium text-primary hover:underline">
          Back to login
        </Link>
      </p>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <React.Suspense fallback={null}>
      <VerifyEmailForm />
    </React.Suspense>
  );
}
