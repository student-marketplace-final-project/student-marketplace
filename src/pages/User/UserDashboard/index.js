import React, { Component } from "react";
import {
  Col, Row, Card, CardBody, Button, Input, Container, Dropdown, DropdownMenu, DropdownItem, DropdownToggle,
} from "reactstrap";
import { Link, withRouter } from "react-router-dom"
import './features.css'
import { getProfileData } from "../../../Services/dashboardServices";
import { getAllAds } from "../../../Services/dashboardServices";
import Spinner from "../../../components/Custom/customLoader"
import HeaderFile from "../../../components/Custom/header";


class UserDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listings: [],
      userDetail: [],
      isLoading: false,
      search: "",
      Filter: "",
      category: '',
      minPrice: "",
      maxPrice: "",
      isDropdownOpen: false,
      searchTerm: '',
      sortBy: ""
    };
  }

  startLoading = () => {
    this.setState({ isLoading: true });
  }
  stopLoading = () => {
    this.setState({ isLoading: false });
  }

  searchFunction = (value) => {
    console.log("input value", this.props.props)
    this.setState({ search: value })
  }
  minPriceFunction = (value) => {
    this.setState({ minPrice: value })
  }
  maxPriceFunction = (value) => {
    this.setState({ maxPrice: value })
  }
  toggleDropdown = () => {
    this.setState((prevState) => ({
      isDropdownOpen: !prevState.isDropdownOpen
    }));
  };

  selectCategory = (category) => {
    this.setState({
      selectedCategory: category,
      isDropdownOpen: false
    });
  };

  handleSearchChange = (e) => {
    this.setState({ searchTerm: e.target.value });
  };

  componentDidMount = (prevState) => {
    
    const { category, minPrice, maxPrice, sortBy } = this.state;
    console.log(`?category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}&sortBy=${sortBy}`);
    if (category || minPrice || maxPrice || sortBy !== undefined) {
      this.startLoading();
      getAllAds(`?category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}&sortBy=${sortBy}`)
        .then((response) => {
          const data = response.data;
          console.log("=====> searchhhh", data)
          this.setState({ listings: data });
          this.stopLoading();
          getProfileData()
            .then((response) => {
              const data = response.data;
              this.setState({ userDetail: data })
            }).catch(() => { })
        })
        .catch((err) => { this.stopLoading(); });
    }
  };

  handleSubmit() {
    this.props.props.history.push(`/product`);
  };
  render() {
    const data = this.props.props;
    console.log("---json", this.state.category, this.state.minPrice, this.state.maxPrice, this.state.sortBy);
    const { userDetail } = this.state;
    return (
      <React.Fragment>
        <HeaderFile props={this.props.props} />
        <div className="page-content">
          <Container fluid>
            <Row className="m-3">
              <Col className="search-board">
                <div className="search-bar">
                  <div className="category-dropdown">
                    <Dropdown
                      isOpen={this.state.singlebtn1}
                      toggle={() =>
                        this.setState({ singlebtn1: !this.state.singlebtn1 })
                      }
                    >
                      <DropdownToggle color="light">
                        <span className="category-icon">☰</span>
                        All Categories
                        <span className="dropdown-icon">▼</span>
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem onClick={() =>
                          this.setState({ category: "Vehicles" })
                        }>Vehicles</DropdownItem>
                        <DropdownItem onClick={() =>
                          this.setState({ category: "Accomodation" })
                        }>Accommodation</DropdownItem>
                        <DropdownItem onClick={() =>
                          this.setState({ category: "Electronics" })
                        }>Electronics</DropdownItem>
                        <DropdownItem onClick={() =>
                          this.setState({ category: "Furniture" })
                        }>Furniture</DropdownItem>
                        <DropdownItem onClick={() =>
                          this.setState({ category: "Services" })
                        }>Services</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>

                  </div>
                  <input
                    type="text"
                    className="search-input"
                    placeholder="I'm looking for..."
                    onChange={(e) => this.searchFunction(e.target.value)}
                  />

                  <div className="radius-dropdown">

                    <Dropdown
                      isOpen={this.state.singlebtn2}
                      toggle={() =>
                        this.setState({ singlebtn2: !this.state.singlebtn2 })
                      }
                    >
                      <DropdownToggle color="light">
                        Price
                        <span className="dropdown-icon">▼</span>
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem>Minimum Price <br /><input placeholder="price" type="number" name="minPrice" style={{ width: 80 }} onChange={(e) => this.minPriceFunction(e.target.value)}></input></DropdownItem>
                        <DropdownItem>Maximum Price <br /><input placeholder="price" type="number" name="maxPrice" style={{ width: 80 }} onChange={(e) => this.maxPriceFunction(e.target.value)}></input></DropdownItem>
                        <DropdownItem onClick={() =>
                          this.setState({ sortBy: "priceLowToHigh" })
                        }>High to Low</DropdownItem>
                        <DropdownItem onClick={() =>
                          this.setState({ sortBy: "priceHighToLow" })
                        }>Low to High</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                  <button className="search-button">🔍</button>
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
                                state: { listing, userDetail }
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
