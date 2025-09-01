import { api } from "@/core/api";
import { Boards } from "@/generated/prisma";
import { useQuery } from "@tanstack/react-query";

const getBoardFn = async (boardId: string) => {
    const { data } = await api.get<Boards>(`/api/boards/${boardId}`);

    return data;
}

interface IUseBoardQueryOptions {
    initialData: Boards;
    id: string
}

export const useBoardQuery = ({initialData, id}: IUseBoardQueryOptions) => {
    const query = useQuery({
        queryKey: ["board", id],
        queryFn: () => getBoardFn(id),
        initialData
    });

    return query;
}
