import React from 'react';
import EmptyState from '../../components/EmptyState';

/**
 * @function
 * @name AlertFeedsLayout
 * @description Render alert feeds layout
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const AlertFeedsLayout = () => (
  <div style={{ marginTop: '20%' }}>
    <EmptyState
      icon="exclamation-circle"
      description="No Alerts Feeds yet,but when they are available will appear here"
      buttonLabel="New Alert"
      onClick={() => {}}
    />
  </div>
);

export default AlertFeedsLayout;
