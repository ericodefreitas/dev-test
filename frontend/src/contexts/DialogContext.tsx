import { createContext, ReactNode, useContext, useState } from 'react';

import { Button, ButtonProps } from '@mui/material';
import BaseDialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { errorHandling } from '@/utils/errorHandling';

interface Payload {
    title: string,
    message: string,
    actions: {
        label: string,
        color?: ButtonProps['color'],
        onClick?: () => Promise<void> | void
    }[]
}

const DialogContext = createContext<{
    showDialog: (payload: Payload) => Promise<void> | void
}
>({
    showDialog: () => { }
});

export const useDialog = () => useContext(DialogContext)

export const DialogProvider = (props: { children: ReactNode }) => {
    const [dialogContent, setDialogContent] = useState<Payload | undefined>();

    return (
        <DialogContext.Provider value={{
            showDialog: (payload: Payload) => setDialogContent(payload)
        }}>
            <BaseDialog
                open={!!dialogContent}
                onClose={() => setDialogContent(undefined)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {dialogContent?.title}
                </DialogTitle>
                <DialogContent>
                    {dialogContent?.message}
                </DialogContent>
                {dialogContent?.actions && (
                    <DialogActions>
                        {dialogContent?.actions.map(({ color = 'primary', ...action }, index) => (
                            <Button
                                key={index}
                                style={{ textTransform: 'none', color: color === 'primary' ? '#D14224' : '#4A5056' }}
                                onClick={async () => {
                                    try {
                                        setDialogContent(undefined);
                                        if (action.onClick)
                                            await action.onClick();
                                    }
                                    catch (err) {
                                        errorHandling(err);
                                    }
                                }}
                            >
                                {action.label}
                            </Button>
                        ))}
                    </DialogActions>
                )}
            </BaseDialog>
            {props.children}
        </DialogContext.Provider>
    )
}