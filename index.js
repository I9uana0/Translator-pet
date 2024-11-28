import { dictionary } from "./dictionary.js";

const translateInput = document.getElementById("translateInput");
const translateForm = document.getElementById("translateForm");
const translaterWrapper = document.getElementById("translaterWrapper");
const dictionaryInputOrig = document.getElementById("dictionaryInputOrig");
const dictionaryInputTranslate = document.getElementById("dictionaryInputTranslate");
const dictionaryForm = document.getElementById("dictionaryForm");
let createSpan = document.createElement('span')

// Переводчик
function search(arr, value) {
    if (!(arr instanceof Array)) return value == arr;
    return arr.some(item => search(item, value));
}

function toggleElVisibility(id) {
    id.style.display = errorMsg.style.display === 'block' ? 'none' : 'block';
}

function translate(word) {
    return dictionary.find((arr) => {
        return search(arr, word) ? arr : false
    }) || 'Слово не найдено';
}

// function translate(word) {
//     return dictionary.map((array) => {
//         return array.map((item) => {
//             if (search(array, word)) {
//                 console.log(item)
//                 return (item)
//             }
//         })
//     })
// }

// function translate(word) {
//     for (const array of dictionary) {
//         if (search(array, word)) {
//             const [original, translation] = array;  // Destructure the array
//             return { original, translation };  // Return as separate values in an object
//         }
//     }
//     return { original: word, translation: word };
// }

// function inDictionary(word) {
//     return translate(translateInput.value) == undefined ? 'Слово не найдено' : translateInput.value
// }

translateForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (translateInput.value.trim() == '') {
        errorMsg.style.display = "block";
    } else {
        errorMsg.style.display = "none";
        const translateResult = translate(translateInput.value);
        const resultSpan = translaterWrapper.appendChild(createSpan);
        resultSpan.classList.add('result-span')
        resultSpan.innerHTML = translateResult;
    }

    translateInput.value = '';
    translateInput.focus();
})
