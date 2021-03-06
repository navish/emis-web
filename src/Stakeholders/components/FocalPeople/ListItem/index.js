import { Avatar, Checkbox, Col, Modal, Row } from 'antd';
import PropTypes from 'prop-types';
import randomColor from 'randomcolor';
import React, { Component } from 'react';
import ListItemActions from '../../../../components/ListItemActions';
import './styles.css';

/* constants */
const { confirm } = Modal;

/**
 * @class
 * @name FocalPeopleListItem
 * @description Single focal person list item component.
 * Render single focal person details
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class FocalPeopleListItem extends Component {
  state = {
    isHovered: false,
  };

  static propTypes = {
    abbreviation: PropTypes.string.isRequired,
    agency: PropTypes.string.isRequired,
    agencyAbbreviation: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    mobile: PropTypes.string.isRequired,
    onArchive: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    isSelected: PropTypes.bool.isRequired,
    onSelectItem: PropTypes.func.isRequired,
    onDeselectItem: PropTypes.func.isRequired,
    onShare: PropTypes.func.isRequired,
  };

  /**
   * @function
   * @name handleMouseEnter
   * @description Handle on MouseEnter ListItem event
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleMouseEnter = () => {
    this.setState({ isHovered: true });
  };

  /**
   * @function
   * @name handleMouseEnter
   * @description Handle on MouseLeave ListItem event
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleMouseLeave = () => {
    this.setState({ isHovered: false });
  };

  /**
   * @function
   * @name handleToggleSelect
   * @description Handle Toggling List Item checkbox
   *
   * @param {Object} event - Event object
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleToggleSelect = event => {
    const { isSelected } = this.state;
    const { onSelectItem, onDeselectItem } = this.props;

    this.setState({ isSelected: !isSelected });
    if (event.target.checked) {
      onSelectItem();
    } else {
      onDeselectItem();
    }
  };

  /**
   * @function
   * @name showArchiveConfirm
   * @description show confirm modal before archiving a focal person
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  showArchiveConfirm = () => {
    const { name, onArchive } = this.props;
    confirm({
      title: `Are you sure you want to archive ${name} ?`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        onArchive();
      },
    });
  };

  render() {
    const {
      abbreviation,
      agency,
      agencyAbbreviation,
      name,
      role,
      location,
      email,
      mobile,
      onEdit,
      onShare,
    } = this.props;
    const { isHovered } = this.state;
    const { isSelected } = this.props;
    const avatarBackground = randomColor();
    let sideComponent = null;

    if (isSelected) {
      sideComponent = (
        <Checkbox
          className="Checkbox"
          onChange={this.handleToggleSelect}
          checked={isSelected}
        />
      );
    } else {
      sideComponent = isHovered ? (
        <Checkbox
          className="Checkbox"
          onChange={this.handleToggleSelect}
          checked={isSelected}
        />
      ) : (
        <Avatar style={{ backgroundColor: avatarBackground }}>
          {abbreviation}
        </Avatar>
      );
    }

    return (
      <div
        className="FocalPeopleListItem"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <Row>
          <Col span={1}>{sideComponent}</Col>
          <Col span={3}>{name}</Col>
          <Col span={2} title={agency}>
            {agencyAbbreviation}
          </Col>
          <Col span={5}>{role}</Col>
          <Col span={5}>{location}</Col>
          <Col span={2}>{mobile}</Col>
          <Col span={4}>{email}</Col>
          <Col span={1}>
            {isHovered && (
              <ListItemActions
                edit={{
                  name: 'Edit Focal Person',
                  title: 'Update Focal Person Details',
                  onClick: onEdit,
                }}
                share={{
                  name: 'Share Focal Person',
                  title: 'Share Focal Person details with others',
                  onClick: onShare,
                }}
                archive={{
                  name: 'Archive Focal Person',
                  title: 'Remove Focal Person from list of active focal People',
                  onClick: this.showArchiveConfirm,
                }}
              />
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

export default FocalPeopleListItem;
