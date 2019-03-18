import React from 'react';
import PropTypes from 'prop-types';

const Stats = props => {
  const { armyModels, armyBowCount, armyOptionPoints, armyPoints, points } = props;

  return (
    <div className="stat">
      <div>
        <div>Total Models</div>
        <div>{armyModels}</div>
      </div>
      <div>
        <div>Break Point</div>
        <div>{armyModels / 4}</div>
      </div>
      <div>
        <div>Number of Bows</div>
        <div className={armyBowCount / armyModels > 0.32 ? 'alert' : null}>{armyBowCount}</div>
      </div>
      <div>
        <div>Total Points</div>
        <div className={armyPoints + armyOptionPoints > points ? 'alert' : null}>
          {armyPoints + armyOptionPoints}{' '}
          <span className="light">
            ({armyPoints}/{armyOptionPoints})
          </span>
        </div>
      </div>
    </div>
  );
};

Stats.defaultProps = {
  armyModels: 0,
  armyOptionPoints: 0,
  armyPoints: 0,
  points: 0,
  armyBowCount: 0,
};

Stats.propTypes = {
  armyBowCount: PropTypes.number,
  armyModels: PropTypes.number,
  armyOptionPoints: PropTypes.number,
  armyPoints: PropTypes.number,
  points: PropTypes.number,
};

export default Stats;
