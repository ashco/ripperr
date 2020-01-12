import React from 'react';
import styled from 'styled-components';
import { useFormikContext } from 'formik';

import { InputField, SelectField } from '../Forms';
import { WorkoutMode } from '../../common/types';

const WorkoutModeFormFields: React.FC = () => {
  const { values } = useFormikContext();

  let formFields = <p>loading..</p>;
  if (values.workoutMode === 'reps-sets') {
    formFields = <RepsSetsFormFields />;
  } else if (values.workoutMode === 'tabata') {
    formFields = <TabataFormFields />;
  }

  return formFields;
};

const RepsSetsFormFields = () => (
  <RepsSetsFormFieldsWrapper>
    <SelectField
      label="exercise-1"
      name="Exercise 1"
      options={[{ label: 'Burpees', value: 'Burpees' }]}
    />
    <InputField label="Reps" name="reps" type="number" placeholder="0" />
    <InputField label="Sets" name="sets" type="number" placeholder="0" />
  </RepsSetsFormFieldsWrapper>
);

const RepsSetsFormFieldsWrapper = styled.div`
  display: flex;
`;

const TabataFormFields = () => (
  <TabataFormFieldsWrapper>
    <SelectField
      label="exercise-1"
      name="Exercise 1"
      options={[{ label: 'Burpees', value: 'Burpees' }]}
    />
  </TabataFormFieldsWrapper>
);

const TabataFormFieldsWrapper = styled.div`
  display: flex;
`;

export default WorkoutModeFormFields;
