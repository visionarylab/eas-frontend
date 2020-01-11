import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { withTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import classnames from 'classnames/bind';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import STYLES from './ShareUrl.scss';

const c = classnames.bind(STYLES);

const SNACK_CLOSE_DELAY = 2000;

const copyInputContent = input => {
  input.select();
  let success;

  try {
    const successful = document.execCommand('copy');
    if (!successful) {
      throw new Error('copy command was unsuccessful');
    }
    success = true;
  } catch (err) {
    console.error('unable to copy using execCommand: ', err);
    // console.warn('trying IE specific stuff');
    // try {
    //   window.clipboardData.setData('text/html' || 'text', text);
    //   success = true;
    // } catch (err2) {
    //   console.error('unable to copy using clipboardData: ', err2);
    // }
  }
};

function SlideTransition(props) {
  return <Slide {...props} direction="down" />;
}

const ShareUrl = ({ url, t }) => {
  const inputEl = useRef(null);
  const [state, setState] = React.useState({
    open: false,
  });
  const { open } = state;

  const handleClose = () => {
    setState({ open: false });
  };
  const onButtonClick = () => {
    copyInputContent(inputEl.current);
    setState({ open: true });
    setTimeout(handleClose, SNACK_CLOSE_DELAY);
  };
  const vertical = 'top';
  const horizontal = 'center';
  return (
    <Paper className={c('ShareUrl')}>
      <InputBase
        className={c('ShareUrl__input')}
        // placeholder="Search Google Maps"
        inputProps={{ 'aria-label': 'Copy Url', ref: inputEl }}
        value={url}
      />
      <Divider className={c('ShareUrl__divider')} orientation="vertical" />
      {/* <IconButton aria-label="copy">
      <FileCopyIcon />
    </IconButton> */}
      <Button onClick={onButtonClick} startIcon={<FileCopyIcon />}>
        {t('copy')}
      </Button>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        key={`${vertical},${horizontal}`}
        open={open}
        TransitionComponent={SlideTransition}
        onClose={handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{t('url_copied')}</span>}
        action={[
          <IconButton key="close" aria-label="close" color="inherit" onClick={handleClose}>
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </Paper>
  );
};

ShareUrl.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation('ShareUrl')(ShareUrl);
