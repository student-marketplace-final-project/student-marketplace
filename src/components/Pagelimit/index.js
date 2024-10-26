import React , {Component} from "react"
import {FormGroup,Input} from "reactstrap"

class PagelimitFilter extends Component {
    render(){
        const {onChangeSize } = this.props;
        return(
            <div>
                <FormGroup className="mb-0">
                    <Input type="select" name="select" id="selectentry" onChange={onChangeSize} style={{height:36,width:100}}>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                    </Input>
                </FormGroup>
            </div>
                
        )
    }
    
}
export default PagelimitFilter