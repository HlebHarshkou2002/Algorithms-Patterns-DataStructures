function encrypt(str, key) {
  let keySchema = [];

  // Пронумеруем символы в алфавитном порядке не учитывая повторяющиеся
  let count;
  for (let i = 0; i < key.length; i++) {
    count = 1;

    for (let j = 0; j < key.length; j++) {
      if (key[i] <= key[j]) {
        keySchema[i] = {
          letter: key[i],
          id: count,
          checked: false,
        };
      } else if (key[i] > key[j]) {
        count++;
        keySchema[i] = {
          letter: key[i],
          id: count,
          checked: false,
        };
      }
    }
  }

  // Проверим и пронумеруем повторяющиеся символы
  for (let i = 0; i < key.length; i++) {
    count = keySchema[i].id - 1;

    for (let j = 0; j < key.length; j++) {
      if (key[i] === key[j] && !keySchema[i].checked) {
        count++;
        keySchema[j] = {
          letter: key[j],
          id: count,
          checked: true,
        };
      }
    }
  }

  // Инициализируем фрагменты строк
  for (let i = 0; i < key.length; i++) {
    keySchema[i].fragment = "";
  }

  // Поделим строку, которую нужно зашифровать, на фрагменты текста с периодом слова шифрования
  let fragmentIndex = 0;
  let startPosition = 0;

  for (let i = 0; i < str.length; i++) {
    if (fragmentIndex < key.length) {
      keySchema[fragmentIndex].fragment += str[startPosition];
      // console.log("Буква в запись", str[startPosition])

      startPosition++;
      fragmentIndex++;
    } else {
      i--; //Нужно вернуться назад, потому что индекс обнулился, а итерация прошла
      fragmentIndex = 0;
    }
    // console.log("индекс фрагмента", fragmentIndex)
    // console.log("Позиция старта ", startPosition)
    // console.log(startPosition)
  }

  // По порядку достаём символы из фрагментов
  keySchema.sort((a, b) => (a.id > b.id ? 1 : -1)); //Отсортируем по id

  let result = [];
  count = 0;
  for (let j = 0; j <= keySchema[0].fragment.length; j++) {
    for (let i = 0; i < keySchema.length; i++) {
      if (count < keySchema[i].fragment.length) {
        result += keySchema[i].fragment[count];
      }
    }
    count++;
  }

  // for(let i = 0; i < keySchema.length; i++) {
  //   result += keySchema[i].fragment;
  // }
  // console.log(result.length)
  // console.log(str.length)

  console.log(keySchema);
  console.log(result);
  console.log(result.length);

  return result;
}

function decrypt(str, key) {
  let keySchema = [];

  // Пронумеруем символы в алфавитном порядке не учитывая повторяющиеся
  let count;
  for (let i = 0; i < key.length; i++) {
    count = 1;

    for (let j = 0; j < key.length; j++) {
      if (key[i] <= key[j]) {
        keySchema[i] = {
          letter: key[i],
          id: count,
          checked: false,
        };
      } else if (key[i] > key[j]) {
        count++;
        keySchema[i] = {
          letter: key[i],
          id: count,
          checked: false,
        };
      }
    }
  }

  // Проверим и пронумеруем повторяющиеся символы
  for (let i = 0; i < key.length; i++) {
    count = keySchema[i].id - 1;

    for (let j = 0; j < key.length; j++) {
      if (key[i] === key[j] && !keySchema[i].checked) {
        count++;
        keySchema[j] = {
          letter: key[j],
          id: count,
          checked: true,
        };
      }
    }
  }

  let keySchemaDuplicate = [];
  Object.assign(keySchemaDuplicate, keySchema); //Сделаем отдельную копию схемы ключей, но фрагменты всё так же ссылаются на один блок памяти и будут заполнены
  keySchema.sort((a, b) => (a.id > b.id ? 1 : -1)); //Отсортируем по id

  // Инициализируем фрагменты строк
  for (let i = 0; i < key.length; i++) {
    keySchema[i].fragment = "";
  }

  // Поделим строку, которую нужно зашифровать, на фрагменты текста с периодом слова шифрования
  let fragmentIndex = 0;
  let startPosition = 0;

  for (let i = 0; i < str.length; i++) {
    if (fragmentIndex < key.length) {
      keySchema[fragmentIndex].fragment += str[startPosition];
      // console.log("Буква в запись", str[startPosition])

      startPosition++;
      fragmentIndex++;
    } else {
      i--; //Нужно вернуться назад, потому что индекс обнулился, а итерация прошла
      fragmentIndex = 0;
    }
    // console.log("индекс фрагмента", fragmentIndex)
    // console.log("Позиция старта ", startPosition)
    // console.log(startPosition)
  }



  // По порядку достаём символы из фрагментов

  let result = [];
  count = 0;
  for (let j = 0; j <= keySchemaDuplicate[0].fragment.length; j++) {
    for (let i = 0; i < keySchemaDuplicate.length; i++) {
      if (count < keySchemaDuplicate[i].fragment.length) {
        result += keySchemaDuplicate[i].fragment[count];
      }
    }
    count++;
  }

  // for(let i = 0; i < keySchema.length; i++) {
  //   result += keySchema[i].fragment;
  // }
  // console.log(result.length)
  // console.log(str.length)

  console.log("keySchema", keySchema);
  console.log("keySchemaDuplicate", keySchemaDuplicate);
  console.log(result);
  console.log(result.length);

  return result;
}

// Конец алгоритма дешифрования

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

// testEncrypt("Я_ЛЮБЛЮ_ТЕБЯ____", "ВЕРОНИКА"); 
testDecrypt("_Я_ЛЮБЮЛ_ТЕ___ЯБ", "ВЕРОНИКА"); 
