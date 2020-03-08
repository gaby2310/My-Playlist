import React from 'react';
import Alert from "react-bootstrap/Alert";

const Header = (props) => {
    return(
        <Alert variant="secondary">
            Hello, {props.username}
        </Alert>
    );
};

export default Header;