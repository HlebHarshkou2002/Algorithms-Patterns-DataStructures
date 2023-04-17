// Переменная указывающая на количество отверстий
const maxKeyId = 7;

// Ключ-матрица для шифрования, решётка
const key = [
  [1, null, null, null],
  [null, null, null, 2],
  [null, null, 4, null],
  [null, 3, null, null],
];

let currentIdx = 0;
let currentKeyIdx = 1;
let schema = [];

function FillFullMatrix() {
  let matrix = [];

  for (let i = 0; i < key.length; i++) {
    matrix.push([]);
    for (let j = 0; j < key[i].length; j++) {
      matrix[i].push(null);
    }
  }

  return matrix;
}

// let encrypt_matrix = FillFullMatrix();
// let decrypt_matrix = FillFullMatrix();
let decrypt_result = "";

// Функция заполнения матрицы значениями из фразы
function FillStepMatrix(arr, phrase) {
  // Переменная для выявления нужного числа в матрице
  currentKeyIdx = 1;

  // Проходим пока не найдём все совпадения
  for (let i = 0; i < key.length; i++) {
    for (let n = 0; n < key.length; n++) {
      for (let j = 0; j < key[n].length; j++) {
        if (currentKeyIdx == key[n][j]) {
          if (
            currentKeyIdx == maxKeyId &&
            arr[Math.floor(key.length / 2)][Math.floor(key[n].length / 2)] !=
              null &&
            n > 0
          ) {
            break;
          }
          arr[n][j] = phrase[currentIdx];
          // console.log("БУКВА ДЛЯ ВСТАВКИ", phrase[currentIdx])
          // console.log("ФРАЗА ДЛЯ ШИФРОВАНИЯ", phrase)
          // Если нашли место и вставили туда букву увеличиваем индекс ключа и слова
          currentIdx++;
          currentKeyIdx++;
        }
      }
    }
  }
  return arr;
};

// Функция переворота матрицы
const RotateMatrix = (arr) => {
  let result = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    for (let j = 0; j < arr[i].length; j++) {
      if (!result[j]) {
        result[j] = [];
      }
      result[j].push(arr[i][j]);
    }
  }
  return result;
};

// функция расшифровки нашей таблицы, считывает так же как и записывали
const OutStepMatrix = (arr) => {
  currentKeyIdx = 1;
  for (let i = 0; i < key.length; i++) {
    for (let n = 0; n < key.length; n++) {
      for (let j = 0; j < key[n].length; j++) {
        if (currentKeyIdx == key[n][j]) {
          decrypt_result += arr[n][j];
          arr[n][j];
          currentIdx++;
          currentKeyIdx++;
        }
      }
    }
  }
  return arr;
};

const encrypt = (phrase) => {
  let cube = key.length * key.length;

  if (phrase.length > key.length * key.length) {
    let countBlock = 0;
    let block = "";

    let iterations = phrase.length / (key.length * key.length);
    iterations = Math.ceil(iterations);
    // console.log(iterations);

    for (let i = 0; i < iterations; i++) {
      block = "";
      for (let j = 0; j < key.length * key.length; j++) {
        if (phrase[countBlock] == null || phrase[countBlock] == undefined) {
          phrase += "#";
        }
        block += phrase[countBlock];
        countBlock++;
        // console.log("countBlock", countBlock)
      }
      encrypt(block);
      console.log("БЛОК: ", block);
    }
  } else if (phrase.length < key.length * key.length) {
    let t = key.length * key.length;
    for (let i = 0; i < t; i++) {
      if (phrase[i] == null || phrase[i] == undefined) {
        phrase += "#";
      }
    }
    console.log("ДЛИНА БЛОКА",phrase.length);
  }

  if (phrase.length === key.length * key.length) {
    console.log("ШИФРОВАНИЕ")

    let encrypt_matrix = FillFullMatrix();

    // Индекс вставки правильного символа
    currentIdx = 0;

    // АЛГОРИТМ ШИФРОВАНИЯ С ПОВОРОТОМ
    for (let i = 0; i < key.length; i++) {
      
      encrypt_matrix = FillStepMatrix(encrypt_matrix, phrase);
      console.log(encrypt_matrix);
      encrypt_matrix = RotateMatrix(encrypt_matrix);
    }

    // Заполняем схему матрицами
    schema.push(encrypt_matrix);
    console.log("SCHEMA ", schema);

    // console.log("Окончательный вид", encrypt_matrix);
    // console.log(`Окончательная строка: ${encrypt_matrix.join().replace(/[,]/g, "")}`);
  }


  // ДОСТАЁМ ВСЕ СИМВОЛЫ В РЕЗУЛЬТИРУЮЩУЮ СТРОКУ
  let result = "";

  for(let i = 0; i < schema.length; i++) {
    for(let j = 0; j < schema[i].length; j++) {
      for(let n = 0; n < schema[i][j].length; n++){
        result += schema[i][j][n];
        console.log(schema[i][j][n])
      }
    }
  }
  // return encrypt_matrix.join().replace(/[,]/g, "");
  console.log(result)
  return result.replace(/[#]/g, "");
};

const decrypt = () => {
  console.log("ДЕШИФРОВКА");
  currentIdx = 0;
  currentKeyIdx = 1;

  // Как в методе расшифровка из таблицы

  for(let j = 0; j < schema.length; j++) {
    for (let i = 0; i < 4; i++) {
      schema[j] = OutStepMatrix(schema[j]);
      console.log(schema[j]);
      schema[j] = RotateMatrix(schema[j]);
    }
  }



  console.log(decrypt_result);
  return decrypt_result.replace(/[#]/g, "");
};

function testEncrypt(phrase) {
  var pre = document.createElement("pre");
  pre.innerHTML = encrypt(phrase);
  document.body.appendChild(pre);
}

function testDecrypt() {
  var pre = document.createElement("pre");
  pre.innerHTML = decrypt();
  document.body.appendChild(pre);
}

testEncrypt("Я_ЕДУ_НА_КАМЧАТКУ_И_НАДОЛГО_ПОЭТОМУ_МЕНЯ_НЕ_ЖДИТЕ");
testDecrypt();
