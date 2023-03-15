import { useEffect, useState } from 'react';
import drawTrajectory from '../../d3/drawTrajectory';
import './InputSection.css';

function InputSection(props) {
  const {poem, setInput, VectorHandler, poemVectors, setPoemVectors} = props;

  const setVectors = () => {
    const v = [];
    poem.toLowerCase()
      .replace( /\n/g, " " )
      .split(" ")
      .filter(s => s.length > 0)
      .forEach(word => {
        const vec = VectorHandler.getVecForWord(word)
        v.push(vec)
      })
    setPoemVectors(v);
    drawTrajectory("Trajectory-svg", v);
  }

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
          onClick={setVectors}
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