// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'

type Config = {
    method: string
    url: string
    data?: any
    headers?: {
        'Content-Type': string
        Authorization: string
    }
}

export const apiCall = async (
    method: string,
    endpoint: string,
    data: any,
    authorization: boolean
) => {
    const config: Config = {
        method: method,
        url: `${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`,
    }
    if (data) {
        config.data = data
    }
    if (authorization) {
        config.headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        }
    }

    const response = await axios(config)
    return response.data
}
