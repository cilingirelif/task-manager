import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Button,
  notification,
  Table,
  Tag,
  Modal,
  Select,
  Row,
  Col,
  Form,
  Input,
  Popconfirm
} from "antd";
import "antd/dist/antd.css";
import "../../App.css";
import "./project.css";
import { updateTask, deleteTask } from "../../redux/actions";
import Navbar from "../../components/Navbar";

//Request
import CreateTask from "../../components/CreateTask.js";
import updateTaskRequest from "../../api/updateTaskRequest";
import deleteTaskRequest from "../../api/deleteTaskRequest";

function Project(props) {
  const { project, tasks, updateTask, deleteTask } = props;

  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSorteredInfo] = useState({
    columnKey: "id",
    order: "descend"
  });
  const [visible, setVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedTaskId, setSelectedTaskId] = useState("");

  const { Option } = Select;

  const handleSelection = record => {
    setVisible(true);
    setSelectedTaskId(record.id);
    setSelectedTask(record.task);
    setSelectedStatus(record.status);
  };

  const handleTableChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSorteredInfo(sorter);
  };

  const handleSelectChange = value => {
    setSelectedStatus(value);
  };

  let columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
      sortOrder: sortedInfo.columnKey === "id" && sortedInfo.order,
      ellipsis: true,
      align: "center"
    },
    {
      title: "Task",
      dataIndex: "task",
      key: "task"
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Todo", value: "Todo" },
        { text: "Done", value: "Done" }
      ],
      filteredValue: filteredInfo.status || null,
      onFilter: (value, record) => record.status.includes(value),
      render: (status, record) => (
        <span>
          {
            <Tag color={status === "Todo" ? "volcano" : "green"} key={status}>
              {status}
            </Tag>
          }
        </span>
      )
    }
  ];

  const handleDeleteTask = () => {
    const data = {
      id: selectedTaskId
    };

    deleteTaskRequest(data).then(response => {
      setVisible(false);
      if (response.status === "success") {
        deleteTask(response.data); //update store with response
        notification.success({
          message: "Successful!",
          description: <>{"Deleted successfully."}</>
        });
      } else {
        notification.error({ message: "Something went wrong" });
      }
    });
  };

  const handleUpdateTask = () => {
    setVisible(false);
    const data = {
      id: selectedTaskId,
      status: selectedStatus,
      task: selectedTask
    };

    updateTaskRequest(data).then(response => {
      if (response.status === "success") {
        updateTask(response.data); //update store with response
        notification.success({
          message: "Successful!",
          description: <>{"Updated successfully."}</>
        });
      } else {
        notification.error({ message: "Something went wrong" });
      }
    });
  };

  return (
    <div>
      <Navbar />
      <div className="container project-container">
        <Row>
          <Col className="project-detail-column" span={24} xl={7}>
            {project && (
              <>
                <div className="project-detail-title">{project.name}</div>
                <p className="project-detail-description">
                  {project.description}
                </p>
              </>
            )}

            <CreateTask project={project} />
          </Col>
          <Col className="project-detail-column" span={24} xl={17}>
            <Table
              tableLayout="auto"
              rowKey={"id"}
              columns={columns}
              dataSource={tasks}
              onChange={handleTableChange}
              onRow={record => ({
                onClick: () => {
                  handleSelection(record);
                }
              })}
              pagination={{
                pageSize: 8
              }}
            />
            <Modal
              title="Edit Task"
              visible={visible}
              onOk={handleUpdateTask}
              onCancel={() => setVisible(false)}
              footer={[
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Popconfirm
                    title={"Are you sure to delete this task?"}
                    onConfirm={() => handleDeleteTask()}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button type="danger">Delete</Button>
                  </Popconfirm>
                  <div>
                    <Button key="back" onClick={() => setVisible(false)}>
                      Cancel
                    </Button>
                    <Button
                      key="submit"
                      type="primary"
                      onClick={handleUpdateTask}
                    >
                      Update
                    </Button>
                  </div>
                </div>
              ]}
            >
              <Form layout="vertical">
                <Form.Item label="Task">
                  <Input.TextArea
                    type="text"
                    placeholder="Create new task"
                    name="task"
                    autoSize
                    value={selectedTask}
                    onChange={e => setSelectedTask(e.target.value)}
                    onPressEnter={handleUpdateTask}
                  />
                </Form.Item>
                <Form.Item label="Status">
                  <Select
                    style={{ width: 120 }}
                    value={selectedStatus}
                    onChange={handleSelectChange}
                  >
                    <Option value="Todo">Todo</Option>
                    <Option value="Done">Done</Option>
                  </Select>
                </Form.Item>
              </Form>
            </Modal>
          </Col>
        </Row>
      </div>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  let projectId = ownProps.match.params.id;
  return {
    project: state.projects.list.filter(
      project => project.id === parseInt(projectId)
    )[0],
    tasks: state.tasks.list.filter(
      task => task.projectId === parseInt(projectId)
    )
  };
};
export default connect(mapStateToProps, { updateTask, deleteTask })(Project);
