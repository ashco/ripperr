import React from 'react';
import styled from 'styled-components';
import { useFormikContext } from 'formik';

import { InputField, SelectField } from '../../Forms';

const WorkoutFormFieldTabata = () => (
  <WorkoutFormFieldTabataWrapper>
    <SelectField
      label="exercise-1"
      name="Exercise 1"
      options={[{ label: 'Burpees', value: 'Burpees' }]}
    />
  </WorkoutFormFieldTabataWrapper>
);

const WorkoutFormFieldTabataWrapper = styled.div`
  display: flex;
`;

export default WorkoutFormFieldTabata;
