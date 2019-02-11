import {
  closeStakeholderForm,
  Connect,
  getStakeholders,
  openStakeholderForm,
  searchStakeholders,
  selectStakeholder,
} from '@codetanzania/emis-api-states';
import { Button, Col, Input, Modal, Row } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ContactForm from './ContactForm';
import ContactFilters from './Filters';
import ContactsList from './List';
import NotificationForm from './NotificationForm';
import './styles.css';

const { Search } = Input;

/**
 * Render contact list which have search box, actions and contact list
 *
 * @class
 * @name ContactsList
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class Contacts extends Component {
  state = {
    showFilters: false,
    isEditForm: false,
    showNotificationForm: false,
    selectedContacts: [],
  };

  static propTypes = {
    loading: PropTypes.bool.isRequired,
    posting: PropTypes.bool.isRequired,
    contacts: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string }))
      .isRequired,
    contact: PropTypes.shape({ name: PropTypes.string }),
    page: PropTypes.number.isRequired,
    showForm: PropTypes.bool.isRequired,
    total: PropTypes.number.isRequired,
  };

  static defaultProps = {
    contact: null,
  };

  componentDidMount() {
    getStakeholders();
  }

  /**
   * open filters modal by setting it's visible property to false via state
   *
   * @function
   * @name openFiltersModal
   *
   * @returns {undefined} - Nothing is returned
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  openFiltersModal = () => {
    this.setState({ showFilters: true });
  };

  /**
   * Close filters modal by setting it's visible property to false via state
   *
   * @function
   * @name closeFiltersModal
   *
   * @returns {undefined} - Nothing is returned
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  closeFiltersModal = () => {
    this.setState({ showFilters: false });
  };

  /**
   * Open contact form
   *
   * @function
   * @name openContactForm
   *
   * @returns {undefined} - Nothing is returned
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  openContactForm = () => {
    openStakeholderForm();
  };

  /**
   * close contact form
   *
   * @function
   * @name openContactForm
   *
   * @returns {undefined} - Nothing is returned
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  closeContactForm = () => {
    closeStakeholderForm();
    this.setState({ isEditForm: false });
  };

  /**
   * Search Contacts List based on supplied filter word
   *
   * @function
   * @name searchContacts
   *
   * @param {Object} event - Event instance
   * @returns {undefined} - Nothing is returned
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  searchContacts = event => {
    searchStakeholders(event.target.value);
  };

  /**
   * Handle on Edit action for list item
   *
   * @function
   * @name handleEdit
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleEdit = contact => {
    selectStakeholder(contact);
    this.setState({ isEditForm: true });
    openStakeholderForm();
  };

  /**
   * Handle on notify contacts
   *
   * @function
   * @name openNotificationForm
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  openNotificationForm = contacts => {
    this.setState({
      selectedContacts: contacts,
      showNotificationForm: true,
    });
  };

  /**
   * Handle on notify contacts
   *
   * @function
   * @name closeNotificationForm
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  closeNotificationForm = () => {
    this.setState({ showNotificationForm: false });
  };

  handleAfterCloseForm = () => {
    this.setState({ isEditForm: false });
  };

  render() {
    const {
      contacts,
      contact,
      loading,
      posting,
      page,
      showForm,
      total,
    } = this.props;
    const {
      showFilters,
      isEditForm,
      showNotificationForm,
      selectedContacts,
    } = this.state;
    return (
      <div className="ContactsList">
        <Row>
          <Col span={12}>
            {/* search input component */}
            <Search
              size="large"
              placeholder="Search for contacts here ..."
              onChange={this.searchContacts}
            />
            {/* end search input component */}
          </Col>

          {/* <Col span={3} offset={1}>
            <Select
              defaultValue="Active"
              style={{ width: 120 }}
              size="large"
              type="primary"
            >
              <Option value="All">All</Option>
              <Option value="Active">Active</Option>
              <Option value="Archived">Archived</Option>
            </Select>
          </Col> */}

          {/* primary actions */}
          <Col span={2} offset={9}>
            <Button
              type="primary"
              icon="plus"
              size="large"
              title="Add New Contact"
              onClick={this.openContactForm}
            >
              New Contact
            </Button>
          </Col>
          {/* end primary actions */}
        </Row>

        {/* list starts */}
        <ContactsList
          total={total}
          page={page}
          contacts={contacts}
          loading={loading}
          onEdit={this.handleEdit}
          onFilter={this.openFiltersModal}
          onNotify={this.openNotificationForm}
        />
        {/* end list */}

        {/* filter modal */}
        <Modal
          title="Filter Contacts"
          visible={showFilters}
          onCancel={this.closeFiltersModal}
          footer={null}
          destroyOnClose
          maskClosable={false}
        >
          <ContactFilters onCancel={this.closeFiltersModal} />
        </Modal>
        {/* end filter modal */}

        {/* Notification Modal modal */}
        <Modal
          title="Notify Contacts"
          visible={showNotificationForm}
          onCancel={this.closeNotificationForm}
          footer={null}
          destroyOnClose
          maskClosable={false}
          width="40%"
        >
          <NotificationForm
            onCancel={this.closeNotificationForm}
            selectedContacts={selectedContacts}
          />
        </Modal>
        {/* end Notification modal */}

        {/* create/edit form modal */}
        <Modal
          title={isEditForm ? 'Edit Contact' : 'Add New Contact'}
          visible={showForm}
          width="50%"
          footer={null}
          onCancel={this.closeContactForm}
          destroyOnClose
          maskClosable={false}
          afterClose={this.handleAfterCloseForm}
        >
          <ContactForm
            posting={posting}
            isEditForm={isEditForm}
            contact={contact}
            onCancel={this.closeContactForm}
          />
        </Modal>
        {/* end create/edit form modal */}
      </div>
    );
  }
}

export default Connect(Contacts, {
  contacts: 'stakeholders.list',
  contact: 'stakeholders.selected',
  loading: 'stakeholders.loading',
  posting: 'stakeholders.posting',
  page: 'stakeholders.page',
  showForm: 'stakeholders.showForm',
  total: 'stakeholders.total',
});
