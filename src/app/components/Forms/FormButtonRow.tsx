import React from 'react';

const FormButtonRow: React.FC<{ submitText: string; hide: () => void }> = ({
  submitText,
  hide,
}) => (
  <div>
    <button onClick={hide}>Cancel</button>
    <button type="submit">{submitText}</button>
  </div>
);

export default FormButtonRow;
