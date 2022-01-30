import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';

import {v4 as uuidv4} from 'uuid'

import {
    Typography,
    Button,
    Radio,
    Container,
    TextField,
    RadioGroup,
    FormControlLabel,
    FormLabel,
    FormControl,
    Alert
} from '@mui/material';

import {
    KeyboardArrowRight
} from '@mui/icons-material';

import { collection, addDoc } from "firebase/firestore"; 

import { useAuth } from '../contexts/AuthContext';


export default function Create() {

    const [title,setTitle] = useState('');
    const [details,setDetails] = useState('');
    const [error,setError] = useState(false);
    const [err,setErr] = useState('')
    const [category,setCategory] = useState('todos');
    
    const {db} = useAuth()

    let navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        
        setError(false)

        if(title === '') {
            setError(true)
        }

        if(details === '') {
            setError(true)
        }

        if(title && details) {
            
            // fetch('http://localhost:8000/notes',{
            //     method:'POST',
            //     headers:{"Content-type":"application/json"},
            //     body: JSON.stringify({title,details,category})
            // }).then(()=>navigate('/'))

            addDoc(collection(db,"notes"),{
                title:title,
                details:details,
                category:category,
                id:uuidv4()
            }).then(()=>{
                navigate('/')
                console.log("Doc written ")
            }).catch((e)=>{
                setErr('Failed To Submit')
                console.error("Error adding doc",e)
            })
        }

        // try {
        //     const docRef = addDoc(collection(db, "users"), {
        //     first: "Ada",
        //     last: "Lovelace",
        //     born: 1815
        //     });
        //     console.log("Document written with ID: ", docRef.id);
        // } catch (e) {
        //     console.error("Error adding document: ", e);
        // }

    }
    
    return (
        <Container>
            <Typography 
                sx={{
                    textDecoration:'underline',
                    marginBottom:'20px'
                }}
                variant='h6'
                component='h2'
                color='textSecondary'
                gutterBottom
            >
                Create a New Note
            </Typography>
            {err && <Alert severity='error'>{err} </Alert>}

            <form onSubmit={handleSubmit}>
                <TextField
                    onChange={(e)=>setTitle(e.target.value)}
                    label='Note Title'
                    variant= 'outlined'
                    color='secondary'
                    error={error}
                    fullWidth
                    required
                    sx={{
                        marginTop:'20px',
                        marginBottom:'20px',
                        display:'block'
                    }}
                />

                <TextField
                    onChange={(e)=> setDetails(e.target.value)}
                    label='Details'
                    variant= 'outlined'
                    color='secondary'
                    fullWidth
                    error={error}
                    required
                    multiline
                    rows={4}
                    sx={{
                        marginTop:'20px',
                        marginBottom:'20px',
                        display:'block'
                    }}
                />

                <FormControl sx={{
                        marginTop:'20px',
                        marginBottom:'5px',
                        display:'block'
                    }}
                >
                    <FormLabel sx={{'&.Mui-focused':{color:'#666666'}}}> Note Category </FormLabel>

                    <RadioGroup 
                        value={category} 
                        onChange={(e)=> setCategory(e.target.value)}
                    >
                        <FormControlLabel value='money' control={<Radio color='secondary' />} label='Money' />
                        <FormControlLabel value='todos' control={<Radio color='secondary'/>} label='Todos' />
                        <FormControlLabel value='reminders' control={<Radio color='secondary'/>} label='Reminders' />
                        <FormControlLabel value='work' control={<Radio color='secondary' />} label='Work' />
                    </RadioGroup>

                </FormControl>


                <br/>
                <Button
                    // sx={{
                    //     fontSize:60,
                    //     backgroundColor:'violet',
                    //     '&:hover':{
                    //         backgroundColor:'blue'
                    //     }
                    // }} 
                    // onClick={()=>console.log('Clicked')}
                    type='submit'
                    color='secondary'
                    variant='contained'
                    // startIcon={<Send/>}
                    endIcon={<KeyboardArrowRight/>}
                > 
                    SUBMIT 
                </Button>
            </form>

            
        </Container>
    )
}
