import React from "react";
import ReactDOM from "react-dom";
import style from "/src/components/modals/modalError/modalError.module.scss"

type ModalErrorType = {
    errorModalActive: boolean
    setErrorModalActive: (errorModalActive: boolean) => void
    children: React.ReactNode
}

export const ModalError = (props: ModalErrorType) => {
    const changeModalErrorStatus = () => props.setErrorModalActive(false)
    const modalErrorStyle = `${style.modalError} ${props.errorModalActive ? style.active : ""}`

    const portal = document.getElementById('portalError');
    if (!portal) {
        return null;
    }
    if (!props.errorModalActive && portal) return null

    return ReactDOM.createPortal(
        <div className={modalErrorStyle}
             onClick={changeModalErrorStatus}>
            <div className={style.modal__contentError} onClick={e => e.stopPropagation()}>
                <div>{props.children}</div>
            </div>
        </div>
        , portal)
};
