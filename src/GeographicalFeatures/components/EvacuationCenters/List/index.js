import { List } from 'antd';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import EvacuationCenterListHeader from '../ListHeader';
import EvacuationCenterListItem from '../ListItem';

// eslint-disable-next-line jsdoc/require-returns
/**
 *
 * @function
 * @name EvacuationCenterList
 * @description Render Evacuation Center list
 *
 * @param {Object} props props object
 * @param {boolean} props.loading preload list of Evacuation Center
 * @param {Array} props.districts array list of Evacuation Center
 * @param {Function} props.onEdit function for editing Evacuation Center
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const EvacuationCenterList = ({ evacuationCenters, loading, onEdit }) => (
  <Fragment>
    <EvacuationCenterListHeader />
    <List
      loading={loading}
      dataSource={evacuationCenters}
      renderItem={evacuationCenter => (
        <EvacuationCenterListItem
          key={evacuationCenter.name}
          name={evacuationCenter.name}
          type={evacuationCenter.type}
          onEdit={() => onEdit(evacuationCenter)}
        />
      )}
    />
  </Fragment>
);

EvacuationCenterList.propTypes = {
  onEdit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  evacuationCenters: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      type: PropTypes.string,
    })
  ).isRequired,
};

export default EvacuationCenterList;
