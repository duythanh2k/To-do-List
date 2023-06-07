import { apiCall } from '@/pages/api/apiCall'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { FaUser, FaUserInjured } from 'react-icons/fa'

// Define data type
type User = {
    user_id: number
    username: string
    password: string
}

export default function LayoutAuthenticated() {
    const router = useRouter()
    const [profile, setProfile] = useState<User>()
    const [isVisible, setIsVisible] = useState(false)

    const getUser = useCallback(async () => {
        try {
            const user = await apiCall('GET', 'profile', null, true)
            setProfile(user)
        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                // Unauthorized, redirect to Login page
                router.push('/auth/signin');
            } else {
                console.error(error);
            }
        }
    }, [router])

    useEffect(() => {
        if (!router.isReady) return
        getUser()
    }, [router, getUser])

    const logout = () => {
        localStorage.removeItem('access_token')
        router.push('/', undefined, { shallow: true })
    }

    return (
        <>
            <div
                className="relative cursor-pointer"
                onClick={() => setIsVisible(!isVisible)}
            >
                {isVisible ? (
                    <FaUserInjured className="text-4xl" />
                ) : (
                    <FaUser className="text-4xl" />
                )}
            </div>
            {isVisible && (
                <div className="flex-col w-fit bg-white absolute bottom-0 left-full rounded-md pl-3 pr-3">
                    <div className="text-black pt-2 pb-1">
                        {profile?.username}
                    </div>
                    <hr />
                    <div className="flex justify-start text-red-700 pt-1 pb-2">
                        <button onClick={logout}>Logout</button>
                    </div>
                </div>
            )}
        </>
    )
}
