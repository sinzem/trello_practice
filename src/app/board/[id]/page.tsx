import { ColumnsList } from "@/components";
import { prisma } from "@/core/prisma";
import { notFound } from "next/navigation";

interface IPageParams {
    id: string;
}

interface IPageProps {
    params: IPageParams;
}

export default async function BoardPage(props: IPageProps) {
    const { id } = await props.params;
    const board = await prisma.boards.findUnique({
        where: { id },
        include: {
            columns: {
                orderBy: {
                    order: "asc",
                },
                include: {
                    cards: true,
                }
            }
        }
    });
 
    if (!board) {
        return notFound();
    }

    return (
        <>
            <div className="container mx-auto">
                <h1 className="text-white text-4xl text-center mb-8">
                    {board.title}
                </h1>
            </div>
            <ColumnsList board={board} />
        </>
    );
};


