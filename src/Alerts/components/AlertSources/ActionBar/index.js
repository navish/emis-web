import {
  refreshAlertSources,
  paginateAlertSources,
} from '@codetanzania/emis-api-states';
import { Button, Checkbox, Col, Pagination, Row } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { notifyError, notifySuccess } from '../../../../util';
import './styles.css';

// eslint-disable-next-line jsdoc/require-returns
/**
 * @function
 * @name AlertSourcesActionBar
 * @description  Render action bar for actions which are applicable
 *  to list content
 *
 * @param {Object} props props object
 * @param {page} props.page current  page
 * @param {number} props.total total number of alert sources
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const AlertSourcesActionBar = ({ page, total }) => (
  <div className="AlertSourcesActionBar">
    <Row>
      <Col span={1} xl={1} className="checkbox">
        <Checkbox />
      </Col>

      <Col span={1} xl={1}>
        <Button
          shape="circle"
          icon="reload"
          title="Refresh Alert Sources"
          className="actionButton"
          size="large"
          onClick={() =>
            refreshAlertSources(
              () => {
                notifySuccess('Alert Sources refreshed successfully');
              },
              () => {
                notifyError(
                  `An Error occurred while refreshing alert sources, please
                   alert sources system administrator!`
                );
              }
            )
          }
        />
      </Col>

      <Col span={1} xl={1}>
        <Button
          type="circle"
          icon="cloud-download"
          title="Export selected Alert Sources"
          className="actionButton"
          size="large"
        />
      </Col>

      <Col span={1} xl={1}>
        <Button
          type="circle"
          icon="hdd"
          title="Archive selected Alert Sources"
          className="actionButton"
          size="large"
        />
      </Col>

      <Col
        span={1}
        offset={13}
        xl={{ span: 1, offset: 15 }}
        xxl={{ span: 1, offset: 16 }}
      />

      <Col span={3} xl={4} xxl={3}>
        <Pagination
          simple
          defaultCurrent={page}
          total={total}
          onChange={nextPage => paginateAlertSources(nextPage)}
          className="pagination"
        />
      </Col>
    </Row>
  </div>
);

/* props validation */
AlertSourcesActionBar.propTypes = {
  page: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

export default AlertSourcesActionBar;
