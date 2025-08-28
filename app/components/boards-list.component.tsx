"use client";

import { Boards } from "../generated/prisma";
import { useBoards } from "../hooks/use-boards";
import BoardCard from "./board-card.component";

interface IBoardsList {
    initialData: Boards[];
}

const BoardsList = ({initialData}: IBoardsList) => {
    const { data } = useBoards({ initialData });

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

            {data && data.map((board) => (
                <BoardCard key={board.id} id={board.id} title={board.title}/>
            ))}

        </div>
    )
}
        
export default BoardsList;