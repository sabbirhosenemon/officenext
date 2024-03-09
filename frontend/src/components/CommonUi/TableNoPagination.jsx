import { Table } from "antd";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import ColVisibilityDropdown from "../Shared/ColVisibilityDropdown";

const TableNoPagination = ({
  columns,
  list,
  loading,
  csvFileName,
  leftElement,
  children,
}) => {
  // column select
  const [columnsToShow, setColumnsToShow] = useState([]);
  useEffect(() => {
    setColumnsToShow(columns);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const columnsToShowHandler = (val) => {
    setColumnsToShow(val);
  };

  return (
    <>
      <div className='mt-2'>
        <div className='pb-3'>
          <div className='w-full flex flex-col md:flex-row gap-2 items-center justify-between'>
            <div>{leftElement}</div>
            <div className='flex flex-col md:flex-row gap-2 items-center justify-between'>
              <div className='px-4 py-1 bg-black/80 text-white border rounded-md'>
                <CSVLink
                  data={list ? list : ""}
                  className='text-white font-bold py-1 px-3 rounded mr-2 '
                  style={{ marginTop: "5px" }}
                  filename={csvFileName}
                >
                  Download CSV
                </CSVLink>
              </div>
              <ColVisibilityDropdown
                options={columns}
                columns={columns}
                columnsToShowHandler={columnsToShowHandler}
              />
            </div>
          </div>
        </div>

        <Table
          loading={loading}
          columns={columnsToShow}
          dataSource={
            !!list?.length && list.map((item) => ({ ...item, key: item.id }))
          }
          pagination={
            list?.length >= 15
              ? {
                  position: ["bottomCenter"],
                  defaultPageSize: 15,
                  defaultCurrent: 1,
                }
              : false
          }
          scroll={{ x: 1000, y: window.innerHeight - 350 }}
        />
      </div>
      {children && children}
    </>
  );
};
export default TableNoPagination;
