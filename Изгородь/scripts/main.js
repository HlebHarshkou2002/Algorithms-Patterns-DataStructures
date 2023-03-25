function encrypt(str, k) {
  let map = [];

  for (let i = 0; i < k; i++) {
    map[i] = [];
    for (let j = 0; j < str.length; j++) {
      map[i][j] = ".";
    }
  }

  let isBack = true;
  let row = 0;

  for (let j = 0; j < str.length; j++) {
    if (row == k - 1 || row == 0) {
      isBack = !isBack;
    }
    map[row][j] = str[j];
    if (isBack) {
      row--;
    } else {
      row++;
    }
  }

  let result = [];

  for (let i = 0; i < k; i++) {
    for (let j = 0; j < str.length; j++) {
      if (map[i][j] != ".") {
        result.push(map[i][j]);
      }
    }
  }

  return result.join("");
}

function decrypt(str, k) {
  let map = [];

  for (let i = 0; i < k; i++) {
    map[i] = [];
    for (let j = 0; j < str.length; j++) {
      map[i][j] = ".";
    }
  }

  let isBack = true;
  let row = 0;

  for (let j = 0; j < str.length; j++) {
    if (row == k - 1 || row == 0) {
      isBack = !isBack;
    }
    map[row][j] = "#";
    if (isBack) {
      row--;
    } else {
      row++;
    }
  }


  let counter = 0;

  for (let i = 0; i < k; i++) {
    for (let j = 0; j < str.length; j++) {
      if (map[i][j] == "#") {
        map[i][j] = str[counter];
        counter++;
      }
    }
  }

  isBack = true;
  row = 0;
  let result = [];

  for (let j = 0; j < str.length; j++) {
    if (row == k - 1 || row == 0) {
      isBack = !isBack;
    }
    result.push(map[row][j]);
    if (isBack) {
      row--;
    } else {
      row++;
    }
  }


  return result.join("");
}

function testEncrypt(text, rows) {
  var pre = document.createElement("pre");
  pre.innerHTML = encrypt(text, rows);
  document.body.appendChild(pre);
}

function testDecrypt(text, rows) {
  var pre = document.createElement("pre");
  pre.innerHTML = decrypt(text, rows);
  document.body.appendChild(pre);
}

testDecrypt("CTARPORPYYGH", 3); // CTARPORPYYGH
