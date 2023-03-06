import type { NextApiRequest, NextApiResponse } from 'next'
import { tasks } from '../../models/task'
import Cors from 'cors'
import runMiddleware from '@/utils/runMiddleware'
import filterBugsAndStoriesLastWeek from '@/utils/filters/filterBugsAndStoriesLastWeek'
import filterTasksLastWeek from '@/utils/filters/filterTasksLastWeek'

const cors = Cors({
  origin: '*',
  methods: ['GET'],
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  await runMiddleware(req, res, cors)

  switch (req.method) {
    case 'GET':

      const filteredBugs = filterBugsAndStoriesLastWeek(tasks, "BUG");
      const filteredStories = filterBugsAndStoriesLastWeek(tasks, "STORY")
      const filteredTasks = filterTasksLastWeek(tasks)

      res.status(200).json({ 
        overview: { 
          filteredBugs,
          filteredStories,
          filteredTasks
       }})
      break;

    default:
      res.status(500).json({ message: 'An unknown error occurred' })
      break;
  }
}
