import React from 'react';
import s from './header.module.scss'
import { NavLink } from 'react-router-dom';
import { Avatar } from 'antd';

export const Header = () => {

    const menuItems = [
        {name: "home", direction: "/"},
        {name: "user", direction: "/user"}]
    return (


        <div className={s.header}>

            <div className={s.container}>
                <Avatar size={72}/>

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
                </ul>
            </div>


        </div>
    );
};
