import React, { useState } from 'react';
import { TextFormField } from './form/TextFormField/TextFormField';
import { Col, Row } from 'react-bootstrap';

export type EnumType = {
    code: number;
    text: string
}

interface Props {
    enumValues: EnumType[];
    initialValues: EnumType[];
    onChange: (selectedValues: number[]) => void;
}

const EnumCheckboxList: React.FC<Props> = ({ enumValues, initialValues, onChange }) => {
    const [selectedValues, setSelectedValues] = useState<number[]>(initialValues.map(x => x.code));

    const handleCheckboxChange = (value: EnumType) => {
        const isSelected = selectedValues.includes(value.code);

        if (isSelected) {
            const items = selectedValues.filter((v) => v !== value.code);
            setSelectedValues(items);
            onChange(items);

        } else {
            setSelectedValues([...selectedValues, value.code]);
            onChange([...selectedValues, value.code]);
        }
    };

    if (!enumValues || enumValues.length === 0)
        return (
            <Row>
                <Col>Nenhuma opção disponível</Col>
            </Row>
        );

    return (
        <Row>
            {enumValues.map((value, index) => (
                <Col md={12} key={index}>
                    <div className='form-switch' style={{ marginTop: "0.5rem" }}>
                        <input
                            className='form-check-input'
                            type="checkbox"
                            id={`checkbox-${value.code}`}
                            checked={selectedValues.includes(value.code)}
                            onChange={() => handleCheckboxChange(value)}
                        />
                        <label style={{ marginLeft: "1rem", fontWeight: 700 }} htmlFor={`checkbox-${value.code}`}> {value.text}</label>
                    </div>
                </Col>
            ))}
        </Row>
    );
};

export default EnumCheckboxList;