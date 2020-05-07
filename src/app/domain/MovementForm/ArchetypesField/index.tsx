import React from 'react';
import Select from 'react-select';

import { ThemeContext } from 'styled-components';

import { MovementListContext } from 'context';
import { useMoveDispatch } from 'context/MoveContext';

// import { ArchFormListItem } from 'components/ListItems';
import { ArchetypesFieldWrapper, ArchetypeListItemWrapper } from './style';

import { ModalMode } from 'types/enums';
import { Archetype } from 'types/types';
import { string } from 'yup';

interface SelectOption {
  value: string;
  label: string;
}

const ArchetypesField: React.FC<{
  tags: any;
  isDisabled: boolean;
  modalMode: ModalMode;
  register: any;
  setValue: any;
}> = ({ tags, isDisabled, modalMode, register, setValue }) => {
  // Generate select option list
  const { archetypes } = React.useContext(MovementListContext);
  const options = archetypes.map((arch) => {
    return { value: arch.id as string, label: arch.name };
  });

  // Determine initial select values
  const defaultValue = options.filter((opt) => tags.includes(opt.value));
  const [selectValues, setSelectValues] = React.useState<SelectOption[]>(
    defaultValue,
  );

  function handleMultiChange(selectedOptions: any) {
    setSelectValues(selectedOptions);

    const valueArr = (selectedOptions || []).map(
      (opt: SelectOption) => opt.value,
    );
    setValue('tags', valueArr);
  }

  // React.useEffect(() => {
  //   register({ name: 'tags' });
  // }, []);

  return (
    <Select
      name="tags"
      placeholder="Tags"
      options={options}
      value={selectValues}
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
//           if (modalMode === ModalMode.View) {
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
