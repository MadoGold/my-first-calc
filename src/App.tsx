import React, {useState} from 'react';

import Button from "./Components/Button";

import './App.scss'

const App: React.FC = () => {
  const [result, setResult]: any = useState();
  const [expr, setExpr] = useState('');
  const btnText: String[] = ['C', '√', '%', '/', '7', '8', '9', '×', '4', '5', '6', '-', '1', '2', '3', '+', '00', '0', ',', '=',];

    function toRPN(expression: String) {
      let current = '';
      let stack = [];
      let priority: number;

      for (let i = 0; i < expression.length; i++) {
        priority = getPriority(expression.charAt(i));

        if (priority === 0) {
          current += expression.charAt(i);
        }

        if (priority === 1) {
          stack.push(expression.charAt(i))
        }

        if (priority > 1) {
          current += ' ';
          while (stack.length > 0) {
            if(getPriority((stack.slice(-1)[0])) >= priority) {
              current += stack.pop()
            } else break;
          }
          stack.push(expression.charAt(i))
        }

        if (priority === -1) {
          current += ' ';
          while (getPriority(stack.slice(-1)[0]) !== 1) {
            current += stack.pop();
          }
          stack.pop();
        }
      }

      while (stack.length !== 0) {
        current += stack.pop();
      }
      return current;
    }

    function RPNToAnswer(rpn: String) {
      let operand = '';
      const stack: number[] = [];

      for (let i = 0; i < rpn.length; i++) {
        if (rpn.charAt(i) === ' ') continue

        if (getPriority(rpn.charAt(i)) === 0) {
          operand = '';

          while (rpn.charAt(i) !== ' ' && getPriority(rpn.charAt(i)) === 0) {
            operand += rpn.charAt(i++);

            if (i === rpn.length) break
          }

          stack.push(Number(operand));
        }

        if (getPriority(rpn.charAt(i)) > 1) {
          let a = stack.pop();
          let b = stack.pop();

          if (rpn.charAt(i) === '+' && a && b)stack.push(b + a);
          if (rpn.charAt(i) === '-' && a && b)stack.push(b - a);
          if (rpn.charAt(i) === '*' && a && b)stack.push(b * a);
          if (rpn.charAt(i) === '/' && a && b)stack.push(b / a);
        }
      }

      return stack.pop();
    }

    function getPriority(token: String) {
      if (token === '*' || token === '/') {
        return 3;
      } else if (token === '+' || token === '-') {
        return 2;
      } else if (token === '(') {
        return 1;
      } else if (token === ')') {
        return -1;
      } else return 0;
    }

    function getResult(expr: String) {
      setExpr(expr.split(' ').join(''));
      setResult(RPNToAnswer(toRPN(expr)))
    }

  return (
    <div className="wrapper">
      <div className="calc">
        <div className="calc__window">
          <input className="calc__input" value={expr} onChange={event => getResult(event.target.value)} type="text"/>
          <p className="calc__output">
            {result}
          </p>
          <div className="calc__buttons">
            {btnText.map(text => (
              <Button key={'key' + text} text={text}/>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
