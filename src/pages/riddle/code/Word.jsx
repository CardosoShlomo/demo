import React from 'react'

export default function Word({children}) {

  let color;

  switch (children) {
    case 'if':
    case 'else':
    case 'while':
    case 'break':
    case 'continue':
      color = 'orange';
      break;
    case 'is':
    case 'not':
    case '==':
    case '!=':
    case '>=':
    case '<=':
    case '>':
    case '<':
    case '=':
    case '+':
    case '-':
    case '*':
    case '+=':
    case '-=':
    case '*=':
      color = 'cornflowerblue';
      break;
    case 'go':
    case 'move':
    case 'up':
    case 'down':
    case 'left':
    case 'right':
    case 'back':
    case 'forward':
    case 'one':
    case 'zero':
    case 'border':
    case 'top':
    case 'bottom':
      color = 'darkseagreen';
  }

  return (
    <div style={{color: color}}>{children}</div>
  )
}
