"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function SignupPage() {
    const router = useRouter();
    
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    })
    
    const [btnDisabeled, setBtnDisabeled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    useEffect(()=>{
        if(user.username.length>0 && user.email.length>0 && user.password.length>0){
            setBtnDisabeled(false);
        }
        else {
            setBtnDisabeled(true);
        }
    }, [user]);

    const onSignUp = async () => {
        // if(btnDisabeled) return
        console.log("on signup before try")
        try {
            setLoading(true);
            console.log("on signup is going to call")
            const response = await axios.post("/api/users/signup", user);
            console.log("on signup is going to called")
            console.log("Signup success..", response.data);
            router.push("/login")
        } catch (error: any) {
            console.log("on signup before try 1")
            console.log("Signup failed..., ", error);
            toast.error(error.message);
        } finally {
            console.log("on signup before try 2")
            setLoading(false);
        }
        console.log("on signup before try 2")
    }
    if (loading) return (<h1>Loading</h1>)
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
                        >   Create a new account  </h1>
                        <div className="py-2 text-left">
                            <input 
                                className="focus:outline-none block w-full py-2 px-4 rounded-lg focus:border-gray-700 bg-slate-800 " 
                                placeholder="Username" 
                                type="text" 
                                id="username"
                                value={user.username}
                                onChange={(e) => setUser({...user, username: e.target.value})}
                                />
                        </div>
                        <div className="py-2 text-left">
                            <input 
                                className="focus:outline-none block w-full py-2 px-4 rounded-lg focus:border-gray-700 bg-slate-800 " 
                                placeholder="Email" 
                                type="email" 
                                id="email"
                                value={user.email}
                                onChange={(e) => setUser({...user, email: e.target.value})}
                                />
                        </div>
                        <div className="py-2 text-left">
                            <input 
                                className="bg-slate-800 block w-full py-2 px-4 rounded-lg focus:outline-none " 
                                placeholder="Password" 
                                type="password" 
                                id="password"
                                value={user.password}
                                onChange={(e) => setUser({...user, password: e.target.value})}
                            />
                        </div>
                        <div className="py-2"
                             onClick={ () => onSignUp() }
                        >
                            <button 
                                type="submit" 
                                className=" focus:outline-none bg-indigo-600 text-white font-bold tracking-wider block w-full p-2 rounded-lg 
                                hover:bg-indigo-500 "
                               
                            > {btnDisabeled?"No signup":"Signup here"} </button>
                        </div>
                        <button 
                        onClick={onSignUp}
                        >test</button>
                    </form>
                    <div className="text-center flex justify-around">
                        <Link 
                            href="/forgotpassword" 
                            className="hover:text-indigo-500 ml-2 no-underline  text-indigo-600 font-semibold "
                        >Forgot password?</Link>
                        <Link 
                            href="/login" 
                            className="hover:text-indigo-500 ml-2 no-underline  text-indigo-600 font-semibold"
                        >Login</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}