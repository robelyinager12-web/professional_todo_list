import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("password123", 10);

  const user = await prisma.user.upsert({
    where: { email: "demo@todoflow.app" },
    update: {},
    create: {
      fullName: "Demo User",
      username: "demo",
      email: "demo@todoflow.app",
      password: passwordHash,
    },
  });

  const [work, personal, study] = await Promise.all([
    prisma.category.upsert({
      where: { userId_name: { userId: user.id, name: "Work" } },
      update: {},
      create: { name: "Work", color: "#6366f1", userId: user.id },
    }),
    prisma.category.upsert({
      where: { userId_name: { userId: user.id, name: "Personal" } },
      update: {},
      create: { name: "Personal", color: "#10b981", userId: user.id },
    }),
    prisma.category.upsert({
      where: { userId_name: { userId: user.id, name: "Study" } },
      update: {},
      create: { name: "Study", color: "#f59e0b", userId: user.id },
    }),
  ]);

  const today = new Date();
  const inDays = (n: number) => new Date(today.getTime() + n * 24 * 60 * 60 * 1000);

  const tasks = [
    {
      title: "Finish Q3 report",
      description: "Pull numbers from the analytics dashboard and summarize trends.",
      priority: "HIGH" as const,
      status: "IN_PROGRESS" as const,
      categoryId: work.id,
      dueDate: inDays(2),
      tags: ["work", "urgent"],
    },
    {
      title: "Review pull requests",
      priority: "MEDIUM" as const,
      status: "PENDING" as const,
      categoryId: work.id,
      dueDate: inDays(1),
      tags: ["work"],
    },
    {
      title: "Team standup notes",
      priority: "LOW" as const,
      status: "COMPLETED" as const,
      categoryId: work.id,
      completedAt: today,
      tags: ["work"],
    },
    {
      title: "Grocery shopping",
      priority: "LOW" as const,
      status: "PENDING" as const,
      categoryId: personal.id,
      dueDate: inDays(0),
      tags: ["errands"],
    },
    {
      title: "Book dentist appointment",
      priority: "MEDIUM" as const,
      status: "PENDING" as const,
      categoryId: personal.id,
      dueDate: inDays(5),
      tags: [],
    },
    {
      title: "Morning run",
      priority: "LOW" as const,
      status: "COMPLETED" as const,
      categoryId: personal.id,
      completedAt: inDays(-1),
      tags: ["health"],
    },
    {
      title: "Read chapter 4 — Data Structures",
      priority: "MEDIUM" as const,
      status: "PENDING" as const,
      categoryId: study.id,
      dueDate: inDays(3),
      tags: ["study"],
    },
    {
      title: "Practice SQL exercises",
      priority: "HIGH" as const,
      status: "IN_PROGRESS" as const,
      categoryId: study.id,
      dueDate: inDays(1),
      tags: ["study"],
    },
    {
      title: "Old draft notes",
      priority: "LOW" as const,
      status: "ARCHIVED" as const,
      isArchived: true,
      categoryId: null,
      tags: [],
    },
  ];

  for (const task of tasks) {
    await prisma.task.create({
      data: { ...task, userId: user.id },
    });
  }

  console.log("Seed complete.");
  console.log("Demo login -> email: demo@todoflow.app, password: password123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });