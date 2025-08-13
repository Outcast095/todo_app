import React, { useState } from 'react';
import { LogOutModalComponent } from '../../components/logOutModalComponent/LogOutModalComponent';
import { ModalWrapper } from '../../features/modalWrapper/ModalWrapper';
import { Button } from 'antd';

export const UserPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleConfirm = () => {
        console.log('Подтверждено');
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        console.log('Отменено');
        setIsModalOpen(false);
    };

    return (
        <div>
            <h1>User Page</h1>
            <Button onClick={() => setIsModalOpen(true)}>Открыть модальное окно</Button>
            
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

