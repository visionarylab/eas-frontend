import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames/bind';
import Typography from '@material-ui/core/Typography';

import TransparentPanel from '../TransparentPanel/TransparentPanel';
import STYLES from './DrawContent.scss';

const c = classNames.bind(STYLES);

const DrawContent = ({ title, footer, children }) => (
  <TransparentPanel noPadding>
    <Grid container direction={'column'} justify={'center'}>
      {title && (
        <Grid item>
          <Typography
            variant="display2"
            align={'center'}
            data-component={'PublishedRandomNumberPage__Title'}
          >
            {title}
          </Typography>
        </Grid>
      )}

      <Grid item>{children}</Grid>
      {footer && (
        <Grid item className={c('DrawContent__footer')}>
          <section>{footer}</section>
        </Grid>
      )}
    </Grid>
  </TransparentPanel>
);

DrawContent.propTypes = {
  title: PropTypes.string,
  footer: PropTypes.node,
  children: PropTypes.node.isRequired,
};

DrawContent.defaultProps = {
  title: null,
  footer: null,
};

export default DrawContent;
