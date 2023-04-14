const addButton = document.querySelector("#add")
const deleteButton = document.querySelector("#delete")
const parent = document.querySelector("#main")
const count = document.querySelector("#count")
let inputs

const sum = () => {
    let count = 0
    for (let i = 0; i < inputs.length; i++) {
        if(parseInt(inputs[i].value))
            count+= parseInt(inputs[i].value);
    }
    const text = document.querySelector('#resultsOfSum')
    text.textContent = `Suma: ${count}`
}

const average = () => {
    let sum = 0
    let count = 0
    for (let i = 0; i < inputs.length; i++) {
        if(parseInt(inputs[i].value)){
            sum += parseInt(inputs[i].value);
            count +=1
        }
    }
    const avg = sum / count
    const text = document.querySelector('#resultsOfDifference')
    text.textContent = `Średnia: ${avg}`
}

const minimal = () => {
    let arr = []
    for (let i = 0; i < inputs.length; i++) {
        if(parseInt(inputs[i].value))
            arr.push(parseInt(inputs[i].value))
    }
    const text = document.querySelector('#resultsMinimal')
    text.textContent = `Minimum: ${Math.min(...arr)}`
}

const maximal = () => {
    let arr = []
    for (let i = 0; i < inputs.length; i++) {
        if(parseInt(inputs[i].value))
            arr.push(parseInt(inputs[i].value))
    }
    const text = document.querySelector('#resultsMaximal')
    text.textContent = `Maksimum: ${Math.max(...arr)}`
}

const calc = () => {
    sum()
    average()
    minimal()
    maximal()

}

addButton.addEventListener('click', () => {
    const input = document.createElement("input")
    input.setAttribute('type', 'text');
    parent.appendChild(input)
    input.addEventListener('input', calc)
    inputs = document.querySelectorAll('input')
})

deleteButton.addEventListener('click', () => {
    const input = document.querySelector("input")
    parent.removeChild(input)
    inputs = document.querySelectorAll('input')
    calc()
})

inputs = document.querySelectorAll('input')
inputs.forEach(input => {
    input.addEventListener('input', calc)
});