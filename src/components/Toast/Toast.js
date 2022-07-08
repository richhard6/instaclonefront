import React from 'react';

import Snackbar from '@mui/material/Snackbar';

import MuiAlert from '@mui/material/Alert';

import { useToast } from '../../context/ToastContext';
import { Slide } from '@mui/material';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

function Toast() {
  const { message, severity, toast, setToast } = useToast();

  const handleClose = () => {
    setToast(false);
  };

  return (
    <Snackbar
      TransitionComponent={SlideTransition}
      open={toast}
      onClose={handleClose}
      autoHideDuration={2000}
      key={SlideTransition.name}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default Toast;
