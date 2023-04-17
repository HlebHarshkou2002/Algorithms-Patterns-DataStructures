function encrypt(str, key) {
  str = str.replace(/\s/g, "");

  var eng = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
  // Смещение
  let shift = key;
  let msg = str;
  console.log(msg);
  let total = "Результат :";
  let lang = "ENG";

  if (lang == "ENG") {
    for (let i of msg) {
      let place = eng.indexOf(i);
      console.log(i, "place=", place);
      // Прибавляем к старому значению положения наше смещение
      let new_place = place + shift;
      console.log("New place", new_place);
      if (eng.includes(i)) {
        // зацикливаем наш алфавит чтобы не выйти за пределы
        if(new_place < 0) {
          new_place = eng.length + new_place;
        } else if(new_place > eng.length) {
          new_place = (new_place - eng.length)
        }
        console.log("New place", new_place);
        total += eng[new_place];
      } else {
        total += 1;
      }
    }
  }
  console.log(total);

  let result = total;
  return result;
}

function decrypt(str, key) {

  var eng = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
  let shift = key;
  let msg = str;
  console.log(msg);
  let total = "Результат :";
  let lang = "ENG";

  if (lang == "ENG") {
    for (let i of msg) {
      let place = eng.indexOf(i);
      console.log(i, "place=", place);
      let new_place = place - shift;
      if (eng.includes(i)) {
        if(new_place < 0) {
          new_place = eng.length + new_place;
        } else if(new_place > eng.length) {
          new_place = (new_place - eng.length)
        }
        console.log("New place", new_place);

        total += eng[new_place];
      } else {
        total += 1;
      }
    }
  }
  console.log(total);

  let result = total;
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

testEncrypt("cryptographyanddatasecurity", 3);
testDecrypt("fubswrjudskbdqggdwdvhfxulwb", 3);
