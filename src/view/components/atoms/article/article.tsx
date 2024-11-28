import React from 'react';
import styles from './article.module.css';

interface ArticleProps {
    title?: string;
}

export const Article = ({
    children,
    title
}: React.PropsWithChildren<ArticleProps>) => {

    return (
        <article className={styles['article']}
        >
            {title && <h3>{title}</h3>}
            {children}
        </article>
    );
};