"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    })

    const [btnDisabeled, setBtnDisabeled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    useEffect(()=>{
        if(user.email.length > 0 && user.password.length > 0){
            setBtnDisabeled(false);
        }
        else {
            setBtnDisabeled(true);
        }
    }, [user]);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response =  await axios.post("/api/users/login", user);
            console.log("Login success ", response.data);
            toast.success("Login success");
            router.push("/profile");
        } catch (error: any) {
            console.log("Login failed ", error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }
    if(loading) return <h1>Loading.....</h1>

    return(
        <section 
            className="min-h-screen flex flex-col"
            style={{background: 'rgb(17,24,39)'}}
        >
            <div className="flex flex-1 items-center justify-center">
                <div className="px-4 lg:px-24 py-16 lg:max-w-xl sm:max-w-md w-full text-center">
                    <form className="text-center">
                        <h1 
                            className="font-bold tracking-wider text-3xl mb-8 w-full text-white"
                        >   Sign in to your account  </h1>
                        <div className="py-2 text-left">
                            <input 
                                className="focus:outline-none block w-full py-2 px-4 rounded-lg focus:border-gray-700 bg-slate-800 " 
                                placeholder="Email" 
                                type="email" 
                                id="email"
                                value={user.email}
                                onChange={e => setUser({...user, email: e.target.value})}
                                />
                        </div>
                        <div className="py-2 text-left">
                            <input 
                                className="bg-slate-800 block w-full py-2 px-4 rounded-lg focus:outline-none " 
                                placeholder="Password" 
                                type="password" 
                                id="password"
                                value={user.password}
                                onChange={e => setUser({...user, password: e.target.value})}
                            />
                        </div>
                        <div className="py-2">
                            <button 
                                type="submit" 
                                className=" focus:outline-none bg-indigo-600 text-white font-bold tracking-wider block w-full p-2 rounded-lg 
                                hover:bg-indigo-500 "
                                onClick={onLogin}
                            > Sign in </button>
                        </div>
                    </form>
                    <div className="text-center">
                        <Link 
                            href="/forgotpassword" 
                            className="hover:text-indigo-500 ml-2 no-underline  text-indigo-600 font-semibold"
                        >Forgot password?</Link>
                    </div>
                    <div className="text-center mt-12">
                        <span>
                            Don't have an account?
                        </span>
                        <Link href="/signup" className="text-md font-semibold hover:text-indigo-500 ml-2 no-underline  text-indigo-600">Create One</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

// <h1>Login</h1>
// <hr />

// <label htmlFor="email">email</label>
// <input 
//     className="p-2 text-black"
//     type="email"
//     id="email" 
//     value={user.email}
//     onChange={(e)=>{setUser({...user, email: e.target.value})}}
//     placeholder="email"            
// />

// <label htmlFor="password">password</label>
// <input 
//     className="p-2 text-black"
//     type="password"
//     id="password" 
//     value={user.password}
//     onChange={(e)=>{setUser({...user, password: e.target.value})}}
//     placeholder="password"            
// />

// <button 
//     className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 my-4"
//     onClick={onLogin}
// >Login here</button>

// <Link
// className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
// href="/signup">Visit Signup Page</Link>
// <Link
//     className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
//     href="/forgotpassword"
// >Visit Forgot Page</Link>