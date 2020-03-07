import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, notification } from 'antd';

import createTaskRequest from "../../api/createTaskRequest";
import { addTask } from "../../redux/actions";

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
        </>
    )
}


export default connect(null,{addTask})(CreateTask)