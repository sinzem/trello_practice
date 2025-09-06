"use client";

import { Columns } from "@/generated/prisma";
import { useState, DragEvent, useRef } from "react";

interface IColumnProps {
    column: Columns;
}

const MIN_WIDTH = 200;

export const Column = ({ column }: IColumnProps) => {
    const initialDragX = useRef<number>(0);
    const [width, setWidth] = useState(column.width);

    const onResizeStart = (e: DragEvent<HTMLDivElement>) => {
        // setInitialDragX(e.clientX);
        initialDragX.current = e.clientX;
    }

    const onResize = (e: DragEvent<HTMLDivElement>) => {
        if (e.clientX === 0) return;

        // const movedBy = e.clientX - initialDragX;
        // setInitialDragX(e.clientX);
        const movedBy = e.clientX - initialDragX.current;
        initialDragX.current = e.clientX;

        setWidth((width) => {
            const newWidth = width + movedBy;
            if (newWidth < MIN_WIDTH) return MIN_WIDTH;
            return newWidth;
        });
    }

    return (
        <div
            key={column.id}
            style={{ minWidth: width, width }}
            className="block w-full p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 relative"
        >
            <div>
                <h5 className=" text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                    {column.title}
                </h5>
                <div 
                    className="absolute -right-px top-[0.5rem] bottom-[0.5rem] cursor-move w-px bg-gray-700 select-none opacity-0"
                    draggable
                    onDragStart={onResizeStart}
                    onDrag={onResize}
                />
            </div>
        </div>
    );
};

