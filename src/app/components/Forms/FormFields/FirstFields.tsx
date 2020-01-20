import React from 'react';
import styled from 'styled-components';

import { Row } from '../FormStyles';

import { IExerciseFormValues, IWorkoutFormValues } from '../../../common/types';

const FirstFields: React.FC<{
  form: IExerciseFormValues | IWorkoutFormValues;
  handleChange: (e: any, property: string) => void;
  handleMultiSelectChange: (e: { target: { options: any } }) => void;
}> = ({ form, handleChange, handleMultiSelectChange }) => {
  return (
    <>
      <Row>
        <label htmlFor="name">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={(e) => handleChange(e, 'name')}
          />
        </label>
      </Row>
      <Row>
        <label htmlFor="description">
          <textarea
            name="description"
            placeholder="Enter a description..."
            value={form.description}
            onChange={(e) => handleChange(e, 'description')}
          />
        </label>
      </Row>
      <Row>
        <label htmlFor="tags">
          Tags
          <select
            multiple
            name="tags"
            value={form.tags}
            onChange={handleMultiSelectChange}
          >
            <option label="tag-1" value="tag-1" />
            <option label="tag-2" value="tag-2" />
          </select>
        </label>
      </Row>
    </>
  );
};

export default FirstFields;
