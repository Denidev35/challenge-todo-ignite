import { Trash } from "phosphor-react";

import styles from './Task.module.css'

export interface TaskProps {
    id: string
    title: string;
    isComplete: boolean;
    onCompleteTask: (id: string) => void;
    onDeleteTask: (id: string) => void;
}

export function Task({ id, title, onCompleteTask, isComplete, onDeleteTask }: TaskProps) {
    
    function handleCompleteTask() {
        onCompleteTask(id)
    }
    
    function handleDeleteTask() {
        onDeleteTask(id)
    }

    return (
        <div className={styles.task}>
            <div className={styles.checkLabel}>
                <input onClick={handleCompleteTask} readOnly type="checkbox" name="task" id="task" checked={isComplete} />
                <label htmlFor="task">{title}</label>
            </div>
            <button onClick={handleDeleteTask} ><Trash size={20}/></button>
        </div>

    )
}