var pos;

var OtherSymbols = [
  " ",
  ",",
  ".",
  ":",
  ";",
  "!",
  "?",
  "-",
  "_",
  "=",
  "+",
  "(",
  ")",
  "[",
  "]",
  "@",
  "`",
  "'",
  '"',
  "<",
  ">",
  "|",
  "/",
  "%",
  "$",
  "^",
  "&",
  "*",
  "~",
];
//var Numbers = ['0','1','2','3','4','5','6','7','8','9'];
var RusAlfUp = [
  "А",
  "Б",
  "В",
  "Г",
  "Д",
  "Е",
  "Ё",
  "Ж",
  "З",
  "И",
  "Й",
  "К",
  "Л",
  "М",
  "Н",
  "О",
  "П",
  "Р",
  "С",
  "Т",
  "У",
  "Ф",
  "Х",
  "Ц",
  "Ч",
  "Ш",
  "Щ",
  "Ъ",
  "Ы",
  "Ь",
  "Э",
  "Ю",
  "Я",
];
var RusAlfLower = [
  "а",
  "б",
  "в",
  "г",
  "д",
  "е",
  "ё",
  "ж",
  "з",
  "и",
  "й",
  "к",
  "л",
  "м",
  "н",
  "о",
  "п",
  "р",
  "с",
  "т",
  "у",
  "ф",
  "х",
  "ц",
  "ч",
  "ш",
  "щ",
  "ъ",
  "ы",
  "ь",
  "э",
  "ю",
  "я",
];
//var EngAlfUp = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
//var EngAlfLower = ['a','b','c','d','e','f','g','h','i','j','k','l','m','m','o','p','q','r','s','t','u','v','w','x','y','z'];
var RusAlfUpEncrypt = Array(33);
var RusAlfLowerEncrypt = Array(33);
var RusAlfUpDecrypt = Array(33);
var RusAlfLowerDecrypt = Array(33);

// функция генерации второго числа
function generateNumbers(n, x) {
  let y = 1;
  let itertion = 0;
  console.log(NOD(n, x));
  // подбираем числа пока они не будут соответствовать условиям
  while ((check(n, x, y) && NOD(n, x) == 1) == false) {
    y++;
    itertion++;
    if (itertion == 600) return false;
  }

  return [x, y];
}
// проверяем условие первое
function check(n, x, y) {
  return (x * y) % n == 1;
}

// проверяем второе условие
function NOD(n, k) {
  if (k > n) return NOD(k, n);
  if (!k) return n;
  return Number(NOD(k, n % k));
}

// Подстраиваем алфавит под ключи для зашифровки
function initEncrypt(UserStep, n) {
  RusAlfUpEncrypt = CezarEncrypt(UserStep, n, RusAlfUp);
  RusAlfLowerEncrypt = CezarEncrypt(UserStep, n, RusAlfLower);
}

// Подстраиваем алфавит под ключи для расшифровки
function initDecrypt(UserStep, n) {
  RusAlfUpDecrypt = CezarDecrypt(UserStep, n, RusAlfUp);
  RusAlfLowerDecrypt = CezarDecrypt(UserStep, n, RusAlfLower);
}

function CezarEncrypt(step, n, newArrMass) {
  let newArr = Array(n);
  console.log(newArrMass);

  // собственно видоизменяем массив алфавита в соответствии с формулой из методы
  for (let i = 0; i < newArrMass.length; i++) {
    newArr[i] = newArrMass[(i * step) % n];
  }
  console.log(newArr);
  // let arrBuff = newArr.slice(32);
  // newArr = [arrBuff, ...newArr].flat();
  // newArr.pop();
  // console.log(newArr);

  return newArr;
}

function CezarDecrypt(step, n, newArrMass) {
  let newArr = Array(n);
  for (let i = 0; i < newArrMass.length; i++) {
    // собственно видоизменяем массив алфавита в соответствии с формулой из методы
    newArr[i] = newArrMass[(((i) * step) % n)];
  }
  return newArr;
}

// функция которая ищет символы с новой позицией
function contains(symb, arr) {
  let letter = symb;
  pos = 0;
  for (let i = 0; i < arr.length; i++) {
    if (letter === arr[i]) {
      pos = i;
      console.log(pos)
      return true;
    }
  }
}

// Функция шифрования
function encrypt(text, x) {
  let result = "";
  let n = 33;
  x = Number(x);
  // Генерируем второе число, принимает количество букв в алфавите и числовой ключ. Возвращает второй ключ
  let numbers = generateNumbers(n, x);
  console.log(numbers);
  if (numbers == false) {
    alert("Попробуйте ещё раз...");
  } else {
    // меняем представление об алфавите
    initEncrypt(x, n);
    for (let item of text) {
      // проверяем и записываем новые позиции элементов в алфавите
      if (contains(item, OtherSymbols)) {
        result += item;
      }
      if (contains(item, RusAlfUp)) {
        item = RusAlfUpEncrypt[pos];
        result += item;
      }
      if (contains(item, RusAlfLower)) {
        item = RusAlfLowerEncrypt[pos];
        result += item;
      }
    }
  }
  return result;
}

function decrypt(text, x) {
  let result = "";
  let n = 33;
  x = Number(x);
  let numbers = generateNumbers(n, x);
  if (numbers == false) {
    alert("Попробуйте ещё раз...");
  } else {
    initDecrypt(numbers[1], n);
    for (let item of text) {
      if (contains(item, OtherSymbols)) {
        result += item;
      }
      if (contains(item, RusAlfUpEncrypt)) {
        item = RusAlfUp[pos];
        result += item;
      }
      if (contains(item, RusAlfLowerEncrypt)) {
        item = RusAlfLower[pos];
        result += item;
      }
    }
  }
  return result;
}

function testEncrypt(text, key) {
  var pre = document.createElement("pre");
  pre.innerHTML = encrypt(text, key);
  document.body.appendChild(pre);
}

function testDecrypt(text, key) {
  var pre = document.createElement("pre");
  pre.innerHTML = decrypt(text, key);
  document.body.appendChild(pre);
}

testEncrypt("привет", 8);
testDecrypt("ьдёпжу", 8);

console.log("Номер", (16 * 4) % 33)
