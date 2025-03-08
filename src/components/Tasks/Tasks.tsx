import { FormEvent, useContext, useState } from 'react';
import styles from './styles.module.scss';
import { TasksContext } from '../../context/TasksContext';

export const Tasks: React.FC = () => {
    const [taskTitle, setTaskTitle] = useState("");
    const {tasks, setTasks} = useContext(TasksContext);
    

    function handleSubmitAddTask(event: FormEvent) {
        event.preventDefault();

        if (taskTitle.length < 3) {
            alert('Este nome é muito pequeno');
            return;
        }

        const newTasks = [
            { id: new Date().getTime(), title: taskTitle, done: false },
            ...tasks,
        ];

        setTasks(newTasks);
        localStorage.setItem('tasks', JSON.stringify(newTasks));
        setTaskTitle("");
    }

    function handleToggleTaskStatus(taskId: number) {
        const newTasks = tasks.map((task) => {
            if (taskId === task.id) {
                return {
                    ...task,
                    done: !task.done
                }
            }
            return task
        })

        setTasks(newTasks);
    }

    function handleRemoveTask(taskId: number) {
        setTasks(RemovedTasks => RemovedTasks.filter(task => task.id !== taskId));
    }    

    return (
        <section className={styles.container}>
            <form onSubmit={handleSubmitAddTask}>
                <div>
                    <label htmlFor='task-title'>Adicionar Tarefa</label>
                    <input
                        value={taskTitle}
                        onChange={(event) => setTaskTitle(event.target.value)}
                        type='text' id='task-title'
                        placeholder='Título da Tarefa'
                    />
                </div>
                <button type='submit'>Adicionar Tarefa</button>
            </form>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        <input type="checkbox"
                        id={`task-${task.id}`} 
                        onChange={() => handleToggleTaskStatus(task.id)} 
                        />
                        <label className={task.done ? styles.done : ""} htmlFor={`task-${task.id}`}>{task.title}</label>

                        <li className='removeButton' onClick={() => handleRemoveTask(task.id)}><img src="/lixeira.svg" alt="Lixeira" />
                        </li>
                    </li>
                ))}
            </ul>
        </section>
    );
};
    