import styled from 'styled-components';
import FieldWrapper from 'components/FieldWrapper';

const RestFieldWrapper = styled(FieldWrapper)`
  .row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;

    /* .checkbox-container {
      label {
        border: 2px solid ${(props) => props.theme.mode.color[100]};
        cursor: ${(props) => (props.isDisabled ? 'auto' : 'pointer')};
        input {
          display: none;
        }
        input:checked + span {
          background-color: ${(props) => props.theme.mode.color[100]};
          color: ${(props) => props.theme.mode.background[300]};
        }
        span {
          width: 100%;
          height: 100%;
          font-size: 16px;
          padding: 0.5rem;
        }
      }
    } */
    .number-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.5rem;
      label, input {
        text-align: center;
      }
      label {
        /* width: 100%;
        font-size: 14px;
        padding-bottom: 0.25rem; */
        input {
          /* border-bottom: 2px solid
            ${(props) =>
              props.isDisabled
                ? props.theme.mode.color[200]
                : props.theme.mode.color[100]}; */
          padding: 0.3rem;
          margin-bottom: 0.25rem;
          /* appearance: none; */
        }
        /* Remove input arrows
      input[type='number']::-webkit-outer-spin-button,
      input[type='number']::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      input[type='number'] {
        -moz-appearance: textfield;
      } */
      }
    }
  }
`;

export default RestFieldWrapper;
