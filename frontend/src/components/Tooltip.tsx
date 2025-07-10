import { icon } from "@fortawesome/fontawesome-svg-core";
import { IconButton } from "@mui/material";
import { CSSProperties, ReactNode } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { PiInfo, PiInfoFill } from "react-icons/pi";

interface Props {
    text: string;
    icon?: ReactNode;
    style?: CSSProperties;
}

export default function CustomTooltip(props: Props) {
    return (
        <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={< Tooltip > {props.text}</Tooltip >}
        >
            <IconButton style={{ marginTop: -5, ...props.style }}> {props.icon ?? <PiInfoFill size={15} color="#1F9BCF" />}</IconButton>
        </OverlayTrigger >
    )
}