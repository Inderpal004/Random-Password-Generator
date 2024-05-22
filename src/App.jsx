import React, { useEffect, useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function App() {
  const [genPassword, setGenPassword] = useState('');
  const [specialAllowed, setSpecialAllowed] = useState(false);
  const [numbersAllowed, setNumbersAllowed] = useState(false);
  const [lowersAllowed, setLowersAllowed] = useState(false);
  const [passLength, setPassLength] = useState(6);
  const inputRef = useRef();

  const generatingPassword = () => {
    let password = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (specialAllowed) characters += '!@#$%^&*()_+[]{}|;:,.<>?';
    if (numbersAllowed) characters += '1234567890';
    if (lowersAllowed) characters += 'abcdefghijklmnopqrstuvwxyz';

    for (let i = 0; i < passLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      const randomChar = characters.charAt(randomIndex);
      password += randomChar;
    }

    setGenPassword(password);
  };

  useEffect(() => {
    generatingPassword();
  }, [specialAllowed, lowersAllowed, numbersAllowed, passLength]);


  const handleCopy = () => {
    if (inputRef.current) {
      inputRef.current.select();
      document.execCommand('copy');
      toast.success('Password copied to clipboard!');
    }
  };

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <div className='w-full h-screen p-8 bg-gray-100 flex flex-col items-center'>
        <h1 className='text-3xl font-bold text-center'>Password Generator</h1>

        <div className='sm:w-[60%] h-auto p-5 rounded shadow-lg bg-white m-6'>
          <div className='flex'>
            <input
              type='text'
              value={genPassword}
              className='flex-1 outline-none border border-gray-200 rounded-l p-2'
              readOnly ref={inputRef}
            />
            <button
              onClick={generatingPassword}
              className='p-2 border border-violet-500 bg-violet-500 text-white font-semibold rounded-r'
            >
              Generate Password
            </button>
          </div>

          <div className='grid grid-cols-2 gap-2 mt-4 items-center'>
            <div>
              <input
                type='checkbox'
                id='special'
                checked={specialAllowed}
                onChange={(e) => setSpecialAllowed(e.target.checked)}
              />
              <label htmlFor='special' className='ml-2'>Special Characters</label>
            </div>
            <div>
              <input
                type='checkbox'
                id='numbers'
                checked={numbersAllowed}
                onChange={(e) => setNumbersAllowed(e.target.checked)}
              />
              <label htmlFor='numbers' className='ml-2'>Number Characters</label>
            </div>
            <div>
              <input
                type='checkbox'
                id='lower'
                checked={lowersAllowed}
                onChange={(e) => setLowersAllowed(e.target.checked)}
              />
              <label htmlFor='lower' className='ml-2'>Lower Characters</label>
            </div>
            <div>
              <button onClick={handleCopy} className='px-2 py-1 bg-violet-500 text-white font-semibold rounded'>Copy to Clipboard</button>
            </div>
            <div className='col-span-2 mt-2'>
              <label htmlFor='range' className='mr-2'>Password Length: {passLength}</label>
              <input
                type='range'
                id='range'
                min={6}
                max={20}
                value={passLength}
                onChange={(e) => setPassLength(Number(e.target.value))}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
