'use server'
import { cookies } from "next/headers"

export const getMe=async()=>{
    const cookieStore=await cookies()
    const accessToken=cookieStore.get("accessToken")?.value //if we don't use value then jwt will consider it as object and show success false
    if(!accessToken)
        throw new Error("user not logged in")
    const res=await fetch(`${process.env.BACKEND_API_URL}/api/users/me}`,{
        headers:{
            //how to send cookie
            // Authorization:accessToken as unknown as string
            // Authorization:`${accessToken}`
            // Authorization:`Bearer${accessToken}`
            Cookie:`accessToken=${accessToken}`
        }
    })
    const result=res.json()
    console.log(result);
    return result
}

// as it is a server function so we need to use it in a serrver component and if we want to use it in client component the we need to use it inside useffect       