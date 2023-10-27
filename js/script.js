
function hasDecimal(text) {
  return text.includes(".");
}

function hasOperator(text) {
  return (text.includes("÷") || text.includes("x") || text.includes("+") || text.includes("-"));
}

window.onload = function () {
  // Need to know the current state (entering firstNum or secondNum)
  // Can check this by the state of operator.
  // if operator=='' then updating firstNum otherwise updating secondNum.
  let firstNum = ''
  let secondNum = '';
  let operator = '';

  function clear() {
    firstNum = '';
    secondNum = '';
    operator = '';
    updateDisplay(sumDisplay);
  }

  function divide(x, y) {
    try {
      if (isNaN(x) || isNaN(y)) {
        clear();
        throw "Can only operate on numerical values!."
      }
      if (y == 0) {
        clear();
        throw "Cannot divide by 0!";
      }
      return x / y;
    }
    catch (err) {
      alert(err);
      return 0;
    }
  }

  function add(x, y) {
    try {
      if (isNaN(x) || isNaN(y)) {
        clear();
        throw "Can only operate on numerical values!."
      }
      return x + y;
    }
    catch (err) {
      alert(err);
      return 0;
    }
  }
  
  function subtract(x, y) {
    try {
      if (isNaN(x) || isNaN(y)) {
        clear();
        throw "Can only operate on numerical values!."
      }
      return x - y;
    }
    catch (err) {
      alert(err);
      return 0;
    }
  }
  
  function multiply(x, y) {
    try {
      if (isNaN(x) || isNaN(y)) {
        clear();
        throw "Can only operate on numerical values!."
      }
      return x * y;
    }
    catch (err) {
      alert(err);
      return 0;
    }
  }

  function operate(operator, x, y) {
    x = parseFloat(x);
    y = parseFloat(y);
    if (operator == '+') {
      return add(x, y);
    }
    else if (operator == '-') {
      return subtract(x, y);
    }
    else if (operator == 'x') {
      return multiply(x, y);
    }
    else if (operator == '÷') {
      return divide(x, y);
    }
    else {
      return "Invalid Operator";
    }
  }

  let sumDisplay = document.getElementsByClassName("sumDisplay")[0];

  // display shows firstNum + operator + secondNum or '0'
  function updateDisplay(display) {
    if (firstNum == '' && operator == '' && secondNum == '') {
      display.textContent = '0';
    }
    else {
      display.textContent = `${firstNum} ${operator} ${secondNum}`
    }
  }

  // when the user enters a number 
  // add it to the current number and update the current number (firstNum or secondNum)
  // update the display
  function addNumber(numberString) {
    if (operator == '') {
      firstNum += numberString;
    }
    else {
      secondNum += numberString;
    }
    updateDisplay(sumDisplay);
  }

  document.querySelectorAll('.number').forEach(button => {
    button.addEventListener('click', event => {
      addNumber(button.textContent);
    });
  });



  // if there is no decimal in the current number 
  //  if there is no zero at the start of the current number (firstNum or secondNum) add a zero and the decimal
  //  else just add the decimal
  // else do nothing
  function decimalUpdate(number, decimalText) {
    if (!hasDecimal(number)) {
      if (number == '') {
        number += '0' + decimalText;
      }
      else {
        number += decimalText;
      }
    }
    return number;
  }

  function addDecimal(decimalText) {
    if (operator == '') {
      firstNum = decimalUpdate(firstNum, decimalText);
    }
    else {
      secondNum = decimalUpdate(secondNum, decimalText);
    }
    updateDisplay(sumDisplay);
  }


  // when the user enters a decimal
  // update firstNum or secondNum appropriately (see decimalUpdate function)
  // update the display
  document.querySelectorAll('#decimal').forEach(button => {
    button.addEventListener('click', event => {
      addDecimal(button.textContent);
    });
  });

  function updateOperator(operatorString) {
    if (firstNum == '') {
      firstNum = '0'
    }
    // if there is no operator just set operator to that
    if (operator == '') {
      operator = operatorString;
    }
    else {
      // if there is an operator but no secondNum just update the operator
      if (secondNum == '') {
        operator = operatorString;
      }
      else {
        // if there is a secondNum perform sum and update the operator.
        firstNum = operate(operator, firstNum, secondNum).toString();
        secondNum = '';
        operator = operatorString;
      }
    }
    updateDisplay(sumDisplay);
  }

  // when the user enters an operator 
  document.querySelectorAll('.operator').forEach(button => {
    button.addEventListener('click', event => {
      updateOperator(button.textContent);
    });
  });


  function equals() {
    if (firstNum != '' && secondNum != '' && operator != '') {
      firstNum = operate(operator, firstNum, secondNum).toString();
      secondNum = '';
      operator = '';
      updateDisplay(sumDisplay);
    }
  }

  // when the user clicks on equals
  // if there is a firstNum, secondNum and operator perform the sum
  // update the display.
  document.querySelectorAll('#equals').forEach(button => {
    button.addEventListener('click', event => {
      equals();
    })
  });



  // when the user clicks clear reset all values to '' and update the display.
  document.querySelectorAll('#clear').forEach(button => {
    button.addEventListener('click', event => {
      clear();
    })
  });


  function backspace() {
    if (secondNum != '') {
      secondNum = secondNum.slice(0, -1);
    }
    else if (operator != '') {
      operator = operator.slice(0, -1);
    }
    else {
      firstNum = firstNum.slice(0, -1);
    }
    updateDisplay(sumDisplay);
  }

  // remove the last character of the sum
  document.querySelectorAll('#backspace').forEach(button => {
    button.addEventListener('click', event => {
      backspace();
    })
  });

  function convertOperator(operator) {
    if (operator == '+' || operator == '-') {
      return operator;
    }
    if (operator == '*') {
      return 'x';
    }
    if (operator == '/') {
      return '÷';
    }
  }

  window.addEventListener(
    "keydown",
    (event) => {
      if (event.key >= '0' && event.key <= '9') {
        addNumber(event.key);
      }
      if (event.key == '.') {
        addDecimal(event.key);
      }
      if (event.key == 'Enter') {
        // prevent the enter key from pressing the last button clicked.
        event.preventDefault();
        equals();
      }
      if (event.key == '+' || event.key == '-' || event.key == '*' || event.key == '/') {
        updateOperator(convertOperator(event.key));
      }
      if (event.key == 'Backspace') {
        backspace();
      }
    },
    true,
  );

}