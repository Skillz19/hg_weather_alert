import { PropsWithChildren } from 'react';
import styles from '../assets//css/Table.module.css'

interface TableProps extends PropsWithChildren {
    className?: string;
  }

const Table: React.FC<TableProps> = (props) => {
    const classes = `${styles.table} ${props.className? props.className : ''}`;
    return(
        <table className={classes}>
            {props.children}
        </table>
    )
}

export default Table;

export const Tbody : React.FC<TableProps> = (props) =>{
    const classes = `${props.className? props.className : ''}`;
    return(
        <tbody className={classes}>
            {props.children}
        </tbody>
    )
};

export const Th : React.FC<TableProps> = (props) =>{
    const classes = `${styles.th} ${props.className? props.className : ''}`;
    return(
        <th className={classes}>
            {props.children}
        </th>
    )
};

export const Tr : React.FC<TableProps> = (props) =>{
    const classes = `${styles.tr} ${props.className? props.className : ''}`;
    return(
        <tr className={classes}>
            {props.children}
        </tr>
    )
};

export const Td : React.FC<TableProps> = (props) =>{
    const classes = `${styles.td} ${props.className? props.className : ''}`;
    return(
        <td className={classes}>
            {props.children}
        </td>
    )
};