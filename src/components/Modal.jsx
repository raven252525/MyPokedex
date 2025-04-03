import ReactDom from 'react-dom'

export default function Modal(props) {
    const { children, handleCloseModal } = props
    return ReactDom.createPortal(// new return datatype, creates portal overlay with just portal info
        <div className='modal-container'>
            <button onClick={handleCloseModal} className='modal-underlay'/>
            <div className='modal-content'>
                {children}
            </div>
        </div>,
        document.getElementById('portal') // injected into this div
    )
    //children is other prop style: gives any content contained in opening or closing tags
}//modal is a popup overlay on the screen
// this one will allow user to click on pokemon skill, and then see what the skill is