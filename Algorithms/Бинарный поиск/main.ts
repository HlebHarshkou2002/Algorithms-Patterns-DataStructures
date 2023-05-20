const numbers: number[] = [2, 3, 5, 1, 7, 8, 9, 12];

//Бинарный поиск. Время выполнения - log(n)
function binarySearch(array: number[], searchNumber: number): number {
    let low: number = 0, high: number = array.length - 1;
    array.sort((a, b) => a - b)

    while(low <= high){
        let mid: number = (low + high) / 2;
        mid = Math.floor(mid);
        let guess: number = array[mid];

        console.log("Ищем...")

        if(guess === searchNumber) {
            console.log("Элемент найден!")
            return guess;
        }

        if(guess > searchNumber) {
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }

    return 0;
}

//Обычный перебор
console.log("___________________ОБЫЧНЫЙ ПЕРЕБОР ЭЛЕМЕНТОВ___________________")
for(let el of numbers) {
    console.log("Ищем...")
    if(el === 5) {
        console.log("Элемент найден!")
    }
}

console.log("___________________БИНАРНЫЙ ПОИСК___________________")

console.log("Найденный элемент: ", binarySearch(numbers, 2));