import { Card, Col, Row } from "antd";
import React from "react";
import checkTokenExp from "../../../utils/checkTokenExp";

const Dashboard = () => {
    const accessToken = localStorage.getItem("access-token");
    checkTokenExp(accessToken);
    return (
        <>
            <div>
                <div>
                    <div className="mb-3">
                        <Row>
                            <Col span={24}></Col>
                        </Row>
                    </div>
                    <div>
                        <Row gutter={[30, 30]}>
                            <Col
                                sm={24}
                                md={24}
                                lg={12}
                                span={24}
                                className="mb-auto"
                            >
                                <Card
                                    title="Total Employee"
                                    className=""
                                ></Card>
                            </Col>
                            <Col sm={24} md={24} lg={12} span={24}>
                                <Card title="Total Project"></Card>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
