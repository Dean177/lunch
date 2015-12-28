import './LoadingScreen.scss';
import React from 'react';

function LoadingScreen() {
  return (
    <div className='LoadingScreen'>
      <div className='screen-container'>
        <div className='hide left'/>
        <div className='hide right'/>
        <div className='hide bottom'/>
        <div className='circle-container'>
          <div className='circle'/>
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;
