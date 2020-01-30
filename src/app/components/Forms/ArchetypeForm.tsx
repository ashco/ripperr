import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';

import {
  AuthUserContext,
  FirebaseContext,
  MovementsContext,
} from '../../context';
import {
  handleChange,
  handleValidation,
  validateForm,
} from '../../common/formHelpers';

import { FirstFields, ButtonRow } from './index';
import { MovementFormWrapper } from './styles';

import {
  IHandleChange,
  IArchetype,
  IArchetypeFormValues,
  IArchetypeFormErrors,
} from '../../common/types';
import { FormMode, MovementType } from '../../common/enums';

const INITIAL_FORM_VALUES: IArchetypeFormValues = {
  name: '',
  description: '',
};

const INITIAL_ERROR_VALUES: IArchetypeFormErrors = {
  name: '',
  description: '',
};

const ArchetypeForm: React.FC<{
  formMode: FormMode;
  hide: () => void;
  archetype?: IArchetype;
}> = ({ formMode, hide, archetype }) => {
  const firebase = useContext(FirebaseContext);
  const authUser = useContext(AuthUserContext);
  const { archetypes } = useContext(MovementsContext);

  // ============ SET UP FORM STATE ============
  let initialFormState = INITIAL_FORM_VALUES;
  if (formMode === FormMode.Edit && archetype) {
    initialFormState = archetype;
  }

  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState(INITIAL_ERROR_VALUES);

  // ============ TEXT VALUES ============

  const text = {
    title: '',
    submitButton: '',
  };
  if (formMode === FormMode.Add) {
    text.title = 'Create New Archetype';
    text.submitButton = 'Submit';
  } else if (formMode === FormMode.Edit) {
    text.title = 'Edit Archetype';
    text.submitButton = 'Update';
  }

  // ============ FIREBASE FUNCTIONS ============

  function handleCreateArchetype(form: IArchetypeFormValues): void {
    if (authUser) {
      const docRef = firebase.archetypes(authUser.uid).doc();

      // Check that name is unique
      const archNames = archetypes.map((arch) => arch.name);
      if (archNames.includes(form.name)) {
        toast.error('Archetype name is already in use.');
        return;
      }

      const archetypeObj: IArchetype = {
        id: docRef.id,
        lastModified: firebase.getTimestamp(),
        type: MovementType.Archetype,
        name: form.name,
        description: form.description,
        history: [],
      };

      docRef
        .set(archetypeObj)
        .then(() => {
          console.log(`Archetype Added: ${archetypeObj.name}`);
          hide();
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      console.log('There is no authUser!');
    }
  }

  function handleUpdateArchetype(form: IArchetypeFormValues): void {
    if (authUser && archetype) {
      // Check that name is unique or matches with current id
      const archNames = archetypes.map((arch) => arch.name);
      if (archNames.includes(form.name) && archetype.name !== form.name) {
        toast.error('Archetype name is already in use.');
        return;
      }

      const archetypeObj: IArchetypeFormValues = {
        lastModified: firebase.getTimestamp(),
        name: form.name,
        description: form.description,
        tags: form.tags,
      };

      firebase
        .archetype(authUser.uid, archetype.id)
        .update(archetypeObj)
        .then(() => {
          console.log(`Archetype Updated: ${archetypeObj.name}`);
          hide();
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      console.log('There is no authUser || archetype!');
    }
  }

  // ============ FORM FUNCTIONS ============

  function handleChangeForm(e: IHandleChange): void {
    handleChange(e, form, setForm);
    handleValidation(e, errors, setErrors);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    if (validateForm(errors)) {
      if (formMode === FormMode.Add) {
        handleCreateArchetype(form);
      } else if (formMode === FormMode.Edit) {
        handleUpdateArchetype(form);
      }
    } else {
      toast.error('There is a problem with your configuration..');
    }
  }

  return (
    <ArchetypeFormWrapper>
      <h1>{text.title}</h1>
      <form onSubmit={handleSubmit} noValidate>
        <FirstFields
          form={form}
          errors={errors}
          handleChange={handleChangeForm}
        />
        <ButtonRow hide={hide} submitText={text.submitButton} />
      </form>
    </ArchetypeFormWrapper>
  );
};

const ArchetypeFormWrapper = styled(MovementFormWrapper)`
  width: ${(p) => p.theme.space[13]};
  /* button {
    font-size: 1.8rem;
    margin: 0.25rem;
    padding: 0.6rem;
  } */
`;

export { ArchetypeForm };
