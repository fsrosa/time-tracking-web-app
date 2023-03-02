import type { NextApiRequest, NextApiResponse } from 'next'
import { tasks, Task } from './db'
import { v4 } from 'uuid'
import moment from 'moment'

type TaskResponse = {
  tasks?: Task[],
  message?: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<TaskResponse>
) {

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
