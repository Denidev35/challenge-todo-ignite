import { PlusCircle } from 'phosphor-react'
import { ChangeEvent, FormEvent, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { Task, TaskProps } from './Task'

import styles from './Todo.module.css'
import { TodoEmpty } from './TodoEmpty'

interface TaskState {
    id: string;
    title: string;
    isComplete: boolean;
}

interface Task extends TaskProps {
    id: string
}

export function Todo() {
    const [tasks, setTesks] = useState<TaskState[]>([])
    const [newTaskText, setNewTaskText] = useState('')

    function handleCreateNewTask(event: FormEvent) {
        event.preventDefault()

        const newTask = {
            id: uuidv4(),
            title: newTaskText,
            isComplete: false
        }

        setTesks([...tasks, newTask])
        setNewTaskText('')
    }

    function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {

        setNewTaskText(event.target.value)
    }

    function completeTask(id: string) {
       setTesks(
        tasks.map(task => task.id === id ? {...task, isComplete: !task.isComplete}: task)
       )
    }


    function deleteTask(id: string) {
        const taskWithoutDeletedOne = tasks.filter(task => {
            return task.id !== id
        })

        setTesks(taskWithoutDeletedOne)
    }

    const taskCreated = tasks.length
    const taskDone = tasks.filter(task => {
        return task.isComplete === true
    }).length


    return (
        <div className={styles.todo}>
            <form onSubmit={handleCreateNewTask} className={styles.form}>
                <input
                    onChange={handleNewTaskChange}
                    value={newTaskText}
                    type="text"
                    placeholder="Adicione uma nova tarefa"
                    required
                />
                <button type="submit">Criar <PlusCircle size={20} /></button>
            </form>
            <div className={styles.info}>
                <div className={styles.created}>
                    <strong>Tarefas Criadas</strong>
                    <span>{taskCreated}</span>
                </div>
                <div className={styles.done}>
                    <strong>Concluídas</strong>
                    {tasks.length === 0 ? <span>0</span> : <span>{`${taskDone} de ${tasks.length}`}</span>}
                </div>
            </div>

            {tasks.length === 0 ? <TodoEmpty /> : (
                <ul className={styles.boxTasks}>
                    {tasks.map(task => {
                        return (
                            <li key={task.id}>
                                <Task
                                    id={task.id}
                                    title={task.title}
                                    isComplete={task.isComplete}
                                    onCompleteTask={completeTask}
                                    onDeleteTask={deleteTask}
                                />
                            </li>
                        )
                    })}
                </ul>
            )}

        </div>
    )
}