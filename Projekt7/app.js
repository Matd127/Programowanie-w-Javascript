const tenRandomNumbers = Array.from({length: 10}, () => Math.floor(Math.random() * 10));
const hundredRandomNumbers = Array.from({length: 100}, () => Math.floor(Math.random() * 100));

const asyncAdd = async (a, b) => {
    console.log(typeof(a), typeof(b))
    if (typeof a !== 'number' || typeof b !== 'number') {
       return Promise.reject('Argumenty muszą mieć typ number!')
    }
    return new Promise((resolve, reject) => {
      setTimeout(() =>{
        resolve(a + b)
      }, 10)
    })
}

// function performanceWithTenNumbers(...tenRandomNumbers) {
//     const start = performance.now()
//     console.log(asyncAdd(tenRandomNumbers));
//     const stop = performance.now();
//     console.log(`Czas wykonania dla 10 liczb ${stop - start}`)
// }

// function performanceWithHundredNumbers (...hundredRandomNumbers) {
//     const start = performance.now()
//     asyncAdd(...hundredRandomNumbers);
//     const stop = performance.now();
//     console.log(`Czas wykonania dla 100 liczb ${stop - start}`)
// }

function test () {
    const sum = tenRandomNumbers.reduce(asyncAdd)
    console.log(sum)

}
test()
// performanceWithTenNumbers();
// performanceWithHundredNumbers();

