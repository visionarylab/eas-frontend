import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';
import STYLES from './Advert.scss';

const c = classnames.bind(STYLES);

const Advert = props => {
  useEffect(() => {
    if (window && false) (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  const { isMobile } = props;

  return (
    <div className={c('Advert')}>
      <ins
        className={c('adsbygoogle', {
          'Advert__frame--desktop': !isMobile,
          'Advert__frame--mobile': isMobile,
        })}
        data-ad-client="ca-pub-1409219619115807"
        data-ad-slot={isMobile ? '1221986757' : '2400047490'}
      />
    </div>
  );
};

const mapStateToProps = state => ({ isMobile: state.userRequest.isMobile });

Advert.propTypes = {
  isMobile: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(Advert);
