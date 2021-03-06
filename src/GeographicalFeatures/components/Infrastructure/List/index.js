import { List } from 'antd';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import CriticalInfrastructureListHeader from '../ListHeader';
import CriticalInfrastructureListItem from '../ListItem';

// eslint-disable-next-line jsdoc/require-returns
/**
 *
 * @function
 * @name CriticalInfrastructureList
 * @description Render Critical Infrastructure list
 *
 * @param {Object} props props object
 * @param {boolean} props.loading preload list of Critical Infrastructure
 * @param {Array} props.districts array list of Critical Infrastructure
 * @param {Function} props.onEdit function for editing Critical Infrastructure
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const CriticalInfrastructureList = ({
  criticalInfrastructures,
  loading,
  onEdit,
}) => (
  <Fragment>
    <CriticalInfrastructureListHeader />
    <List
      loading={loading}
      dataSource={criticalInfrastructures}
      renderItem={criticalInfrastructure => (
        <CriticalInfrastructureListItem
          key={criticalInfrastructure.name}
          name={criticalInfrastructure.name}
          type={criticalInfrastructure.type}
          onEdit={() => onEdit(criticalInfrastructure)}
        />
      )}
    />
  </Fragment>
);

CriticalInfrastructureList.propTypes = {
  onEdit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  criticalInfrastructures: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      type: PropTypes.string,
    })
  ).isRequired,
};

export default CriticalInfrastructureList;
