import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";

import Login from "./components/user/Login";
import Logout from "./components/user/Logout";
import UserList from "./components/user/user";

import "./assets/styles/main.css";
import "./assets/styles/responsive.css";

import Page404 from "./components/404/404Page";
import Dashboard from "./components/Dashboard/Graph/Dashboard";
import DetailStaff from "./components/user/detailsStaff";

import Designation from "./components/designation/designation";
import DetailDesignation from "./components/designation/detailDesignation";
import UpdateDesignation from "./components/designation/updateDesignation";

import Main from "./components/layouts/Main";

import WelcomePage from "./components/UI/welcomePage";
import Department from "./components/department/Department.js.jsx";
import DetailDepartment from "./components/department/DetailsDepartment";
import AddPermission from "./components/role/AddPermission";
import DetailRole from "./components/role/DetailsRole";
import RoleList from "./components/role/role";
import GetAllUsers from "./components/user/GetAllUser";

import LiveChat from "./components/LiveChat/LiveChat.jsx"; // not yet implemented properly
import UserPrivateRoute from "./components/PrivateRoutes/UserPrivateRoute";
import FileManager from "./components/fileManager/FileManager.jsx";
import FolderDetails from "./components/fileManager/FolderDetails.jsx";
import KanbanBoard2 from "./components/kanbanBoard/KanbanBoard2";
import AddProject from "./components/project/AddProject";
import UpdateProject from "./components/project/UpdateProject";
import UpdateStatus from "./components/project/UpdateStatus";
import UpdateMilestone from "./components/project/milestone/UpdateMilestone";
import Milestone from "./components/project/milestone/milestone";
import Project from "./components/project/project";
import UpdateTaskPriority from "./components/project/taskPriority/UpdateTaskPriority";
import TaskPriority from "./components/project/taskPriority/taskPriority";
import UpdateTaskStatus from "./components/project/taskStatus/UpdateTaskStatus";
import TaskStatus from "./components/project/taskStatus/taskStatus";
import Task from "./components/project/tasks/tasks";
import DetailProjectTeam from "./components/project/team/DetailProjectTeam";
import ProjectTeam from "./components/project/team/ProjectTeam";
import InvoiceSetting from "./components/settings/invoiceSetting.jsx";

function App() {
    return (
        <div className="App container-fluid">
            <ToastContainer
                position="bottom-left"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <BrowserRouter>
                {/* <TestComp/> */}
                <>
                    <Main>
                        <Routes>
                            <Route path="/" element={<WelcomePage />} />
                            <Route
                                path="/admin/dashboard"
                                element={<Dashboard />}
                            ></Route>
                            <Route path="/admin" element={<Dashboard />} />

                            <Route path="*" element={<Page404 />} />

                            <Route
                                path="/admin/auth/login"
                                exact
                                element={<Login />}
                            />
                            <Route
                                path="/admin/auth/logout"
                                exact
                                element={<Logout />}
                            />
                            {/*         <Route path='/auth/register' exact element={<Register />} /> */}
                            <Route
                                element={
                                    <UserPrivateRoute
                                        permission={"create-user"}
                                    />
                                }
                            >
                                <Route
                                    path="/admin/hr/staffs/new"
                                    exact
                                    element={<UserList />}
                                />
                            </Route>
                            <Route
                                element={
                                    <UserPrivateRoute
                                        permission={"readAll-user"}
                                    />
                                }
                            >
                                <Route
                                    path="/admin/hr/staffs"
                                    exact
                                    element={<GetAllUsers />}
                                />
                            </Route>
                            <Route
                                element={
                                    <UserPrivateRoute
                                        permission={"readSingle-user"}
                                    />
                                }
                            >
                                <Route
                                    path="/admin/hr/staffs/:id"
                                    exact
                                    element={<DetailStaff />}
                                />
                            </Route>
                            <Route
                                element={
                                    <UserPrivateRoute
                                        permission={"readAll-rolePermission"}
                                    />
                                }
                            >
                                <Route
                                    path="/admin/role"
                                    exact
                                    element={<RoleList />}
                                />
                            </Route>
                            <Route
                                element={
                                    <UserPrivateRoute
                                        permission={"readSingle-rolePermission"}
                                    />
                                }
                            >
                                <Route
                                    path="/admin/role/:id"
                                    element={<DetailRole />}
                                />
                            </Route>
                            <Route
                                element={
                                    <UserPrivateRoute
                                        permission={"create-rolePermission"}
                                    />
                                }
                            >
                                <Route
                                    path="/admin/role/permit/:id/"
                                    element={<AddPermission />}
                                />
                            </Route>
                            <Route
                                element={
                                    <UserPrivateRoute
                                        permission={"readAll-department"}
                                    />
                                }
                            >
                                <Route
                                    path="/admin/department"
                                    exact
                                    element={<Department />}
                                />
                            </Route>
                            <Route
                                element={
                                    <UserPrivateRoute
                                        permission={"readSingle-department"}
                                    />
                                }
                            >
                                <Route
                                    path="/admin/department/:id"
                                    element={<DetailDepartment />}
                                />
                            </Route>
                            <Route
                                element={
                                    <UserPrivateRoute
                                        permission={"readAll-designation"}
                                    />
                                }
                            >
                                <Route
                                    path="/admin/designation"
                                    exact
                                    element={<Designation />}
                                />
                            </Route>

                            <Route
                                element={
                                    <UserPrivateRoute
                                        permission={"readSingle-designation"}
                                    />
                                }
                            >
                                <Route
                                    path="/admin/designation/:id"
                                    element={<DetailDesignation />}
                                />
                            </Route>
                            <Route
                                element={
                                    <UserPrivateRoute
                                        permission={"update-designation"}
                                    />
                                }
                            >
                                <Route
                                    path="/admin/designation/:id/update"
                                    element={<UpdateDesignation />}
                                />
                            </Route>

                            <Route
                                element={
                                    <UserPrivateRoute
                                        permission={"readAll-setting"}
                                    />
                                }
                            >
                                <Route
                                    path="/admin/company-setting"
                                    exact
                                    element={<InvoiceSetting />}
                                />
                            </Route>

                            {/* === === === === PROJECT MANAGEMENT STARTED HERE === === === ===*/}

                            {/* === === === Kanban Routes === === === */}
                            <Route
                                element={
                                    <UserPrivateRoute
                                        permission={"readSingle-project"}
                                    />
                                }
                            >
                                <Route
                                    path="/admin/kanban/:projectId"
                                    element={<KanbanBoard2 />}
                                />
                            </Route>
                            {/* <Route
							path='/admin/kanban2/:projectId'
							element={<KanbanBoard2 />}
						/>
 */}
                            {/* === === === Project Routes === === === */}
                            <Route
                                element={
                                    <UserPrivateRoute
                                        permission={"readAll-project"}
                                    />
                                }
                            >
                                <Route
                                    path="/admin/project"
                                    element={<Project />}
                                />
                            </Route>

                            <Route
                                element={
                                    <UserPrivateRoute
                                        permission={"create-project"}
                                    />
                                }
                            >
                                <Route
                                    path="/admin/project/new"
                                    element={<AddProject />}
                                />
                            </Route>

                            <Route
                                element={
                                    <UserPrivateRoute
                                        permission={"update-project"}
                                    />
                                }
                            >
                                <Route
                                    path="/admin/project/update/:projectId"
                                    element={<UpdateProject />}
                                />
                            </Route>

                            <Route
                                path="/admin/project/update/:projectId/status"
                                element={<UpdateStatus />}
                            />

                            {/* === === === Project Milestone === === === */}

                            <Route
                                element={
                                    <UserPrivateRoute
                                        permission={"readAll-project"}
                                    />
                                }
                            >
                                <Route
                                    path="/admin/project/:id/milestone"
                                    element={<Milestone isFixed={true} />}
                                />
                            </Route>

                            {/* === === === Project Task Status === === === */}

                            <Route
                                element={
                                    <UserPrivateRoute
                                        permission={"readAll-project"}
                                    />
                                }
                            >
                                <Route
                                    path="/admin/project/:id/task-status"
                                    element={<TaskStatus isFixed={true} />}
                                />
                            </Route>

                            {/* === === === Team Routes === === === */}

                            <Route
                                element={
                                    <UserPrivateRoute
                                        permission={"readAll-projectTeam"}
                                    />
                                }
                            >
                                <Route
                                    path="/admin/team"
                                    element={<ProjectTeam />}
                                />
                            </Route>

                            <Route
                                element={
                                    <UserPrivateRoute
                                        permission={"readSingle-projectTeam"}
                                    />
                                }
                            >
                                <Route
                                    path="/admin/team/:id"
                                    element={<DetailProjectTeam />}
                                />
                            </Route>
                            {/* <Route path='/admin/team/update/:id' element={<DetailProjectTeam />} /> */}

                            {/* === === === Milestone Routes === === === */}

                            <Route
                                element={
                                    <UserPrivateRoute
                                        permission={"create-milestone"}
                                    />
                                }
                            >
                                <Route
                                    path="/admin/milestone"
                                    element={<Milestone />}
                                />
                            </Route>

                            <Route
                                element={
                                    <UserPrivateRoute
                                        permission={"update-milestone"}
                                    />
                                }
                            >
                                <Route
                                    path="/admin/milestone/update/:id"
                                    element={<UpdateMilestone />}
                                />
                            </Route>

                            {/* <Route path="/admin/milestone/:id" element={<DetailProject />} /> */}

                            <Route
                                element={
                                    <UserPrivateRoute
                                        permission={"create-task"}
                                    />
                                }
                            >
                                <Route path="/admin/task" element={<Task />} />
                            </Route>

                            {/* === === === TaskStatus Routes === === === */}

                            <Route
                                element={
                                    <UserPrivateRoute
                                        permission={"readAll-taskStatus"}
                                    />
                                }
                            >
                                <Route
                                    path="/admin/task-status"
                                    element={<TaskStatus />}
                                />
                            </Route>

                            <Route
                                element={
                                    <UserPrivateRoute
                                        permission={"update-taskStatus"}
                                    />
                                }
                            >
                                <Route
                                    path="/admin/task-status/update/:id"
                                    element={<UpdateTaskStatus />}
                                />
                            </Route>

                            {/* === === === TaskPriority Routes === === === */}

                            <Route
                                element={
                                    <UserPrivateRoute
                                        permission={"readAll-priority"}
                                    />
                                }
                            >
                                <Route
                                    path="/admin/task-priority"
                                    element={<TaskPriority />}
                                />
                            </Route>

                            <Route
                                element={
                                    <UserPrivateRoute
                                        permission={"update-priority"}
                                    />
                                }
                            >
                                <Route
                                    path="/admin/task-priority/update/:id"
                                    element={<UpdateTaskPriority />}
                                />
                            </Route>

                            {/* live chat route */}
                            <Route
                                element={
                                    <UserPrivateRoute
                                        permission={"update-priority"}
                                    />
                                }
                            >
                                <Route
                                    path="/admin/liveChat"
                                    element={<LiveChat />}
                                />
                            </Route>

                            {/* file manager route */}
                            <Route
                                element={
                                    <UserPrivateRoute
                                        permission={"readAll-fileManager"}
                                    />
                                }
                            >
                                <Route
                                    path="/admin/fileManager"
                                    element={<FileManager />}
                                />
                            </Route>
                            <Route
                                element={
                                    <UserPrivateRoute
                                        permission={"readAll-fileManager"}
                                    />
                                }
                            >
                                <Route
                                    path="/admin/folderDetails/:id"
                                    element={<FolderDetails />}
                                />
                            </Route>

                            {/* <Route path='/admin/project-team' eclement={<ProjectTeam />} /> */}

                            {/* === === === Task Routes === === === */}
                            {/* <Route path="/admin/task" element={<Task />} /> */}
                            {/* <Route path="/admin/task/:id" element={<DetailTask />} />  */}
                        </Routes>
                    </Main>
                </>
            </BrowserRouter>
        </div>
    );
}

export default App;
