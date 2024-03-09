import { Button, Form, Input, Modal } from "antd";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useUpdateFolderMutation } from "../../../../redux/rtk/features/fileManager/fileManagerApi";
import UserPrivateComponent from "../../../PrivateRoutes/UserPrivateComponent";
import BtnEditSvg from "../../Button/btnEditSvg";

const FolderEditPopup = ({ data }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { id } = useParams("id");
    const [updateFolder, { isLoading }] = useUpdateFolderMutation();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        const resp = await updateFolder({ id, values });

        if (resp) {
            navigate(-1);
            setInitialValues({
                name: values.name,
            });
            setIsModalOpen(false);
        }
    };

    const [initialValues, setInitialValues] = useState({ name: "" });

    const onFinishFailed = (errorInfo) => {
        toast.warning("Failed at edit folder name");
    };
    const showModal = () => {
        setInitialValues({ name: data?.folderName });
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <UserPrivateComponent permission={"update-fileManager"}>
            <button className="flex justify-center" onClick={showModal}>
                <BtnEditSvg size={38} />
            </button>
            <Modal
                title="Edit Folder"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form
                    style={{ marginBottom: "100px" }}
                    initialValues={initialValues}
                    name="basic"
                    labelCol={{
                        span: 6,
                    }}
                    wrapperCol={{
                        span: 12,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <div>
                        <Form.Item
                            style={{ marginBottom: "20px" }}
                            label="Name"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input Folder name!",
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
                                size="small"
                                htmlType="submit"
                                block
                                loading={isLoading}
                            >
                                Update Now
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            </Modal>
        </UserPrivateComponent>
    );
};
export default FolderEditPopup;
