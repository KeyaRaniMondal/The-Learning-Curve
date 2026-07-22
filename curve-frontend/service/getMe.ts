// 'use server'
// import { cookies } from "next/headers"

// export const getMe=async()=>{
//     const cookieStore=await cookies()
//     const accessToken=cookieStore.get("accessToken")?.value //if we don't use value then jwt will consider it as object and show success false
//     if(!accessToken)
//         throw new Error("user not logged in")
//     const res=await fetch(`${process.env.BACKEND_API_URL}/api/users/me}`,{
//         headers:{
//             //how to send cookie
//             // Authorization:accessToken as unknown as string
//             // Authorization:`${accessToken}`
//             // Authorization:`Bearer${accessToken}`
//             Cookie:`accessToken=${accessToken}`
//         }
//     })
//     const result=res.json()
//     console.log(result);
//     return result
// }

// as it is a server function so we need to use it in a serrver component and if we want to use it in client component the we need to use it inside useffect       


"use server"

import { cookies } from "next/headers";

export const getMe = async () => {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value || null;

    if(!accessToken){
        // throw new Error("User Not Logged In!");

        return {
            success : false,
            message : "User not logged in!"
        }
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/users/me`, {
        headers : {
            // Authorization : accessToken as unknown as string,
            // Authorization : `${accessToken}`,
            // Authorization : `Bearer ${accessToken}`

            Cookie : `accessToken=${accessToken}`
        },

        cache : "force-cache",
        next : {
            revalidate : 60 * 60 * 24, // 1day
            tags : ["my-profile"]
        }
    });

    const result = res.json();


    return result
}