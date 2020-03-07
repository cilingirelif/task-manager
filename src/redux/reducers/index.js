import { combineReducers } from "redux";
import projects from "./projects";
import tasks from "./tasks";

export default combineReducers({ projects, tasks });