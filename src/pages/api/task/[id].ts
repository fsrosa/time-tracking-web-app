import type { NextApiRequest, NextApiResponse } from 'next'
import { tasks, Task } from '../../../models/task'
import moment from 'moment'
import Cors from 'cors'

type TaskResponse = {
  task?: Task,
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

  const { id: taskId } = req.query

  switch (req.method) {
    case 'GET':

      const task = tasks.find(task => task.id === taskId)

      if(task) res.status(200).json({ task })
      else res.status(404).json({ message: 'Task not found' })

      break;

    case 'PUT':

      const { name, type, timeSpent, startDate, endDate, labels }: Task = req.body

      if(!name) res.status(400).json({ message: 'Invalid name' })
      else if(type !== 'STORY' && type !== 'BUG') res.status(400).json({ message: 'Invalid task type, you have to define as STORY or BUG' })
      else if(!timeSpent) res.status(400).json({ message: 'Invalid time spent' })
      else if(!startDate) res.status(400).json({ message: 'Invalid start date' })
      else {
        let updated = false;
      
        tasks.forEach(task => {
          if(task.id === taskId){
            task.name = name
            task.type = type,
            task.timeSpent = timeSpent,
            task.startDate =  startDate,
            task.endDate = endDate ?? moment().format("YYYY-MM-DD HH:mm:ss"),
            task.labels = labels ?? []
  
            updated = true
          }
        })
  
        if(updated) res.status(200).json({ message: 'Task successfully updated'})
        else res.status(404).json({ message: 'Task not found' })
      }

      break;

    case 'DELETE':

      let deleted = false

      tasks.forEach((task, index) => {
        if(task.id === taskId) {
          tasks.splice(index, 1)
          deleted = true
        }
      })

      if(deleted) res.status(200).json({ message: 'Task successfully deleted'}) 
      else res.status(404).json({ message: 'Task not found' })
      
      break;
  
    default:
      res.status(500).json({ message: 'An unknown error occurred' })
      break;
  }

}
