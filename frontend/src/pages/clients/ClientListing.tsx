import React, { Suspense, useEffect, useState, useRef, ChangeEvent } from "react";
import { Button, Card, Row, Col, ButtonGroup } from "react-bootstrap";
import { NAVIGATION_PATH } from "@/constants";
import { Client } from "@/types/api/Client";
import DataTable, { DataTableType } from "@/components/DataTable";
import { ActionItemType, CrudActions } from "@/components/CrudActions";
import { Link, useNavigate } from "react-router-dom";
import { mountRoute } from "@/utils/mountRoute";
import Loader from "@/components/Loader";
import ClientService from "@/services/ClientService";
import { TextFormFieldProps } from "@/components/form/TextFormField/TextFormField";
import { TextFormFieldType } from "@/components/form/TextFormField/TextFormFieldType";
import { formatDateToDisplay } from "@/utils/dateUtils";
import { toastr } from "@/utils/toastr";

const ClientListing = () => {
    const navigate = useNavigate();
    const [date, setDate] = useState<Date>();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImportClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) {
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            await ClientService.uploadCsvForImport(formData);
            toastr({ title: "Sucesso", text: "Arquivo enviado com sucesso para processamento.", icon: "success" });
            setTimeout(() => {
                setDate(new Date());
            }, 5000);
        } catch (error) {
            console.error("Erro ao enviar o arquivo:", error);
            toastr({ title: "Erro", text: "Falha ao enviar o arquivo.", icon: "error" });
        }
        if (event.target) {
            event.target.value = "";
        }
    };

    const clientFilters: TextFormFieldProps<any>[] = [
        {
            name: "documentNumber",
            label: "Número do Documento",
            componentType: TextFormFieldType.INPUT,
            type: "text",
            placeholder: "Digite o número do documento",
            defaultValue: "",
            renderIf: true,
        },
    ];

    useEffect(() => {
        setDate(new Date());
    }, []);

    return <>
        <Row style={{ justifyContent: "end", margin: "10px 0" }}>
            <Col xs="auto">
                <div style={{ display: "flex", gap: 10 }}>
                    <Button variant="success" onClick={handleImportClick}>
                        Importar
                    </Button>
                    <Button variant="primary" onClick={() => navigate(NAVIGATION_PATH.CLIENTS.CREATE.ABSOLUTE)}>
                        Adicionar
                    </Button>
                </div>
            </Col>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
                accept=".csv"
            />
        </Row>
        <Card >
            <Card.Title></Card.Title>
            <Card.Header>
                <Card.Title>
                    Clientes
                </Card.Title>
            </Card.Header>
            <Suspense fallback={<><Loader /><br /><br /></>}>
                <DataTable<Client, any>
                    thin
                    columns={[
                        
                        { Header: "Nome", accessor: "firstName" },
                        { Header: "Sobrenome", accessor: "lastName" },
                        { Header: "Email", accessor: "email" },
                        { Header: "Telefone", accessor: "phoneNumber" },
                        { Header: "Documento", accessor: "documentNumber" },
                        {
                            Header: "Data de Nascimento",
                            accessor: "birthDate",
                            Cell: ({ value }: any) => formatDateToDisplay(value),
                        },
                        {
                            Header: "Ações",
                            accessor: "id",
                            Cell: ({ row }: any) => (
                                <Button
                                    variant="outline-primary"
                                    size="sm"
                                    onClick={() => navigate(`/clientes/editar/${row.original.id}`)}
                                >
                                    Editar
                                </Button>
                            ),
                        },
                    ]}
                    query={async (filters) => {
                        const documentFilter = filters.find(f => f.name === "documentNumber" && f.value);
                        if (documentFilter && documentFilter.value) {
                            const client = await ClientService.getByDocumentNumber(documentFilter.value as string);
                            return client ? [client] : [];
                        }
                        return await ClientService.getAll();
                    }}
                    fetchButton
                    cleanButton
                    filters={clientFilters}
                    queryName={["client", "listing", date]}
                />
            </Suspense>
        </Card >
    </>
}

export default ClientListing;