import { useCallback } from 'react';
import styles from './App.module.scss'
import List from './components/list/List'
import { useLists } from './contexts/ListsContext'
import Button from './components/shared/button/Button';

function App() {

    const { lists, listsDispatcher } = useLists();

    const addList = useCallback(() => {
        listsDispatcher({ entity: 'list', action: 'addList', title: 'Nuova lista', id: `list-${Math.round(Math.random() * 10000)}`, todo: [] })
    }, []);

    return (
        <main className={styles.container}>
            <Button click={addList} parentModuleClasses={[styles.remove]} icon={'add'} label='Lista' classes={['secondary', 'hover-enabled']} />
            <div className={styles.list}>
                {lists.map(list => {
                    return <List key={list.id} {...list}></List>
                })}
            </div>
        </main>
    )
}

export default App
