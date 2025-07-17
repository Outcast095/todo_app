import { FC, ReactNode } from 'react'
import cn from 'classnames'

import { Button as AntButton, Space, ConfigProvider } from 'antd'
import { ButtonProps as AntButtonProps } from 'antd/lib/button'
import s from './button.module.scss'

export interface ButtonProps extends AntButtonProps {
    children?: ReactNode
    type?: 'primary' | 'default' | 'dashed' | 'link' | 'text' | undefined
    color?: 'default' | 'primary' | 'danger' | 'blue' | 'red';
    onClick?: () => void
    className?: string
    iconOnly?: boolean
    iconLeft?: boolean
}

export const Button: FC<ButtonProps> = ({
                                            children,
                                            type = 'primary',
                                            onClick,
                                            className,
                                            color,
                                            iconOnly = false,
                                            iconLeft,
                                            loading,
                                            disabled,
                                            size,
                                            icon,
                                            ...rest
                                        }) => {
    const buttonClass = cn(
        s.button,
        s[type],
        s[color!],
        s[size ?? 'middle'],
        className,
        {
            [s.isloading]: loading,
            [s.isDisabled]: disabled,
            [s.iconOnly]: iconOnly,
            [s.iconLeft]: iconLeft
        }
    )

    return (
        <AntButton
            onClick={onClick}
            disabled={disabled}
            className={buttonClass}
            loading={loading}
            color={color}
            icon={icon}
            classNames={{
                icon: s.icon
            }}
            {...rest}
        >
            {!iconOnly && <span>{children}</span>}
        </AntButton>
    )
}