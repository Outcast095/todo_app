import { notification } from 'antd';
import { NotificationPlacement } from 'antd/es/notification/interface';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

interface NotificationOptions {
  message: string;
  description?: string;
  placement?: NotificationPlacement;
  duration?: number;
}

/**
 * Показывает уведомление с заданными параметрами
 */
export const showNotification = (
  type: NotificationType,
  { message, description = '', placement = 'topRight', duration = 4.5 }: NotificationOptions
) => {
  notification[type]({
    message,
    description,
    placement,
    duration,
  });
};

/**
 * Показывает уведомление об ошибке
 */
export const errorNotification = (message: string, description?: string) => {
  showNotification('error', { message, description });
};

/**
 * Показывает уведомление об успешной операции
 */
export const successNotification = (message: string, description?: string) => {
  showNotification('success', { message, description });
};