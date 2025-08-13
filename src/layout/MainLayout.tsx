import React from 'react';
import s from './layout.module.scss';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from "../features/header/Header";

export const MainLayout = () => {
    const location = useLocation();

    // Пути, на которых должен отображаться Header
    const showHeaderRoutes = ['/home', '/user'];

    // Проверка, начинается ли текущий путь с одного из нужных путей
    const shouldShowHeader = showHeaderRoutes.some(path =>
        location.pathname.startsWith(path)
    );

    return (
        <div className={s.wrapper}>
            <div className={s.content}>
                <div className={s.container}>
                    {shouldShowHeader && <Header />}
                    <Outlet />
                </div>
            </div>
        </div>
    );
};
