import { Task } from '@/models/task'
import moment from 'moment'

const filterTasksLastWeek = (tasks: Task[]) => {
  const tasksLastWeek = tasks.filter((task) => {
    const endDate = moment(task.endDate, 'YYYY-MM-DD HH:mm:ss');
    const lastWeek = moment().subtract(1, 'weeks').startOf('week');
    const endOfLastWeek = moment().subtract(1, 'weeks').endOf('week');
    return (
      (task.type === "BUG" || task.type === "STORY") &&
      endDate.isBetween(lastWeek, endOfLastWeek, undefined, '[]')
    );
  });
  const tasksLastWeekCount = tasksLastWeek.length;

  const tasksPreviousWeek = tasks.filter((task) => {
    const endDate = moment(task.endDate, 'YYYY-MM-DD HH:mm:ss');
    const previousWeek = moment().subtract(2, 'weeks').startOf('week');
    const endOfPreviousWeek = moment().subtract(2, 'weeks').endOf('week');
    return (
      (task.type === "BUG" || task.type === "STORY") &&
      endDate.isBetween(previousWeek, endOfPreviousWeek, undefined, '[]')
    );
  });
  const tasksPreviousWeekCount = tasksPreviousWeek.length;

  const percentDifference = ((tasksLastWeekCount - tasksPreviousWeekCount) / tasksPreviousWeekCount) * 100;

  return { tasksLastWeekCount, tasksPreviousWeekCount, percentDifference };
}

export default filterTasksLastWeek