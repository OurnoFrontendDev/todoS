import React from "react";
import ReactDOM from "react-dom";
import style from "/src/components/modals/modalError/modalError.module.scss"
type ModalErrorType = {
    errorModal: boolean
    setErrorModal: (modalErrorActive: boolean) => void
    children:React.ReactNode
}

export const ModalError = (props: ModalErrorType) => {
    console.log("ModalError",props.errorModal)
    const portal = document.getElementById('portalError');
    if (!portal) {return null;}
    if (!props.errorModal && portal) return null
  return   ReactDOM.createPortal(
        <div className={`${style.modalError} ${props.errorModal ? style.active : ""}`} onClick={() => props.setErrorModal(false)}>
            <div className={style.modal__contentError} onClick={e => e.stopPropagation()}>
             <div>{props.children}</div>
            </div>
        </div>
        , portal)
};
