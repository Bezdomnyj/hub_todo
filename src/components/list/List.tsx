import { useLists } from '../../contexts/ListsContext'
import type { Todo } from '../../entities/Todo'
import Button from '../shared/button/Button'
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
        listsDispatcher({ entity: 'todo', action: 'addTodo', label: 'Nuovo Todo', id: `todo-${id}-${Math.round(Math.random() * 10000)}`, listId: id })
    }, []);

    const editListTitle = useCallback((value: string) => {
        listsDispatcher({ entity: 'list', action: 'updateList', title: value, id });
    }, [])

    const removeList = useCallback(() => {
        listsDispatcher({ entity: 'list', action: 'removeList', id })
    }, []);

    return (
        <div id={listId} className={styles.container}>
            <div className={styles.top}>
                <Title asLabel={false} id={id} title={title} updateTitle={editListTitle} parentModuleClasses={[styles.title]} />
                <Button click={removeList} parentModuleClasses={[styles.remove]} icon={'delete'} classes={['main', 'hover-enabled']} />
            </div>
            <div className={styles.list}>
                {todo.map(t => {
                    return <TodoComponent key={t.id} {...t} listId={id} />
                })}
            </div>
            <Button click={addTodo} parentModuleClasses={[styles.remove]} icon={'add'} label='Todo' />
        </div>
    )
}

export default ListComponent;