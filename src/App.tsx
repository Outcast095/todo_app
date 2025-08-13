import * as React from 'react';

import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages';
import { UserPage } from './pages';
import { NotFound } from './pages';
import { MainLayout } from './layout/MainLayout';
import {SignUpPage} from "./pages/signUp/SignUpPage";
import {WelcomePage} from "./pages/welcomePage/welcomePage";
import {Login} from "./components/login/Login";
import {ProtectedRoute} from "./features/protectedRoute/ProtectedRoute";


export const App = () => {

    return (
        <div className='wrapper'>
            <Routes>
                <Route path={'/'} element={<MainLayout/>}>
                    <Route path={''} element={<WelcomePage/>} />
                    <Route path={'/signUp'} element={<SignUpPage/>} />
                    <Route path={'/signIn'} element={<Login/>} />
                    <Route path={'/home/:id'} element={<ProtectedRoute>
                        <HomePage/>
                    </ProtectedRoute> }/>
                    <Route path={'/user'} element={<ProtectedRoute>
                        <UserPage/>
                    </ProtectedRoute>}/>
                    <Route path={'*'} element={<NotFound />} />
                </Route>
            </Routes>
        </div>
    );
};

