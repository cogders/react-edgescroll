import React, { Component } from 'react';
import logo from '../../assets/logo.svg';
import ReactTooltip from 'react-tooltip'
import dragDropGif from '../../assets/edgescroll-dragdrop.gif';
import sortGif from '../../assets/edgescroll-sort.gif';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faDiscord } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faInfoCircle, faCopy } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";

class Home extends Component {

  state = {
    whichGif: false
  }

  render() {
    const whichGif = this.state.whichGif;

    const showDragDropGif = () => {
      this.setState({ whichGif: false })
    }

    const showSortableGif = () => {
      this.setState({ whichGif: true })
    }

    const toggleGifs = () => {
      const whichGif = this.state.whichGif;
      this.setState({ whichGif: !whichGif })
    }

    const copyToClipboard = (e) => {
      var range = document.createRange();
      range.selectNode(document.getElementById(`${e}`));
      window.getSelection().removeAllRanges(); // clear current selection
      window.getSelection().addRange(range); // to select text
      document.execCommand("copy");
      window.getSelection().removeAllRanges();// to deselect
    }

    const howToInstall = `npm install edgescroll --save`
    const howToUse = `import EdgeScroll from 'edgescroll'`

    return (
      <div className="home-screen-wrapper">
        <div className="home-screen-left-part">
          <span style={{ fontSize: '1.5em' }}>EdgeScroll React Component</span>
          <span className="home-switch-wrapper">
            <span 
              onClick={showDragDropGif}
              style={whichGif
              ? { marginRight: '6px', cursor: 'pointer' }
              : { textDecoration: 'underline', marginRight: '6px', cursor: 'pointer' }}>
              Drag&Drop Preview
                  </span>
            <label className="home-switch">
              <input onClick={toggleGifs} type="checkbox" checked={this.state.whichGif} />
              <span style={{ color: 'yellow' }} className="home-slider round"></span>
            </label>
            <span 
              onClick={showSortableGif}
              style={!whichGif
              ? { marginLeft: '6px', cursor: 'pointer' }
              : { textDecoration: 'underline', marginLeft: '6px', cursor: 'pointer' }}>
              Sortable Preview
                  </span>
          </span>
          <img src={whichGif
            ? sortGif
            : dragDropGif
          }
            className="example-gif" alt="Example GIF" />
        </div>
        <div className="home-screen-right-part">
          <h2>Made by</h2>
          <img src={logo} style={{ width: '50%' }} alt="logo" />
          <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: '25px' }}>
            <a href="http://github.com/cogders"><span><FontAwesomeIcon icon={faGithub} className="fa-custom" />github.com/cogders</span></a>
            <a href="http://bit.ly/cogders"><span><FontAwesomeIcon icon={faDiscord} className="fa-custom" />bit.ly/cogders</span></a>
            <a href="mailto:cogders@gmail.com"><span><FontAwesomeIcon icon={faEnvelope} className="fa-custom" />cogders@gmail.com</span></a>
          </div>

          {/* NOTE: see how to use js markup the best */}
            <span style={{ fontSize: '20px' }}>How to use <Link to="/usage"><sup><FontAwesomeIcon data-tip="Learn more about usage" icon={faInfoCircle} className="fa-info-circle" /></sup></Link></span>
           <span style={{ display: 'flex' }}>
            <SyntaxHighlighter id="howToInstall">
             {howToInstall}
            </SyntaxHighlighter>
            <FontAwesomeIcon className="fa-copy-clipboard" data-tip="Copy to clipboard" icon={faCopy} onClick={() => copyToClipboard("howToInstall")} />
            </span>
            <span style={{ display: 'flex' }}>
            <SyntaxHighlighter id="howToUse" language="javascript">
              {howToUse}
            </SyntaxHighlighter>
            <FontAwesomeIcon className="fa-copy-clipboard" data-tip="Copy to clipboard" icon={faCopy} onClick={() => copyToClipboard("howToUse")} />
            </span>
        </div>
        <ReactTooltip />
      </div>
    )
  }
}

export default Home;
