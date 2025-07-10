import { LazyExoticComponent, Suspense, useState } from "react"
import { Card, Tab, Tabs } from "react-bootstrap"

interface Props {
    tabs: {
        title: string
        Component?: LazyExoticComponent<(props: any) => JSX.Element>,
        element?: React.ReactNode,
        innerProps?: any,
        disabled?: boolean
    }[]
}

export default function FormTabs(props: Props) {
    const [key, setKey] = useState(1);

    return (
        <Tabs defaultActiveKey={1} style={{ gap: 5 }} onSelect={key => { setKey(Number(key)) }}>
            {props?.tabs?.map(({ Component, element, ...tab }, index) => (
                <Tab title={tab.title} eventKey={index + 1} key={index} disabled={tab.disabled}>
                    <Suspense fallback={<SuspenseLoading />}>
                        {Component && key === (index + 1) && <Component {...tab.innerProps} />}
                        {!!element && key === (index + 1) && element}
                    </Suspense>
                </Tab>
            ))}
        </Tabs>
    )
};

function SuspenseLoading() {
    return (
        <Card>
            <Card.Body>
                <Card.Title>Carregando...</Card.Title>
            </Card.Body>
        </Card>
    )
}