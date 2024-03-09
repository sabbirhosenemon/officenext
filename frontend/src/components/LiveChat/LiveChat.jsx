import axios from "axios";
import Pusher from "pusher-js";
import React, { useEffect, useRef, useState } from "react";
import CardCustom from "../CommonUi/CardCustom";
import PageTitle from "../page-header/PageHeader";

const LiveChat = () => {
    const messageRef = useRef(null);
    const [responseMessages, setResponseMessages] = useState("");
    const [conversationId, setConversationId] = useState(null);

    useEffect(() => {
        const pusher = new Pusher("14e1f7268a3fb08c3090", {
            cluster: "ap1",
        });

        const channel = pusher.subscribe("my-channel");
        channel.bind("my-event", function (data) {
            console.log(data);
        });
    }, []);

    console.log(responseMessages);
    const sendMessage = async (e) => {
        e.preventDefault();
        const message = messageRef.current.value;

        await axios.post("http://127.0.0.1:8000/sendMessage", { message });
        messageRef.current.value = "";
    };
    return (
        <>
            <PageTitle title="Back" />
            <CardCustom>
                <div className="flex flex-row h-full mt-[-10px]">
                    <div className="bg-gray-200 w-1/4 p-4">
                        <h2 className="text-lg font-bold mb-4">Friends</h2>
                        <ul>
                            <li onClick={() => setConversationId(1)}>User 1</li>
                            <li onClick={() => setConversationId(2)}>User 2</li>
                            <li onClick={() => setConversationId(3)}>User 3</li>
                        </ul>
                    </div>

                    <div className="flex flex-col w-full mx-auto h-[350px]">
                        <div className="flex-1 overflow-y-auto bg-gray-100 p-4">
                            {/* Your existing code for rendering messages */}
                            {/* {responseMessages.map((message, index) => (
                        <div
                            key={index}
                            className={`mb-4 ${
                                message.sender === "user"
                                    ? "text-right"
                                    : "text-left"
                            }`}
                        >
                            <span className="bg-blue-500 text-white p-2 rounded-lg inline-block max-w-xs">
                                {message.text}
                            </span>
                        </div>
                    ))} */}

                            <div className="mb-4 text-right">
                                <span className="bg-green-700 text-white p-2 rounded-lg inline-block max-w-xs">
                                    {"hello from me"}
                                </span>
                            </div>
                            <div className="mb-4 text-left">
                                <span className="bg-blue-700 text-white p-2 rounded-lg inline-block max-w-xs">
                                    {"hi from him"}
                                </span>
                            </div>
                        </div>

                        <div>
                            <div className="relative">
                                <form onSubmit={sendMessage} className="flex">
                                    <input
                                        className="w-full border rounded-lg px-4 py-2 pr-12"
                                        type="text"
                                        ref={messageRef}
                                        placeholder="Enter your message"
                                    />
                                    <button
                                        className="absolute inset-y-0 right-0 bg-green-500 text-white px-4 py-2 rounded-lg rounded-l-none font-semibold"
                                        type="submit"
                                    >
                                        Send
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </CardCustom>
        </>
    );
};

export default LiveChat;
