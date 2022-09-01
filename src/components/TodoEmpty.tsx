import { ClipboardText } from 'phosphor-react'
import styles from './TodoEmpty.module.css'

export function TodoEmpty() {
    return(
        <div className={styles.container}>
            <ClipboardText size={56}/>

            <strong>Você ainda não tem tarefas cadastradas</strong>
            <p>Crie tarefas e organize seus itens a fazer</p>
        </div>
    )
}