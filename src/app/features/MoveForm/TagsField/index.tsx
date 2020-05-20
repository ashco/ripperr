import React from 'react';
import Select from 'react-select';
import { useSelector, useDispatch } from 'store';
import { setModalMode } from 'store/ui';
import { Controller } from 'react-hook-form';
import { ThemeContext } from 'styled-components';

// import MovementListContext from 'context/MovementListContext';
// import { useMoveDispatch } from 'context/MoveContext';

// import { ArchFormListItem } from 'components/ListItems';
import { TagsFieldWrapper, TagListItemWrapper } from './style';

import { string } from 'yup';

interface SelectOption {
  value: string;
  label: string;
}

const TagsField: React.FC<{
  tags: any;
  isDisabled: boolean;
  control: any;
  setValue: any;
  watch: any;
}> = ({ tags, isDisabled, control, setValue, watch }) => {
  return null;

  // const { modalMode } = useSelector((state) => state.ui);

  // // Generate select option list
  // const { tags } = React.useContext(MovementListContext);
  // const options = tags.map((arch) => {
  //   return { value: arch.id as string, label: arch.name };
  // });

  // // Determine initial select values
  // const initialSelectedOptions = options.filter((opt) =>
  //   tags.includes(opt.value),
  // );
  // const [selectedOptions, setSelectedOptions] = React.useState<SelectOption[]>(
  //   initialSelectedOptions,
  // );

  // function handleMultiChange(selectedOpts: any) {
  //   // Update state which sets select field display
  //   setSelectedOptions(selectedOpts);
  //   // create new array for form field + moveState
  //   const tagsValue = (selectedOpts || []).map(
  //     (opt: SelectOption) => opt.value,
  //   );
  //   setValue('tags', tagsValue);
  // }

  // React.useEffect(() => {
  //   // reset field state to current tags when going from EDIT to VIEW
  //   if (modalMode === 'VIEW') {
  //     const currentSelectedOptions = options.filter((opt) =>
  //       tags.includes(opt.value),
  //     );
  //     setSelectedOptions(currentSelectedOptions);
  //   }
  // }, [modalMode]);

  // return (
  //   // <Controller
  //   //   as={<Select options={options} value={selectedOptions} />}
  //   //   control={control}
  //   //   name="tags"
  //   //   placeholder="Tags"
  //   //   onChange={handleMultiChange}
  //   //   isDisabled={isDisabled}
  //   //   isMulti
  //   // />

  //   <Select
  //     name="tags"
  //     placeholder="Tags"
  //     options={options}
  //     value={selectedOptions}
  //     onChange={handleMultiChange}
  //     isDisabled={isDisabled}
  //     isMulti
  //   />
  //   // <TagsFieldWrapper>
  //   //   {tags.map((arch, index) => (
  //   //     <TagListItem
  //   //       key={arch.id}
  //   //       // index={index}
  //   //       tag={arch}
  //   //       active={tags[arch.id as string]}
  //   //       // active={tags.includes(arch.id as string)}
  //   //       // isDisabled={isDisabled}
  //   //       register={register}
  //   //     />
  //   //   ))}
  //   // </TagsFieldWrapper>
  // );
};

// const TagListItem: React.FC<{
//   // index: number;
//   tag: Tag;
//   active: boolean;
//   // isDisabled: boolean;
//   register: any;
// }> = ({ tag, register }) => {
//   const moveDispatch = useMoveDispatch();

//   return (
//     <TagListItemWrapper htmlFor={`tags[${tag.id}]`} active={false}>
//       <input
//         type="checkbox"
//         name={`tags[${tag.id}]`}
//         id={`tags[${tag.id}]`}
//         // defaultChecked={}
//         ref={register}
//       />
//       <span>{tag.name}</span>
//     </TagListItemWrapper>
//   );
// };

// const TagsField: React.FC<{
//   tags: string[];
//   fields: any;
//   isDisabled: boolean;
//   modalMode: ModalMode;
//   register: any;
//   setValue: any;
// }> = ({ tags, fields, isDisabled, modalMode, register, setValue }) => {
//   const { tags } = React.useContext(MovementListContext);

//   return (
//     <TagsFieldWrapper>
//       {tags
//         // TODO - make more performent
//         .filter((arch) => {
//           if (modalMode === 'VIEW') {
//             return tags.includes(arch.id as string);
//           } else {
//             return true;
//           }
//         })
//         .map((arch, index) => (
//           <TagListItem
//             key={arch.id}
//             index={index}
//             tag={arch}
//             active={tags.includes(arch.id as string)}
//             isDisabled={isDisabled}
//             register={register}
//             setValue={setValue}
//           />
//         ))}
//     </TagsFieldWrapper>
//   );
// };

// const TagListItem: React.FC<{
//   index: number;
//   tag: Tag;
//   active: boolean;
//   isDisabled: boolean;
//   register: any;
//   setValue: any;
// }> = ({ index, tag, active, isDisabled, register, setValue }) => {
//   const themeContext = React.useContext(ThemeContext);
//   const moveDispatch = useMoveDispatch();

//   // function toggleArch() {
//   //   moveDispatch({
//   //     type: 'MOVE_CHANGE_ARCH',
//   //     value: tag.id,
//   //   });
//   // }

//   function toggleArch() {
//     console.log(tag.id);
//     setValue('tags', tag.id);
//   }

//   return (
//     // <TagListItemWrapper htmlFor={`tags[${tag.id}]`} active={active}>
//     //   <input
//     //     type="checkbox"
//     //     name={`tags[${tag.id}]`}
//     //     id={`tags[${tag.id}]`}
//     //     defaultChecked={active}
//     //     ref={register}
//     //   />
//     //   <span>{tag.name}</span>
//     // </TagListItemWrapper>
//     <TagListItemWrapper
//       color={
//         active
//           ? themeContext.color.orange[500]
//           : themeContext.mode.colorOpacity[200]
//       }
//       onClick={toggleArch}
//       active={active}
//       // isDisabled={isDisabled}
//     >
//       <p className="name">{tag.name}</p>
//     </TagListItemWrapper>
//   );
// };

export default TagsField;
