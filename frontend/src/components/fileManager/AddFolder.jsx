import { Button, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import React from "react";
import { toast } from "react-toastify";
import { useAddFolderMutation } from "../../redux/rtk/features/fileManager/fileManagerApi";

const AddFolder = ({ parentId }) => {
    const [addFolder, { isLoading }] = useAddFolderMutation();

    const parentFolderId = parentId ? parentId : null;

    const [form] = useForm();
    const onFinish = async (values) => {
        values.parentFolderId = parentFolderId;
        const res = await addFolder(values);
        if (!res.error && res.data) {
            form.resetFields();
        }
    };

    const onFinishFailed = (errorInfo) => {
        toast.warning("Failed at adding folder");
    };
    return (
        <div>
            <Form
                form={form}
                style={{ marginBottom: "100px" }}
                name="basic"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <div>
                    <Form.Item
                        style={{ marginBottom: "20px" }}
                        label="Folder Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Please input folder name!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        style={{ marginBottom: "10px" }}
                        wrapperCol={{
                            offset: 6,
                            span: 12,
                        }}
                    >
                        <Button
                            type="primary"
                            size="large"
                            htmlType="submit"
                            block
                            loading={false}
                        >
                            Add New Role
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </div>
    );
};

export default AddFolder;
