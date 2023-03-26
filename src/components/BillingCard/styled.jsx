import styled from 'styled-components';
export const Bill = styled.div`
  background-color: #d9d9d9;
  height: 100%;
  padding: 1rem;

  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;
`;

export const Header = styled.header`
  text-align: center;
  font-size: 0.8rem;

  & > p:nth-child(2) {
    font-size: 1.1rem;
    letter-spacing: 0.175em;
  }

  & > p:nth-child(4) {
    font-weight: bold;
  }
`;

export const LineBreak = styled.hr`
  border-top: 1px solid black;
`;
