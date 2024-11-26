import React from 'react';
import styles from './message.module.css';

export const Message: React.FC<React.PropsWithChildren> = ({
    children
}: React.PropsWithChildren) => {

    return (
        <p
            className={styles.message}
        >
            {children}
        </p>
    );
};