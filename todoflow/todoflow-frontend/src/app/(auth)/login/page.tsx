import Image from "next/image";
import LoginForm from "../../../components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      <div className="flex w-full flex-col items-center justify-center px-6 lg:w-1/2">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold text-foreground">Welcome back</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Sign in to continue organizing your day
          </p>
        </div>
        <LoginForm />
      </div>

      <div className="relative hidden w-1/2 lg:block">
        <Image
          src="/images/login-side.jpg"
          alt="TodoFlow"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}