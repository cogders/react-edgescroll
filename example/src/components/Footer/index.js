import React from 'react';

class Footer extends React.Component {

    render() {
        return (
            <div className="footer-wrapper">
                <div className="footer">
                    <span>Made by <a style={{ color: '#fff' }} href="http://github.com/cogders" target="_blank" rel="noopener noreferrer">github.com/cogders</a></span>
                </div>
                {this.props.children}
            </div>
        )
    }
}

export default Footer;


