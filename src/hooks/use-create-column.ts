import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ICreateColumnDto } from "../app/api/columns/dto";
import { api } from "../core/api";
import { Columns } from "../generated/prisma";
import { useBoardsQueryKey } from "./use-boards";

const createColumnFn = async (column: ICreateColumnDto) => {
    const { data } = await api.post<Columns>("/api/columns", column);

    return data;
}

export const useCreateColumnMutation = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: createColumnFn,
        onSettled: () => {
            queryClient.invalidateQueries({queryKey: useBoardsQueryKey});
        }
    });

    return mutation;
};

