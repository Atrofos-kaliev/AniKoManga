import { cn } from '@/lib/utils';
import React from 'react';

interface ContainerProps {
    children: React.ReactNode;
    className?: string
}

export const Container: React.FC<ContainerProps> = ({ children, className }) => {
    return (
        <div className={cn("px-10 m-auto", className)}>
            {children}
        </div>
    )
}