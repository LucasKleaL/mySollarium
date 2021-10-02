import { React, Component } from "react";
import { Link } from "react-router-dom";

import "./../../styles/global.css";
import "./../../styles/landingPage.css";

import { Button } from "@material-ui/core";
import { RemoveRedEye, BarChart, ExitToApp } from "@material-ui/icons";
import Box from "@material-ui/core/Box";

class LandingPage extends Component {

    constructor(props) {

        super(props);
        this.state = {

        }

    }

    render() {

        return (

            <div>

                <div className="landing-page-wallpaper">

                    <header>

                        <div style={{ width: "100%" }}>
                        </div>

                        <div className="div-header-icons">

                            <Box m={1} >
                                <Link to="/SunlightMonitoring" style={{ textDecoration: "none" }}> 
                                    <Button className="header-button" title="Historic data">
                                        <BarChart fontSize="medium" style={{ color: "white" }}/>
                                        <h1 className="header-button-text">Historic data</h1>
                                    </Button>
                                </Link>
                            </Box>

                            <Box m={1}>
                                <Link to="/SunlightMonitoring" style={{ textDecoration: "none" }}> 
                                    <Button className="header-button" title="Sunlight monitoring">
                                        <RemoveRedEye fontSize="medium" style={{ color:"white" }}/>
                                        <h1 className="header-button-text">Sunlight monitoring</h1>
                                    </Button>
                                </Link>
                            </Box>

                            <Box m={1}>
                                <Button className="header-button" title="Login">
                                    <ExitToApp fontSize="medium" style={{ color: "white" }}/>
                                </Button>
                            </Box>

                        </div>

                    </header>

                    <div style={{paddingLeft: "8rem"}}>
                        <h1 className="landing-page-title">A transition to clean energy is about making an investment in our future.</h1>
                        <Link to="/nasaPower" style={{ textDecoration: "none" }} >
                            <Button style={{color: "#011223", marginTop: "1rem"}} variant="contained">
                                See the NASA's POWER data
                            </Button>
                        </Link>
                    </div>

                </div>

            </div>

        )

    }
}

export default LandingPage;