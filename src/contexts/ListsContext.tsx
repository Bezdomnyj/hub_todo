import { createContext, useContext, useEffect, useMemo, useReducer, type ReactNode } from "react";
import type { ListPayload, ListsContextType, ListsPayload, ListsState, TodoPayload } from "../entities/ListsContext";

const ListsContext = createContext<ListsContextType | null>(null);

const hanleTodo = (state: ListsState, payload: TodoPayload): ListsState => {
    switch (payload.action) {
        case 'addTodo':
            return {
                ...state,
                [payload.listId]: {
                    ...state[payload.listId],
                    todo: [...state[payload.listId].todo, {
                        id: payload.id,
                        label: payload.label,
                        checked: false
                    }]
                }
            };
        case 'removeTodo':
            const removeTodoIndex = state[payload.listId].todo.findIndex(t => t.id === payload.id);
            if (removeTodoIndex < 0) {
                return state;
            }
            return {
                ...state,
                [payload.listId]: {
                    ...state[payload.listId],
                    todo: state[payload.listId].todo.toSpliced(removeTodoIndex, 1)
                }
            };
        case 'updateTodo':
            const updateTodoIndex = state[payload.listId].todo.findIndex(t => t.id === payload.id);
            if (updateTodoIndex < 0) {
                return state;
            }
            const oldTodo = state[payload.listId].todo[updateTodoIndex];
            return {
                ...state,
                [payload.listId]: {
                    ...state[payload.listId],
                    todo: state[payload.listId].todo.toSpliced(updateTodoIndex, 1, {
                        ...oldTodo,
                        checked: payload.checked !== undefined ? payload.checked : oldTodo.checked,
                        label: payload.label !== undefined ? payload.label : oldTodo.label
                    })
                }
            };
    }
}
const hanleList = (state: ListsState, payload: ListPayload): ListsState => {
    switch (payload.action) {
        case 'addList':
            return {
                ...state,
                [payload.id]: {
                    id: payload.id,
                    title: payload.title,
                    todo: payload.todo
                }
            }
        case 'removeList':
            if (!(payload.id in state)) {
                return state;
            }
            const newState = { ...state };
            delete newState[payload.id];
            return newState;
        case 'updateList':
            if (!(payload.id in state)) {
                return state;
            }
            const oldList = state[payload.id];
            return {
                ...state,
                [payload.id]: {
                    ...oldList,
                    title: payload.title !== undefined ? payload.title : oldList.title,
                    todo: payload.todo !== undefined ? payload.todo : oldList.todo
                }
            }
    }
}

const listsReducer = (state: ListsState, payload: ListsPayload) => {
    switch (payload.entity) {
        case 'todo':
            return hanleTodo(state, payload)
        case 'list':
            return hanleList(state, payload)
    }
}

const ListsProvider = ({ children }: { children: ReactNode }) => {

    const initialLists: ListsState = useMemo(() => {
        const _lists = localStorage.getItem('lists')
        if (_lists) {
            return JSON.parse(_lists);
        }
        return {};
    }, [])

    const [listsLib, listsDispatcher] = useReducer(listsReducer, initialLists);

    const lists = useMemo(() => Object.values(listsLib), [listsLib]);

    useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(listsLib));
    }, [listsLib]);

    const value: ListsContextType = useMemo(() => ({
        lists, listsLib, listsDispatcher
    }), [lists, listsLib, listsDispatcher]);

    return (
        <ListsContext.Provider value={value}>
            {children}
        </ListsContext.Provider>
    )
}

export const useLists = () => {
    const context = useContext(ListsContext);

    if (!context) {
        throw new Error("Il componente non è figlio di ListsContext");
    }

    return context;
}

export default ListsProvider;