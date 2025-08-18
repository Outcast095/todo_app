import '@ant-design/v5-patch-for-react-19';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import {App}  from './App';
import { ClerkProvider } from '@clerk/clerk-react'

import { Provider } from 'react-redux';
import { store } from './redux/store';


// Import your Publishable Key
const PUBLISHABLE_KEY = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
    throw new Error('Add your Clerk Publishable Key to the .env.local file');
}


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(

    <BrowserRouter>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
            <Provider store={store}>
                <App />
            </Provider>
        </ClerkProvider>
    </BrowserRouter>,

);


