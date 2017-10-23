import React from 'react'
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import STYLE from './Chip.scss';

const Chip = (props) => {
  return (
    <NavLink to={props.href}>
      <div className={STYLE.Chip}>
        <img className={STYLE.Chip__icon} src={props.icon} alt={props.title}/>
        <div className={STYLE.Chip__title}>
          {props.title}
        </div>
      </div>
    </NavLink>
  );
}

Chip.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
  href: PropTypes.string,
};

Chip.defaultProps = {
  title: '',
  icon: '',
  href: '',
};

export default Chip;
