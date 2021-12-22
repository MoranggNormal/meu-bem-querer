import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SucessMessage({open}) {
 
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>

      <Snackbar open={open}>
        <Alert severity="success" sx={{ width: '100%' }}>
          O pedido foi levado para avaliação, você será redirecionado em alguns segundos...
        </Alert>
      </Snackbar>
    </Stack>
  );
}