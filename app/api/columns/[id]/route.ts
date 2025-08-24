import { NextResponse } from "next/server";
import { updateColumnDto } from "../dto";
import { prisma } from "@/app/core/prisma";

interface IColumnRouteContext {
    params: {
        id: string;
    }
}

export async function PUT(req: Request, { params }: IColumnRouteContext) {
    const { id } = await params;
    const bodyRaw = await req.json();
    const validateBody = updateColumnDto.safeParse(bodyRaw);

    if (!validateBody.success) {
        return NextResponse.json(validateBody.error.issues, { status: 400 });
    } 

    const findColumn = await prisma.columns.findUnique({
        where: {
            id,
        },
    });

    if (!findColumn) {
        return NextResponse.json([
            {
                code: "not_found",
                message: "Column not found",
            },
        ]);
    } 

    const column = await prisma.columns.update({
        where: {
            id,
        },
        data: validateBody.data,
    });

    return NextResponse.json(column);
}

export async function DELETE(req: Request, { params }: IColumnRouteContext) {
    const { id } = await params;
    
    const findColumn = await prisma.columns.findUnique({
        where: {
            id,
        },
    });

    if (!findColumn) {
        return NextResponse.json([
            {
                code: "not_found",
                message: "Column not found",
            },
        ]);
    } 

    await prisma.columns.delete({
        where: {
            id,
        },
    });

    return NextResponse.json({}, { status: 200 });
}