import * as React from 'react';

import { Routes, Route } from 'react-router-dom';
import { Home } from './pages';
import { UserPage } from './pages';
import { NotFound } from './pages';
import { MainLayout } from './layout/MainLayout';


export const App = () => {

    return (
        <div className='wrapper'>
            <Routes>
                <Route path={'/'} element={<MainLayout/>}>
                    <Route path={''} element={<Home/>} />
                    <Route path={'/user'} element={<UserPage/>}/>
                    <Route path={'*'} element={<NotFound />} />
                </Route>
            </Routes>
        </div>
    );
};