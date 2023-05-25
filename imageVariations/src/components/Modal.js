import {useState, useRef} from "react"


const Modal = ({setModalOpen, setSelectedImage, selectedImage, generateVariations}) => {
    const [ error, setError ] = useState(null)
    const ref = useRef (null)
    console.log('selectedImage', selectedImage)
    const closeModal = () => {
        setModalOpen(false)
        setSelectedImage(null)
    }
    const checkSize = () => {
        console.log("in checkSize......")
        if(ref.current.width == 256 && ref.current.height == 256){
            //generateVariations()
            console.log("calling generateVariations.......")
            generateVariations()
            console.log("generateVariations done.......")
        }else{

            setError ('Error: Choose 256 x 256 image')
        }
    }

    return (
        <div className="modal">
            <div onClick={closeModal}>✖</div>
            <div className="img-container">
                {selectedImage && <img ref={ref} src={URL.createObjectURL(selectedImage)} alt="uploaded image"/>}
            </div>
            <p>{error || "* Image must be 256 x 256"}</p>
            {! error && <button onClick={checkSize}>Generate</button>}
            {error && <button onClick={closeModal}>Close this and try again</button>}
        </div>
    )
}

export default Modal