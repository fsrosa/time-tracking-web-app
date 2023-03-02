import type { NextApiRequest, NextApiResponse } from 'next'
import { tasks, Task } from '../../models/task'
import { v4 } from 'uuid'
import moment from 'moment'
import Cors from 'cors'

type TaskResponse = {
  tasks?: Task[],
  message?: string
}

const cors = Cors({
  origin: '*',
  methods: ['GET', 'POST', 'GET', 'PUT', 'DELETE', 'HEAD'],
})

const runMiddleware = (
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TaskResponse>
) {
    await runMiddleware(req, res, cors)

    switch (req.method) {
      case 'GET':
  
        res.status(200).json({ tasks })
        break;
  
      case 'POST':
  
        const { name, type, timeSpent, startDate, endDate, labels }: Task = req.body
  
        if(!name) res.status(400).json({ message: 'Invalid name' })
        else if(type !== 'STORY' && type !== 'BUG') res.status(400).json({ message: 'Invalid task type, you have to define as STORY or BUG' })
        else if(!timeSpent) res.status(400).json({ message: 'Invalid time spent' })
        else if(!startDate) res.status(400).json({ message: 'Invalid start date' })
        else {
          tasks.push({ 
            id: v4(), 
            name, 
            type,
            timeSpent,
            startDate,
            endDate: endDate ?? moment().format("YYYY-MM-DD HH:mm:ss"),
            labels: labels ?? []
          })
          res.status(200).json({ message: 'Task successfully created' })
        }
  
        break;
    
      default:
        res.status(500).json({ message: 'An unknown error occurred' })
        break;
    }
}
