import { Select } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';

/* contants */
const { Option } = Select;

/**
 * @function
 * @name SelectInput
 * @description Render Select input wrapper on top of antd select input
 *
 * @param {Object} props props object
 * @param {Object} props.options selectable options
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const SelectInput = ({ options, ...props }) => (
  <Select {...props}>
    {options.map(option => (
      <Option key={option} value={option}>
        {option}
      </Option>
    ))}
  </Select>
);

/* props validation */
SelectInput.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SelectInput;
