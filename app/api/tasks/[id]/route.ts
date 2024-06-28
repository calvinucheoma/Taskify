import prisma from "@/app/utils/connect";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// DELETE A TASK
export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const { userId } = auth();

    const { id } = params;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.task.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({ msg: "Task Deleted!" }, { status: 200 });
  } catch (error: any) {
    console.log("Error deleting task", error);
    return NextResponse.json({ error: "Error deleting task" }, { status: 500 });
  }
};

// UPDATE A COMPLETED TASK
export const PUT = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const { userId } = auth();

    const { id } = params;

    const { isCompleted } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const task = await prisma.task.update({
      where: {
        id,
      },
      data: {
        isCompleted,
      },
    });

    return NextResponse.json(task, { status: 200 });
  } catch (error: any) {
    console.log("Error updating task", error);
    return NextResponse.json({ error: "Error updating task" }, { status: 500 });
  }
};

// UPDATE A TASK
export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const { userId } = auth();

    const { id } = params;

    const body = await request.json();

    const { title, description, date, completed, important } = body;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized!" }, { status: 401 });
    }

    const task = await prisma.task.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        date,
        isCompleted: completed,
        isImportant: important,
        userId,
      },
    });

    return NextResponse.json(task, { status: 200 });
  } catch (error) {
    console.log("Error updating task", error);
    return NextResponse.json({ error: "Error updating task" }, { status: 500 });
  }
};
