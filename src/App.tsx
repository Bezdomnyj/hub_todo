import { useCallback } from 'react';
import styles from './App.module.scss'
import List from './components/list/List'
import { useLists } from './contexts/ListsContext'

function App() {

    const { lists, listsDispatcher } = useLists();

    const addList = useCallback(() => {
        listsDispatcher({ entity: 'list', action: 'addList', title: 'Rinomina', id: `list-${Math.round(Math.random() * 10000)}`, todo: [] })
    }, []);

    return (
        <main className={styles.container}>
            <div onClick={addList}>Add list</div>
            {lists.map(list => {
                return <List key={list.id} {...list}></List>
            })}
        </main>
    )
}

export default App
