import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import classnames from 'classnames/bind';
import PublicModeButton from '../PublicModeButton/PublicModeButton.jsx';
import STYLES from './ShareDrawModal.scss';

const c = classnames.bind(STYLES);

class ShareDrawModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;
    return (
      <div className={c('ShareDrawModal__button-row')}>
        <Button onClick={this.handleClickOpen} data-component="ShareDrawButton">
          Compartir resultado
        </Button>
        <Dialog
          fullScreen={this.fullScreen}
          open={open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle>¿Quieres compartir los resultados de un sorteo?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Para compartir los resultados necesitas crear un sorteo público. De esta manera,
              garantizarás a los participantes que el sorteo sólo se realizó una vez
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              data-component="ShareDrawButton__cancel"
              onClick={this.handleClose}
              color="primary"
            >
              Cancelar
            </Button>
            <PublicModeButton
              dataComponent="ShareDrawButton__confirm"
              label="Crear sorteo público"
              inputProps={{ color: 'primary' }}
            />
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

ShareDrawModal.propTypes = {};

export default withMobileDialog()(ShareDrawModal);
