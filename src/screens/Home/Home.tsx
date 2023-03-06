/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react"
import { useRouter } from "next/router"

import styles from './Home.module.css'

import { useTask, useOverview } from "@/service/apiClient"
import Card from "@/components/Card/Card";
import { Task } from "@/models/task";
import Button from "@/components/Button/Button";
import OverviewCard from "@/components/OverviewCard/OverviewCard";

const Home = () => {
  const router = useRouter()

  const [{ data }, requestTask] = useTask()
  const [{ data: { overview: overviewData } = [] }, requestOverview] = useOverview()

  const downloadLinkRef = useRef<HTMLAnchorElement>(null);

  const handleExportTasksClick = () => {
    if (data?.tasks.length < 1) {
      alert('There are no tasks created!')
    } else {
      const tasksJson = JSON.stringify(data?.tasks);
      const blob = new Blob([tasksJson], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      if (downloadLinkRef.current) {
        downloadLinkRef.current.href = url;
        downloadLinkRef.current.download = "tasks.json";
        downloadLinkRef.current.click();
      } else { alert('Error when generating the file!') }
    }
  };

  const handleImportTasks = (target: any) => {
    const file = target.files[0]
    const reader = new FileReader();

    reader.readAsText(file)
    reader.onload = () => {
      const jsonData = JSON.parse(reader.result as string);

      requestTask({
        method: 'POST',
        data: {
          bulkTasks: jsonData
        },
        params: {
          bulk: true
        }
      }).then((res) => {
        alert(res?.data?.message)
        router.reload()
      })
        .catch((err) => alert(err?.data?.message))
    }
  }

  useEffect(() => {
    requestTask({
      method: 'GET'
    })
    requestOverview({
      method: 'GET'
    })
  }, [])

  return (
    <>
      <main className={styles.wrapper}>
        <div>
          <Button
            text="Export Tasks"
            onClick={() => {
              handleExportTasksClick()
            }}
            style={{
              backgroundColor: '#FF7F00'
            }}
          />
          <a
            ref={downloadLinkRef}
            style={{ display: 'none' }}
          />

          <label
            htmlFor="importFile"
            style={{ cursor: 'pointer' }}
          >
            <Button
              text="Import Tasks"
              style={{
                backgroundColor: '#FF7F00',
                zIndex: '-1'
              }}
            >
              <input
                type="file"
                id="importFile"
                style={{ display: 'none' }}
                onChange={(e) => handleImportTasks(e.target)}
              />
            </Button>
          </label>

          <Button
            text="New Task"
            onClick={() => router.push('/tasks/new')}
          />

        </div>
        <span className={styles.title}>Task List:</span>
        <div className={styles.cardsContainer}>
          {data?.tasks?.length > 0 ? data?.tasks.map((task: Task) => (
            <Card
              key={task.id}
              task={task}
            />
          )) : (
            <p className={styles.emptyContainer}>
              There are no tasks created. Click "New Task" and create the first one!
            </p>
          )}
        </div>
        <span className={styles.title}>Task OverView (Last Week):</span>
        {
          overviewData && (
            <div className={styles.overviewContainer}>
              <OverviewCard 
                name="BUGs"
                value={overviewData?.filteredBugs?.tasksLastWeekCount}
                percent={
                  overviewData?.filteredBugs?.percentDifference ?
                  (overviewData?.filteredBugs?.percentDifference + '%') :
                  '-'
                }
              />
              <OverviewCard 
                name="STORYs"
                value={overviewData?.filteredStories?.tasksLastWeekCount}
                percent={
                  overviewData?.filteredStories?.percentDifference ?
                  (overviewData?.filteredStories?.percentDifference + '%') :
                  '-'
                }
              />
              <OverviewCard 
                name="TOTAL"
                value={overviewData?.filteredTasks?.tasksLastWeekCount}
                percent={
                  overviewData?.filteredTasks?.percentDifference ?
                  (overviewData?.filteredTasks?.percentDifference + '%') :
                  '-'
                }
              />
            </div>
          )
        }
      </main>
    </>
  )
}

export default Home;