import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  /* height: 715px; */
  min-width: 90%;
  border-bottom: 1px solid;
  box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.75);
`;

//FORMS SIDE
export const Table = styled.div`
  width: 100%;
  font-size: 15px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
export const Blocks = styled.div`
  padding-left: 2px;
  width: 100%;
  height: 25px;
  border: 1px solid;
  border-top: none;
  display: flex;
`;
export const Title = styled(Blocks)`
  display: flex;
  justify-content: center;
  font-size: 15px;
`;

//Form Middle Part

export const Grid = styled.div`
  font-size: 15px;
  border: 1px solid;
  border-top: none;
  height: 75px;
  display: flex;
`;
export const Border = styled.div`
  border-right: ${(props) => (props.last === 'last' ? 'none' : '1px solid;')};
  flex: 1;
  display: flex;
  flex-direction: column;
`;
export const FChild = styled.div`
  flex: 2;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const SChild = styled.div`
  border-top: ${(props) => (props.first === 'first' ? 'none' : '1px solid')};
  display: flex;
  flex: 1;
`;
export const Divider = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  border-right: ${(props) => (props.first === 'first' ? '1px solid' : 'none')};
`;
export const TChild = styled(SChild)`
  border-bottom: 1px solid;
  border-top: none;
  display: flex;
  justify-content: center;
`;

export const Watermark = styled.h1`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-40deg);
  opacity: 0.2;
  font-size: 150px;
  font-weight: bold;
  pointer-events: none;

  &::before {
    content: 'PAID';
  }
`;
