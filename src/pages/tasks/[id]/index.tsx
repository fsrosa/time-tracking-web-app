import { useEffect } from 'react' 
import { useRouter } from "next/router";

import TaskForm from "@/screens/Task/TaskForm"

import { useTaskId } from '@/service/apiClient'

const EditTask = () => {
  const router = useRouter();
  const { id } = router.query;

  const [{ data }, requestTaskId] = useTaskId(id);

  useEffect(() => {
    if (router.isReady) requestTaskId({
      method: "GET"
    });
  }, [router, requestTaskId]);

  return(
    <TaskForm 
      value={data?.task}
      isNew={false}
    />
  )
}

export default EditTask