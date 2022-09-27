import React from 'react';

type TProps = {
  text: String;
}


const Button:React.FC<TProps> = ({ text }) => {


  return (
    <button className="calc__button">{text}</button>
  );
};

export default Button;
