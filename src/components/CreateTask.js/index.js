import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, notification, Form, Input } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";

import createTaskRequest from "../../api/createTaskRequest";
import { addTask } from "../../redux/actions";
import "./createTask.css";
function CreateTask (props) {
    const { project, addTask } = props
    const [isLoading, SetIsLoading] = useState(false);
    const [task, setTask] = useState("");
    const [taskError, setTaskError] = useState(false);
    const [taskErrorMessage] = useState("Task is required!");

    const resetErrors = () => {
        setTaskError(false);
    }

    const resetForm = () => {
        setTask("");
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        SetIsLoading(true);
        resetErrors();
        if(!task){
            setTaskError(true);
            SetIsLoading(false);
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
            resetForm();
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
        <>
        <Form layout="inline" className="create-task-form">
        <Input.TextArea
          className="create-task-input"
          type="text"
          placeholder="Create new task"
          name="task"
          autoSize
          value={task}
          onChange={e => setTask(e.target.value)}
          onPressEnter={handleSubmit}
          autoFocus
        />

        <Button
          className="create-task-button"
          type="primary"
          htmlType="submit"
          icon={<ArrowRightOutlined />}
          size={"large"}
          loading={isLoading}
          onClick={handleSubmit}
        />

        {taskError && (
          <div className="error text-align-end width100">
            {taskErrorMessage}
          </div>
        )}
      </Form>
        </>
    )
}


export default connect(null,{addTask})(CreateTask)