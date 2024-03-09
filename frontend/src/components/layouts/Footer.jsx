import { Col, Layout, Row } from "antd";

function Footer() {
  const { Footer: AntFooter } = Layout;
  const year = new Date().getFullYear();

  return (
    <AntFooter className="w-full max-w-[640px] mx-auto">
      <Row className="flex flex-col items-center lg:flex lg:flex-row lg:justify-center">
        <Col xs={24} md={24} lg={12} className="flex items-center">
          <p className="m-0">
            <a
              href="#"
              className="font-weight-bold"
              target="_blank"
              rel="noreferrer"
            >
              OfficeNext
            </a>
            . All rights reserved.
          </p>
        </Col>
      </Row>
    </AntFooter>
  );
}

export default Footer;
