import React, { useState } from "react";
import { Link } from "react-router-dom/";
import { connect } from "react-redux";
import { Button, notification, Table, Tag } from 'antd';
import 'antd/dist/antd.css';
import '../../App.css';
import { addTask } from "../../redux/actions";
import Navbar from "../../components/Navbar"

//Request
import createTaskRequest from "../../api/createTaskRequest";

function Project(props){
  const { project, addTask, tasks } = props
  const [isLoading, SetIsLoading] = useState(false);
  const [task, setTask] = useState("");
  const [taskError, setTaskError] = useState(false);
  const [taskErrorMessage] = useState("Task is required!");
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSorteredInfo] = useState({});

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
      sorter: (a, b) => a.task.length - b.task.length,
        sortOrder: sortedInfo.columnKey === 'task' && sortedInfo.order,
        ellipsis: true,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: status => (
        <span>
          {
            <Tag onClick={()=> alert(1)} color={status ==="Todo" ? 'volcano' : 'green'} key={status}>
              {status}
            </Tag>
          }
        </span>
      ),
    },
  ];
  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    setFilteredInfo(filters)
    setSorteredInfo(sorter)
 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    SetIsLoading(true);
    if(!task){
        setTaskError(true)
        return;
    }

    const data = {
      task,
      projectId: project.id,
      projectName: project.name
    };

    createTaskRequest(data).then(response => {
      if (response.status === "success") {
        addTask(response.data); //update store with response
        SetIsLoading(false);
        notification.success({
          message: "Successful!",
          description: (
            <>
              <b>
                {response.data.task}
              </b>
              {" is created successfully."}
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
            <div>Create task</div>
            <form>
              <div className="flex row align-center">
                {taskError &&
                    <div className="error text-align-end width100">
                        {taskErrorMessage}
                    </div>
                }
              </div>

              <div className="flex row align-center mb-20">
                <div className="label">Task</div>
                <input
                    className="input_text"
                    type="text"
                    placeholder=""
                    name="task"
                    value={task}
                    onChange={e => setTask(e.target.value)}
                />
              </div>
              <Button type="primary" loading={isLoading} onClick={handleSubmit}>Create</Button>
            </form>

            <Table rowKey={"id"} columns={columns} dataSource={tasks} onChange={handleChange} />
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
export default connect(mapStateToProps, { addTask })(Project)