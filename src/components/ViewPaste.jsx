import React from 'react'
import   { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';
const ViewPaste = () => {
  const {id} =useParams();

  const allPastes=useSelector((state)=>state.paste.pastes);

  const paste=allPastes.filter((p)=>p._id==id)[0];

  return (
    <div >
      <div className='flex flex-row gap-7 place-content-between '>
      <input type="text"
      className='bg-black rounded-2xl  mt-2 p-2 w-[60%] pl-5'
      placeholder='enter title here' 
      value={paste.title}
      disabled
      onChange={(e)=>settitle(e.target.value)}/>

      {/* <button className='bg-black rounded-2xl  mt-2 p-2' onClick={createPaste}>{
        pasteId? "update paste":"create my paste"
        }

      </button> */}
        </div>
      <div>
        <textarea 
        className='bg-black rounded-xl min-w-[500px] mt-4 p-3'
        value={paste.value}
        placeholder='enter text here'
        onChange={(e)=>setvalue(e.target.value)}
        rows={20}
        disabled
        />
      </div>
    </div>
  )
}

export default ViewPaste
