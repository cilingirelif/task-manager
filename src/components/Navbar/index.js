import React from "react"
import { Link } from "react-router-dom/";
import { Menu } from 'antd';
import {
  HomeOutlined,PlusOutlined
} from '@ant-design/icons';

const Navbar  =() => (
    <Menu mode="horizontal">
        <Menu.Item key="home">
            <HomeOutlined />
            <Link to="/home">Home</Link>
        </Menu.Item>
        <Menu.Item key="plus">
            <PlusOutlined />
            <Link to="/add-project">Add project</Link>
        </Menu.Item>
    </Menu>
)
export default Navbar





