import RegisterForm from "../../../components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen">
      <div className="hidden w-1/2 items-center justify-center bg-gradient-to-br from-primary/10 via-primary/5 to-background lg:flex">
        <div className="max-w-md p-10 text-center">
          <h2 className="text-xl font-semibold text-foreground">
            Join thousands staying on top of their goals
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Create your free TodoFlow account and start planning your day in minutes.
          </p>
        </div>
      </div>

      <div className="flex w-full flex-col items-center justify-center px-6 py-12 lg:w-1/2">
        <div className="mb-8 text-center">
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