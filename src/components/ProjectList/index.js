import React from "react"
import { connect } from "react-redux"
import { Row, Col } from 'antd';
import { Link } from "react-router-dom/";

const ProjectList =({ projects }) => (
  <>
    <div className="wrapper">
      <Row className="width100">
        {
          projects && projects.length 
            ? projects.map((project,i) => {
              return (
                <Col  
                    key={i}  
                    xs={24}
                    sm={24}
                    md={12}
                    lg={8}
                    xl={8}
                    xxl={6}
                    span={6}>
                  <Link to={`/project/${project.id}/`}>
                    <div  className="box">
                        {project.name}
                    </div>
                  </Link>
                </Col>
              )})
            : <div className="flex column">
                <div>You have no projects</div>
                <Link className="link" to="add-project">Add a project</Link>
              </div>
        } 
      </Row>
    </div>
  </>
)

const mapStateToProps = state => {
    return {
      projects : state.projects.list,
    };
  };
export default connect(mapStateToProps)(ProjectList)