import styles from './Todo.module.scss';
import { useCallback, useMemo, useState } from "react";
import type { Todo } from "../../entities/Todo";
import { useLists } from "../../contexts/ListsContext";
import type { List } from "../../entities/List";

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
    const [edit, setEdit] = useState<boolean>(false);

    const inputId = useMemo(() => `input-${id}`, [id]);

    const onEdit = useCallback(() => {
        setEdit(true);
    }, []);

    const onBlur = useCallback(() => {
        setEdit(false);
    }, []);

    const onTodoInput = useCallback((e: any) => {
        listsDispatcher({ entity: 'todo', action: 'updateTodo', label: e.target.value, id, listId });
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
            {edit ?
                <input type="text" value={label} onInput={onTodoInput} onBlur={onBlur} /> :
                <label htmlFor={inputId}>{label}</label>
            }
            <button onClick={onEdit} className={styles.edit}>
                <span className="material-symbols-outlined">edit</span>
            </button>
            <div onClick={removeTodo} className={styles['remove-todo']}>Delete todo</div>
        </div>
    )
}

export default TodoComponent;