export type ButtonProps = {
    label?: string
    id?: string
    click: (args?: any) => any | void
    classes?: string[]
    parentModuleClasses?: string[]
    disabled?: boolean
    icon?: string
    iconSize?: number
}