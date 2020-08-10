import React from 'react';

const spinner  = {
  borderRadius: '50%',
  width: '80px',
  height: '80px',
  margin: '80px auto',
  position: 'relative',
  transform: 'translateY(0)',
  animation: 'loading-spinner 4s infinite linear',
};

const center  = {
    display: 'flex',
    justifyContent: 'center',
};

export default class LoadingSpinner extends React.Component {
  render() {
    return (
      <div style={center}>
        <img src='https://freesvg.org/img/1586348910virus.png' className="loading-spinner" style={spinner} />
        <style>
        {`
        @keyframes loading-spinner {
          0% { transform : rotate(0deg); }
          100% { transform : rotate(360deg); }
        }
        `}
        </style>
      </div>
    );
  }
}
