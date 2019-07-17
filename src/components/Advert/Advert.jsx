import React, { useEffect } from 'react';
import classnames from 'classnames/bind';
import STYLES from './Advert.scss';

const c = classnames.bind(STYLES);

const Advert = () => {
  useEffect(() => {
    if (window) (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <div className={c('Advert')}>
      <ins
        className={c('adsbygoogle', 'Advert__frame')}
        data-ad-client="ca-pub-1409219619115807"
        data-ad-slot="2400047490"
      />
    </div>
  );
};

export default Advert;
