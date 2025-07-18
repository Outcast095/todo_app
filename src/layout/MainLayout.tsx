// Импорт React и хука useState для управления состоянием
import React, { useState } from 'react';
import s from './layout.module.scss'
// Импорт компонента Header
//import { Header } from '../components/Header';
// Импорт компонента Outlet из react-router-dom для рендеринга вложенных маршрутов
import { Outlet } from 'react-router-dom';
import {Header} from "../features/header/Header";


// Определение функционального компонента MainLayout
export const MainLayout = () => {
    // Состояние для хранения значения строки поиска, изначально пустая строка
    const [searchValue, setSearchValue] = useState('');

    // JSX для рендеринга компонента
    return (
        // Основной контейнер приложения
        <div className={s.wrapper}>
            {/* Обертка контекста, предоставляющая searchValue и setSearchValue дочерним компонентам */}
                {/* Контейнер для основного контента */}
                <div className={s.content}>
                    {/* Внутренний контейнер для центрирования содержимого */}
                    <div className={s.container}>
                        <Header/>
                        {/* Outlet рендерит дочерние маршруты, определенные в маршрутизаторе */}
                        <Outlet />
                    </div>
                </div>
        </div>
    );
};