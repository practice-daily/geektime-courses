function add1 (a, b) {
  let aLength = a.length;
  let bLength = b.length;
  let carry = 0;
  let result = '';

  while(--aLength >= 0 && --bLength >= 0) {
    result += (parseInt(a[aLength]) + parseInt(b[bLength]) + carry);
    if (result >= 10) {
      result = '' + (result - 10);
      carry = 1;
    } else {
      carry = 0;
    }
    console.log(result)
  }

  result += carry;

  return result;
}

// console.log(add1('1234', '2'));
// add1('56789', '123')

function add (a, b) {
  let i = a.length - 1;
  let j = b.length - 1;

  let carry = 0;
  let result = '';

  while (i >= 0 || j >= 0) {
    let x = 0;
    let y = 0;
    let sum;

    if (i >= 0) {
      x = a[i] - '0';
      i--;
    }
    if (j >= 0) {
      y = b[j] - '0';
      j--;
    }

    sum = x + y + carry;
    if (sum >= 10) {
      carry = 1;
      sum -= 10;
    } else {
      carry = 0;
    }

    result = sum + result;
  }

  if (carry) {
    result = carry + result;
  }

  return result;
}

console.log(add('999', '1'));
console.log(add('2', '999'));
console.log(add('123', '321'));
console.log(add('999999999999999999999999999999999999999999', '1'));
console.log('1000000000000000000000000000000000000000000'.length);

export default add
