import React, { useState } from 'react';
import styled from 'styled-components';
import { useFormikContext } from 'formik';

import { InputField, SelectField } from '../Forms';
import { WorkoutModeValue } from '../../common/types';

// const WorkoutModeValueFormFields: React.FC = () => {
//   const { values } = useFormikContext();

//   let formField = null;
//   // if (values.WorkoutModeValue === 'reps-sets') {
//   //   formField = <RepsSetsFormRow />;
//   // } else if (values.WorkoutModeValue === 'tabata') {
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
    {/* <SelectField
      label={`Exercise ${num}`}
      name={`ex-${num}`}
      options={[{ label: 'Burpees', value: 'Burpees' }]}
    /> */}
    {/* <InputField
      label={`Exercise ${num} Reps`}
      name={`ex-${num}-reps`}
      type="number"
      placeholder="0"
    />
    <InputField
      label={`Exercise ${num} Sets`}
      name={`ex-${num}-sets`}
      type="number"
      placeholder="0"
    /> */}
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

// export default WorkoutModeValueFormFields;

const WorkoutModeValueFormFields: React.FC<{ num: number }> = ({ num }) => {
  // const { values } = useFormikContext();

  // let formFields = <div />;

  // if (values.WorkoutModeValue === 'reps-sets') {
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

export default WorkoutModeValueFormFields;
