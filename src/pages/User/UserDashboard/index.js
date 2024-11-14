import React, { Component } from "react";
import {
  Col, Row, Card, CardBody, Button, Input,  Container, 
} from "reactstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import { Link } from "react-router-dom"
import './features.css'
import {  getProfileData } from "../../../Services/dashboardServices";

import { getAllAds } from "../../../Services/dashboardServices";
import Spinner from "../../../components/Custom/customLoader"
import HeaderFile from "../../../components/Custom/header";

class UserDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listings: [],
      userDetail:[],
      isLoading: false,
      search:""
    };
  }

  startLoading = () => {
    this.setState({ isLoading: true });
  }
  stopLoading = () => {
    this.setState({ isLoading: false });
  }

  componentDidMount = () => {
    this.startLoading();
    getAllAds()
      .then((response) => {
        const data = response.data;
        this.setState({ listings: data });
        this.stopLoading();
        getProfileData()
        .then((response)=>{
          const data=response.data;
          this.setState({userDetail:data})
        }).catch(()=>{})

        
      })
      .catch((err) => { this.stopLoading(); });
  };

  handleSubmit() {
    this.props.history.push(`/product/${this.props.history}`);
  };
  render() {
    console.log("----profiledataa--==>",this.state.userDetail)
    const { userDetail } = this.state;
    return (
      <React.Fragment>
        <HeaderFile props={this.props} />
        <div className="page-content">
          <Container fluid>
            <Row className="m-3">
              <Col className="search-board">
                <div className="search-box ml-2">
                  <div className="position-relative">
                    <Input type="text" className="form-control rounded" placeholder="I'm looking for....." />
                    <i className="mdi mdi-magnify search-icon"></i>
                    <Button>
                      Search
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>

              <Col xl={12} sm={12}>
                <Card className='list-card'>
                  {this.state.isLoading && <Spinner />}
                  <CardBody>
                    <div className="listings">
                      {this.state.listings.map(listing => (
                        <>
                          <div className="product-box most-popular">
                            <div className="p-2">
                              <img src={listing.image} alt="Product" className=" mx-auto d-block product-img" />
                            </div>
                            <div className='product-price product-in product-content'>
                              <span className='rates'>
                                {listing.price}
                              </span>
                            </div>

                            <div className="text-left">
                              <h5 className="font-size-20"><Link to={{
                                pathname: `/productDescription/${listing.ad_id}`,
                                state: { listing ,userDetail}
                              } // Pass the listing data here
                              } className="text-dark">{listing.title}</Link></h5>
                              <h5 className="font-size-15 mt-3 mb-0">{listing.location}</h5>
                            </div>
                          </div></>
                      ))}
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
export default UserDashboard;
