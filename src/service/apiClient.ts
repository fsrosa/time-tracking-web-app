import useAxios from 'axios-hooks'

const getUrl = (path = '') => `https://${process.env.VERCEL_URL}/api${path}`

export const useTask = () => useAxios({
    url: getUrl('/task'),
}, { manual: true })