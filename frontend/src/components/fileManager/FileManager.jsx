import {
    CloudDownloadOutlined,
    MinusSquareFilled,
    PlusSquareFilled,
} from "@ant-design/icons";
import axios from "axios";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import fileIcon from "../../assets/images/fileIcon.svg";
import folderIcon from "../../assets/images/folderIcon.svg";
import {
    fileManagerApi,
    useAddFileMutation,
    useGetFileQuery,
    useGetFoldersQuery,
} from "../../redux/rtk/features/fileManager/fileManagerApi";
import CommonDelete from "../CommonUi/CommonDelete";
import CreateDrawer from "../CommonUi/CreateDrawer";
import PageTitle from "../page-header/PageHeader";
import AddFolder from "./AddFolder";

const FileManager = () => {
    const { data, isLoading } = useGetFoldersQuery();
    const navigate = useNavigate();
    const filesRef = useRef(null);
    const [addFile, { isLoading: addFileLoading }] = useAddFileMutation();
    const {
        data: fileData,
        isLoading: fileDataLoading,
        refetch,
    } = useGetFileQuery();
    const [showAddOptions, setShowAddOptions] = useState(false);

    const handleDownloadFile = async (fileId, fileName) => {
        try {
            const response = await axios.get(`file/download/${fileId}`, {
                responseType: "blob",
            });

            const blob = new Blob([response.data], {
                type: response.headers["content-type"],
            });
            const url = window.URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", fileName);
            document.body.appendChild(link);
            link.click();

            window.URL.revokeObjectURL(url);
            document.body.removeChild(link);
        } catch (error) {
            console.error("Error downloading file:", error);
        }
    };

    const handleDoubleClick = (folderId) => {
        setShowAddOptions(false);
        navigate(`/admin/folderDetails/${folderId}`);
    };

    const handleAdd = () => {
        setShowAddOptions(!showAddOptions);
    };

    const handleFileChange = async (event) => {
        setShowAddOptions(false);

        const formData = new FormData();

        for (let i = 0; i < event.target.files.length; i++) {
            formData.append("files[]", event.target.files[i]);
        }

        const resp = await addFile(formData);
        if (resp.data && !resp.error) {
            refetch();
        }
    };

    const handleFileAddBtn = (event) => {
        filesRef.current.click();
    };

    return (
        <div className="relative">
            <div className="">
                <PageTitle title="Back" />
                <div className="bg-white rounded-lg mt-2 pb-20 flex flex-col gap-2">
                    <div className="bg-zinc-600 text-white mb-4 px-4 py-1 rounded-sm">
                        /
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-10 gap-4 p-4">
                        {data &&
                            !isLoading &&
                            data.map((folder) => (
                                <div key={folder.id} className="text-center">
                                    <button
                                        onDoubleClick={() =>
                                            handleDoubleClick(folder.id)
                                        }
                                        className="focus:outline-none"
                                    >
                                        <img
                                            src={folderIcon}
                                            alt="Folder Icon"
                                            className="w-12 h-12 mx-auto mb-2 shadow"
                                        />
                                        <span className="block text-[14px] text-gray-600">
                                            {folder.name}
                                        </span>
                                    </button>
                                </div>
                            ))}
                    </div>
                </div>

                {fileDataLoading ? (
                    <div>Loading...</div>
                ) : (
                    <div className="bg-white p-4 my-2 pb-20">
                        <h2 className="text-xl font-semibold mb-4 shadow-sm">
                            Files
                        </h2>
                        <div className="grid grid-cols-1 gap-4">
                            {fileData.length === 0 ? (
                                <div>No Files Found</div>
                            ) : (
                                fileData.map((file) => (
                                    <div
                                        key={file.id}
                                        className="bg-white rounded-md shadow-md p-4 grid grid-cols-2 "
                                    >
                                        <div className="flex items-center space-x-2">
                                            <img
                                                src={fileIcon}
                                                alt="Folder Icon"
                                                className="w-12 h-12"
                                            />
                                            <div className="w-full flex flex-col">
                                                <span>{file.name}</span>
                                                <span className="text-gray-500">
                                                    {file.size}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="mt-2 ml-auto flex gap-2">
                                            <CommonDelete
                                                permission={
                                                    "delete-fileManager"
                                                }
                                                deleteThunk={
                                                    fileManagerApi.endpoints
                                                        .deleteFile.initiate
                                                }
                                                id={file.id}
                                                navigatePath={`/admin/fileManager`}
                                            />
                                            <button
                                                className={`bg-green-600 h-8 w-8 flex justify-center items-center cursor-pointer p-2 text-white rounded-md`}
                                                onClick={() =>
                                                    handleDownloadFile(
                                                        file.id,
                                                        file.name
                                                    )
                                                }
                                            >
                                                <CloudDownloadOutlined
                                                    style={{ fontSize: "20px" }}
                                                />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}
            </div>
            <div className="absolute bottom-2 right-2">
                {showAddOptions && (
                    <div className="absolute right-12 bottom-0 mb-10 space-y-1">
                        <CreateDrawer
                            permission={"create-fileManager"}
                            title={"Add Folder"}
                            width={30}
                        >
                            <AddFolder />
                        </CreateDrawer>
                        <input
                            type="file"
                            name="files[]"
                            hidden
                            onChange={handleFileChange}
                            ref={filesRef}
                        />
                        <button
                            onClick={handleFileAddBtn}
                            className="bg-green-400 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                        >
                            + Add File
                        </button>
                    </div>
                )}

                {showAddOptions ? (
                    <button
                        onClick={handleAdd}
                        className=" text-red-400 hover:text-red-600 text-xl font-bold py-2 px-2 rounded-full m-2"
                    >
                        <MinusSquareFilled style={{ fontSize: "35px" }} />
                    </button>
                ) : (
                    <button
                        onClick={handleAdd}
                        className=" text-blue-400 hover:text-blue-600 text-xl font-bold py-2 px-2 rounded-full m-2"
                    >
                        <PlusSquareFilled style={{ fontSize: "35px" }} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default FileManager;
