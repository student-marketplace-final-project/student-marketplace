// CategoryModal.js
import React from 'react';
import { Card, CardBody, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import "./product.css"

const CategoryModal = () => {
  // Categories data
  const categories = [
    { name: 'Vehicles', icon: 'ri-car-line', path: '/addform' },
    { name: 'Accommodation', icon: 'ri-caravan-line', path: '/accommodation' },
    { name: 'Services', icon: 'ri-e-bike-2-line', path: '/services' },
    { name: 'Electronics', icon: 'fa-laptop', path: '/electronics' },
    { name: 'Furniture', icon: 'ri-macbook-line', path: '/profile' }
  ];

  return (
    <div className="category-modal-container">
      <Row className='justify-content-center'>
        <Col md={6}>
          <h2 className="category-title">Categories</h2>
          <div className="category-list">
            {categories.map((category, index) => (
              <Card key={index} className="category-card">
                <CardBody className="d-flex align-items-center">
                  <i className={classNames('fas', category.icon, 'category-icon')}></i>
                  <Link to={category.path} className="category-link">
                    {category.name}
                  </Link>
                </CardBody>
              </Card>
            ))}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CategoryModal;
