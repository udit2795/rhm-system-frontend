import { Table, Tag, Space } from 'antd';
// import Modall from './modal'
import { useState, useEffect } from 'react'
import Modal from 'antd/lib/modal/Modal';
import React from 'react';

import { Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import axios from 'axios'
import { Select } from 'antd';
const { Option, OptGroup } = Select;

export default function Tablecomponent() {
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [time, setTime] = useState('');

    const [initdata, setData] = useState([])
    const [initmenu, setMenu] = useState([])
    const [book, setBook] = useState([])


    useEffect(async () => {
        const result = await axios("http://localhost:5000/");
        console.log(result.data, '===================================')
        setData(result.data);
    }, [])


    // const menu = (
    //     <Menu onClick={onClick}>
    //         {initmenu.map(element => <Menu.Item key={element.value}>
    //             {element.value}
    //         </Menu.Item>
    //         )}
    //     </Menu>
    // );

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Id',
            key: 'id',
            dataIndex: 'id',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    {console.log(record)}
                    <a onClick={() => handleModal(record)}>Book</a>
                    {/* <a>Delete</a> */}
                </Space>
            ),
        },
    ];

    const data =

        [...initdata]

    const handleModal = async (test) => {
        console.log(test, '========clicked=========')
        const result = await axios(`http://localhost:5000/booking/${test.id}`);
        console.log(result.data, '====================booking===============')
        // setData(result.data);
        setBook(test.address)
        setMenu(result.data)
        setVisible(true)

    }

    const handleOk = async () => {
        setConfirmLoading(true);
        setTimeout(() => {
            setVisible(false);
            setConfirmLoading(false);
        }, 2000);
        const result = await axios({
            method: 'post',
            url: 'http://localhost:5000/booking',
            data: {
                name: name,
                email: email,
                phone: phone,
                value: time,
                address: book,
                realtor_id: initmenu.realtor_id
            }
        });
        console.log(result.data, '====================handleok===============')


    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setVisible(false);
    };

    const handleNameChange = (e) => {
        setName(e.target.value)
        console.log('name chnage tiggering');
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }
    const handlePhoneChange = (e) => {
        setPhone(e.target.value)
    }

    const handleTimeChange = (e) => {
        // e.preventDefault()
        setTime(e)
    }
    return <div className='message-box'>
        <Table columns={columns} dataSource={data} />

        <Modal
            title="Title"
            visible={visible}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
        >
            <Input size="large" placeholder="Name" prefix={<UserOutlined />} onChange={(e) => handleNameChange(e)} />
            <br />
            <br />
            <Input size="large" placeholder="Email" prefix={<UserOutlined />} onChange={(e) => handleEmailChange(e)} />
            <br />
            <br />
            <Input size="large" placeholder="Phone" prefix={<UserOutlined />} onChange={(e) => handlePhoneChange(e)} />
            <br />
            <br />

            Select Time: <Select defaultValue="" style={{ width: 200 }} onChange={e => handleTimeChange(e)}>
                {initmenu.map((element) =>
                    <Option value={element.value}>{element.value}</Option>
                )
                }
            </Select>

        </Modal>

    </div>
}