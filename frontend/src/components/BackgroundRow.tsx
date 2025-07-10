import { ReactNode, useState } from "react";
import Loader from "./Loader";
import { IconButton } from "@mui/material";
import { PiEyeFill } from "react-icons/pi";
import { errorHandling } from "@/utils/errorHandling";
import { Button } from "react-bootstrap";

const BackgroundRow = ({ id, backgroundFn, icon, title, useLinkStyle, noUseLoader }: { id: string, backgroundFn: () => Promise<void>, icon?: ReactNode, title?: string, useLinkStyle?: boolean, noUseLoader?: boolean }) => {
    const [rowLoaderId, setRowLoaderId] = useState<string>("");
    const clickAction = async () => {
        try {
            setRowLoaderId(id)
            await backgroundFn();
        }
        catch (err) {
            errorHandling(err);
        }
        finally {
            setRowLoaderId("");
        }
    }

    return (
        rowLoaderId === id ? (noUseLoader ? <i>Carregando...</i> : <Loader small={true}></Loader>) :
            <>
                {
                    (useLinkStyle === true)
                        ? <Button style={{ padding: "0", textDecoration: "underline" }} variant="link" onClick={clickAction}>{title ?? "Ver detalhe"}</Button>
                        : <IconButton title={title ?? "Ver detalhe"} onClick={clickAction}>{icon ?? <PiEyeFill size={15} />}</IconButton>
                }
            </>
    );
}

export default BackgroundRow;