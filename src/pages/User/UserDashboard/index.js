import React, { Component } from "react";
import { Row, Col, Card, Input, Button, Container, CardBody } from "reactstrap";


import { Link } from "react-router-dom"
import './features.css'
//Import Product Images
import product1 from "../../../assets/images/product/img-1.png";
//Import Logos 
import uonlogo from "../../../assets/images/uon-logo-square.png";


class Usage extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };

  }

  handleSubmit(values) {
    this.props.history.push('/product');

  };


  render() {
    return (
      <React.Fragment>

        <header id="page-topbar">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: "#007db7" }}  >
            <div className="d-flex">
              <div className="navbar-brand-box">
                <Link to="/" className="logo logo-dark">
                  <span className="logo-lg">
                    <img src={uonlogo} alt="UON MARKETPLACE" height="100" />
                  </span>
                </Link>
              </div>
            </div>
            <div className="d-flex custom-btn"  >
              <Button style={{ backgroundColor: "black", textDecorationColor: "white", height: 50, width: 100 }} onClick={(values) => this.handleSubmit(values)} >{"Post Ad"}</Button>
              <Link to="/profile">
              <i class="ri-user-settings-fill" style={{fontSize:"30px",color:"#fff",padding:"20px",backgroundColor:"#007db7"}}></i>
             </Link>
            </div>
          </div>
        </header>
        <div className="page-content">
          <Container fluid>
            <Row className="m-3">
              <Col className="search-board">

                <div className="search-box ml-2">
                  <div className="position-relative">
                    <Input type="text" className="form-control rounded" placeholder="I'm looking for....." />
                    <i className="mdi mdi-magnify search-icon"></i>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <Card>
                  <CardBody>
                    <div>
                      <Row>
                        <Col md={6}>
                          <div>
                            <h5>Clothes & Accessories</h5>
                          </div>
                        </Col>
                      </Row>

                      <ul className="list-inline my-3 ecommerce-sortby-list justify-content-center">
                        <li className="list-inline-item active ml-1"><Link to="#">Home</Link></li>
                        <li className="list-inline-item ml-1"><Link to="/productDescription">Recently Viewed</Link></li>
                        <li className="list-inline-item ml-1"><Link to="#">Watchlist</Link></li>
                        <li className="list-inline-item ml-1"><Link to="#">Saved Searches</Link></li>
                      </ul>

                      <Row className="no-gutters">
                        <Col xl={4} sm={6}>
                          <div className="product-box most-popular">
                            <div className="p-2">
                              <img src={product1} alt="" className="img-fluid mx-auto d-block product-img" />
                            </div><div className='product-price product-in product-content'>
                              <span className='rates'>
                                {"$" + 100}
                              </span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <div className="text-left">
                                <h5 className="font-size-20"><Link to="#" className="text-dark">Full sleeve T-shirt</Link></h5>
                                <h5 className="font-size-15 mt-3 mb-0">Newcastle</h5>
                              </div>

                              <div  >
                                <Link to="#">
                                  <i className="ri-heart-line" style={{ fontSize: '40px' }}></i>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </Col>


                        <Col xl={4} sm={6}>
                          <div className="product-box most-popular">
                            <div className="p-2">
                              <img src={product1} alt="" className="img-fluid mx-auto d-block product-img" />
                            </div><div className='product-price product-in product-content'>
                              <span className='rates'>
                                {"$" + 100}
                              </span>
                            </div>


                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <div className="text-left">
                                <h5 className="font-size-20"><Link to="#" className="text-dark">Full sleeve T-shirt</Link></h5>
                                <h5 className="font-size-15 mt-3 mb-0">Newcastle</h5>
                              </div>

                              <div>
                                <Link to="#">
                                  <i className="ri-heart-line" style={{ fontSize: '40px' }}></i>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col xl={4} sm={6}>
                          <div className="product-box most-popular">
                            <div className="p-2">
                              <img src={product1} alt="" className="img-fluid mx-auto d-block product-img" />
                            </div><div className='product-price product-in product-content'>
                              <span className='rates'>
                                {"$" + 100}
                              </span>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <div className="text-left">
                                <h5 className="font-size-20"><Link to="#" className="text-dark">Full sleeve T-shirt</Link></h5>
                                <h5 className="font-size-15 mt-3 mb-0">Newcastle</h5>
                              </div>

                              <div  >
                                <Link to="#">
                                  <i className="ri-heart-line" style={{ fontSize: '40px' }}></i>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </Col>


                      </Row>
                    </div>
                  </CardBody>
                </Card>
               
              </Col>
            </Row>
          </Container>

        </div>
      </React.Fragment>
    )
  }
}
export default Usage;
