import { NextResponse } from "next/server"
import { updateBoardDto } from "../dto";
import { prisma } from "@/app/core/prisma";

interface IBoardRouteContext {
    params: {
        id: string;
    }
}

export async function PATCH(req: Request, { params }: IBoardRouteContext) {
    const { id } = await params;
    const bodyRaw = await req.json();
    const validateBody = updateBoardDto.safeParse(bodyRaw);

    if (!validateBody.success) {
        return NextResponse.json(validateBody.error.issues, {
            status: 400,
        })
    }

    const findBoard = await prisma.boards.findUnique({
        where: {
            id,
        },
    });

    if (!findBoard) {
        return NextResponse.json([
            {
                code: "not_found",
                message: "Board not found"
            },
        ]);
    }

    const updatedBoard = await prisma.boards.update({
        where: {
            id,
        },
        data: validateBody.data,
    });

    return NextResponse.json(updatedBoard);
}

export async function DELETE(req: Request, { params }: IBoardRouteContext) {
    const { id } = await params;

    const findBoard = await prisma.boards.findUnique({
        where: {
            id,
        },
    });

    if (!findBoard) {
        return NextResponse.json([
            {
                code: "not_found",
                message: "Board not found"
            },
        ]);
    }

    await prisma.boards.delete({
        where: {
            id,
        },
    });

    return NextResponse.json({}, { status: 200 });
}

