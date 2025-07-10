import { Button, Modal } from "react-bootstrap";

type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light' | 'link'

interface Props {
    show: boolean;
    size?: 'sm' | 'lg' | 'xl';
    onHide: () => void;
    header: {
        title?: string;
        closeButton?: boolean;
    },
    children: React.ReactNode;
    footer?: {
        actions?: {
            label: string,
            disabled?: boolean,
            type?: "button" | "submit" | "reset",
            handler?: () => void,
            variant?: ButtonVariant
        }[];
    }
}

export default function CustomModal(props: Props) {
    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            centered
            size={props.size}
        >
            {props.header && (
                <Modal.Header closeButton>
                    {props.header.title && <Modal.Title>{props.header.title}</Modal.Title>}
                </Modal.Header>
            )}
            <Modal.Body>
                {props.children}
            </Modal.Body>
            {props.footer && (
                <Modal.Footer>
                    {props.footer.actions?.map((action, index) => (
                        <Button key={index} type={action.type} variant={action.variant} disabled={action.disabled} onClick={action.handler}>{action.label}</Button>
                    ))}
                </Modal.Footer>
            )}
        </Modal>
    )
}