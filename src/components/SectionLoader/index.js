import React from "react"
import {Spinner} from "reactstrap"

const SectionLoader = () => (
    <div className=" loader d-flex justify-content-center loader-overlay">
        <Spinner/>
    </div>
)

export default SectionLoader