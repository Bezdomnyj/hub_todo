import styles from './Todo.module.scss';
import { useCallback, useMemo } from "react";
import type { Todo } from "../../entities/Todo";
import { useLists } from "../../contexts/ListsContext";
import type { List } from "../../entities/List";
import Title from '../shared/title/Title';

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

    const onCheckedChange = useCallback((e: any) => {
        listsDispatcher({ entity: 'todo', action: 'updateTodo', checked: e.target.checked, id, listId });
    }, [])

    const removeTodo = useCallback(() => {
        listsDispatcher({ entity: 'todo', action: 'removeTodo', id, listId });
    }, []);

    return (
        <div id={id} className={styles.container}>
            <input id={inputId} type="checkbox" defaultChecked={checked} onChange={onCheckedChange} />
            <Title asLabel={true} htmlFor={id} title={label} updateTitle={editTodoLabel} />
            <div onClick={removeTodo} className={styles['remove-todo']}>Delete todo</div>
        </div>
    )
}

export default TodoComponent;