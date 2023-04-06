import React from 'react';
import styled from 'styled-components';

function AmountDue(props) {
  const { spaceTotal, utilityTotal } = props;

  return (
    <Blocks>
      <SChild></SChild>
      <Child>TOTAL AMOUNT DUE: {spaceTotal + utilityTotal}</Child>
    </Blocks>
  );
}
export default AmountDue;
const Blocks = styled.div`
  padding-left: 2px;
  width: 100%;
  height: 25px;
  border: 1px solid;
  border-top: none;
  display: flex;
  font-size: 15px;
`;
const Child = styled.div`
  border-left: 1px solid;
  flex: 1;
`;
const SChild = styled.div`
  flex: 2;
`;
