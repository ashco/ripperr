import React from 'react';
import Select from 'react-select';
import { useSelector, useDispatch } from 'store';
import { setModalMode } from 'store/modal';
import { Controller } from 'react-hook-form';
import { ThemeContext } from 'styled-components';

import { MovementListContext } from 'context';
import { useMoveDispatch } from 'context/MoveContext';

// import { ArchFormListItem } from 'components/ListItems';
import { ArchetypesFieldWrapper, ArchetypeListItemWrapper } from './style';

import { Archetype } from 'types/types';
import { string } from 'yup';

interface SelectOption {
  value: string;
  label: string;
}

const ArchetypesField: React.FC<{
  tags: any;
  isDisabled: boolean;
  control: any;
  setValue: any;
  watch: any;
}> = ({ tags, isDisabled, control, setValue, watch }) => {
  const { modalMode } = useSelector((state) => state.modal);

  // Generate select option list
  const { archetypes } = React.useContext(MovementListContext);
  const options = archetypes.map((arch) => {
    return { value: arch.id as string, label: arch.name };
  });

  // Determine initial select values
  const initialSelectedOptions = options.filter((opt) =>
    tags.includes(opt.value),
  );
  const [selectedOptions, setSelectedOptions] = React.useState<SelectOption[]>(
    initialSelectedOptions,
  );

  function handleMultiChange(selectedOpts: any) {
    // Update state which sets select field display
    setSelectedOptions(selectedOpts);
    // create new array for form field + moveState
    const tagsValue = (selectedOpts || []).map(
      (opt: SelectOption) => opt.value,
    );
    setValue('tags', tagsValue);
  }

  React.useEffect(() => {
    // reset field state to current tags when going from EDIT to VIEW
    if (modalMode === 'MODAL_VIEW') {
      const currentSelectedOptions = options.filter((opt) =>
        tags.includes(opt.value),
      );
      setSelectedOptions(currentSelectedOptions);
    }
  }, [modalMode]);

  return (
    // <Controller
    //   as={<Select options={options} value={selectedOptions} />}
    //   control={control}
    //   name="tags"
    //   placeholder="Tags"
    //   onChange={handleMultiChange}
    //   isDisabled={isDisabled}
    //   isMulti
    // />

    <Select
      name="tags"
      placeholder="Tags"
      options={options}
      value={selectedOptions}
      onChange={handleMultiChange}
      isDisabled={isDisabled}
      isMulti
    />
    // <ArchetypesFieldWrapper>
    //   {archetypes.map((arch, index) => (
    //     <ArchetypeListItem
    //       key={arch.id}
    //       // index={index}
    //       archetype={arch}
    //       active={tags[arch.id as string]}
    //       // active={tags.includes(arch.id as string)}
    //       // isDisabled={isDisabled}
    //       register={register}
    //     />
    //   ))}
    // </ArchetypesFieldWrapper>
  );
};

// const ArchetypeListItem: React.FC<{
//   // index: number;
//   archetype: Archetype;
//   active: boolean;
//   // isDisabled: boolean;
//   register: any;
// }> = ({ archetype, register }) => {
//   const moveDispatch = useMoveDispatch();

//   return (
//     <ArchetypeListItemWrapper htmlFor={`tags[${archetype.id}]`} active={false}>
//       <input
//         type="checkbox"
//         name={`tags[${archetype.id}]`}
//         id={`tags[${archetype.id}]`}
//         // defaultChecked={}
//         ref={register}
//       />
//       <span>{archetype.name}</span>
//     </ArchetypeListItemWrapper>
//   );
// };

// const ArchetypesField: React.FC<{
//   tags: string[];
//   fields: any;
//   isDisabled: boolean;
//   modalMode: ModalMode;
//   register: any;
//   setValue: any;
// }> = ({ tags, fields, isDisabled, modalMode, register, setValue }) => {
//   const { archetypes } = React.useContext(MovementListContext);

//   return (
//     <ArchetypesFieldWrapper>
//       {archetypes
//         // TODO - make more performent
//         .filter((arch) => {
//           if (modalMode === 'MODAL_VIEW') {
//             return tags.includes(arch.id as string);
//           } else {
//             return true;
//           }
//         })
//         .map((arch, index) => (
//           <ArchetypeListItem
//             key={arch.id}
//             index={index}
//             archetype={arch}
//             active={tags.includes(arch.id as string)}
//             isDisabled={isDisabled}
//             register={register}
//             setValue={setValue}
//           />
//         ))}
//     </ArchetypesFieldWrapper>
//   );
// };

// const ArchetypeListItem: React.FC<{
//   index: number;
//   archetype: Archetype;
//   active: boolean;
//   isDisabled: boolean;
//   register: any;
//   setValue: any;
// }> = ({ index, archetype, active, isDisabled, register, setValue }) => {
//   const themeContext = React.useContext(ThemeContext);
//   const moveDispatch = useMoveDispatch();

//   // function toggleArch() {
//   //   moveDispatch({
//   //     type: 'MOVE_CHANGE_ARCH',
//   //     value: archetype.id,
//   //   });
//   // }

//   function toggleArch() {
//     console.log(archetype.id);
//     setValue('tags', archetype.id);
//   }

//   return (
//     // <ArchetypeListItemWrapper htmlFor={`tags[${archetype.id}]`} active={active}>
//     //   <input
//     //     type="checkbox"
//     //     name={`tags[${archetype.id}]`}
//     //     id={`tags[${archetype.id}]`}
//     //     defaultChecked={active}
//     //     ref={register}
//     //   />
//     //   <span>{archetype.name}</span>
//     // </ArchetypeListItemWrapper>
//     <ArchetypeListItemWrapper
//       color={
//         active
//           ? themeContext.color.orange[500]
//           : themeContext.mode.colorOpacity[200]
//       }
//       onClick={toggleArch}
//       active={active}
//       // isDisabled={isDisabled}
//     >
//       <p className="name">{archetype.name}</p>
//     </ArchetypeListItemWrapper>
//   );
// };

export default ArchetypesField;
