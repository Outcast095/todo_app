import React from 'react';
import { Spin } from 'antd';

interface LoadingSpinnerProps {
    tip?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ tip = 'Загрузка...' }) => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100%',
            position: 'fixed',
            top: 0,
            left: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            zIndex: 1000
        }}>
            <Spin size="large" spinning={true}>
                <div style={{ padding: '50px', textAlign: 'center' }}>
                    {tip}
                </div>
            </Spin>
        </div>
    );
};