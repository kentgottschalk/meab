import React from 'react';
import PropTypes from 'prop-types';
import Button from '../components/Button';

const ArmyBasics = props => {
  const { side, warbands, points, selectAlign, selectPoints } = props;
  return (
    <div className="army">
      <Button
        onClick={selectAlign}
        value="Good"
        className={side === 'Good' ? 'primary' : null}
        text="Good"
        status={warbands.length === 0 ? null : 'disabled'}
      />
      <Button
        onClick={selectAlign}
        value="Evil"
        className={side === 'Evil' ? 'primary' : null}
        text="Evil"
        status={warbands.length === 0 ? null : 'disabled'}
      />
      <div />
      <input placeholder="points" value={points} onChange={selectPoints} />
    </div>
  );
};

ArmyBasics.defaultProps = {
  side: undefined,
  points: 0,
};

ArmyBasics.propTypes = {
  side: PropTypes.string,
  points: PropTypes.number,
  warbands: PropTypes.instanceOf(Object).isRequired,
  selectAlign: PropTypes.func.isRequired,
  selectPoints: PropTypes.func.isRequired,
};

export default ArmyBasics;
