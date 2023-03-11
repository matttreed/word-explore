import { useEffect, useState } from 'react';
import './InputSection.css';

function InputSection(props) {
  const {poem, setInput, getVecForWord} = props;
  const [poemVectors, setPoemVectors] = useState([]);

  useEffect(() => {
    const v = [];
    poem.split(" ").forEach(word => v.push(getVecForWord(word)))
    setPoemVectors(v);
  }, [poem])

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
        <p>{poemVectors}</p>
      </div>
    </div>
  );
}

export default InputSection;