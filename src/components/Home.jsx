import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';
import { ClipboardCopy } from 'lucide-react';
import toast from 'react-hot-toast';

const Home = () => {
  const [title, settitle] = useState('');
  const [value, setvalue] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [valueError, setValueError] = useState(false);
  const titleRef = useRef(null);
  const valueRef = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get('pasteId');
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      if (paste) {
        settitle(paste.title);
        setvalue(paste.value);
      }
    }
  }, [pasteId]);

  function createPaste() {
    let hasError = false;
    if (title.trim() === '') {
      setTitleError(true);
      titleRef.current?.focus();
      hasError = true;
    } else {
      setTitleError(false);
    }

    if (value.trim() === '') {
      setValueError(true);
      if (!hasError) valueRef.current?.focus();
      hasError = true;
    } else {
      setValueError(false);
    }

    if (hasError) {
      toast.error('Both title and content are required!');
      return;
    }

    const paste = {
      title,
      value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updateToPastes(paste));
      
    } else {
      dispatch(addToPastes(paste));
     
    }

    settitle('');
    setvalue('');
    setSearchParams({});
  }

  function handleCopy() {
    navigator.clipboard.writeText(value);
    toast.success('Text copied to clipboard!');
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className='flex flex-row gap-6 items-center mb-6'>
        <input
          type="text"
          ref={titleRef}
          className={`bg-black text-white rounded-2xl px-5 py-2 w-full transition-all duration-300 ${
            titleError ? 'border-2 border-red-500 shake' : ''
          }`}
          placeholder='Enter title here...'
          value={title}
          onChange={(e) => settitle(e.target.value)}
        />

        <button
          className='bg-black text-white rounded-2xl px-5 py-2 hover:bg-gray-800 transition-all whitespace-nowrap'
          onClick={createPaste}
        >
          {pasteId ? 'Update Note' : 'Create My Note'}
        </button>
      </div>

      <div className='border border-gray-600 rounded-xl overflow-hidden bg-gray-900 text-white'>
        <div className='bg-gray-500 flex justify-between items-center px-4 py-2'>
          <div className='flex gap-2'>
            <span className='w-3 h-3 bg-red-500 rounded-full'></span>
            <span className='w-3 h-3 bg-yellow-400 rounded-full'></span>
            <span className='w-3 h-3 bg-blue-500 rounded-full'></span>
          </div>

          <button onClick={handleCopy} title="Copy to clipboard">
            <ClipboardCopy className='w-5 h-5 text-gray-700 hover:text-black cursor-pointer' />
          </button>
        </div>

        <textarea
          ref={valueRef}
          className={`bg-black text-white w-full p-4 text-sm font-mono resize-none rounded-b-xl transition-all duration-300 ${
            valueError ? 'border-2 border-red-500 shake' : ''
          }`}
          value={value}
          placeholder='Enter your code or text here...'
          onChange={(e) => setvalue(e.target.value)}
          rows={20}
        />
      </div>
    </div>
  );
};

export default Home;
