import Link from 'next/link';
import React from 'react';

interface IBoardCardProps {
    id: string;
    title: string;
}

const BoardCard = ({id, title}: IBoardCardProps) => {
    return (
        <Link 
            href={`/board/${id}`} 
            className="block w-full p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
            <h5 className=" text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {title}
            </h5>
        </Link>
    );
};

export default BoardCard;