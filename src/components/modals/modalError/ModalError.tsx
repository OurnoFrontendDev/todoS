import React, {MouseEvent} from "react";
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
        style.container,
        {[style.active]: isErrorModalActive}
    );
    const portalErrorModal = usePortal("ErrorModal");
    const handleStopPropagationViewErrorModal = (e:MouseEvent<HTMLDivElement>) => e.stopPropagation()
    return createPortal(
        <div className={modalErrorClassStyle} onClick={handleChangeErrorStatus}>
            <div className={style.container__content} onClick={handleStopPropagationViewErrorModal}>
                <div>{children}</div>
            </div>
        </div>,
        portalErrorModal
    );
};
