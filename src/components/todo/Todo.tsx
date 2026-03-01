import styles from './Todo.module.scss';
import { useCallback, useMemo } from "react";
import type { Todo } from "../../entities/Todo";
import { useLists } from "../../contexts/ListsContext";
import type { List } from "../../entities/List";
import Title from '../shared/title/Title';
import Button from '../shared/button/Button';

export type TodoProps = Todo & {
    listId: List['id']
}

const TodoComponent = (props: TodoProps) => {

    const {
        id,
        label,
        checked,
        listId
    } = props;

    const { listsDispatcher } = useLists();

    const inputId = useMemo(() => `input-${id}`, [id]);

    const editTodoLabel = useCallback((value: string) => {
        listsDispatcher({ entity: 'todo', action: 'updateTodo', label: value, id, listId });
    }, [])

    const toggleChecked = useCallback(() => {
        listsDispatcher({ entity: 'todo', action: 'updateTodo', checked: !checked, id, listId });
    }, [checked])

    const removeTodo = useCallback(() => {
        listsDispatcher({ entity: 'todo', action: 'removeTodo', id, listId });
    }, []);

    return (
        <div id={id} className={styles.container}>
            <input id={inputId} className={styles.checkbox} type="checkbox" checked={checked} onChange={toggleChecked} />
            <Title asLabel={true} htmlFor={id} id={id} title={label} updateTitle={editTodoLabel} onClick={toggleChecked} />
            <Button click={removeTodo} parentModuleClasses={[styles.remove]} icon={'delete'} classes={['main', 'hover-enabled']} />
        </div>
    )
}

export default TodoComponent;