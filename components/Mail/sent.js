import React, { useState } from 'react';
import {
    Table,
    Row,
    Col,
    Select,
    Button
} from 'antd';

const Sent = () => {

    const columnes = [
        {
            title: ''
        },
        {
            title: 'From',
            align: 'center'
        },
        {
            title: 'Subject',
            align: 'center'
        },
        {
            title: 'Actions',
            align: 'center'
        }
    ];
    const [selectionType, setSelectionType] = useState('checkbox');
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            // Column configuration not to be checked
            name: record.name,
        }),
    };
    return (
        <Row className='mail-inbox'>
            <Col md={24} sm={24} xs={24}>
                <Table
                    columns={columnes}
                    rowSelection={{
                        type: selectionType,
                        ...rowSelection,
                    }}
                />
            </Col>
            <Col md={24} sm={24} xs={24} style={{ marginTop: 30 }}>
                <Select
                    defaultValue="lucy"
                    style={{ width: 120, marginRight: 10 }}
                    options={[
                        {
                            value: 'bluk',
                            label: 'Bluk Action',
                        },
                        {
                            value: 'lucy',
                            label: 'Lucy',
                        },
                    ]}
                />
                <Button style={{backgroundColor: "#4fc1e9", borderColor: "#4fc1e9", color: "white"}}>Apply</Button>
            </Col>
        </Row>
    )
}

export default Sent;