import axios from 'axios'
import { useEffect, useState } from 'react'
import { FaRegUser } from "react-icons/fa";;

const UserDetail = ({ user }) => {
    const [persion, setPersion] = useState()
    useEffect(() => {
        const fatchUser = async () => {
            const api = await axios.get(`https://restart-gcl2.onrender.com/api/user/${user}`, {
                withCredentials: true,
            })
            setPersion(api.data.user.name);
        }
        fatchUser()
    }, [])
    return (
        <>
            <p className='ml-auto flex items-center gap-2'><FaRegUser color='green' />{persion}</p>
        </>

    )
}

export default UserDetail