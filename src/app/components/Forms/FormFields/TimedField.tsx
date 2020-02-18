﻿import React, { useContext } from 'react';

import { MovementListContext } from '../../../context';

import { Button } from '../../Buttons';
import { Row } from '../styles';

import { IHandleChange, IMovementRefs } from '../../../common/types';

const TimedField: React.FC<{
  move: IMovementRefs;
  i: number;
  handleChange: (e: IHandleChange, i: number) => void;
  handleDeleteMovementRef: (i: number) => void;
}> = ({ move, i, handleChange, handleDeleteMovementRef }) => {
  const { exercises, loading } = useContext(MovementListContext);

  return (
    <Row>
      <label>
        <select
          name="id"
          onChange={(e): void => handleChange(e, i)}
          value={move.id}
        >
          <option label={`Exercise ${i + 1}`} value="" />
          {exercises.map((ex) => (
            <option label={ex.name} value={ex.id} key={ex.id} />
          ))}
        </select>
      </label>
      <label>
        <input
          name="duration"
          type="number"
          min="0"
          max="999"
          value={move.duration as number}
          onChange={(e): void => handleChange(e, i)}
        />
        Duration
      </label>
      <button
        type="button"
        className="rem-btn"
        onClick={(): void => handleDeleteMovementRef(i)}
      >
        -
      </button>
    </Row>
  );
};

export default TimedField;
