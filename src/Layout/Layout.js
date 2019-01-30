import React, {Component} from 'react';
import './Layout.css';
import MainSection from './MainSection';
import SidePanel from './SidePanel';
import { BrowserRouter as Router } from "react-router-dom";

class Layout extends Component {
    render() {
        return (
            <Router>
                <div className="layout">
                    <section id="side-panel">
                        <SidePanel/>
                    </section>
                    <section id="main-panel">
                       <MainSection />
                    </section>
                </div>
            </Router>

        );
    }
}

export default Layout;