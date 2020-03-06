import React, { useState } from "react";
import { Link } from "react-router-dom/";
import 'antd/dist/antd.css';
import '../../App.css';
import {
  HomeOutlined,UserOutlined,PlusOutlined
} from '@ant-design/icons';
import { Menu, Button } from 'antd';
import { connect } from "react-redux";
import { addProject } from "../../redux/actions";
import Navbar from "../../components/Navbar"
function AddProject(props){
  const { addProject } = props
  console.log(props)

  const [projectName, setProjectName] = useState("");
  const [projectNameError, setProjectNameError] = useState(false);
  const [projectNameErrorMessage] = useState("Project name is required!");
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState(false);
  const [descriptionErrorMessage] = useState("Description is required!");

  const handleSubmit = e => {
    e.preventDefault();
    setProjectNameError(false);
  
    if (!projectName) {
      setProjectNameError(true);
    }
    if (!description) {
      setDescriptionError(true);
    }
    if (projectName !== "" && description !== "") {
      const data={
        projectName,description
      }
      addProject(data)
    }
  }
  return(
    <div>

      <Navbar />
      <div className="container">    
  
        <div className="wrap-login flex column">
          <div className="title">Add project</div>
            <form>
              <div className="flex row align-center">
                {projectNameError &&
                  <div className="error text-align-end width100">
                    {projectNameErrorMessage}
                  </div>
                }
              </div>

              <div className="flex row align-center mb-20">
                <div className="label">Project Name</div>
                <input
                    className="input_text"
                    type="text"
                    placeholder=""
                    name="project_name"
                    value={projectName}
                    onChange={e => setProjectName(e.target.value)}
                />
              </div>
              <div className="flex row align-center">
                {descriptionError &&
                  <div className="error text-align-end width100">
                    {descriptionErrorMessage}
                  </div>
                }
              </div>
              <div className="flex row align-center mb-20">
                <div className="label">Description</div>

                <textarea
                  rows="6"
                  className="textarea_text"
                  type="text"
                  placeholder=""
                  name="description"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
              </div>

              <Button type="primary" onClick={handleSubmit}>Save</Button>
            
            </form>
          </div>
      </div>
    </div>
    )
}
export default connect(null,{ addProject })(AddProject)