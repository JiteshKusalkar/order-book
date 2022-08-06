import { SyntheticEvent, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Precision, setPrecision } from "../../redux/websocket/slice";
import { RootState } from "../../store";
import OrderBookRow from "./OrderBookRow";

function OrderBookDataTable() {
  const data = useSelector((state: RootState) => state.ws.data);
  // const chunk = useSelector((state: RootState) => state.ws.chunk);
  const dispatch = useDispatch();

  const handlePrecisionChange = useCallback(
    (event: SyntheticEvent<HTMLSelectElement>) => {
      dispatch(
        setPrecision({ precision: event.currentTarget.value as Precision })
      );
    },
    [dispatch]
  );

  return (
    <Section>
      <PrecisionSection>
        <Label htmlFor="precision">Precision</Label>
        <select id="precision" onChange={handlePrecisionChange}>
          <option value={Precision.P0}>P0</option>
          <option value={Precision.P1}>P1</option>
          <option value={Precision.P2}>P2</option>
          <option value={Precision.P3}>P3</option>
          <option value={Precision.P4}>P4</option>
        </select>
      </PrecisionSection>

      <Table>
        <THead>
          <Tr>
            <Th>Count</Th>
            <Th>Amount</Th>
            <Th>Price</Th>
          </Tr>
        </THead>
        <OrderBookRow orderBook={data} />
      </Table>
    </Section>
  );
}

const Section = styled.div`
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
`;
const Table = styled.table``;
const Label = styled.label`
  margin-right: 5px;
`;
const PrecisionSection = styled.div`
  margin-bottom: 10px;
`;
const THead = styled.thead``;
const Th = styled.th`
  border: 1px solid;
`;
const Tr = styled.tr``;

export default OrderBookDataTable;
