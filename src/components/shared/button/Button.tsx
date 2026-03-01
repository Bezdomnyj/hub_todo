import type { ButtonProps } from '../../../entities/Button';
import styles from './Button.module.scss';
import { useId, useMemo } from "react";

const Button = (props: ButtonProps) => {

    const defaultProps: Pick<ButtonProps, 'classes' | 'iconSize' | 'parentModuleClasses'> = {
        classes: ['hover-enabled'],
        parentModuleClasses: [],
        iconSize: 22
    }

    const {
        classes,
        parentModuleClasses,
        label,
        id,
        icon,
        iconSize,
        disabled,
        click
    } = {
        ...defaultProps,
        ...props
    }

    const buttonClasses = useMemo(() => {
        return [
            styles.container,
            ...parentModuleClasses || []
        ].concat(classes && classes.map(el => styles[el]) || []).filter(Boolean).join(' ')
    }, [classes]);

    const defaultId = useId();

    const _id = useMemo(() => id || defaultId, []);

    return (
        <button disabled={disabled} className={buttonClasses} onClick={click} id={_id}>
            {icon ? <span style={{ fontSize: iconSize, height: iconSize, width: iconSize }} className="material-symbols-outlined">{icon}</span> : null}
            {label ? <div>{label}</div> : null}
        </button>
    );
}

export default Button;