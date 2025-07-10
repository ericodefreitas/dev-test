import { useState } from "react";
import { Column, Row as RowType, useTable, useGlobalFilter, Cell } from "react-table";
import { Button, Card, Row, Table } from "react-bootstrap";
import { Link, useSearchParams } from "react-router-dom";

import "@/styles/components/datatable.scss"
import { TextFormField, TextFormFieldProps } from "./form/TextFormField/TextFormField";
import { BaseFilter } from "@/types/api/filters/BaseFilter";
import { FaPlus } from "react-icons/fa6";

export interface GlobalFilterType {
    name: string,
    value: unknown
}

interface DataTableProps<T extends {}, TFilter> {
    title?: string,
    description?: string,
    thin?: boolean,
    columns: Column<T>[],
    data: T[],
    hover?: boolean,
    marginBottom?: number,
    striped?: boolean,
    filters?: TextFormFieldProps<TFilter>[];
    createRouterLink?: string;
    createButton?: {
        name?: string | undefined;
        disabled?: boolean,
        onclickFn: () => void;
        useFaPlus?: boolean | undefined
    }
}

const StaticDataTable = <T extends {}, TFilter extends BaseFilter = BaseFilter>({ striped = true, ...props }: DataTableProps<T, TFilter>) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [globalFilters, setGlobalFilters] = useState<GlobalFilterType[]>(searchParams.size > 0 ? [...searchParams.entries()].map(([name, value]) => ({ name, value })) : []);

    const handleChangeGlobalFilter = (name: string, value: unknown) => {
        const filters = [...globalFilters];
        const index = filters.findIndex(f => f.name === name);
        if (index > -1) {
            filters[index].value = value;
        }
        else {
            filters.push({ name, value });
        }
        setGlobalFilters(filters);
        const urlSearchParams = filters.reduce((acc, curr) => {
            acc[curr.name] = `${curr.value}`;
            return acc;
        }, {} as any);

        setSearchParams(`?${new URLSearchParams(urlSearchParams)}`)
    }

    const tableProps = useTable<T>(
        {
            columns: props.columns as Column<T>[],
            data: props.data ?? [],
            manualFilters: true,
        },
        useGlobalFilter
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        rows,
    } = tableProps;

    return (
        <>
            {
                props.createRouterLink &&
                <Row style={{ justifyContent: "end", margin: "10px 0" }}>
                    <Link to={props.createRouterLink}>
                        <Button style={{ maxWidth: "fit-content", float: "right" }}>Adicionar</Button>
                    </Link>
                </Row>
            }
            <Card style={{ marginBottom: props.marginBottom ?? 24 }}>
                {(props.title || props.description) && (
                    <Card.Header>
                        <Card.Title style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            {props.title} {props.createButton && <Button className="my-3" onClick={props.createButton.onclickFn} disabled={props.createButton.disabled} title={props.createButton.name ?? "Cadastrar"}>{props.createButton.useFaPlus ? <><FaPlus></FaPlus></> : props.createButton.name}</Button>}
                        </Card.Title>

                        {props.description && <h6 className="card-subtitle text-muted">{props.description}</h6>}

                    </Card.Header>
                )}
                {props.filters && (
                    <div className="datatable-filters">
                        {props.filters.map((filter, key) => (
                            <TextFormField
                                {...filter}
                                key={key}
                                defaultValue={searchParams.get(filter.name.toString()) ?? filter.defaultValue}
                                value={globalFilters.find(f => f.name === filter.name)?.value as any}
                                handleChange={(event) => {
                                    if (event.hasOwnProperty("target")) {
                                        handleChangeGlobalFilter(event.target.name, event.target.value)
                                    }
                                    else {
                                        handleChangeGlobalFilter(event.name, event.value)
                                    }
                                }}
                            />
                        ))}
                    </div>
                )}
                <Table responsive bordered striped={striped} hover={props.hover ?? true} {...getTableProps()} {...(props.thin ? { size: 'sm' } : {})}>
                    <thead>
                        {headerGroups.map((headerGroup, index) => (
                            <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                                {headerGroup.headers.map((column, columnIndex) => (
                                    <th {...column.getHeaderProps()} key={columnIndex}>
                                        {column.render("Header")}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.length === 0 ? (
                            <tr>
                                <td colSpan={props.columns.length} style={{ textAlign: "center" }}>Nenhum registro encontrado</td>
                            </tr>
                        ) : rows.map((row: RowType<any>, index: number) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()} key={index}>
                                    {row.cells.map((cell: Cell<T>, cellIndex) => {
                                        return (
                                            <td
                                                {...cell.getCellProps()}
                                                key={cellIndex}
                                            >{cell.render("Cell")}</td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </Card>
        </>
    )
}

export default StaticDataTable;
export type StaticDataTableType = typeof StaticDataTable;