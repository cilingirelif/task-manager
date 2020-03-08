import React, { useState } from "react";
import "antd/dist/antd.css";
import "../../App.css";

import { Button, notification, Row, Col, Form } from "antd";
import { connect } from "react-redux";
import { addProject } from "../../redux/actions";
import Navbar from "../../components/Navbar";

import history from "../../history";
import createProjectRequest from "../../api/createProjectRequest";

function AddProject(props) {
  const { addProject } = props;

  const [isLoading, SetIsLoading] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectNameError, setProjectNameError] = useState(false);
  const [projectNameErrorMessage] = useState("Project name is required!");
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState(false);
  const [descriptionErrorMessage] = useState("Description is required!");

  const resetErrors = () => {
    setProjectNameError(false);
    setDescriptionError(false);
  };

  const resetForm = () => {
    setProjectName("");
    setDescription("");
    resetErrors();
  };

  const handleSubmit = e => {
    e.preventDefault();
    SetIsLoading(true);
    resetErrors();

    if (!projectName) {
      setProjectNameError(true);
    }
    if (!description) {
      setDescriptionError(true);
    }
    if (!projectName || !description) {
      SetIsLoading(false);
      return;
    }

    const data = {
      projectName,
      description
    };

    createProjectRequest(data).then(response => {
      if (response.status === "success") {
        addProject(response.data); //update store with repsonse
        resetForm();
        SetIsLoading(false);
        notification.success({
          message: "Successful!",
          description: (
            <>
              <b>
                {response.data.projectName}
                {" project"}
              </b>
              {", created successfully"}
            </>
          )
        });
        history.push("home");
      } else {
        notification.error({ message: "Something went wrong" });
      }
    });
  };
  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="wrapper">
          <Row>
            <Col span={24} xl={24}>
              <div className="title">Add project</div>
              <div className="line mb-20"></div>
              <Form layout="vertical" className="add-project-form">
                <Form.Item label="Project Name">
                  <input
                    className="input_text"
                    type="text"
                    placeholder=""
                    name="project_name"
                    value={projectName}
                    onChange={e => setProjectName(e.target.value)}
                  />
                  <div className="flex row align-center">
                    {projectNameError && (
                      <div className="error text-align-end width100">
                        {projectNameErrorMessage}
                      </div>
                    )}
                  </div>
                </Form.Item>

                <Form.Item label="Description">
                  <textarea
                    rows="6"
                    className="textarea_text"
                    type="text"
                    placeholder=""
                    name="description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                  />
                  <div className="flex row align-center">
                    {descriptionError && (
                      <div className="error text-align-end width100">
                        {descriptionErrorMessage}
                      </div>
                    )}
                  </div>
                </Form.Item>

                <div className="flex justify-end">
                  <Button
                    type="primary"
                    loading={isLoading}
                    onClick={handleSubmit}
                  >
                    Save
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
export default connect(null, { addProject })(AddProject);
