import React, { useState } from 'react';
import styled from 'styled-components';
import { useFormikContext } from 'formik';

import { InputField, SelectField } from '../Forms';
import { WorkoutMode } from '../../common/types';

// const WorkoutModeFormFields: React.FC = () => {
//   const { values } = useFormikContext();

//   let formField = null;
//   // if (values.workoutMode === 'reps-sets') {
//   //   formField = <RepsSetsFormRow />;
//   // } else if (values.workoutMode === 'tabata') {
//   //   formField = <TabataFormRow />;
//   // }

//   const [fieldArr, setFieldArr] = useState([1]);

//   function addFieldArr() {
//     const length = fieldArr.length;
//     fieldArr.push(length + 1);

//     setFieldArr(fieldArr);
//   }

//   return (
//     // <div>
//     //   {/* <RepsSetsFormRow num="1" /> */}
//     //   {fieldArr.map((num) => (
//     //     <RepsSetsFormRow num={num} />
//     //   ))}
//     //   <button type="button" onClick={addFieldArr}>
//     //     +
//     //   </button>
//     // </div>
//   );
// };

export const RepsSetsFormRow: React.FC<{ num: string }> = ({ num }) => (
  <RepsSetsFormRowWrapper>
    <SelectField
      label={`Exercise ${num}`}
      name={`ex-${num}`}
      options={[{ label: 'Burpees', value: 'Burpees' }]}
    />
    <InputField
      label={`Exercise ${num} Reps`}
      name={`ex-${num}-reps`}
      type="number"
    />
    <InputField
      label={`Exercise ${num} Sets`}
      name={`ex-${num}-sets`}
      type="number"
    />
  </RepsSetsFormRowWrapper>
);

const RepsSetsFormRowWrapper = styled.div`
  display: flex;
`;

// const TabataFormRow = () => (
//   <TabataFormRowWrapper>
//     <SelectField
//       label="exercise-1"
//       name="Exercise 1"
//       options={[{ label: 'Burpees', value: 'Burpees' }]}
//     />
//   </TabataFormRowWrapper>
// );

// const TabataFormRowWrapper = styled.div`
//   display: flex;
// `;

// export default WorkoutModeFormFields;

const WorkoutModeFormFields: React.FC<{ num: number }> = ({ num }) => {
  const { values } = useFormikContext();

  // let formFields = <div />;

  // if (values.workoutMode === 'reps-sets') {
  //   formFields = [...Array(num)].map((e, i) => (
  //     <RepsSetsFormRow num={i} key={i} />
  //   ));
  // }

  return (
    <>
      <RepsSetsFormRow num="1" />
      <RepsSetsFormRow num="2" />
      <RepsSetsFormRow num="3" />
    </>
  );
};

export default WorkoutModeFormFields;
