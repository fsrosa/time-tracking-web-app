import { useState } from 'react'

import Button from '@/components/Button/Button';
import { Form, Field } from 'react-final-form';
import { useRouter } from 'next/router';

import { Task } from '@/models/task';

import styles from './TaskForm.module.css';
import { useTask, useTaskId } from '@/service/apiClient';

type FormPropsInterface = {
  isNew?: boolean
  value?: Task 
}

const labels = ['FrontEnd', 'Backend', 'DevOps']


const TaskForm = ({ isNew, value }:FormPropsInterface) => {
  const router = useRouter();

  const [deletion, setDeletion] = useState<boolean>(false)

  const [, requestTask] = useTask()
  const [, requestTaskId] = useTaskId(value?.id)

  const handleTask = (formData: Task) => {
    if(isNew && !deletion){
      requestTask({ 
        method: "POST",
        data: {
          name: formData.name,
          type: formData.type,
          timeSpent: formData.timeSpent,
          startDate: formData.startDate?.replace('T', ' '),
          endDate: formData.endDate?.replace('T', ' '),
          labels: formData.labels
        }
      }).then(() => {
        alert('Task successfully created!')
        router.push('/')
      })
    } else if(!deletion) {
      requestTaskId({
        method: "PUT",
        data: {
          name: formData.name,
          type: formData.type,
          timeSpent: formData.timeSpent,
          startDate: formData.startDate?.replace('T', ' '),
          endDate: formData.endDate?.replace('T', ' '),
          labels: formData.labels
        }
      }).then(() => {
        alert('Task successfully updated!')
        router.push('/')
      })
    }
  }

  const handleDeleteTask = () => {
    requestTaskId({
      method: "DELETE",
    }).then(() => {
      alert('Task successfully deleted!')
      router.push('/')
    })
  }

  return (
    <main className={styles.formWrapper}>
      <Form onSubmit={handleTask} initialValues={value}>
        {({ handleSubmit, submitting }) => (
          <form className={styles.form} onSubmit={handleSubmit}>
            <div>
              <label>Name:</label>
              <Field name="name" component="input" type="text" required/>
            </div>
            <div>
              <label>Type:</label>
              <Field name="type" component="select" defaultValue="BUG" required>
                <option value="BUG">BUG</option>
                <option value="STORY">STORY</option>
              </Field>
            </div>
            <div>
              <label>Time Spent (hours):</label>
              <Field name="timeSpent" component="input" type="number" required min="0"/>
            </div>
            <div>
              <label>Start Date:</label>
              <Field 
                name="startDate" 
                component="input" 
                type="datetime-local"
                step="1"
                required
              />
            </div>
            <div>
              <label>End Date:</label>
              <Field 
                name="endDate" 
                component="input" 
                type="datetime-local" 
                step="1"
              />
            </div>
            <div className={styles.labels}>
              <label>Labels (0 to 3):</label>
              {labels.map((option) => (
                <div key={option}>
                  <label>
                    <Field
                      name="labels"
                      component="input"
                      type="checkbox"
                      value={option}
                    />
                    {option}
                  </label>
                </div>
              ))}
            </div>
            <div>
              <Button 
                text={isNew ? "Save" : "Update"}
                disabled={submitting}
              />
              {!isNew && (
                <Button
                  text='Delete'
                  style={{ backgroundColor: '#DF5C3E' }}
                  onClick={() => { 
                    setDeletion(true)
                    handleDeleteTask()
                  }}
                />
              )}
              <Button 
                text="Back"
                disabled={submitting}
                style={{ backgroundColor: '#808080' }}
                onClick={(e: any) => {
                  e.preventDefault()
                  router.back()
                }}
              />
            </div>
          </form>
        )}
      </Form>
    </main>
  )
}

export default TaskForm