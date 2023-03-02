export type Task = {
    id: string;
    name: string;
    type: string;
    timeSpent: number;
    startDate: string;
    endDate: string;
    labels: string[];
}

var tasks: Array<Task> = []

export { tasks }