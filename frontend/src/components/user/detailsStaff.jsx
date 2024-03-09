import {
    CalendarOutlined,
    HomeOutlined,
    MailOutlined,
    PhoneOutlined,
    TeamOutlined,
    ThunderboltOutlined,
    TrophyOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Alert, Col, Row } from "antd";
import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";
import BtnDeleteSvg from "../UI/Button/btnDeleteSvg";
import Loader from "../loader/loader";
import PageTitle from "../page-header/PageHeader";

import EmployeeDesignation from "../UI/EmployeeDesignation";
import DesignationEditPopup from "../UI/PopUp/DesignationEditPopup";
import ProfileEditPopup from "../UI/PopUp/ProfileEditPopup";

import { useEffect } from "react";
import {
    useDeleteUserMutation,
    useGetUserQuery,
} from "../../redux/rtk/features/user/userApi";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";

//PopUp

const DetailStaff = () => {
    const { id } = useParams();
    let navigate = useNavigate();

    const { data: user, isError: error, isLoading } = useGetUserQuery(id);
    const [onDelete, { isSuccess }] = useDeleteUserMutation();

    useEffect(() => {
        isSuccess && navigate("/admin/hr/staffs");
    }, [isSuccess, navigate]);

    return (
        <div>
            <UserPrivateComponent permission={"readSingle-user"}>
                <PageTitle title=" Back  " />

                {user && !isLoading ? (
                    <div className="mr-top">
                        <section>
                            <div className="flex justify-between ant-card rounded h-auto mr-8">
                                {/* Profile Card */}

                                <div className="flex justify-start">
                                    {/*	<img
										src='https://cdn-icons-png.flaticon.com/512/2202/2202112.png'
										alt='profile'
										className='rounded-full h-40 w-40 m-5'
									/> */}
                                    <div className="flex justify-center py-8 px-4 mt-4 ml-4">
                                        <div className="flex flex-col items-around">
                                            <h1 className="text-2xl font-bold txt-color-2 mb-1">
                                                {(
                                                    user?.firstName +
                                                    " " +
                                                    user?.lastName
                                                ).toUpperCase()}
                                            </h1>
                                            <h2 className="text-base font-medium txt-color-secondary mb-1">
                                                {user?.designationHistory[0]
                                                    ?.designation?.name ||
                                                    "No Designation"}
                                            </h2>
                                            <h3 className="text-base font-medium txt-color-secondary">
                                                {user?.department?.name ||
                                                    "No Department"}
                                            </h3>
                                            <h3 className="text-base font-medium txt-color-secondary">
                                                {user?.employeeId ||
                                                    "No Employee ID"}
                                            </h3>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}

                                <div className="">
                                    <div className="flex justify-center py-8 px-4 mt-10 mr-4">
                                        <UserPrivateComponent permission="update-user">
                                            <button className="mr-2 mt-2">
                                                {user && (
                                                    <ProfileEditPopup
                                                        data={user}
                                                    />
                                                )}
                                            </button>
                                        </UserPrivateComponent>
                                        <UserPrivateComponent permission="delete-user">
                                            <button
                                                onClick={() => onDelete(id)}
                                            >
                                                <BtnDeleteSvg size={30} />
                                            </button>
                                        </UserPrivateComponent>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <Row
                            className="mt-5"
                            gutter={{
                                xs: 8,
                                sm: 16,
                                md: 24,
                                lg: 32,
                                xl: 32,
                            }}
                        >
                            <Col
                                xs={24}
                                sm={12}
                                md={12}
                                lg={11}
                                xl={11}
                                className="new-card rounded h-auto m-2"
                            >
                                <div className=" txt-color-2 text-xl text-center mt-5 ">
                                    Personal Information
                                </div>

                                <hr className="mt-3 mb-3 new-hr" />

                                <div className="m-5">
                                    <ul className="space-y-4">
                                        <li className="flex items-center">
                                            <TeamOutlined
                                                className="mr-3"
                                                style={{ fontSize: "15px" }}
                                            />
                                            <span className="txt-color-2 font-medium">
                                                Department:
                                            </span>
                                            <p className="txt-color-secondary ml-2">
                                                {user?.department?.name}
                                            </p>
                                        </li>
                                        <li className="flex items-center">
                                            <TrophyOutlined
                                                className="mr-3"
                                                style={{ fontSize: "15px" }}
                                            />
                                            <span className="txt-color-2 font-medium">
                                                Employment Status:
                                            </span>
                                            <p className="txt-color-secondary ml-2">
                                                {user?.employmentStatus?.name}
                                            </p>
                                        </li>

                                        <li className="flex items-center">
                                            <CalendarOutlined
                                                className="mr-3"
                                                style={{ fontSize: "15px" }}
                                            />
                                            <span className="txt-color-2 font-medium">
                                                Join Date :
                                            </span>
                                            <p className="txt-color-secondary ml-2">
                                                {dayjs(user?.joinDate).format(
                                                    "DD/MM/YYYY"
                                                )}
                                            </p>
                                        </li>

                                        <li className="flex items-center">
                                            <CalendarOutlined
                                                className="mr-3"
                                                style={{ fontSize: "15px" }}
                                            />
                                            <span className="txt-color-2 font-medium">
                                                Leave Date:
                                            </span>
                                            <p className="txt-color-secondary ml-2">
                                                {user?.leaveDate
                                                    ? dayjs(
                                                          user?.leaveDate
                                                      ).format("DD/MM/YYYY")
                                                    : "PRESENT"}
                                            </p>
                                        </li>

                                        <li className="flex items-center">
                                            <UserOutlined
                                                className="mr-3"
                                                style={{ fontSize: "15px" }}
                                            />
                                            <span className="txt-color-2 font-medium">
                                                Role :
                                            </span>
                                            <p className="txt-color-secondary ml-2">
                                                {user?.role?.name || "No Role"}
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                            </Col>
                            <Col
                                xs={24}
                                sm={12}
                                md={12}
                                lg={12}
                                xl={12}
                                className="new-card rounded h-auto m-2"
                            >
                                <div className="txt-color-2 text-xl text-center mt-5 ">
                                    Contact Information
                                </div>

                                <hr className="mt-3 mb-3 new-hr" />
                                <div className="m-5">
                                    <ul className="space-y-4">
                                        <li className="flex items-center">
                                            <MailOutlined
                                                className="mr-3"
                                                style={{ fontSize: "15px" }}
                                            />
                                            <span className="txt-color-2 font-medium">
                                                Email:
                                            </span>
                                            <p className="txt-color-secondary  ml-2">
                                                {user?.email || "No Email"}
                                            </p>
                                        </li>
                                        <li className="flex items-center">
                                            <PhoneOutlined
                                                className="mr-3"
                                                style={{ fontSize: "15px" }}
                                            />
                                            <span className="txt-color-2 font-medium">
                                                Phone:
                                            </span>
                                            <p className="txt-color-secondary ml-2">
                                                {user?.phone || "No Phone"}
                                            </p>
                                        </li>

                                        <li className="flex items-start">
                                            <HomeOutlined
                                                className="mr-3"
                                                style={{ fontSize: "15px" }}
                                            />
                                            <span className="txt-color-2 font-medium">
                                                Address:
                                            </span>
                                            <div className="">
                                                <li className="txt-color-secondary ml-2">
                                                    {" "}
                                                    Street :{" "}
                                                    {user?.street ||
                                                        "No Address"}
                                                </li>
                                                <li className="txt-color-secondary ml-2">
                                                    {" "}
                                                    City :{" "}
                                                    {user?.city || "No Address"}
                                                </li>
                                                <li className="txt-color-secondary ml-2">
                                                    {" "}
                                                    State :{" "}
                                                    {user?.state ||
                                                        "No Address"}
                                                </li>
                                                <li className="txt-color-secondary ml-2">
                                                    {" "}
                                                    Country :{" "}
                                                    {user?.country ||
                                                        "No Address"}
                                                </li>

                                                <li className="txt-color-secondary ml-2">
                                                    {" "}
                                                    Zip Code :{" "}
                                                    {user?.zipCode ||
                                                        "No Address"}
                                                </li>
                                            </div>
                                        </li>

                                        <li className="flex items-center">
                                            <ThunderboltOutlined
                                                className="mr-3"
                                                style={{ fontSize: "15px" }}
                                            />
                                            <span className="txt-color-2 font-medium">
                                                Blood Group:
                                            </span>
                                            <p className="txt-color-secondary ml-2">
                                                {user?.bloodGroup ||
                                                    "No Blood Group"}
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                            </Col>
                            <Col
                                xs={24}
                                sm={12}
                                md={12}
                                lg={11}
                                xl={11}
                                className="new-card rounded h-auto m-2"
                            >
                                <div className="flex justify-between">
                                    <div className="txt-color-2 text-xl text-center mt-5 ">
                                        Designation History
                                    </div>

                                    <UserPrivateComponent
                                        permission={"update-designationHistory"}
                                    >
                                        {user?.designationHistory && (
                                            <DesignationEditPopup
                                                data={user?.designationHistory}
                                            />
                                        )}
                                    </UserPrivateComponent>
                                </div>
                                <hr className="mt-3 mb-3 new-hr" />
                                <div className="flex justify-start ml-10">
                                    {user?.designationHistory?.length !== 0 ? (
                                        <EmployeeDesignation
                                            list={user?.designationHistory}
                                        />
                                    ) : (
                                        <div className="mb-10">
                                            <p className="text-center mt-3 mb-3">
                                                No Designation History Found
                                            </p>
                                            <Alert
                                                message="Not found , Click on edit button to add new"
                                                type="info"
                                                showIcon
                                            />
                                        </div>
                                    )}
                                </div>
                            </Col>
                        </Row>
                    </div>
                ) : (
                    <div className="mt-10">
                        {isLoading && !error && <Loader />}
                        {error && (
                            <p className="text-center mt-3 mb-3">
                                No Data Found
                            </p>
                        )}
                    </div>
                )}
            </UserPrivateComponent>
        </div>
    );
};

export default DetailStaff;
