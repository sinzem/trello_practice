import { useQuery } from "@tanstack/react-query";
import { Boards } from "../generated/prisma";
import { api } from "../core/api";

const getBoardsFn = async () => {
    const { data } = await api.get<Boards[]>("/api/boards");
   
    return data;
}

interface IUseBoardsOptions {
    initialData: Boards[];
}

export const useBoards = (({initialData}: IUseBoardsOptions) => {
    const query = useQuery({ 
        queryKey: ["boards"],
        queryFn: getBoardsFn,
        initialData
    });

    return query;
}) 