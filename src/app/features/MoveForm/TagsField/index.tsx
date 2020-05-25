import React from 'react';
import { ThemeContext, DefaultTheme } from 'styled-components';
import { FieldError } from 'react-hook-form';
import Select, { Styles, Props } from 'react-select';
import { useSelector, useDispatch } from 'store';

import FieldWrapper from 'components/FieldWrapper';

import { Tags } from 'types';
// import { ArchFormListItem } from 'components/ListItems';

function getCustomStyles(theme: DefaultTheme): object {
  const customStyles = {
    control: (styles: Styles, state: Props) => ({
      ...styles,
      backgroundColor: theme.mode.background[300],
      border: state.isDisabled
        ? '2px solid gray'
        : `2px solid ${theme.mode.color[100]}`,
      borderRadius: '0px',
    }),
    menu: (styles: Styles, state: Props) => ({
      ...styles,
      backgroundColor: theme.mode.background[100],
      border: state.isDisabled
        ? '2px solid gray'
        : `2px solid ${theme.mode.color[100]}`,
      borderRadius: '0px',
    }),
    option: (styles: Styles) => ({
      ...styles,
      backgroundColor: 'none',
      color: theme.mode.color[100],

      '&:hover': {
        backgroundColor: theme.mode.background[300],
      },
    }),
    multiValue: (styles: Styles) => {
      return {
        ...styles,
        backgroundColor: theme.mode.color[100],
        color: theme.mode.background[200],
      };
    },
    multiValueLabel: (styles, { data }) => ({
      ...styles,
      color: theme.mode.background[200],
    }),
    multiValueRemove: (styles: Styles) => ({
      ...styles,
      ':hover': {
        color: theme.mode.color[100],
        backgroundColor: theme.color.orange[500],
        cursor: 'pointer',
      },
    }),
  };

  return customStyles;
}

interface SelectOption {
  value: string;
  label: string;
}

const TagsField: React.FC<{
  tags: Tags | null;
  initTags: string[];
  isDisabled: boolean;
  control: any;
  setValue: any;
  watch: any;
}> = ({ isDisabled, setValue, watch, tags, initTags }) => {
  const theme = React.useContext(ThemeContext);

  // create options list
  const options = tags
    ? Object.keys(tags.byId).map((id) => ({
        value: id,
        label: tags.byId[id].name,
      }))
    : [];
  const initialSelectedOptions = options.filter((opt) =>
    initTags.includes(opt.value),
  );
  const { modalMode } = useSelector((state) => state.ui);

  const [selectedOptions, setSelectedOptions] = React.useState<SelectOption[]>(
    initialSelectedOptions,
  );

  function handleMultiChange(selectedOpts: any) {
    // Update state which sets select field display
    setSelectedOptions(selectedOpts);
    // // create new array for form field + moveState
    const tagsValue = (selectedOpts || []).map(
      (opt: SelectOption) => opt.value,
    );
    setValue('tags', tagsValue);
  }

  React.useEffect(() => {
    // reset field state to current tags when going from EDIT to VIEW
    if (modalMode === 'VIEW') {
      const currentSelectedOptions = options.filter((opt) =>
        initTags.includes(opt.value),
      );
      setSelectedOptions(currentSelectedOptions);
    }
  }, [modalMode]);

  const customStyles = getCustomStyles(theme);

  return (
    <FieldWrapper disabled={isDisabled}>
      <label htmlFor="tags">Tags:</label>
      <Select
        name="tags"
        styles={customStyles}
        options={options}
        value={selectedOptions}
        onChange={handleMultiChange}
        isDisabled={isDisabled}
        isMulti
      />
    </FieldWrapper>
  );
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
