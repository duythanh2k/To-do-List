import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function User() {
    const router = useRouter()
    const [profile, setProfile] = useState(null)

    useEffect(() => {
        if (!router.isReady) return
        getUser()
    }, [router.isReady])

    const getUser = async () => {
        try {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/profile`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization:
                            'Bearer ' + localStorage.getItem('access_token'),
                    },
                }
            )
            if (res.status === 200) {
                setProfile(res.data)
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
