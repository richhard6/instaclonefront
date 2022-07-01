import React from 'react';
import './styles.css';

const Button = ({ name, size, onClick }) => {
  return (
    <button className="btn" onClick={onClick}>
      {name}
    </button>
  );
};

export default Button;
