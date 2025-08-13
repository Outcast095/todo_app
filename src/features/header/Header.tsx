import React, { useState } from 'react';
import s from './header.module.scss'

import { NavLink } from 'react-router-dom';
import { Avatar } from 'antd';
import { SignUpComponent } from "../../components/signUp/SignUpComponent";
import { Login } from "../../components/login/Login";
import { SignOutButton, useClerk } from "@clerk/clerk-react";
import { ModalWrapper } from '../modalWrapper/ModalWrapper';
import { LogOutModalComponent } from '../../components/logOutModalComponent/LogOutModalComponent';

export const Header = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { signOut } = useClerk();

    const menuItems = [
        {name: "home", direction: "/"},
        {name: "user", direction: "/user"},
    ];

    const handleLogoutClick = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleConfirm = async () => {
        await signOut();
        setIsModalOpen(false);
    };

    return (
        <div className={s.header}>
            <div className={s.container}>
                <ul className={s.menuItem}>
                    {menuItems.map((item, i) => (
                        <li key={i}>
                            <NavLink
                                to={item.direction}
                                className={({ isActive }) => isActive ? s.linkActive : s.link}
                            >
                                {item.name}
                            </NavLink>
                        </li>
                    ))}
                    <li>
                        <button className={s.link} onClick={handleLogoutClick}>log out</button>
                    </li>
                </ul>
            </div>

            <ModalWrapper
                isOpen={isModalOpen}
                onClose={handleCancel}
                title="Подтверждение выхода"
            >
                <LogOutModalComponent
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                />
            </ModalWrapper>
        </div>
    );
};
