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
        <div className="container mx-auto h-content flex flex-col">
            <h1 className="text-white text-4xl text-center mb-8">
                {board.title}
            </h1>
            <div className="flex flex-1">
                <div
                    className="block w-full p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 "
                >
                    <div>
                        <h5 className=" text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                            Column name
                        </h5>
                    </div>
                </div>
            </div>
        </div>
    );
};


