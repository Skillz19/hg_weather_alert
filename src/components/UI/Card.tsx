import { PropsWithChildren } from 'react';
import styles from './Card.module.css';

interface CardProps extends PropsWithChildren {
    className?: string;
}

const Card: React.FC<CardProps> = (props) => {
    const classes = `${styles.card} ${props.className? props.className : ''}`;
    return <div className={classes}>{props.children}</div>
};

export default Card;