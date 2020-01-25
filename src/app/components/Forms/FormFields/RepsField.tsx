import React, { useContext } from 'react';

import { MovementsContext } from '../../../context';

import { Row } from '../styles';

import { IHandleChange, IMovementRefs } from '../../../common/types';

const RepsField: React.FC<{
  move: IMovementRefs;
  i: number;
  handleChange: (e: IHandleChange, i: number) => void;
  handleDeleteMovementRef: (i: number) => void;
}> = ({ move, i, handleChange, handleDeleteMovementRef }) => {
  const { exercises } = useContext(MovementsContext);

  // check if move is still in database
  const moveIsAvailable = exercises.map((ex) => ex.name).includes(move.name);
  console.log(moveIsAvailable, move.name);
  return (
    <Row>
      <select
        name="id"
        onChange={(e): void => handleChange(e, i)}
        value={move.id}
      >
        <option label={`Exercise ${i + 1}`} value="" />
        {!moveIsAvailable && (
          <option label={move.name} value={move.id} key={move.id} />
        )}
        {exercises.map((ex) => (
          <option label={ex.name} value={ex.id} key={ex.id} />
        ))}
      </select>
      <label>
        <input
          name="reps"
          type="number"
          min="0"
          value={move.reps as number}
          onChange={(e): void => handleChange(e, i)}
        />
        Reps
      </label>
      <label>
        <input
          name="sets"
          type="number"
          min="0"
          value={move.sets as number}
          onChange={(e): void => handleChange(e, i)}
        />
        Sets
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

export default RepsField;
