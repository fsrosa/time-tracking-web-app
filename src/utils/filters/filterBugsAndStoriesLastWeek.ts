import { Task } from '@/models/task'
import moment from 'moment'
import addPlusSignToPositiveStringNumber from '../addPlusSignToPositiveStringNumber';

const filterBugsAndStoriesLastWeek = (tasks: Task[], type: "BUG" | "STORY") => {
  const tasksLastWeek = tasks.filter((task) => {
    const endDate = moment(task.endDate, 'YYYY-MM-DD HH:mm:ss');
    const lastWeek = moment().subtract(1, 'weeks').startOf('week');
    const endOfLastWeek = moment().subtract(1, 'weeks').endOf('week');
    return (
      task.type === type &&
      endDate.isBetween(lastWeek, endOfLastWeek, undefined, '[]')
    );
  });
  const tasksLastWeekCount = tasksLastWeek.length;

  const tasksPreviousWeek = tasks.filter((task) => {
    const endDate = moment(task.endDate, 'YYYY-MM-DD HH:mm:ss');
    const previousWeek = moment().subtract(2, 'weeks').startOf('week');
    const endOfPreviousWeek = moment().subtract(2, 'weeks').endOf('week');
    return (
      task.type === type &&
      endDate.isBetween(previousWeek, endOfPreviousWeek, undefined, '[]')
    );
  });
  const tasksPreviousWeekCount = tasksPreviousWeek.length;

  let percentDifference = (((tasksLastWeekCount - tasksPreviousWeekCount) / tasksPreviousWeekCount) * 100).toFixed(0);
  percentDifference = addPlusSignToPositiveStringNumber(percentDifference)

  return { tasksLastWeekCount, tasksPreviousWeekCount, percentDifference };
}

export default filterBugsAndStoriesLastWeek