import styles from './Title.module.scss';
import { useCallback, useState } from "react";

type AsLabel = {
    asLabel: true
    htmlFor: string
}
type NotAsLabel = {
    asLabel: false
    htmlFor: never
}

export type TitleProps = {
    updateTitle: (title: string) => void
    title: string
} & (AsLabel | NotAsLabel)

const Title = (props: TitleProps) => {

    const {
        updateTitle,
        title,
        asLabel,
        htmlFor
    } = props;

    const [edit, setEdit] = useState<boolean>(false);

    const onEdit = useCallback(() => {
        setEdit(true);
    }, []);

    const onBlur = useCallback(() => {
        setEdit(false);
    }, []);

    const onInput = useCallback((e: any) => {
        if (!updateTitle) {
            throw 'Funzione di edit dell\'entità non presente nelle props';
        }
        if (e.type !== 'input') {
            throw 'Funzione non richiamabile';
        }
        updateTitle(e.target.value as string);
    }, []);

    return (
        <>
            <div className={styles.title}>
                {edit ?
                    <input type="text" value={title} onInput={onInput} onBlur={onBlur} /> :
                    asLabel ? <label htmlFor={htmlFor}>{title}</label> : <div className={styles.title}>{title}</div>
                }
                <button onClick={onEdit}>
                    <span className="material-symbols-outlined">edit</span>
                </button>
            </div>
        </>
    )
}

export default Title;