import React, { useState } from 'react';
import { Button, Spin, Form, Input, message } from 'antd';
import { useUser } from '@clerk/clerk-react';
import styles from './userPage.module.scss';

export const UserPage = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [form] = Form.useForm();

    const { isLoaded, isSignedIn, user } = useUser();
    console.log(user)
    
    const handleEditProfile = () => {
        if (user) {
            form.setFieldsValue({
                firstName: user.firstName || '',
                lastName: user.lastName || ''
            });
            setIsEditing(true);
        }
    };
    
    const handleCancelEdit = () => {
        setIsEditing(false);
    };
    
    const handleSaveProfile = async () => {
        try {
            const values = await form.validateFields();
            
            if (user) {
                await user.update({
                    firstName: values.firstName,
                    lastName: values.lastName
                });
                
                message.success('Профиль успешно обновлен');
                setIsEditing(false);
            } else {
                message.error('Пользователь не авторизован');
            }
        } catch (error) {
            console.error('Ошибка при обновлении профиля:', error);
            message.error('Не удалось обновить профиль');
        }
    };

    if (!isLoaded) {
        return (
            <div className={styles.loadingContainer}>
                <Spin size="large" />
                <p>Загрузка данных пользователя...</p>
            </div>
        );
    }

    if (!isSignedIn) {
        return (
            <div className={styles.errorContainer}>
                <h2>Необходима авторизация</h2>
                <p>Пожалуйста, войдите в систему для просмотра этой страницы</p>
            </div>
        );
    }

    return (
        <div className={styles.userPageContainer}>
            <div className={styles.userInfoCard}>
                <div className={styles.userHeader}>
                    <h1>Профиль пользователя</h1>
                    <div className={styles.headerButtons}>
                        {!isEditing && (
                            <Button 
                                onClick={handleEditProfile} 
                                type="primary"
                                className={styles.editButton}
                            >
                                Редактировать
                            </Button>
                        )}
                    </div>
                </div>
                
                <div className={styles.userInfo}>
                    <div className={styles.avatarSection}>
                        <img 
                            src={user.imageUrl} 
                            alt="Аватар пользователя" 
                            className={styles.userAvatar} 
                        />
                    </div>
                    
                    <div className={styles.detailsSection}>
                        {isEditing ? (
                            <Form
                                form={form}
                                layout="vertical"
                                className={styles.editForm}
                            >
                                <Form.Item
                                    name="firstName"
                                    label="Имя"
                                    rules={[{ required: true, message: 'Пожалуйста, введите имя' }]}
                                >
                                    <Input placeholder="Введите имя" />
                                </Form.Item>
                                
                                <Form.Item
                                    name="lastName"
                                    label="Фамилия"
                                    rules={[{ required: true, message: 'Пожалуйста, введите фамилию' }]}
                                >
                                    <Input placeholder="Введите фамилию" />
                                </Form.Item>
                                
                                <div className={styles.formButtons}>
                                    <Button onClick={handleCancelEdit}>Отмена</Button>
                                    <Button type="primary" onClick={handleSaveProfile}>Сохранить</Button>
                                </div>
                            </Form>
                        ) : (
                            <>
                                <div className={styles.infoRow}>
                                    <span className={styles.infoLabel}>Имя:</span>
                                    <span className={styles.infoValue}>{user.firstName || 'Не указано'}</span>
                                </div>
                                
                                <div className={styles.infoRow}>
                                    <span className={styles.infoLabel}>Фамилия:</span>
                                    <span className={styles.infoValue}>{user.lastName || 'Не указано'}</span>
                                </div>
                                
                                <div className={styles.infoRow}>
                                    <span className={styles.infoLabel}>Email:</span>
                                    <span className={styles.infoValue}>{user.primaryEmailAddress?.emailAddress || 'Не указано'}</span>
                                </div>
                                
                                <div className={styles.infoRow}>
                                    <span className={styles.infoLabel}>ID пользователя:</span>
                                    <span className={styles.infoValue}>{user.id}</span>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

