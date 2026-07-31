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

      <div className="hidden w-1/2 items-center justify-center bg-gradient-to-br from-primary/10 via-primary/5 to-background lg:flex">
        <div className="max-w-md p-10 text-center">
          <h2 className="text-xl font-semibold text-foreground">
            Organize your life. Complete more every day.
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            TodoFlow keeps your tasks, deadlines, and goals in one beautiful place.
          </p>
        </div>
      </div>
    </div>
  );
}