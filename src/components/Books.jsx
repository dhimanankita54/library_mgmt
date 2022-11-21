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
import { MdPushPin } from "react-icons/md";
import { MdMenuBook } from "react-icons/md";

export const Books = () => {

    const [book, setBook] = useState([]);
    const [open, setOpen] = useState(false);
    const [state, setState] = useState({
        title: '',
        author: '',
        status: 'Available'
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const postData = {
        title: state.title,
        author: state.author,
        status: state.status
    }

    const getData = () => {
        fetch('http://localhost:8080/books')
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setBook(data);
            })
    }

    const addBooks = () => {
        Axios.post('http://localhost:8080/books', postData, {
            headers: {
                Accept: '*'
            }
        }).then((d) => {
            console.log(d)
        })
    }

    const handleClose = () => {
        setOpen(false);
        addBooks();
        window.location.reload();
    };

    useEffect(() => {
        getData();
    }, []);

    const handleValue = (e) => {
        const value = e.target.value;
        setState({ ...state, [e.target.name]: value })
    }

    const delBook = (id) => {
        Axios.delete(`http://localhost:8080/books/${id}`, {
            headers: {
                Accept: '*'
            }
        }).then((del) => {
            console.log(del, "deleted");
            window.location.reload();
        })
    };

    const issueBook = (id) => {
        Axios.put(`http://localhost:8080/books/${id}/issue`, {
            headers: {
                Accept: "*"
            }
        }).then((res) => {
            console.log(res);
            window.location.reload();
        })
    }

    const returnBook = (id) => {
        Axios.put(`http://localhost:8080/books/${id}/return`, {
            headers: {
                Accept: "*"
            }
        }).then((res) => {
            console.log(res);
            window.location.reload();
        })
    }

    return (
        <div>
            <Home />
            <h1>Books</h1>
            <Dialog open={open}>
                <DialogTitle>Add Books</DialogTitle>
                <DialogContent>
                    <TextField
                        name="title"
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Book title"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={state.title}
                        onChange={handleValue}
                    />
                    <TextField
                        name="author"
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Book Author"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={state.author}
                        onChange={handleValue}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Add</Button>
                </DialogActions>
            </Dialog>

            <Grid container alignItems='center' justifyContent="center" display='flex' gap={4} pb={10}>
                <Grid item display='flex' gap={2}>
                    <Button variant="contained" onClick={handleClickOpen}>
                        Add Books
                    </Button>
                </Grid>
                <Grid container flexDirection='row' gap={4} ml={{ md: 10, sm: 0, xs: 0 }} p={{ sm: 5, xs: 5 }}>
                    {book.map((e, i) => (
                        <Grid key={i} item md={3.5} sm={12} xs={12} borderRadius={3}
                            boxShadow={4} p={4} display='flex' flexDirection='column' gap={2}>
                            <img style={{ height: '200px' }} src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=873&q=80" />
                            <Typography>
                                <b>Title:</b> {e.title}
                            </Typography>
                            <Typography>
                                <b>Author:</b> {e.author}
                            </Typography>
                            <Typography>
                                <b>Status:</b> {e.status}
                            </Typography>
                            <Grid display='flex' justifyContent='center' alignItems="center" gap={2}>
                                <Button variant="contained" onClick={() => delBook(e._id)}>
                                    <MdDelete />
                                </Button>
                                <Button variant="contained" color="error" onClick={() => issueBook(e._id)} >
                                    <MdPushPin />
                                </Button>
                                <Button variant="contained" color="success" onClick={() => returnBook(e._id)} >
                                    <MdMenuBook />
                                </Button>
                            </Grid>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </div>
    )
}