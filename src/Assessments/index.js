import PropTypes from 'prop-types';
import React from 'react';
import indicatorIcon from '../assets/icons/assessment/indicators.svg';
import questionnairesIcon from '../assets/icons/assessment/questionnaires.svg';
import questionsIcon from '../assets/icons/assessment/questions.svg';
import responsesIcon from '../assets/icons/assessment/responses-disabled.svg';
import NavigationMenu from '../components/NavigationMenu';
import modules from '../modules.json';

const routes = [
  {
    name: 'Observations / Response',
    path: '/responses',
    icon: responsesIcon,
    description: modules.assessmentsObservations,
    disabled: true,
  },
  {
    name: 'Questionnaires',
    path: '/questionnaires',
    icon: questionnairesIcon,
    description: modules.assessmentsQuestionnaires,
  },
  {
    name: 'Questions',
    path: '/questions',
    icon: questionsIcon,
    description: modules.assessmentsQuestions,
  },
  {
    name: 'Indicators',
    path: '/indicators',
    icon: indicatorIcon,
    description: modules.assessmentsIndicators,
  },
];

// eslint-disable-next-line jsdoc/require-returns
/**
 *
 * @function
 * @name Assessments
 * @description Home component which shows to navigation Nav
 *
 * @param {Object} props props object
 * @param {Object} props.match props for navigation url
 * @version 0.1.0
 * @since 0.1.0
 */
const Assessments = ({ match }) => (
  <NavigationMenu routes={routes} match={match} />
);

/* props validation */
Assessments.propTypes = {
  match: PropTypes.shape({ url: PropTypes.string }).isRequired,
};

export default Assessments;
