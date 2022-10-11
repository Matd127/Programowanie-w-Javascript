const liczba1 = document.querySelector('#liczba1')
const liczba2 = document.querySelector('#liczba2')
const liczba3 = document.querySelector('#liczba3')
const liczba4 = document.querySelector('#liczba4')
const sumaWynik = document.querySelector('#suma')
const sredniaWynik = document.querySelector('#srednia')
const minimumWynik = document.querySelector('#minimum')
const maksimumWynik = document.querySelector('#maksimum')
const przeliczBtn = document.querySelector("#przelicz")

liczba1.addEventListener('change', calculator)
liczba2.addEventListener('change', calculator)
liczba3.addEventListener('change', calculator)
liczba4.addEventListener('change', calculator)


przeliczBtn.addEventListener('click', () => {
    sumaWynik.innerHTML = 'Suma: '+ (parseInt(liczba1.value) + parseInt(liczba2.value) + parseInt(liczba3.value) + parseInt(liczba4.value))
    sredniaWynik.innerHTML = 'Srednia: ' + (parseInt(liczba1.value) + parseInt(liczba2.value) + parseInt(liczba3.value) + parseInt(liczba4.value))/4
    minimumWynik.innerHTML = 'Minimum ' + Math.min(parseInt(liczba1.value), parseInt(liczba2.value), parseInt(liczba3.value), parseInt(liczba4.value))
    maksimumWynik.innerHTML = 'Minimum ' + Math.max(parseInt(liczba1.value), parseInt(liczba2.value), parseInt(liczba3.value), parseInt(liczba4.value))
})

function calculator() {
    sumaWynik.innerHTML = 'Suma: '+ (parseInt(liczba1.value) + parseInt(liczba2.value) + parseInt(liczba3.value) + parseInt(liczba4.value))
    sredniaWynik.innerHTML = 'Srednia: ' + (parseInt(liczba1.value) + parseInt(liczba2.value) + parseInt(liczba3.value) + parseInt(liczba4.value))/4
    minimumWynik.innerHTML = 'Minimum ' + Math.min(parseInt(liczba1.value), parseInt(liczba2.value), parseInt(liczba3.value), parseInt(liczba4.value))
    maksimumWynik.innerHTML = 'Minimum ' + Math.max(parseInt(liczba1.value), parseInt(liczba2.value), parseInt(liczba3.value), parseInt(liczba4.value))
}