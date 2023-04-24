import React from 'react';
import styled from 'styled-components';

function AmountDue(props) {
  const { spaceTotal, utilityTotal } = props;

  return (
    <Blocks>
      <SChild>TOTAL AMOUNT DUE: </SChild>
      <Child>₱ {(spaceTotal + utilityTotal).toFixed(2)}</Child>
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
  padding-left: 3px;
  flex: 1;
  text-align: center;
`;

const SChild = styled.div`
  flex: 2;
  text-align: end;
  padding-right: 5px;
`;
