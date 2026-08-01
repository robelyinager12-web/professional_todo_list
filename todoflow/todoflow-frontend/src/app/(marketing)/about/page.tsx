export default function AboutPage() {
  return (
    <main className="px-6 py-20">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-3xl font-bold text-foreground">About TodoFlow</h1>
        <p className="mt-4 text-muted-foreground">
          TodoFlow started as a simple idea: task management shouldn&apos;t feel like work.
          We built a todo app that&apos;s fast, beautiful, and stays out of your way, so you
          can spend less time organizing and more time doing.
        </p>
        <p className="mt-4 text-muted-foreground">
          Today, thousands of people use TodoFlow to plan their day, track their goals, and
          stay on top of what matters most.
        </p>
      </div>
    </main>
  );
}