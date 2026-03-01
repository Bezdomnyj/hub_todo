import type { ActionDispatch } from "react"
import type { List } from "./List"
import type { Todo } from "./Todo"

export type TodoPayload = UpdateTodo | AddTodo | RemoveTodo
type BaseTodoPayload = {
    id: Todo['id']
    listId: List['id']
    entity: 'todo'
}
type UpdateTodo = BaseTodoPayload & {
    action: 'updateTodo'
    label?: string
    checked?: boolean
}
type AddTodo = BaseTodoPayload & {
    action: 'addTodo'
    label: string
}
type RemoveTodo = BaseTodoPayload & {
    action: 'removeTodo'
}

export type ListPayload = UpdateList | AddList | RemoveList
type BaseListPayload = {
    id: List['id']
    entity: 'list'
}
type UpdateList = BaseListPayload & {
    action: 'updateList'
    title?: string
    todo?: Todo[]
}
type AddList = BaseListPayload & {
    action: 'addList'
    title: string
    todo: Todo[]
}
type RemoveList = BaseListPayload & {
    action: 'removeList'
}

export type ListsState = Record<List['id'], List>

export type ListsContextType = {
    listsLib: ListsState
    lists: List[]
    listsDispatcher: ActionDispatch<[payload: ListsPayload]>
}

export type ListsPayload = TodoPayload | ListPayload