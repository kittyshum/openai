const API_KEY = "<insert your own API KEY>"
const submitButton = document.querySelector('#submit')
const outPutElement = document.querySelector('#output')
const inputElement = document.querySelector('input')
const historyElement = document.querySelector('.history')
const buttonElement = document.querySelector('button')
const myInput = document.getElementById("myInput")
const outputHistoryElement = document.querySelector('.outputHistory')

function changeInput(value){
    const inputElement = document.querySelector('input')
    inputElement.value = value

}

async function getMessage() {

    console.log('clicked')
    const options={
        method: "POST",
        headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json"

        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{
                role: "user",
                content: inputElement.value
            }],
            max_tokens: 100
        })
    }

    try {


        const response = await fetch("https://api.openai.com/v1/chat/completions", options)
        const data = await response.json()
        console.log(data)
        
        //update the output based on the response
        //outPutElement.textContent = data.choices[0].message.content

        //append the output to the outputHistory
        const outputHElement = document.createElement('p')
        outputHElement.textContent = data.choices[0].message.content
        outputHistoryElement.appendChild (outputHElement)


        //append the input to the list input History
        if(data.choices[0].message.content){
            const pElement = document.createElement('p')
            pElement.textContent = inputElement.value
            pElement.addEventListener('click', () => changeInput(pElement.textContent))
            historyElement.append(pElement)
        }
        
        clearMyInput()


    } catch (error) {
        console.error(error);
    }
    

}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function clearMyInput(){
    myInput.value = ""
}

// clear the outputHistory and myInput box to prepare for a new chat
function newChat(){
    console.log("clicked on New Chat button")
    removeAllChildNodes(outputHistoryElement);
    clearMyInput()
}


submitButton.addEventListener('click', getMessage)
buttonElement.addEventListener('click', newChat)


//execute a function when the user presses a key on the keyboard
myInput.addEventListener("keyup", function (event){
    if(event.key == "Enter") {
        event.preventDefault()
        submitButton.click()
    }
    
})
