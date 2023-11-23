import React from "react"
import PropTypes from 'prop-types'
import { Row, Col, BreadcrumbItem } from "reactstrap"

const Breadcrumb = props => {
  return (
    <Row className="py-2">
      <Col className="col-12">
        <div className="page-title-box d-sm-flex align-items-center justify-content-between">
          <h4 className="mb-sm-0 font-size-18"></h4>
          <div className="page-title-right">
            <ol className="breadcrumb m-0">
              <BreadcrumbItem>
                <a to="#">{props.title}</a>
              </BreadcrumbItem>
              <BreadcrumbItem active>
                <a>{props.breadcrumbItem}</a>
              </BreadcrumbItem>
            </ol>
          </div>
        </div>
      </Col>
    </Row>
  )
}

Breadcrumb.propTypes = {
  breadcrumbItem: PropTypes.string,
  title: PropTypes.string
}

export default Breadcrumb
