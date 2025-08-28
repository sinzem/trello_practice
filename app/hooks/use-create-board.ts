import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ICreateBoardDto } from "../api/boards/dto";
import { api } from "../core/api";
import { Boards } from "../generated/prisma";
import { useBoardsQueryKey } from "./use-boards";

const createBoardFn = async (board: ICreateBoardDto) => {
    const { data } = await api.post<Boards>("/api/boards", board);

    return data;
}

export const useCreateBoard = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: createBoardFn,
        onSettled: () => {
            queryClient.invalidateQueries({queryKey: useBoardsQueryKey});
        }
    });

    return mutation;
};

