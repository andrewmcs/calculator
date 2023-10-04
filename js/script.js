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