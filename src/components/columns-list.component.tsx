"use client";

import { IBoardPayLoad, useBoardQuery } from "@/hooks/use-board-query";
import { CreateColumn } from "./create-column.component";
import { Column } from "./column.component";

interface IColumnsListProps {
    board: IBoardPayLoad;
}

export const ColumnsList = ({ board }: IColumnsListProps) => {

    const { data } = useBoardQuery({ initialData: board });

    return (
        <div className="flex flex-1 gap-10 overflow-x-scroll w-full h-content px-10 pb-5">
            {data.columns?.map((column) => (
                <Column key={`column-${column.id}`} column={column} />
            ))}
            <CreateColumn boardId={board.id} />
        </div>
    );
};

