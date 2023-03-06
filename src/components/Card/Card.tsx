import { Task } from "@/models/task";
import Link from "next/link";

import styles from './Card.module.css'

type CardProps = {
  task: Task;
};

const Card: React.FunctionComponent<CardProps> = ({ task }) => {
  return (
    <>
      <Link className={styles.link} href={`/tasks/${task.id}`}>
        <div className={styles.container}>
          <span className={styles.taskName}>{task.name}</span>
        </div>
      </Link>
    </>
  )
}

export default Card