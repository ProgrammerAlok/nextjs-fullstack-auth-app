"use client"

import { connect } from "@/dbConfig/dbConfig"
import axios from "axios"
import React, { useEffect, useState } from "react"

connect()

export default function ResetPasswordPage(){
    const [token, setToken] = React.useState('')
    const [verified, setVerified] = React.useState(false)
    const [error, setError] = React.useState(false)
    const [password, setPassword] = React.useState('')
    
    const resetPassword =async () => {
        try {
            await axios.post('/api/users/resetpassword', {token, password})
        } catch (error: any) {
            console.log(error.response.data)
        }
    }

    const verifyToken = async () => {
        try {
            await axios.post('/api/users/verifyforgotpasswordtoken', {token})
            setVerified(true)
        } catch (error: any) {
            setError(true)
            console.log(error.response.data)
        }
    }
    
    useEffect( () => {
        const urlToken = window.location.search.split('=')[1]
        setToken(urlToken || '')
    }, [])

    useEffect(()=>{
        if(token.length > 0){
            verifyToken();
        }
    }, [token])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl">Reset Password page</h1>
            <h2 className="p-2 bg-orange-500 text-black">{token ? token:'no token'}</h2>
            {verified && (
                <div>
                    <label htmlFor="password">password</label>
                    <input 
                        className="p-2 text-black"
                        type="password"
                        id="password" 
                        value={password}
                        onChange={(e)=> setPassword(e.target.value) }
                        placeholder="password" 
                    
                    />
                    <button
                        onClick={resetPassword}
                    >Submit</button>
                </div>
            )}
            {error && (
                <div>
                    <h2 className="text-2xl bg-red-500 text-black">Error occured in verify forgot password token try again later......</h2>
                </div>
            )}
        </div>
    )
}