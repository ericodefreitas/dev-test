import { createContext, ReactNode, useContext, useState } from 'react';
import { Modal } from "react-bootstrap";
import { Loader } from 'react-feather';
import styled from "styled-components";

const LoadingContext = createContext({
    startLoading: () => { },
    stopLoading: () => { },
});

export const useLoading = () => useContext(LoadingContext)

export const LoadingProvider = (props: { children: ReactNode }) => {
    const [loading, setLoading] = useState(false);

    return (
        <LoadingContext.Provider value={{
            startLoading: () => setLoading(true),
            stopLoading: () => setLoading(false),
        }}>
            {loading && (
                <CustomModal
                    show
                    centered
                    size="lg"
                >
                    <Modal.Body>
                        <strong>Carregando...</strong>
                        <span>Aguarde um momento por favor</span>
                        <Loader />
                    </Modal.Body>
                </CustomModal>
            )}
            {props.children}
        </LoadingContext.Provider>
    )
}

const CustomModal = styled(Modal)`
  .modal-content {
    border: none;
    margin: auto;
    padding: 12px;
    width: 500px;
    
    .modal-body {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 15px;
      
      strong {
        font-size: 2rem;
      }
      
      span {
        font-size: 1.4rem;
      }

      .loading {
        width: 30px;
        height: 30px;
      }
    }
  }
`