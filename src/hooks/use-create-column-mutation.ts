import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ICreateColumnDto as ICreateColumnDtoOriginal } from "../app/api/columns/dto";
import { api } from "../core/api";
import { Columns } from "../generated/prisma";
import { IBoardPayLoad } from "./use-board-query";

type ICreateColumnDto = Omit<ICreateColumnDtoOriginal, "width">

interface IUseCreateColumnMutationOptions {
    boardId: string;
}

const createColumnFn = async (column: ICreateColumnDto) => {
    const { data } = await api.post<Columns>("/api/columns", column);

    return data;
}

export const useCreateColumnMutation = ({boardId}: IUseCreateColumnMutationOptions) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: createColumnFn,
        // onSettled: () => {
            // queryClient.invalidateQueries({queryKey: useBoardsQueryKey});
        // },
        onSuccess: (newColumn) => {
            const data = queryClient.getQueryData<IBoardPayLoad>(['board', boardId]);
  
            if (!data) return;

            const columns = [...data.columns];

            columns.push({
                ...newColumn,
                cards: []
            });

            queryClient.setQueryData<IBoardPayLoad>(['board', boardId], (old) => ({
                ...old!, 
                columns
            }));
        }
    });

    return mutation;
};

