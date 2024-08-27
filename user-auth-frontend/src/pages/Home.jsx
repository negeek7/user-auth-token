import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import AddNewTodo from '../modals/AddNewTodo';

function Home() {


  // Show user notes
  // User to add new notes
    
  const [addNewTodo, setAddNewTodo] = useState(false)


  return (
    <div className="m-10">
      <div className='h-28 w-28 border border-red-500 flex justify-center items-center cursor-pointer' onClick={() => setAddNewTodo(true)}> 
        +
      </div>

      {
        addNewTodo && createPortal(<AddNewTodo onClose={() => setAddNewTodo(false)}/>, document.body)
      }
    </div>
  )
}

export default Home