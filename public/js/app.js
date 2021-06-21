// console.log("Client Side is loaded")

// fetch('http://puzzle.mead.io/puzzle').then( (response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

// fetch('http://localhost:3000/weather?address=islamabad').then( (response)=>{
//     response.json().then((data)=>{
        
//         if(data.error){
//             console.log(data.error)
//         }
//         else{
//             console.log(data.location)
//             console.log(data.forecast)
//         }
        
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const msg1= document.querySelector('#para1')
msg1.textContent = ''

const msg2= document.querySelector('#para2')
msg2.textContent = ''

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()

    const location = search.value

    // console.log(location)

    msg1.textContent = 'Loading Content!'
    msg2.textContent = ''

    fetch('http://localhost:3000/weather?address='+location).then( (response)=>{
    response.json().then((data)=>{
        
        if(data.error){
            // console.log(data.error)
            msg1.textContent = data.error
            // msg2.textContent = data.error
        }
        else{
            // console.log(data.location)
            // console.log(data.forecast)
            msg1.textContent = data.location
            msg2.textContent = data.forecast
        }
        
    })
})


})