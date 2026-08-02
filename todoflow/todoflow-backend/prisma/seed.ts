import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("password123", 10);

  const demo = await prisma.user.upsert({
    where: { email: "demo@todoflow.app" },
    update: {},
    create: {
      fullName: "Demo User",
      username: "demo",
      email: "demo@todoflow.app",
      password: passwordHash,
    },
  });

  const teammate = await prisma.user.upsert({
    where: { email: "teammate@todoflow.app" },
    update: {},
    create: {
      fullName: "Alex Rivera",
      username: "alexr",
      email: "teammate@todoflow.app",
      password: passwordHash,
    },
  });

  const [work, personal, study, launch] = await Promise.all([
    prisma.category.upsert({
      where: { userId_name: { userId: demo.id, name: "Work" } },
      update: {},
      create: { name: "Work", color: "#6366f1", userId: demo.id },
    }),
    prisma.category.upsert({
      where: { userId_name: { userId: demo.id, name: "Personal" } },
      update: {},
      create: { name: "Personal", color: "#10b981", userId: demo.id },
    }),
    prisma.category.upsert({
      where: { userId_name: { userId: demo.id, name: "Study" } },
      update: {},
      create: { name: "Study", color: "#f59e0b", userId: demo.id },
    }),
    prisma.category.upsert({
      where: { userId_name: { userId: demo.id, name: "Product Launch" } },
      update: {},
      create: { name: "Product Launch", color: "#ec4899", userId: demo.id },
    }),
  ]);

  // Share "Product Launch" with the teammate so category-sharing has a real example
  await prisma.categoryMember.upsert({
    where: { categoryId_userId: { categoryId: launch.id, userId: teammate.id } },
    update: {},
    create: { categoryId: launch.id, userId: teammate.id },
  });

  const now = new Date();
  const days = (n: number) => new Date(now.getTime() + n * 24 * 60 * 60 * 1000);
  const minutesAgo = (n: number) => new Date(now.getTime() - n * 60 * 1000);

  await prisma.task.deleteMany({ where: { userId: { in: [demo.id, teammate.id] } } });

  const demoTasks = [
    // Overdue / urgent
    { title: "Finish Q3 report", description: "Pull numbers and summarize trends for leadership.", priority: "HIGH" as const, status: "IN_PROGRESS" as const, categoryId: work.id, dueDate: days(-1), tags: ["work", "urgent"] },
    { title: "Reply to client email", priority: "HIGH" as const, status: "PENDING" as const, categoryId: work.id, dueDate: days(0), reminderAt: minutesAgo(2), tags: ["work"] },
    // Due soon
    { title: "Review pull requests", priority: "MEDIUM" as const, status: "PENDING" as const, categoryId: work.id, dueDate: days(1), tags: ["work"] },
    { title: "Team standup prep", priority: "LOW" as const, status: "PENDING" as const, categoryId: work.id, dueDate: days(1), tags: ["work"] },
    { title: "1:1 with manager", priority: "MEDIUM" as const, status: "PENDING" as const, categoryId: work.id, dueDate: days(2), reminderAt: days(2), tags: ["work"] },
    // This week
    { title: "Book dentist appointment", priority: "MEDIUM" as const, status: "PENDING" as const, categoryId: personal.id, dueDate: days(3), tags: [] },
    { title: "Grocery shopping", priority: "LOW" as const, status: "PENDING" as const, categoryId: personal.id, dueDate: days(0), tags: ["errands"] },
    { title: "Call mom", priority: "LOW" as const, status: "PENDING" as const, categoryId: personal.id, dueDate: days(4), tags: [] },
    { title: "Read chapter 4 — Data Structures", priority: "MEDIUM" as const, status: "PENDING" as const, categoryId: study.id, dueDate: days(3), tags: ["study"] },
    { title: "Practice SQL exercises", priority: "HIGH" as const, status: "IN_PROGRESS" as const, categoryId: study.id, dueDate: days(1), tags: ["study"] },
    // Later this month
    { title: "Plan weekend trip", priority: "LOW" as const, status: "PENDING" as const, categoryId: personal.id, dueDate: days(10), tags: [] },
    { title: "Renew passport", priority: "MEDIUM" as const, status: "PENDING" as const, categoryId: personal.id, dueDate: days(20), tags: [] },
    { title: "Draft launch announcement", priority: "HIGH" as const, status: "PENDING" as const, categoryId: launch.id, dueDate: days(6), tags: ["launch"] },
    { title: "Finalize pricing page copy", priority: "MEDIUM" as const, status: "PENDING" as const, categoryId: launch.id, dueDate: days(8), tags: ["launch"] },
    // Completed (spread across the last week, for the productivity chart)
    { title: "Team standup notes", priority: "LOW" as const, status: "COMPLETED" as const, categoryId: work.id, completedAt: days(0), tags: ["work"] },
    { title: "Morning run", priority: "LOW" as const, status: "COMPLETED" as const, categoryId: personal.id, completedAt: days(-1), tags: ["health"] },
    { title: "Fix login bug", priority: "HIGH" as const, status: "COMPLETED" as const, categoryId: work.id, completedAt: days(-1), tags: ["work"] },
    { title: "Weekly grocery run", priority: "LOW" as const, status: "COMPLETED" as const, categoryId: personal.id, completedAt: days(-2), tags: [] },
    { title: "Submit expense report", priority: "MEDIUM" as const, status: "COMPLETED" as const, categoryId: work.id, completedAt: days(-2), tags: ["work"] },
    { title: "Study session — algorithms", priority: "MEDIUM" as const, status: "COMPLETED" as const, categoryId: study.id, completedAt: days(-3), tags: ["study"] },
    { title: "Yoga class", priority: "LOW" as const, status: "COMPLETED" as const, categoryId: personal.id, completedAt: days(-3), tags: ["health"] },
    { title: "Kickoff meeting notes", priority: "MEDIUM" as const, status: "COMPLETED" as const, categoryId: launch.id, completedAt: days(-4), tags: ["launch"] },
    { title: "Update resume", priority: "LOW" as const, status: "COMPLETED" as const, categoryId: personal.id, completedAt: days(-5), tags: [] },
    // Archived
    { title: "Old draft notes", priority: "LOW" as const, status: "ARCHIVED" as const, isArchived: true, categoryId: null, tags: [] },
    { title: "Cancelled feature spec", priority: "MEDIUM" as const, status: "ARCHIVED" as const, isArchived: true, categoryId: work.id, tags: ["work"] },
  ];

  for (const task of demoTasks) {
    await prisma.task.create({ data: { ...task, userId: demo.id } });
  }

  // A couple of tasks the teammate creates directly in the shared "Product Launch" category
  await prisma.task.create({
    data: {
      title: "Coordinate with design on launch assets",
      priority: "HIGH",
      status: "PENDING",
      categoryId: launch.id,
      dueDate: days(5),
      tags: ["launch"],
      userId: teammate.id,
    },
  });

  console.log("Seed complete.");
  console.log("Demo login    -> email: demo@todoflow.app,      password: password123");
  console.log("Teammate login -> email: teammate@todoflow.app, password: password123");
  console.log('("Product Launch" category is shared between both accounts)');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });