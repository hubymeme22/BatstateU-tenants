import React from 'react';
import styled from 'styled-components';
function MainForm() {
  return (
    <Container>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla faucibus,
      orci at aliquam semper, massa augue accumsan nunc, ac consequat metus orci
      vitae justo. Curabitur magna diam, auctor sit amet augue sed, gravida
      sollicitudin justo. Duis eget odio quis odio commodo varius non at erat.
      Maecesi sapien, tincidunt at vehicula ultrices, tellus urna tincidunt
      mauris, et pulvinar lacus eros et turpis. odio quis odio commodo varius
      non at erat. Maecesi sapien, tincidunt at vehicula ultrices, tellus urna
      tincidunt mauris, et pulvinar lacus eros et turpis. odio quis odio commodo
      varius non at erat. Maecesi sapien, tincidunt at vehicula ultrices, tellus
      urna tincidunt mauris, et pulvinar lacus eros et turpis.
    </Container>
  );
}

export default MainForm;
const Container = styled.div`
  padding: 20px;
  @media screen and (max-width: 768px) {
    height: 350px;
  }
  overflow: scroll;
  overflow-x: hidden;
  overflow-y: auto;
  text-align: center;
  line-height: 1.5rem;
  letter-spacing: 1px;
`;
