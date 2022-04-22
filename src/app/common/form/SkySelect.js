import { useField } from 'formik';
import React from 'react';
import Select, { components } from 'react-select';
const { Option } = components;
import CustomSelectInput from './CustomSelectInput';

export default function SkySelect(props) {
  const [field, meta, helpers] = useField(props.name);
  return (
    <Select
      components={{
        Input: CustomSelectInput,
        Option: (props) => {
          return <Option {...props}>
            <i
              className={props.data.icon}
              style={{ width: 36 }}
            />
            {props.data.label}
          </Option>
        }
      }}
      className="react-select"
      classNamePrefix="react-select"
      name="form-field-name"
      value={selectedOption}
      onChange={setSelectedOption}
      options={[
        { label: 'Cake', value: 'cake', key: 0, icon: 'iconsminds-ship' },
        { label: 'Cupcake', value: 'cupcake', key: 1, icon: 'iconsminds-ship' },
        { label: 'Dessert', value: 'dessert', key: 2, icon: 'iconsminds-ship' }
      ]}
    />
  )
}