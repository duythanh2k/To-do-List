import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { apiCall } from '../api/apiCall'

type User = {
    user_id: number
    username: string
    password: string
}

export default function User() {
    const router = useRouter()
    const [profile, setProfile] = useState<User>()

    useEffect(() => {
        if (!router.isReady) return
        getUser()
    }, [router.isReady])

    const getUser = async () => {
        try {
            const user = await apiCall('GET', 'profile', null, true)
            if (user) {
                setProfile(user)
            } else {
                router.push('/auth/signin')
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <div className="">
                <h1 className="">User</h1>
                {profile ? (
                    <div>
                        {profile ? (
                            <div>
                                <p>Name: {profile.username}</p>
                            </div>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </>
    )
}
