var numbers = [2, 3, 5, 1, 7, 8, 9, 12];
//Бинарный поиск. Время выполнения - log(n)
function binarySearch(array, searchNumber) {
    var low = 0, high = array.length - 1;
    array.sort(function (a, b) { return a - b; });
    while (low <= high) {
        var mid = (low + high) / 2;
        mid = Math.floor(mid);
        var guess = array[mid];
        console.log("Ищем...");
        if (guess === searchNumber) {
            console.log("Элемент найден!");
            return guess;
        }
        if (guess > searchNumber) {
            high = mid - 1;
        }
        else {
            low = mid + 1;
        }
    }
    return 0;
}
//Обычный перебор
console.log("___________________ОБЫЧНЫЙ ПЕРЕБОР ЭЛЕМЕНТОВ___________________");
for (var _i = 0, numbers_1 = numbers; _i < numbers_1.length; _i++) {
    var el = numbers_1[_i];
    console.log("Ищем...");
    if (el === 5) {
        console.log("Элемент найден!");
    }
}
console.log("___________________БИНАРНЫЙ ПОИСК___________________");
console.log("Найденный элемент: ", binarySearch(numbers, 2));
