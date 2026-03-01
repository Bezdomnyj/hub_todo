import { useLists } from '../../contexts/ListsContext'
import type { Todo } from '../../entities/Todo'
import TodoComponent from '../todo/Todo'
import styles from './List.module.scss'

import { useCallback, useMemo, useState } from "react"

export type ListProps = {
    id: string
    title: string
    todo: Todo[]
}

const ListComponent = (props: ListProps) => {

    const {
        id,
        title,
        todo
    } = props;

    const [edit, setEdit] = useState<boolean>(false);
    const { listsDispatcher } = useLists()

    const listId = useMemo(() => `input-${id}`, [id])

    const addTodo = useCallback(() => {
        listsDispatcher({ entity: 'todo', action: 'addTodo', label: 'Rinomina', id: `todo-${id}-${Math.round(Math.random() * 10000)}`, listId: id })
    }, []);

    const onBlur = useCallback(() => {
        setEdit(false);
    }, []);

    const onEdit = useCallback(() => {
        setEdit(true);
    }, []);

    const onListInput = useCallback((e: any) => {
        listsDispatcher({ entity: 'list', action: 'updateList', title: e.target.value, id });
    }, [])

    const removeList = useCallback(() => {
        listsDispatcher({ entity: 'list', action: 'removeList', id })
    }, []);

    return (
        <div id={listId} className={styles.container}>
            <div className={styles.title}>
                {edit ?
                    <input type="text" value={title} onInput={onListInput} onBlur={onBlur} /> :
                    <div className={styles.title}>{title}</div>
                }
                <button onClick={onEdit}>
                    <span className="material-symbols-outlined">edit</span>
                </button>
            </div>
            <div className={styles['todo-list']}>
                {todo.map(t => {
                    return <TodoComponent key={t.id} {...t} listId={id} />
                })}
            </div>
            <div onClick={addTodo} className={styles['add-todo']}>Add todo</div>
            <div onClick={removeList} className={styles['remove-list']}>Remove list</div>
        </div>
    )
}

export default ListComponent;