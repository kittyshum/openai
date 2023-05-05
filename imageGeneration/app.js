const API_KEY = "<ENTER_YOUR_OWN_API_KEY>"


const submitIcon = document.querySelector("#submit-icon")
const inputElement = document.querySelector("input")
const imageSection = document.querySelector(".images-section")

const getImages = async() => {
    console.log("clicked")

    const options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            prompt: inputElement.value,
            n: 2,
            size: "256x256"
        })
    }

    try {

        //clear the board first from previous searches
        console.log("clear board")
        removeAllChildNodes(imageSection)

        //fetch images from openai API
        console.log("fetching images from openai")
        const response = await fetch("https://api.openai.com/v1/images/generations", options) 
        const data = await response.json()
        console.log(data)

        data?.data.forEach(imageObject => {
            const imageContainer = document.createElement("div")
            imageContainer.classList.add("image-container")
            
            const imageElement = document.createElement("img")
            imageElement.setAttribute("src", imageObject.url)
            
            imageContainer.append(imageElement)
            imageSection.append(imageContainer)
        })



    } catch (error) {
        console.error(error)
    }
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}


//event listener for the submit  button
submitIcon.addEventListener('click', getImages)


//execute a function when the user presses a key on the keyboard
inputElement.addEventListener("keyup", function (event){
    if(event.key == "Enter") {
        event.preventDefault()
        submitIcon.click()
    }
    
})
