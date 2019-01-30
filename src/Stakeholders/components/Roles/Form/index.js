import { postRole, putRole } from '@codetanzania/emis-api-states';
import { Button, Form, Input } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { notifyError, notifySuccess } from '../../../../util';

class RoleForm extends Component {
  static propTypes = {
    isEditForm: PropTypes.bool.isRequired,
    role: PropTypes.shape({
      name: PropTypes.string,
      abbreviation: PropTypes.string,
      description: PropTypes.string,
    }),
    form: PropTypes.shape({ getFieldDecorator: PropTypes.func }).isRequired,
    onCancel: PropTypes.func.isRequired,
    posting: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    role: null,
  };

  handleSubmit = e => {
    e.preventDefault();

    const {
      form: { validateFieldsAndScroll },
      role,
      isEditForm,
    } = this.props;

    validateFieldsAndScroll((error, values) => {
      if (!error) {
        if (isEditForm) {
          const updatedRole = Object.assign({}, role, values);
          putRole(
            updatedRole,
            () => {
              notifySuccess('Role was updated successfully');
            },
            () => {
              notifyError(
                'Something occurred while updating role, please try again!'
              );
            }
          );
        } else {
          postRole(
            values,
            () => {
              notifySuccess('Role was created successfully');
            },
            () => {
              notifyError(
                'Something occurred while saving role, please try again!'
              );
            }
          );
        }
      }
    });
  };

  render() {
    const {
      isEditForm,
      role,
      posting,
      onCancel,
      form: { getFieldDecorator },
    } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 24 },
        md: { span: 24 },
        lg: { span: 24 },
        xl: { span: 24 },
        xxl: { span: 24 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 },
        md: { span: 24 },
        lg: { span: 24 },
        xl: { span: 24 },
        xxl: { span: 24 },
      },
    };

    return (
      <Form onSubmit={this.handleSubmit}>
        {/* role name */}
        <Form.Item {...formItemLayout} label=" Name">
          {getFieldDecorator('name', {
            initialValue: isEditForm ? role.name : undefined,
            rules: [{ required: true, message: 'Role  name is required' }],
          })(<Input placeholder="e.g Adminstrator" />)}
        </Form.Item>
        {/* end role name */}

        {/* role abbreviation */}
        <Form.Item {...formItemLayout} label="Abbreviation">
          {getFieldDecorator('abbreviation', {
            initialValue: isEditForm ? role.abbreviation : undefined,
          })(<Input placeholder="e.g RC, DC, RAS" />)}
        </Form.Item>
        {/* end role abbreviation */}

        {/* role description */}
        <Form.Item {...formItemLayout} label="Description">
          {getFieldDecorator('description', {
            initialValue: isEditForm ? role.description : undefined,
            rules: [
              { required: true, message: 'Role description is required' },
            ],
          })(
            <Input placeholder="e.g Energy and Water Utilities Regulatory Authority" />
          )}
        </Form.Item>
        {/* end role description */}

        {/* form actions */}
        <Form.Item wrapperCol={{ span: 24 }} style={{ textAlign: 'right' }}>
          <Button onClick={onCancel}>Cancel</Button>
          <Button
            style={{ marginLeft: 8 }}
            type="primary"
            htmlType="submit"
            loading={posting}
          >
            Save
          </Button>
        </Form.Item>
        {/* end form actions */}
      </Form>
    );
  }
}

export default Form.create()(RoleForm);
