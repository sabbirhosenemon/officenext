import {
  HomeOutlined,
  SettingOutlined,
  UserOutlined,
  UserSwitchOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";
import getPermissions from "../../utils/getPermissions";
import getUserFromToken from "../../utils/getUserFromToken";

const Sidenav = ({ color, sideNavOpenKeys }) => {
  const user = getUserFromToken();
  const permissions = getPermissions();
  const hasPermission = (item) => {
    return permissions?.includes(item ? item : "");
  };
  // console.log("haspermission", hasPermission("create-user"));
  const menu = [
    {
      label: (
        <NavLink to="/admin/dashboard">
          <span>Dashboard</span>
        </NavLink>
      ),
      key: "dashboard",
      icon: <HomeOutlined />,
    },

    (hasPermission("create-user") ||
      hasPermission("readAll-user") ||
      hasPermission("readAll-role") ||
      hasPermission("readAll-designation") ||
      hasPermission("readAll-department")) && {
      label: "HR",
      key: "hr",
      icon: <UserOutlined />,
      children: [
        hasPermission("create-user") && {
          label: (
            <NavLink to="/admin/hr/staffs/new">
              <span>New Employee</span>
            </NavLink>
          ),

          key: "staffs",
          icon: <UsergroupAddOutlined />,
        },
        hasPermission("readAll-user") && {
          label: (
            <NavLink to="/admin/hr/staffs">
              <span>Employee List</span>
            </NavLink>
          ),
          key: "users",
          icon: <UsergroupAddOutlined />,
        },
        hasPermission("readAll-role") && {
          label: (
            <NavLink to="/admin/role">
              <span>Role & Permissions</span>
            </NavLink>
          ),
          key: "roleAndPermissions",
          icon: <UserSwitchOutlined />,
        },
        hasPermission("readAll-designation") && {
          label: (
            <NavLink to="/admin/designation/">
              <span>Designation</span>
            </NavLink>
          ),
          key: "designation",
          icon: <UserSwitchOutlined />,
        },
        hasPermission("readAll-department") && {
          label: (
            <NavLink to="/admin/department">
              <span>Department</span>
            </NavLink>
          ),
          key: "department",
          icon: <UserSwitchOutlined />,
        },
      ],
    },

    (hasPermission("create-project") ||
      hasPermission("readAll-project") ||
      hasPermission("create-projectTeam") ||
      hasPermission("create-milestone") ||
      hasPermission("readAll-priority") ||
      hasPermission("create-task-Status")) && {
      label: "PROJECT",
      key: "PROJECT",
      icon: <SettingOutlined />,
      children: [
        hasPermission("create-project") && {
          label: (
            <NavLink to="/admin/project/new">
              <span>Add Project</span>
            </NavLink>
          ),
          key: "project",
          icon: <SettingOutlined />,
        },
        hasPermission("readAll-project") && {
          label: (
            <NavLink to="/admin/project">
              <span>All Project</span>
            </NavLink>
          ),
          key: "allProject",
          icon: <SettingOutlined />,
        },
        hasPermission("create-projectTeam") && {
          label: (
            <NavLink to="/admin/team">
              <span>Team</span>
            </NavLink>
          ),
          key: "team",
          icon: <SettingOutlined />,
        },
        (hasPermission("create-priority") ||
          hasPermission("readAll-priority")) && {
          label: (
            <NavLink to="/admin/task-priority">
              <span>Task Priority</span>
            </NavLink>
          ),
          key: "taskPriority",
          icon: <SettingOutlined />,
        },
        hasPermission("create-milestone") && {
          label: (
            <NavLink to="/admin/milestone">
              <span>Add Milestone</span>
            </NavLink>
          ),
          key: "milestone",
          icon: <SettingOutlined />,
        },

        hasPermission("create-taskStatus") && {
          label: (
            <NavLink to="/admin/task-status">
              <span>Add Task Status</span>
            </NavLink>
          ),
          key: "taskStatus",
          icon: <SettingOutlined />,
        },
      ],
    },

    hasPermission("readAll-fileManager") && {
      label: "FILE MANAGER",
      key: "fileManager",
      icon: <SettingOutlined />,
      children: [
        hasPermission("readAll-fileManager") && {
          label: (
            <NavLink to="/admin/fileManager">
              <span>FILE MANAGER</span>
            </NavLink>
          ),
          key: "fileManager",
          icon: <SettingOutlined />,
        },
      ],
    },

    hasPermission("readAll-setting") && {
      label: "LIVE CHAT",
      key: "liveChat",
      icon: <SettingOutlined />,
      children: [
        hasPermission("readAll-setting") && {
          label: (
            <NavLink to="/admin/liveChat">
              <span>LIVE CHAT</span>
            </NavLink>
          ),
          key: "liveChat",
          icon: <SettingOutlined />,
        },
      ],
    },

    hasPermission("readAll-setting") && {
      label: "SETTINGS",
      key: "settings",
      icon: <SettingOutlined />,
      children: [
        hasPermission("readAll-setting") && {
          label: (
            <NavLink to="/admin/company-setting">
              <span>Company Settings</span>
            </NavLink>
          ),
          key: "invoiceSetting",
          icon: <SettingOutlined />,
        },
      ],
    },
  ];

  return (
    <div>
      <Menu
        theme="dark"
        mode="inline"
        items={menu}
        className="sidenav-menu "
        // openKeys={[sideNavOpenKeys]}
        // style={{ backgroundColor: "transparent" }}
      />
    </div>
  );
};

export default Sidenav;
