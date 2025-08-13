import React from 'react';
import { Button, Space, Typography } from 'antd';
import s from './logOutModalComponent.module.scss';

interface LogOutModalComponentProps {
    onConfirm: () => void;
    onCancel: () => void;
}

export const LogOutModalComponent: React.FC<LogOutModalComponentProps> = ({ onConfirm, onCancel }) => {
    return (
        <div className={s.modalContent} style={{ textAlign: 'center' }}>
            <Typography.Text style={{ fontSize: '16px', display: 'block', marginBottom: '24px' }}>
                Вы уверены в том что хотите выйти из системы?
            </Typography.Text>
            <Space size="middle">
                <Button type="primary" onClick={onConfirm}>
                    Да уверен
                </Button>
                <Button onClick={onCancel}>
                    Нет не уверен
                </Button>
            </Space>
        </div>
    );
};