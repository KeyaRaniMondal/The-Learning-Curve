export const registerAction = async (formData: FormData) => {
    const name = formData.get('name')
    const email = formData.get('email')
    const password = formData.get('password')

    const payload = {
        name, email, password
    }
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    return res
}

export const loginAction = async (formData: FormData) => {
    const email = formData.get('email')
    const password = formData.get('password')
    const payload = {
        email, password
    }
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login}`, {
        method: 'POSt',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    return res
}