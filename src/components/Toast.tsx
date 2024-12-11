import { useEffect } from "react";
import { BsExclamationLg } from "react-icons/bs";
import { IoMdCheckmark } from "react-icons/io";

type ToastProps = {
    message: string;
    type: "SUCCESS" | "ERROR";
    onClose: () => void;
};

export const Toast = ({ message, type, onClose }: ToastProps) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 2000);

        return () => {
            clearTimeout(timer);
        };
    }, [onClose]);

    const iconStyle = type === "SUCCESS"
        ? "icon bg-success"
        : "icon bg-danger"

    const lineStyle = type === 'SUCCESS'
        ? "line suc"
        : "line er"

    const innerStyle = type === 'SUCCESS'
        ? "inner-line bg-success"
        : "inner-line bg-danger"


    return (
        <div className="my-toast">
            <div className={iconStyle}>
                {type === "SUCCESS"
                    ? <IoMdCheckmark />
                    : <BsExclamationLg />}
            </div>
            <p className="text-black-50">
                {message}
            </p>
            <div className={lineStyle}>
                <div className={innerStyle}></div>
            </div>
        </div>
    );
};
