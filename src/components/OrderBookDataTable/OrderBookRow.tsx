import styled from "styled-components";
import { OrderBookArray } from "../../redux/websocket/slice";

type OrderBookRowProps = {
  orderBook: OrderBookArray[] | null;
};

function OrderBookRow({ orderBook }: OrderBookRowProps) {
  if (!orderBook) {
    return (
      <TBody>
        <Tr>
          <Td colSpan={3}>Nothing to display</Td>
        </Tr>
      </TBody>
    );
  }

  return (
    <TBody>
      {orderBook?.map(([price, count, amount], idx) => (
        <Tr key={idx}>
          <Td>{count}</Td>
          <Td>{amount}</Td>
          <Td>{price}</Td>
        </Tr>
      ))}
    </TBody>
  );
}

const TBody = styled.tbody``;
const Td = styled.td`
  border: 1px solid;
`;
const Tr = styled.tr``;

export default OrderBookRow;
