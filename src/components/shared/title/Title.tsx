import Button from '../button/Button';
import styles from './Title.module.scss';
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Label = {
    htmlFor?: string
    asLabel: false
} | {
    asLabel: true
    htmlFor: string
}

export type TitleProps = {
    updateTitle: (title: string) => void
    onClick?: (e: any) => void
    title: string
    id: string
    parentModuleClasses?: string[]
} & Label

const Title = (props: TitleProps) => {

    const {
        updateTitle,
        onClick,
        title,
        id,
        parentModuleClasses,
        asLabel,
        htmlFor
    } = props;

    const inputRef = useRef<HTMLInputElement>(null);

    const [edit, setEdit] = useState<boolean>(false);

    const classes = useMemo(() => {
        return [
            styles.title,
            ...parentModuleClasses || []
        ].filter(Boolean).join(' ')
    }, [parentModuleClasses]);

    const onEdit = useCallback(() => {
        setEdit(true);
        if (!inputRef || !inputRef.current) {
            return;
        }
        inputRef.current.focus();
    }, []);

    const onBlur = useCallback(() => {
        setEdit(false);
    }, []);

    useEffect(() => {
        if (!edit || !inputRef || !inputRef.current) {
            return;
        }
        inputRef.current.focus();
        inputRef.current.select();
    }, [edit])

    const onInput = useCallback((e: any) => {
        if (!updateTitle) {
            throw 'Funzione di edit dell\'entità non presente nelle props';
        }
        if (e.type !== 'input') {
            throw 'Funzione non richiamabile';
        }
        updateTitle(e.target.value as string);
    }, []);

    const onKeyDown = useCallback((e: any) => {
        if (!updateTitle) {
            throw 'Funzione di edit dell\'entità non presente nelle props';
        }
        if (e.type !== 'keydown') {
            throw 'Funzione non richiamabile';
        }
        if (e.key !== 'Enter') {
            return;
        }
        setEdit(false);
        updateTitle(e.target.value as string);
    }, []);

    return (
        <>
            <div className={styles.container}>
                {edit ?
                    <input ref={inputRef} id={id} className={styles.input} type="text" value={title} onInput={onInput} onBlur={onBlur} onKeyDown={onKeyDown} /> :
                    asLabel ? <label style={{ cursor: 'pointer' }} className={classes} htmlFor={htmlFor} onClick={onClick}>{title}</label> : <div className={classes} onClick={onClick}>{title}</div>
                }
                <Button click={onEdit} parentModuleClasses={[styles.edit]} icon={'edit'} classes={['main', 'hover-enabled']} />
            </div>
        </>
    )
}

export default Title;