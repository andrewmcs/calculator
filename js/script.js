function add(x, y) {
  try {
    if (isNaN(x) || isNaN(y)) throw "Can only operate on numerical values!."
    return x + y;
  }
  catch (err) {
    alert(err);
  }
}

function subtract(x, y) {
  try {
    if (isNaN(x) || isNaN(y)) throw "Can only operate on numerical values!."
    return x - y;
  }
  catch (err) {
    alert(err);
  }
}

function multiply(x, y) {
  try {
    if (isNaN(x) || isNaN(y)) throw "Can only operate on numerical values!."
    return x * y;
  }
  catch (err) {
    alert(err);
  }
}

function divide(x, y) {
  try {
    if (isNaN(x) || isNaN(y)) throw "Can only operate on numerical values!."
    if (y == 0) throw "Cannot divide by 0!";
    return x / y;
  }
  catch (err) {
    alert(err);
  }
}

function hasDecimal(text) {
  return text.includes(".");
}

function hasOperator(text) {
  console.log(text);
  return (text.includes("÷") || text.includes("x") || text.includes("+") || text.includes("-"));
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



window.onload = function () {
  // Need to know the current state (entering firstNum or secondNum)
  // Can check this by the state of operator.
  // if operator=='' then updating firstNum otherwise updating secondNum.
  let firstNum = ''
  let secondNum = '';
  let operator = '';

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
  document.querySelectorAll('.number').forEach(button => {
    button.addEventListener('click', event => {
      if (operator == '') {
        firstNum += button.textContent;
      }
      else {
        secondNum += button.textContent;
      }
      updateDisplay(sumDisplay);
    });
  });

  // if there is no decimal in the current number 
  //  if there is no zero at the start of the current number (firstNum or secondNum) add a zero and the decimal
  //  else just add the decimal
  // else do nothing
  function decimalUpdate(number, button) {
    if (!hasDecimal(number)) {
      if (number == '') {
        number += '0' + button.textContent;
      }
      else {
        number += button.textContent;
      }
    }
    return number;
  }

  // when the user enters a decimal
  // update firstNum or secondNum appropriately (see decimalUpdate function)
  // update the display
  document.querySelectorAll('#decimal').forEach(button => {
    button.addEventListener('click', event => {
      if (operator == '') {
        firstNum = decimalUpdate(firstNum, button);
      }
      else {
        secondNum = decimalUpdate(secondNum, button);
      }
      updateDisplay(sumDisplay);
    });
  });

  // when the user enters an operator 
  document.querySelectorAll('.operator').forEach(button => {
    button.addEventListener('click', event => {
      // if there is no operator just set operator to that
      if (operator == '') {
        operator = button.textContent;
      }
      else {
        // if there is an operator but no secondNum just update the operator
        if (secondNum == '') {
          operator = button.textContent;
        }
        else {
          // if there is a secondNum perform sum and update the operator.
          firstNum = operate(operator, firstNum, secondNum).toString();
          secondNum = '';
          operator = button.textContent;
        }
      }
      updateDisplay(sumDisplay);
    });
  });

  // when the user clicks on equals
  // if there is a firstNum, secondNum and operator perform the sum
  // update the display.
  document.querySelectorAll('#equals').forEach(button => {
    button.addEventListener('click', event => {
      if (firstNum != '' && secondNum != '' && operator != '') {
        firstNum = operate(operator, firstNum, secondNum).toString();
        secondNum = '';
        operator = '';
        updateDisplay(sumDisplay);
      }
    })
  });

  // when the user clicks clear reset all values to '' and update the display.
  document.querySelectorAll('#clear').forEach(button => {
    button.addEventListener('click', event => {
      firstNum = '';
      secondNum = '';
      operator = '';
      updateDisplay(sumDisplay);
    })
  });


  // if secondNum !='' remove last character from that
  // else if operator!='' set operator to ''
  // else remove last character from firstNum
  // then update the display
  document.querySelectorAll('#backspace').forEach(button => {
    button.addEventListener('click', event => {
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
    })
  });

}