import React, {useEffect, useState} from 'react'
// import notes from '../assets/data'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { ReactComponent as ArrowLeft} from '../assets/arrow-left.svg'

const NotePage = () => {
    // console.log("props:", props);
    // console.log("props", props.match.id)
    // let noteId = match.params.id
    const {id} = useParams();
    // const note = notes.find(note => note.id===Number(id))
    // console.log("props:", id);
    let [note, setNote] = useState(null) 
    const navigate = useNavigate()
    // const history = useHistory()

    useEffect(() => {
        getNote()
    }, [id])

    let getNote = async () => {
        let response = await fetch(`http://localhost:5000/notes/${id}`)
        let data = await response.json()
        setNote(data)
    }

    let updateNote = async () => {
        await fetch(`http://localhost:5000/notes/${id}`, {
            method:'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...note, 'updated': new Date()})
        })
    }

    let handleSubmit = () => {
        if (id !=='new' && !note.body){
            deleteNote()
        }else if(id!== 'new'){
            updateNote()
        }else if(id === 'new' && note !== null){
            createNote()
        }
        // history.push('/')
        navigate('/')

    }

    let deleteNote = async () => {
        await fetch(`http://localhost:5000/notes/${id}`, {
            method:'DELETE',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({note})
        })
        // return <Navigate to='/'/>
        // history.push('/')
        navigate('/')
    }

    let createNote = async () => {
        await fetch(`http://localhost:5000/notes/`, {
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...note, 'updated': new Date()})
        })
    }


    return (
        <div className='note'>
            <div className='note-header'>
                <h3>
                    <Link to='/'><ArrowLeft onClick={handleSubmit}/></Link>
                </h3>
                {id !== 'new' ? (
                    <button onClick={deleteNote}>Delete</button>
                ): (
                    <button onClick={handleSubmit}>Done</button>
                )}
            </div>
            {/* <p>{note.body}</p> */}
            <textarea onChange={(e) => {setNote({...note, 'body':e.target.value})}} value={note?.body}></textarea>
        </div>
    )
}

export default NotePage