import React, {ReactNode} from "react";
import ReactInputMask, {Props} from "react-input-mask";

type InputMaskProps = Omit<Props, "children"> & {
    children?: () => ReactNode;
};

export const InputMask: React.FC<InputMaskProps> = ({ children, ...props }) => {
    const child = children as ReactNode;
    return <ReactInputMask children={child} {...props} />;
};