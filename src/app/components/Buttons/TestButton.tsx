import React, { useState } from 'react';
import styled from 'styled-components';

import { Modal, DeleteModal } from '../Modal';

const TestButton = ({ text, handleDelete }: any) => {
  return <TestStyle>Delete</TestStyle>;
};

const TestStyle = styled.button`
  border: orange solid 3px;
  background: white;
  color: black;
`;

export default TestButton;
