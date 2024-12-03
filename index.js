
const translateInput = document.getElementById("translateInput");
const translateForm = document.getElementById("translateForm");
const translaterWrapper = document.getElementById("translaterWrapper");
let createSpan = document.createElement('span')

/* function getJSONData() {
    fetch("./words.json")
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) =>
            console.log(data))
        .catch((error) =>
            console.error("Unable to fetch data:", error));
} */
/* function search(arr, value) {
    if (!(arr instanceof Array)) return value == arr;
    return arr.some(item => search(item, value));
} */
/* function translate(word) {
    return dictionary.map((array) => {
        return array.map((item) => {
            if (search(array, word)) {
                console.log(item)
                return (item)
            }
        })
    })
}

function translate(word) {
    for (const array of dictionary) {
        if (search(array, word)) {
            const [original, translation] = array;  // Destructure the array
            return { original, translation };  // Return as separate values in an object
        }
    }
    return { original: word, translation: word };
}

function inDictionary(word) {
    return translate(translateInput.value) == undefined ? 'Слово не найдено' : translateInput.value
} */

async function getJSONData() {
    try {
        const res = await fetch("./words.json");
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Unable to fetch data:", error);
    }
}

async function translate(word) {
    const dictionary = await getJSONData();
    const result = dictionary.find(item => {
        const enWords = item.en.split(',').map(w => w.trim());
        if (enWords.some(enWord => word.toLowerCase() === enWord.toLowerCase())) return true;
        
        const ruWords = item.ru.split(',').map(w => w.trim());
        return ruWords.some(ruWord =>
            word.toLowerCase() === ruWord.toLowerCase()
        );
    });

    if (!result) return 'Слово не найдено';
    
    // Если ввели русское слово - возвращаем все английские варианты
    if (result.ru.split(',').map(w => w.trim()).some(ruWord => 
        word.toLowerCase() === ruWord.toLowerCase()
    )) {
        return result.en;
    }
    // Если ввели английское слово - возвращаем русские варианты
    return result.ru;
}

console.log(await translate("fly"));
console.log(await translate("окно"));
console.log(await translate("FLY"));
console.log(await translate("notaword"));



translateForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (translateInput.value.trim() == '') {
        errorMsg.style.display = "block";
    } else {
        errorMsg.style.display = "none";
        const translateResult = await translate(translateInput.value);
        const resultSpan = translaterWrapper.appendChild(createSpan);
        resultSpan.classList.add('result-span')
        resultSpan.innerHTML = translateResult[0].toUpperCase() + translateResult.slice(1);
    }

    translateInput.value = '';
    translateInput.focus();
});