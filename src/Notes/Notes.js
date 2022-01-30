import { Container, Grid } from '@mui/material';
import React, {useState,useEffect, useRef} from 'react';
import { 
    collection, 
    getDocs, 
    doc,
    query,
    where, 
    deleteDoc 
} from "firebase/firestore"; 

import NotesCard from '../components/NotesCard';
import { useAuth } from '../contexts/AuthContext';


export default function Notes () {
    const [notes,setNotes] = useState([])
    const {db} = useAuth()
    const isMounted = useRef(false);

    // useEffect(()=>{
    //     fetch('http://localhost:8000/notes')
    //         .then(res => res.json())
    //         .then(data => setNotes(data))
    // },[])

    const fetchData = () => {
        getDocs(collection(db, "notes"))
            .then((querySnapshot)=> {
                let notes_fire = []
                querySnapshot.forEach((doc)=>{
                    let data = doc.data()
                    notes_fire.push(data)
                    // console.log(data)
                })
                if(isMounted.current){
                    setNotes(notes_fire)
                }
                // console.log(notes_fire)
            })
            .catch((e)=>{
                isMounted.current && console.error(e)
            })
    }
    
    useEffect(()=>{
        isMounted.current = true;
        fetchData()
        return () => (isMounted.current = false);
    })


    // const handleDelete = async(id) => {
    //     await fetch('http://localhost:8000/notes/' + id,{
    //         method:'DELETE'
    //     })

    //     const newNotes = notes.filter(note => note.id !== id)
    //     setNotes(newNotes)
    // }

    const handleDelete = async (id) => {
        const notesRef = collection(db, "notes")
        const q = query(notesRef, where("id", "==", id));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((data) => {
            const id = data.id
            console.log(data.id)
            // deleteDoc(doc)
            deleteDoc(doc(db, "notes", id))
        });
        
    }

    return (
        <Container>
            <Grid container spacing={3}>
                {notes.map(note => (
                    <Grid item key={note.id} xs={12} md={6} lg={4}>
                        <NotesCard note={note} handleDelete={handleDelete} />
                    </Grid>

                ))}
            </Grid>

        </Container>
    )

}


