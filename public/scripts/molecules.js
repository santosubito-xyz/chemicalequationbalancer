
export function parseMolecule(str) {
  var res = {};

  for (let i=0; i < str.length; i++) {
    let elem;
    if ((/[A-Z]/).test(str[i])) {
      if ((i != str.length - 1) && (/[a-z]/).test(str[i+1])) {
        i = addProp(res, 1, str, i);
      } else {
        i = addProp(res, 0, str, i);
      }
    }
  }

  return res;
}

function addProp(obj, x, str, i) {
  let elem = x == 1 ? str[i] + str[i+1] : str[i];
  let num = '';

  if ((/\d/).test(str[i+1+x])) {
      let m = 1;
    while ((/\d/).test(str[i + x + m])) {
      num += str[i + x + m];
      m++;
    }
    i += m + x - 1;
  } else {
    num = 1;
    i += x;
  }
   obj[elem] = parseInt(num);
  return i;
}



export function parseArray(arr) {
  let res = {};
  arr.forEach(mol => {
    let parsed_mol = parseMolecule(mol);

    Object.keys(parsed_mol).forEach(elem => {
      if (!res.hasOwnProperty(elem)) {
        res[elem] = parsed_mol[elem];
      } else {
        res[elem] += parsed_mol[elem];
      }
    });
  });
  return res;
}
