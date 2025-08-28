"use client"

import z from "zod";
import { Input } from "./";
import {useForm}  from 'react-hook-form';
import {zodResolver} from "@hookform/resolvers/zod"
import { useState } from "react";
import { useCreateBoard } from "../hooks/use-create-board";

const createBoardSchema = z.object({
    title: z.string().min(1).max(20),
});

type ICreateBoardValues = z.infer<typeof createBoardSchema>; 

export const CreateBoard = () => {
    const [isFormOpened, setIsFormOpened] = useState(false);

    const { 
        register, 
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<ICreateBoardValues>({
        resolver: zodResolver(createBoardSchema)
    })

    const { mutateAsync } = useCreateBoard();

    const onSubmit = handleSubmit(async (values) => {
        await mutateAsync(values);
        setIsFormOpened(false);
    })

    const openForm = () => setIsFormOpened(true);

    return (
        <div 
            onClick={openForm}
            className="block w-full p-6 bg-white border border-gray-200 rounded-lg shadow-sm cursor-pointer hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
            {isFormOpened ? (
                <form onSubmit={onSubmit}>
                    <Input 
                        {...register("title")} 
                        placeholder="Enter board title"
                        error={errors.title?.message}
                        disabled={isSubmitting}
                    />
                </form>
            ) : (
                <h5 className=" text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    + Create new board
                </h5>
            )}
            
        </div>
    );
};

