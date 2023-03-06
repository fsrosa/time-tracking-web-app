import useAxios from 'axios-hooks'

let apiDomain: string;

if(process.env.VERCEL_URL)
    apiDomain = `https://${process.env.VERCEL_URL}`
else
    apiDomain = 'http://localhost:3000'

const getUrl = (path = '') => `${apiDomain}/api${path}`

export const useTask = () => useAxios({
    url: getUrl('/task'),
}, { manual: true })

export const useTaskId = (id: any) => useAxios({
    url: getUrl(`/task/${id}`),
}, { manual: true })

export const useOverview = () => useAxios({
    url: getUrl('/overview')
}, { manual: true })