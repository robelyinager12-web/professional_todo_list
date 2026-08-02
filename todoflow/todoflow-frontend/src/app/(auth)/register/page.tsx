import Image from "next/image";
import RegisterForm from "../../../components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="relative hidden w-1/2 lg:block">
        <Image
          src="/images/register-side.jpg"
          alt="TodoFlow"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="flex w-full flex-col items-center justify-center overflow-y-auto px-6 py-8 lg:w-1/2">
        <div className="mb-5 text-center">
          <h1 className="text-2xl font-semibold text-foreground">Create your account</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            It only takes a minute to get started
          </p>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}