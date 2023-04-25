let eng = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
let ENG = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getPrimeArray(limit) {
  let n = limit;
  let primesArray = [];

  nextPrime: for (let i = 2; i <= n; i++) {
    for (let j = 2; j < i; j++) {
      // проверить, делится ли число..
      if (i % j === 0) continue nextPrime; // не подходит, берём следующее
    }
    primesArray.push(i);
  }

  console.log("Массив простых чисел: ", primesArray);
  return primesArray;
}

function getRandomPrimeNumber() {
  //Генерируем массив рандомных простых чисел в диапазоне от 2 до 10
  let primesArray = getPrimeArray(10);
  // Получаем случайный индекс массива
  let randIndex = Math.floor(Math.random() * primesArray.length);

  return primesArray[randIndex];
}

function multiplyNumbers(firstNumber, secondNumber) {
  return firstNumber * secondNumber;
}

// Функция Эйлера
function eilerFunction(firstPrime, secondPrime) {
  let result = (firstPrime - 1) * (secondPrime - 1);
  return result;
}

//Функция, которая возвращает сравниваемое число, если числа взаимно простые
function coprime(a, b) {
  let testNumber = a;
  while (a !== 0 && b !== 0) {
    if (a > b) {
      a = a % b;
    } else {
      b = b % a;
    }
  }

  //Если НОД равен 1, то возвращаем сравниваемое число, а если не равен, то false
  if (a + b === 1) {
    return testNumber;
  } else {
    return false;
  }
}

//Функция вычисления открытой экспоненты
function generateE(limit) {
  let e = 0;
  let eilerNumber = limit;
  let primesArray = getPrimeArray(limit);
  console.log("Массив для поиска открытой экспоненты: ", primesArray);

  //Проходимся по всему массиву для поиска экспоненты и создаём новый массив с взаимно простыми числами
  let exponentialArray = [];
  for (let i = 0; i < primesArray.length; i++) {
    exponentialArray.push(coprime(primesArray[i], eilerNumber));
  }
  console.log("Массив чисел Е: ", exponentialArray);

  //Забираем первое число из массива, не равное false
  for (let i = 0; i < exponentialArray.length; i++) {
    if (exponentialArray[i] !== false) {
      e = exponentialArray[i];
      break;
    }
  }
  return e;
}

function generateKeys() {
  console.log(
    "%cГЕНЕРАЦИЯ КЛЮЧЕЙ НАЧИНАЕТСЯ______________________________",
    "background: green;"
  );
  //Генерируем два случайных простых числа
  let firstKeyNumber = getRandomPrimeNumber();
  let secondKeyNumber = getRandomPrimeNumber();
  firstKeyNumber = 3;
  secondKeyNumber = 11;
  console.log("Первое случайное простое число: ", firstKeyNumber);
  console.log("Второе случайное простое число: ", secondKeyNumber);

  //Вычисляем их произведение
  let multipleNumbers = multiplyNumbers(firstKeyNumber, secondKeyNumber);
  console.log("Произведение двух случайных чисел: ", multipleNumbers);

  //Вычисляем функцию Эйлера для произведения двух сгенерированных чисел
  let eilerNumber = eilerFunction(firstKeyNumber, secondKeyNumber);
  console.log("Число Эйлера: ", eilerNumber);

  if (eilerNumber <= 2) {
    console.log("Значение функции Эйлера не подходит!");
    return;
  }

  //Вычисляем открытую экспоненту, передаём туда число из функции эйлера, чтобы ограничить поиск
  let e = generateE(eilerNumber);
  // e = 7;
  console.log("Открытая экспонента: ", e);

  //Вычисляем число d, обратное e по модулю функции эйлера
  let d = 0;
  while ((d * e) % eilerNumber !== 1) {
    d++;
  }
  console.log("Секретная экспонента: ", d);

  //Записывает открытый и закрытый ключ попарно
  let openKey = {
    openExp: e,
    multiple: multipleNumbers,
  };

  let secretKey = {
    closeExp: d,
    multiple: multipleNumbers,
  };

  keys = { openKey, secretKey };

  console.log("Открытый ключ: ", openKey);
  console.log("Секретный ключ: ", secretKey);

  console.log(
    "%cГЕНЕРАЦИЯ КЛЮЧЕЙ ЗАКОНЧЕНА______________________________",
    "background: red;"
  );

  return keys;
}

function CreateKeySchema(str) {
  let keySchema = [];
  let keySchemaArray = [];
  //Записываем в схему текущие положения букв в алфавите + 2, чтобы не получать числа 0 и 1.

  for (let i = 0; i < str.length; i++) {
    for (let j = 0; j < ENG.length; j++) {
      if (str[i] === ENG[j]) {
        keySchema.push({
          [j + 2]: str[i],
        });
        keySchemaArray.push(j + 2);
      }
    }
  }
  console.log(
    "Начальная схема, отражающая положение букв в алфавите",
    keySchema
  );

  return keySchemaArray;
}

//Функция для подсчёта новых позиций символов при кодировании
function countEncryptPositions(keySchemaArray, keys) {
  let newKeySchemaArray = [];
  for (let i = 0; i < keySchemaArray.length; i++) {
    let number = keySchemaArray[i];
    //Пересчитываем позиции элементов
    if (number > keys.openKey.multiple) {
      console.log("КОДИРУЕМОЕ ЗНАЧЕНИЕ ПРЕВЫШАЕТ КЛЮЧ!!! ПОДБЕРИТЕ ДРУГИЕ ПРОСТЫЕ ЧИСЛА!!! -", number);
      return newKeySchemaArray = [false];
    }

    number = Math.pow(number, keys.openKey.openExp) % keys.openKey.multiple;
    //Если вдруг новая позиция выходит за пределы нашего алфавита, то мы начинает отсчёт сначала
    // if(number > ENG.length) {
    //   number = number % ENG.length;
    // }
    // if(number < 2) {
    //   number = ENG.length - number;
    // }
    // if(number < 0) {
    //   console.log("НОВАЯ ПОЗИЦИЯ ЭЛЕМЕНТА ОТРИЦАТЕЛЬНА!!! СКОРЕЕ ВСЕГО ОШИБКА В РАБОТЕ ФОРМУЛЫ!!!");
    //   return;
    // }
    console.log("Зашифрованная позиция в алфавите: ", number);

    //Обновляем схему новыми позициями
    newKeySchemaArray.push(number);
  }
  return newKeySchemaArray;
}

//Функция для декодирования схемы позиций в символы 
function decodingKeySchemaArray(keySchemaArray) {
  console.log("!!!!!!!!!",keySchemaArray)

  if(keySchemaArray.length === 0) {
    return;
  }

  let result = "";
  let count = 0;
  for(let i = 0; i < keySchemaArray.length; i++) {
    for(let j = 0; j < ENG.length; j++) {
      if((keySchemaArray[i] - 2) === count) {
        result += ENG[count];
        console.log("COUNT", count)
        console.log(ENG[count])
        console.log(result)
        break;
      }
      count ++;
    }
    count = 0;
  }

  return result;
}

let newKeySchemaArray = [];
let keys = {};

function encrypt(str) {
  let result = "";
  let keys = generateKeys();
  console.log(
    "%cШИФРАЦИЯ НАЧИНАЕТСЯ______________________________",
    "background: green;"
  );
  let keySchemaArray = CreateKeySchema(str);
  console.log("keySchemaArray: ", keySchemaArray);

  //Создаём новый массив который содержит уже новые позиции, то есть зашифрованные
  newKeySchemaArray = countEncryptPositions(keySchemaArray, keys);
  console.log("Обновлённая схема: ", newKeySchemaArray);

  //Осталось преобразовать эти позиции в символы и вывести в результат
  result = decodingKeySchemaArray(newKeySchemaArray);

  console.log(
    "%cШИФРАЦИЯ ЗАКОНЧЕНА______________________________",
    "background: red;"
  );

  console.log(
    "%cДЕШИФРАЦИЯ НАЧИНАЕТСЯ______________________________",
    "background: green;"
  );



  return result;
}

//Функция для подсчёта новых позиций символов при ДЕкодировании
function countDecryptPositions(keySchemaArray, keys) {
  let newKeySchemaArray = [];
  console.log("Зашифрованные позиции элементов: ", keySchemaArray)
  for (let i = 0; i < keySchemaArray.length; i++) {
    let number = keySchemaArray[i];
    //Пересчитываем позиции элементов

    number = Math.pow(number, keys.secretKey.closeExp) % keys.secretKey.multiple;
    //Если вдруг новая позиция выходит за пределы нашего алфавита, то мы начинает отсчёт сначала
    // if(number > ENG.length) {
    //   number = number % ENG.length;
    // }
    // if(number < 2) {
    //   number = ENG.length - number;
    // }
    // if(number < 0) {
    //   console.log("НОВАЯ ПОЗИЦИЯ ЭЛЕМЕНТА ОТРИЦАТЕЛЬНА!!! СКОРЕЕ ВСЕГО ОШИБКА В РАБОТЕ ФОРМУЛЫ!!!");
    //   return;
    // }
    console.log("Расшифрованная позиция в алфавите:: ", number);

    //Обновляем схему новыми позициями
    newKeySchemaArray.push(number);
  }
  return newKeySchemaArray;
}

function decrypt(KeySchemaArray, keys) {
  let result = "";
  newKeySchemaArray = countDecryptPositions(KeySchemaArray, keys);
  console.log("Обновлённая схема: ", newKeySchemaArray);

  //Осталось преобразовать эти позиции в символы и вывести в результат
  result = decodingKeySchemaArray(newKeySchemaArray);


  return result;
}

// Конец алгоритма дешифрования

function testEncrypt(text) {
  var pre = document.createElement("pre");
  pre.innerHTML = encrypt(text);
  document.body.appendChild(pre);
}

function testDecrypt(KeySchemaArray, keys) {
  var pre = document.createElement("pre");
  pre.innerHTML = decrypt(KeySchemaArray, keys);
  document.body.appendChild(pre);
}

let text = "CAT";

testEncrypt(text);
testDecrypt(newKeySchemaArray, keys);