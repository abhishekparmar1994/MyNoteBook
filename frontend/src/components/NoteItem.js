import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash,faEdit } from '@fortawesome/free-solid-svg-icons'; // Updated icon import

const NoteItem = (props) => {
    const { note, onDelete,OnEdit } = props; // Added onDelete prop

  return (
    <div className='col-md-3'>
        <div className="card my-3">
            <div className="card-body">
                <h5 className="card-title">
                    {note.title}
                    
                </h5>
                <p className="card-text">{note.content}</p>
                <FontAwesomeIcon 
                        icon={faTrash} // Updated icon usage
                        className="mx-2 text-danger" 
                        onClick={() => onDelete(note.id)} // Added click handler
                    />
                <FontAwesomeIcon 
                    icon={faEdit} // Updated icon usage
                    className="mx-2 text-primary" 
                    onClick={() => OnEdit(note.id)} // Added click handler
                />
            </div>
        </div>
    </div>
  )
}

export default NoteItem
