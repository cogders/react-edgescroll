import React from 'react';
import { Link, withRouter } from "react-router-dom";


 class Header extends React.Component {

    render() {
        let location = this.props.location.pathname;
        return (

<div className="topnav">
<span><Link style={location === '/' ? { background: 'rgba(53,153,228)' } : {}} to="/">Home</Link></span>
<span><Link style={location === '/dragdrop' ? { background: 'rgba(53,153,228)' } : {}} to="/dragdrop">Drag and Drop Example</Link></span>
<span><Link style={location === '/sortable' ? { background: 'rgba(53,153,228)' } : {}} to="/sortable">Sortable Example</Link></span>
<span><Link style={location === '/usage' ? { background: 'rgba(53,153,228)' } : {}} to="/usage">How to use</Link></span>
{this.props.children}
</div>

        )
    }
}

export default withRouter(Header)


