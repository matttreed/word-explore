import { useEffect, useState } from 'react';
import drawTrajectory from '../../d3/drawTrajectory';
import './Trajectory.css';

const Trajectory = (props) => {

    const {
        data
    } = props

    const [rerender, setRerender] = useState(0);
    
    return (
        <div className='Main-container'>
            <svg className='Trajectory-svg'>
                <path className="Trajectory"/>
            </svg>
        </div>
    )
}

export default Trajectory;