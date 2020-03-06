import React from "react"
import { connect } from "react-redux"
import { Row, Col } from 'antd';
import { Link } from "react-router-dom/";

const ProjectList =({ projects }) => (

    <Row>
        <Col span={24}>
          <div className="flex row" style={{margin : `4rem 10rem 0`}}>
            {
              projects && projects.length 
                ? projects.map((project,i) => {
                  return <div key={i} style={{width:`200px`, height:`auto`, border:`1px solid black`,margin : `0 20px`}}>{project.content.projectName}</div>
                })
              : <div>
                  <div>You have no projects</div>
                  <Link to="add-project">Add a project</Link>
                </div>
            } 
          </div>
        
        </Col>
    </Row>

)

const mapStateToProps = state => {
    console.log(state)
    return {
      projects : state.projects.projects,
    };
  };
export default connect(mapStateToProps)(ProjectList)