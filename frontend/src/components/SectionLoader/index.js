import React from "react"
import {Spinner} from "reactstrap"

//section loader for perticular card data
const SectionLoader = () => (
    <div className=" loader d-flex justify-content-center loader-overlay">
        <Spinner/>
    </div>
)

export default SectionLoader