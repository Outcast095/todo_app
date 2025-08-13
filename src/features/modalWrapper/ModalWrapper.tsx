import React, { ReactNode } from 'react';
import { Modal } from 'antd';
import s from './modalWrapper.module.scss';

interface ModalWrapperProps {
    children: ReactNode;
    isOpen: boolean;
    onClose: () => void;
    title?: string;
}

export const ModalWrapper: React.FC<ModalWrapperProps> = ({
    children,
    isOpen,
    onClose,
    title
}) => {
    return (
        <div className={s.modalWrapper}>
            <Modal
                centered={true}
                title={title}
                open={isOpen}
                onCancel={onClose}
                footer={null}
            >
                {children}
            </Modal>
        </div>
    );
};