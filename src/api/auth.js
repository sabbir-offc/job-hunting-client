import axiosSecure from "."

export const clearCookie = async () => {
    const { data } = await axiosSecure.get('/logout')
    console.log(data)
    return data
}
export const saveUser = async (userInfo) => {
    const { data } = await axiosSecure.post("/users", userInfo);
    return data
}

export const getToken = async (userEmail) => {
    const { data } = await axiosSecure.post(`/auth/access-token`, { email: userEmail })
    console.log('Token received from server------>', data)
    return data
}