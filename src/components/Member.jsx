import { useEffect, useState } from "react"
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Axios from 'axios';
import Home from "./Home";
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { MdAccountCircle } from "react-icons/md";
import { useTheme } from "@emotion/react";

export const Member = () => {

    const [user, setUser] = useState([]);
    const [open, setOpen] = useState(false);
    const [state, setState] = useState({
        name: '',
        email: '',
        role: ''
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const getUser = () => {
        Axios.get('http://localhost:8080/members')
            .then((data) => {
                setUser(data.data);
                console.log(data.data);
            })
    };

    const postData = {
        name: state.name,
        email: state.email,
        role: state.role
    }

    const addUser = () => {
        Axios.post('http://localhost:8080/member', postData)
            .then((res) => {
                console.log(res);
            })
    }

    useEffect(() => {
        getUser()
    }, []);

    const handleValue = (e) => {
        const value = e.target.value;
        setState({ ...state, [e.target.name]: value })
    }

    const handleClose = () => {
        setOpen(false);
        addUser();
        window.location.reload();
    };

    const delUser = (id) => {
        Axios.delete(`http://localhost:8080/member/${id}`)
            .then((res) => {
                console.log(res);
                window.location.reload();
            })
    }

    return (
        <div>
            <Home />
            <h1>Members</h1>

            <Dialog open={open}>
                <DialogTitle>Add Member</DialogTitle>
                <DialogContent>
                    <TextField
                        name="name"
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={state.name}
                        onChange={handleValue}
                    />
                    <TextField
                        name="email"
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={state.email}
                        onChange={handleValue}
                    />
                    <TextField
                        name="role"
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Role"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={state.role}
                        onChange={handleValue}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Confirm</Button>
                </DialogActions>
            </Dialog>



            <Grid container alignItems='center' justifyContent="center" display='flex' gap={4} pb={10}>
                <Grid item display='flex' gap={2}>
                    <Button variant="contained" onClick={handleClickOpen}>Add Members</Button>
                </Grid>
                <Grid container flexDirection='row' gap={4} ml={20}>
                    {user.map((e, i) => (
                        <Grid key={i} item md={3} sm={12} xs={12} mr={3} borderRadius={3}
                            boxShadow={4} p={4} display='flex' flexDirection='column' gap={2} textAlign='left' sx={{ wordBreak: 'break-word' }}>
                            <Typography>
                                <b>Name:</b> {e.name}
                            </Typography>
                            <Typography>
                                <b> Email:</b> {e.email}
                            </Typography>
                            <Typography>
                                <b> Role:</b> {e.role}
                            </Typography>
                            <Button variant="contained" color="error" onClick={() => delUser(e._id)}>
                                <MdDelete />
                            </Button>
                        </Grid>
                    ))}
                </Grid>
            </Grid>

        </div>
    )
}