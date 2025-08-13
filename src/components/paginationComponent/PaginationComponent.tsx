import React from 'react';
import { Pagination } from 'antd';

interface PaginationComponentProps {
    current: number;
    total: number;
    pageSize: number;
    onChange: (page: number, pageSize?: number) => void;
    loading?: boolean;
}

export const PaginationComponent: React.FC<PaginationComponentProps> = ({ 
    current, 
    total, 
    pageSize,
    onChange,
    loading = false
}) => {
    return (
        <Pagination
            current={current}
            total={total}
            pageSize={pageSize}
            onChange={onChange}
            disabled={loading}
            showSizeChanger={false}
            
        />
    );
};