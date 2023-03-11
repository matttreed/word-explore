import { useState } from 'react';
import './InputSection.css';

function InputSection(props) {
  const {poem, setInput} = props;
  return (
    <div className="Main-container">
      <div className="Vertical-container">
        <textarea 
          className='Text-input' 
          onChange={e => setInput(e.target.value)} 
          placeholder={"enter poem here"}
        ></textarea>
        <button 
          className='Save-button'
          onClick={() => {}}
        >
          Save
        </button>
        <p>{poem}</p>
      </div>
    </div>
  );
}

export default InputSection;