import React, { useEffect } from 'react';
import { Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, useUser } from '@clerk/clerk-react'; // 👈
import s from './welcomePage.module.scss';

export const WelcomePage = () => {

    const { isSignedIn } = useAuth();
    const { user } = useUser(); // 👈 получаем текущего пользователя
    const navigate = useNavigate();

    useEffect(() => {
        if (isSignedIn && user) {
            navigate(`/home/${user.id}`); // 👈 редирект с id
        }
    }, [isSignedIn, user, navigate]);

    return (
        <div className={s.welcomeContainer}>
            <Link to="/signUp">
                <Button type="primary" loading={false}>
                    Авторизоваться
                </Button>
            </Link>
            <Link to="/signIn">
                <Button type="primary" loading={false}>
                    Войти
                </Button>
            </Link>
        </div>
    );
};