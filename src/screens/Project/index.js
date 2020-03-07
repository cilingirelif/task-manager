import React, { useState } from "react";
import { Link } from "react-router-dom/";
import { connect } from "react-redux";
import { Button, notification, Table, Tag, Modal,Select } from 'antd';
import 'antd/dist/antd.css';
import '../../App.css';
import { updateTaskStatus } from "../../redux/actions";
import Navbar from "../../components/Navbar"

//Request
import updateTaskStatusRequest from "../../api/updateTaskStatusRequest";
import CreateTask from "../../components/CreateTask.js";

function Project(props){
  const { project, tasks, updateTaskStatus } = props

  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSorteredInfo] = useState({});
  const [visible, setVisible] = useState(false);
  const [selectValue, setSelectValue] = useState("");
  const [taskId, setTaskId] = useState("");

  const { Option } = Select;

  const handleTag = (record) => {
    setVisible(true)
    setTaskId(record.id)
  }

  const handleTableChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters)
    setSorteredInfo(sorter)
  };

  const handleSelectChange = (value)=>{
    setSelectValue(value)
  }

  let columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
      sortOrder: sortedInfo.columnKey === 'id' && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: 'Task',
      dataIndex: 'task',
      key: 'task',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: 'Todo', value: 'Todo' },
        { text: 'Done', value: 'Done' },
      ],
      filteredValue: filteredInfo.status || null,
      onFilter: (value, record) => record.status.includes(value),
      render: (status,record) => (
        <span>
          {
            <Tag onClick={()=>handleTag(record)} color={status ==="Todo" ? 'volcano' : 'green'} key={status}>
              {status}
            </Tag>
          }
        </span>
      ),
    },
  ];

  const handleUpdateTaskStatus = () => {
    setVisible(false)
    const data = {
      id: taskId,
      status: selectValue
    }
    
    updateTaskStatusRequest(data).then(response => {
      if (response.status === "success") {
        updateTaskStatus(response.data); //update store with response
        notification.success({
          message: "Successful!",
          description: (
            <>
              {"Updated successfully."}
            </>
          )
        });
       
      } else {
        notification.error({ message: "Something went wrong" });
      }
    });
  }

  
  return(
    <div>
      <Navbar />
      <div className="container">    
        <div className="wrap-login flex column">
            {project &&
              <div className="title">{project.name}</div>
            }
            <CreateTask project={project} />
            <Table rowKey={"id"} columns={columns} dataSource={tasks} onChange={handleTableChange} />
            <Modal
              title="Change status"
              visible={visible}
              onOk={handleUpdateTaskStatus}
              onCancel={() => setVisible(false)}
            >
                <Select style={{ width: 120 }} onChange={handleSelectChange}>
                   <Option value="Todo">Todo</Option>
                   <Option value="Done">Done</Option>
                </Select>
            </Modal>
        </div>
      </div>
    </div>
    )
}

const mapStateToProps = (state,ownProps ) => {
  let projectId = ownProps.match.params.id
  return {
    project: state.projects.list.filter(
      project => project.id === parseInt(projectId)
    )[0],
    tasks: state.tasks.list
  };
}; 
export default connect(mapStateToProps, {  updateTaskStatus })(Project)