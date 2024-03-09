import { Input } from "antd";
import React from "react";

const CommonSearch = ({ setPageConfig }) => {
    const handler = (e) => {
        const keyField = e.target.value;
        setPageConfig((prev) => {
            return { ...prev, query: "search", key: keyField };
        });
    };
    return (
        <div className="rounded-md bg-white dark:bg-[#1C1B20]">
            <div className="flex justify-between py-2">
                <div className="flex gap-2 items-center ml-auto ">
                    <Input
                        onChange={handler}
                        className="text-zinc-700 font-medium w-full border-zinc-400"
                        placeholder="search"
                    />
                </div>
            </div>
        </div>
    );
};

export default CommonSearch;
