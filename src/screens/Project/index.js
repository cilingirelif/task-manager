import React, { useState } from "react";
import { Link } from "react-router-dom/";
import { connect } from "react-redux";
import { Button, notification } from 'antd';
import 'antd/dist/antd.css';
import '../../App.css';
import Navbar from "../../components/Navbar"

function Project(props){
  const { project } = props
  const [isLoading, SetIsLoading] = useState(false);
  const [task, setTask] = useState("");
  const [taskError, setTaskError] = useState(false);
  const [taskErrorMessage] = useState("Task is required!");
  
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
export default connect(mapStateToProps)(Project)