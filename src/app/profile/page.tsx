"use client";

import { data } from "autoprefixer";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

export default function ProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    
    

    const onLogout = async () => {
        try {
            await axios.get("/api/users/logout");
            router.push("/login");
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message);
        }
    }

    const getUserDetails = async () => {
        try {
            const res = await axios.get('/api/users/me');
            console.log(res.data);
            setUser(res.data.data.email);
        } catch (error: any) {
            throw new Error("Error in getUserDetails");
        }
    }

    return (
        <div 
            className="flex flex-col items-center justify-center min-h-screen py-2" 
        >
            <h1>Profile</h1>
            <p>Profile Page</p>   
            <h2>{user===null ? 'Empty' : <Link href={`/profile/${user}`}>Click Me</Link> }</h2>         
            <hr />
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={getUserDetails}
            >getData</button>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={onLogout}
            >Logout</button>
        </div>
    )
};
