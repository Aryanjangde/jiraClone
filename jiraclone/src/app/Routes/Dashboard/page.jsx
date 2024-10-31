"use client";
import TaskBoard from '../../../components/task-board';
import SearchBar from "../../../components/SearchBar";
import { useDataContext } from '@/context/dataContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Abc() {
    const router = useRouter();
    const { isLoggedIn } = useDataContext();

    useEffect(() => {
        if (!isLoggedIn) {
            router.push('/');
        }
    }, [isLoggedIn, router]);

    if (!isLoggedIn) {
        return null;
    }

    return (
        <div className="container mx-auto px-3 py-8 h-screen">
            <SearchBar />
            <TaskBoard />
        </div>
    );
}
