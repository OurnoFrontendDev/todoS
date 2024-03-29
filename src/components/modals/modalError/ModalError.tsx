import React from "react";
import {createPortal} from "react-dom";
import style from "/src/components/modals/modalError/modalErrorStyles.module.scss";
import classNames from "classnames";
import {usePortal} from "../../../hooks/useCreatePortal";

type ModalErrorProps = {
    isErrorModalActive: boolean;
    setIsErrorModalActive: (errorModalActive: boolean) => void;
    children: React.ReactNode;
};

export const ModalError: React.FC<ModalErrorProps> = (props) => {
    const {isErrorModalActive,setIsErrorModalActive,children}=props
    const handleChangeErrorStatus = () => setIsErrorModalActive(false);
    const modalErrorClassStyle = classNames(
        style.modalError,
        {[style.active]: isErrorModalActive}
    );
    const portalErrorModal = usePortal("ErrorModal");

    return createPortal(
        <div className={modalErrorClassStyle} onClick={handleChangeErrorStatus}>
            <div className={style.modal__contentError} onClick={e => e.stopPropagation()}>
                <div>{children}</div>
            </div>
        </div>,
        portalErrorModal
    );
};
