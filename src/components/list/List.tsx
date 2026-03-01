import { useLists } from '../../contexts/ListsContext'
import type { Todo } from '../../entities/Todo'
import Title from '../shared/title/Title'
import TodoComponent from '../todo/Todo'
import styles from './List.module.scss'
import { useCallback, useMemo } from "react"

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

    const { listsDispatcher } = useLists()

    const listId = useMemo(() => `input-${id}`, [id])

    const addTodo = useCallback(() => {
        listsDispatcher({ entity: 'todo', action: 'addTodo', label: 'Rinomina', id: `todo-${id}-${Math.round(Math.random() * 10000)}`, listId: id })
    }, []);

    const editListTitle = useCallback((value: string) => {
        listsDispatcher({ entity: 'list', action: 'updateList', title: value, id });
    }, [])

    const removeList = useCallback(() => {
        listsDispatcher({ entity: 'list', action: 'removeList', id })
    }, []);

    return (
        <div id={listId} className={styles.container}>
            <Title asLabel={true} htmlFor={id} title={title} updateTitle={editListTitle} />
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