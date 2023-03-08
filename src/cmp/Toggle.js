import { useState } from 'react';
import MaterialUISwitch from "@material-ui/core/Switch";
import obj from './config'
const Toggle = (props) => {
    const [toggle, setToggle] = useState(JSON.parse(localStorage.getItem(props.for)) === true ? true : false)
    const toggler = () => {
        let bool = !toggle
        setToggle(bool)
        console.log(toggle)
    }
    return (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <label>
                {props.label}
            </label>
            <MaterialUISwitch
                color="primary"
                checked={toggle}
                onClick={toggler}

            ></MaterialUISwitch>
        </div>
    )
}

export default Toggle