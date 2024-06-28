import prisma from "@/app/utils/connect";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// POST A TASK
export const POST = async (req: Request) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, description, date, completed, important } = await req.json();

    if (!title || !description || !date) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (title.length < 3) {
      return NextResponse.json(
        { error: "Title must be at least 3 characters long" },
        { status: 400 }
      );
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        date,
        isCompleted: completed,
        isImportant: important,
        userId,
      },
    });

    return NextResponse.json(task, { status: 201 });
  } catch (error: any) {
    console.log("Error creating task", error);
    return NextResponse.json({ error: "Error creating task" }, { status: 500 });
  }
};

// FETCH ALL TASKS
export const GET = async (request: Request) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const tasks = await prisma.task.findMany({
      where: {
        userId,
      },
    });

    return NextResponse.json(tasks, { status: 200 });
  } catch (error: any) {
    console.log("Error getting tasks", error);
    return NextResponse.json({ error: "Error getting tasks" }, { status: 500 });
  }
};
