import { Button, Col, DatePicker, Form, Input, Row, Select } from "antd";

import { useGetDepartmentsQuery } from "../../redux/rtk/features/Department/departmentApi";
import { useGetDesignationsQuery } from "../../redux/rtk/features/designation/designationApi";
import { useGetRolesQuery } from "../../redux/rtk/features/role/roleApi";
import { useAddUserMutation } from "../../redux/rtk/features/user/userApi";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";

const AddUser = () => {
    const { Option } = Select;
    const { data: list } = useGetRolesQuery({ query: "all" });
    const { data: department } = useGetDepartmentsQuery({ query: "all" });
    const [addStaff, { isLoading }] = useAddUserMutation();

    //  to get designations from redux
    const { data: designation, isLoading: designationLoading } =
        useGetDesignationsQuery({ query: "all" });

    const [form] = Form.useForm();

    const onFinish = async (values) => {
        const FormData = {
            ...values,
            education: values.education || [],
        };
        try {
            const res = await addStaff(FormData);
            if (!res.error && res.data) {
                form.resetFields();
            }
        } catch (error) {}
    };

    const onFinishFailed = () => {};

    const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]; // blood groups

    return (
        <>
            <UserPrivateComponent permission={"create-user"}>
                <div
                    className="mr-top mt-5 p-5 ant-card "
                    style={{ maxWidth: "100%" }}
                >
                    <Form
                        size="small"
                        form={form}
                        name="basic"
                        labelCol={{
                            span: 7,
                        }}
                        wrapperCol={{
                            span: 22,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Row
                            gutter={{
                                xs: 8,
                                sm: 16,
                                md: 24,
                                lg: 32,
                            }}
                        >
                            <Col span={12} className="gutter-row form-color">
                                <h2 className="text-center text-xl mt-3 mb-3 txt-color">
                                    User Information
                                </h2>
                                <Form.Item
                                    style={{ marginBottom: "10px" }}
                                    label="First Name"
                                    name="firstName"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input First Name!",
                                        },
                                    ]}
                                >
                                    <Input placeholder="John" />
                                </Form.Item>
                                <Form.Item
                                    style={{ marginBottom: "10px" }}
                                    label="Last Name"
                                    name="lastName"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input Last Name!",
                                        },
                                    ]}
                                >
                                    <Input placeholder="Doe" />
                                </Form.Item>
                                <Form.Item
                                    style={{ marginBottom: "10px" }}
                                    label="User Name"
                                    name="username"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input User Name!",
                                        },
                                    ]}
                                >
                                    <Input placeholder="john_doe" />
                                </Form.Item>
                                <Form.Item
                                    style={{ marginBottom: "10px" }}
                                    label="Password"
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please input your password !",
                                        },
                                    ]}
                                >
                                    <Input placeholder="Strong Password" />
                                </Form.Item>
                                <Form.Item
                                    style={{ marginBottom: "10px" }}
                                    label="Email"
                                    name="email"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input email!",
                                        },
                                    ]}
                                >
                                    <Input placeholder="johndoe2@example.com" />
                                </Form.Item>
                                <Form.Item
                                    style={{ marginBottom: "10px" }}
                                    label="Phone"
                                    name="phone"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please Enter Phone Number!",
                                        },
                                    ]}
                                >
                                    <Input placeholder="015000000000" />
                                </Form.Item>
                            </Col>
                            <Col span={12} className="gutter-row">
                                <h2 className="text-center text-xl mt-3 mb-3 txt-color">
                                    Address Information
                                </h2>
                                <Form.Item
                                    style={{ marginBottom: "10px" }}
                                    label="Street"
                                    name="street"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input street!",
                                        },
                                    ]}
                                >
                                    <Input
                                        placeholder="123 Main Street"
                                        style={{ width: "100%" }}
                                    />
                                </Form.Item>
                                <Form.Item
                                    style={{ marginBottom: "10px" }}
                                    label="City"
                                    name="city"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input city!",
                                        },
                                    ]}
                                >
                                    <Input placeholder="Los Angeles" />
                                </Form.Item>
                                <Form.Item
                                    style={{ marginBottom: "10px" }}
                                    label="State"
                                    name="state"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input state!",
                                        },
                                    ]}
                                >
                                    <Input placeholder="CA" />
                                </Form.Item>
                                <Form.Item
                                    style={{ marginBottom: "10px" }}
                                    label="Zip Code"
                                    name="zipCode"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input Zip Code!",
                                        },
                                    ]}
                                >
                                    <Input placeholder="90211" />
                                </Form.Item>
                                <Form.Item
                                    style={{ marginBottom: "10px" }}
                                    label="Country"
                                    name="country"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input Country!",
                                        },
                                    ]}
                                >
                                    <Input placeholder="USA" />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row
                            gutter={{
                                xs: 8,
                                sm: 16,
                                md: 24,
                                lg: 32,
                            }}
                        >
                            <Col span={12} className="gutter-row">
                                <h2 className="text-center text-xl mt-3 mb-3 txt-color">
                                    {" "}
                                    Employee Information{" "}
                                </h2>
                                <Form.Item
                                    style={{ marginBottom: "10px" }}
                                    label="Joining Date"
                                    name="joinDate"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please input joining date!",
                                        },
                                    ]}
                                >
                                    <DatePicker className="date-picker hr-staffs-date-picker" />
                                </Form.Item>
                                <Form.Item
                                    style={{ marginBottom: "10px" }}
                                    label="Leave Date"
                                    name="leaveDate"
                                >
                                    <DatePicker className="date-picker hr-staffs-date-picker" />
                                </Form.Item>
                                <Form.Item
                                    style={{ marginBottom: "10px" }}
                                    label="Employee ID"
                                    name="employeeId"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please input Employee ID!",
                                        },
                                    ]}
                                >
                                    <Input placeholder="OE-012" />
                                </Form.Item>
                                <Form.Item
                                    style={{ marginBottom: "10px" }}
                                    label="Blood Group"
                                    name="bloodGroup"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please input Blood Group!",
                                        },
                                    ]}
                                >
                                    <Select
                                        placeholder="Select Blood Group"
                                        allowClear
                                        mode="single"
                                        size="middle"
                                        style={{
                                            width: "100%",
                                        }}
                                    >
                                        {bloodGroups.map((bloodGroup) => (
                                            <Option
                                                key={bloodGroup}
                                                value={bloodGroup}
                                            >
                                                {bloodGroup}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                {/* TODO: Add a Upload Seciton for Image */}
                                <Form.Item
                                    name={"departmentId"}
                                    style={{ marginBottom: "10px" }}
                                    label="Department"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input Department!",
                                        },
                                    ]}
                                >
                                    <Select
                                        loading={!department}
                                        placeholder="Select Department"
                                        allowClear
                                        size={"middle"}
                                    >
                                        {department &&
                                            department.map((department) => (
                                                <Option
                                                    key={department.id}
                                                    value={department.id}
                                                >
                                                    {department.name}
                                                </Option>
                                            ))}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input Department!",
                                        },
                                    ]}
                                    label="Role"
                                    name={"roleId"}
                                    style={{ marginBottom: "10px" }}
                                >
                                    <Select
                                        loading={!list}
                                        size="middle"
                                        mode="single"
                                        allowClear
                                        style={{
                                            width: "100%",
                                        }}
                                        placeholder="Please select"
                                    >
                                        {list &&
                                            list.map((role) => (
                                                <Option
                                                    key={role.id}
                                                    value={role.id}
                                                >
                                                    {role.name}
                                                </Option>
                                            ))}
                                    </Select>
                                    {/*<BigDrawer
										title={"new Role"}
										btnTitle={"Role"}
										children={<AddRole drawer={true} />}
											/> */}
                                </Form.Item>
                            </Col>
                            <Col span={12} className="gutter-row">
                                <h2 className="text-center text-xl mt-3 mb-3 txt-color">
                                    Designation Information
                                </h2>

                                <Form.Item
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please input Designation!",
                                        },
                                    ]}
                                    label="Designation"
                                    name={"designationId"}
                                    style={{ marginBottom: "10px" }}
                                >
                                    <Select
                                        loading={designationLoading}
                                        size="middle"
                                        mode="single"
                                        allowClear
                                        style={{
                                            width: "100%",
                                        }}
                                        placeholder="Please select Designation"
                                    >
                                        {designation &&
                                            designation.map((designation) => (
                                                <Option
                                                    key={designation.id}
                                                    value={designation.id}
                                                >
                                                    {designation.name}
                                                </Option>
                                            ))}
                                    </Select>
                                    {/*<BigDrawer
									title={"new Role"}
									btnTitle={"Role"}
									children={<AddRole drawer={true} />}
										/> */}
                                </Form.Item>
                                <Form.Item
                                    style={{ marginBottom: "10px" }}
                                    label="Designation Start Date"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input date!",
                                        },
                                    ]}
                                    name="designationStartDate"
                                >
                                    <DatePicker className="date-picker hr-staffs-date-picker" />
                                </Form.Item>

                                <Form.Item
                                    style={{ marginBottom: "10px" }}
                                    label="Designation End Date"
                                    name="designationEndDate"
                                >
                                    <DatePicker className="date-picker hr-staffs-date-picker" />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item
                            style={{ marginBottom: "10px", marginTop: "10px" }}
                            wrapperCol={{
                                offset: 4,
                                span: 16,
                            }}
                        >
                            <Button
                                className="mt-5"
                                size="large"
                                block
                                type="primary"
                                htmlType="submit"
                                shape="round"
                                loading={isLoading}
                            >
                                Add New Staff
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </UserPrivateComponent>
        </>
    );
};

export default AddUser;
