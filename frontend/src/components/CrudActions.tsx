import styled from "styled-components";
import { errorHandling } from "@/utils/errorHandling";

interface CrudActionsProps<T> {
    cell: T,
    actions: ActionItem<T>[]
}

export enum ActionItemType {
    DELETE = "delete",
    TOGGLE = "toggle",
    EDIT = "edit",
    VIEW = "view",
    DOWNLOAD = "download"
}

export interface ActionItem<T> {
    handler: (cell: T) => Promise<void> | void,
    supressWarning?: boolean,
    tooltipLabel?: string,
    type: ActionItemType,
}

const dialogOptions: { [key: string]: { title: string, message: string } } = {
    [ActionItemType.DELETE]: {
        title: "Deseja realmente deletar o registro?",
        message: "Ao clicar em confirmar você excluirá o registro permanentemente."
    },
    [ActionItemType.TOGGLE]: {
        title: "Ativar/inativar registro",
        message: "Deseja realmente ativar/inativar o registro?",
    }
}

import { HiOutlineTrash } from "react-icons/hi";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { Form } from "react-bootstrap";
import Swal from "sweetalert2";
import { FaRegEye } from "react-icons/fa6";
import { FiDownload } from "react-icons/fi";
import { IconButton } from "@mui/material";

export const CrudActions = <T extends {}>(props: CrudActionsProps<T>) => {

    return (
        <Area>
            {props.actions.map((action, index) => (
                <IconButton
                    key={index}
                    title={action.tooltipLabel}
                    onClick={async () => {
                        const dialogOption = dialogOptions[action.type];
                        if (dialogOption && !action.supressWarning) {
                            const { isConfirmed } = await Swal.fire({
                                title: dialogOptions[action.type].title,
                                text: dialogOptions[action.type].message,
                                icon: "warning",
                            });

                            if (isConfirmed) {
                                try {
                                    await action.handler(props.cell);
                                }
                                catch (err) { errorHandling(err) }
                            }
                        }
                        else {
                            action.handler(props.cell);
                        }
                    }}
                >
                    {action.type === ActionItemType.DELETE && <HiOutlineTrash size={15} />}
                    {
                        action.type === ActionItemType.TOGGLE && <Form.Switch
                            color="primary"
                            defaultChecked={(props.cell as any)?.active}
                            onChange={event => action.handler({ ...props.cell, active: event.target.checked })}
                        />
                    }
                    {action.type === ActionItemType.EDIT && <HiOutlinePencilAlt size={15} />}
                    {action.type === ActionItemType.VIEW && <FaRegEye size={15} />}
                    {action.type === ActionItemType.DOWNLOAD && <FiDownload size={15} />}
                </IconButton>
            ))
            }
        </Area >
    )
}

const Area = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    flex-wrap: nowrap;
    gap: 5px;

	button {
	  padding: 3px;
	}
`