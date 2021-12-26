import * as React from 'react';
import FormControl from '@mui/material/FormControl';

export default function ControlledOpenSelect() {
    const [age, setAge] = React.useState('');
    const [open, setOpen] = React.useState(false);

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <div>

            <FormControl sx={{ml: 2, mt: 2, minWidth: 120}}>

            </FormControl>
        </div>
    );
}
