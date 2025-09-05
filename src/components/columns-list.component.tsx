"use client";

import { IBoardPayLoad, useBoardQuery } from "@/hooks/use-board-query";
import { CreateColumn } from "./create-column.component";

interface IColumnsListProps {
    board: IBoardPayLoad;
}

export const ColumnsList = ({ board }: IColumnsListProps) => {

    const { data } = useBoardQuery({ initialData: board });

    return (
        <div className="flex flex-1 gap-10 overflow-x-scroll w-full h-content px-10 pb-5">
            {data.columns?.map((column) => (
                <div
                    key={column.id}
                    style={{ minWidth: column.width, width: column.width }}
                    className="block w-full p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 "
                >
                    <div>
                        <h5 className=" text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                            {column.title}
                        </h5>
                    </div>
                </div>
            ))}
            <CreateColumn boardId={board.id} />
        </div>
    );
};

