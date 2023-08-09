import { PropsWithChildren } from "react";
import Table, { Tbody, Tr, Td } from "./Table";
import Card from "./UI/Card";

export interface DetailTableProps extends PropsWithChildren {
    contents: Array<{ name: string, value: string }>;
    className?: string;
}
//--- renders a table wrapped in a Card element
const DetailTable: React.FC<DetailTableProps> = ({ contents, className }) => {
    const body = contents.map((item) => {
        return (<Tr key={item.name}>
            <Td>{item.name}</Td>
            <Td>{item.value}</Td>
        </Tr>);
    });
    return (<Card className={className}>
        <Table>
            <Tbody>
                {body}
            </Tbody>
        </Table>
    </Card>);
}

export default DetailTable;