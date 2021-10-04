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
                                <Link to="/HistoricData" style={{ textDecoration: "none" }}> 
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

                <div className="div-section-2">

                    <div className="div-power-production">

                        <div>

                            <h1 className="body-title">Solar Power Production Calculator</h1>

                            <div style={{display: "flex", paddingTop: "1rem"}}>

                                <div>
                                    <h2 className="h2-calculator-attribute">Solar Board Power (W)</h2>
                                    <div style={{display: "flex"}}>
                                        <input className="calculator-input"></input>
                                        <h2 className="h2-calculator-attribute" style={{paddingLeft: "1rem", paddingTop: "0.2rem"}}>X</h2>
                                    </div>
                                </div>

                                <div style={{paddingLeft: "1rem"}}>
                                    <h2 className="h2-calculator-attribute">Time of solar Exposure (h/day)</h2>
                                    <div style={{display: "flex"}}>
                                        <input className="calculator-input"></input>
                                        <h2 className="h2-calculator-attribute" style={{paddingLeft: "1rem", paddingTop: "0.2rem"}}>X</h2>
                                    </div>
                                </div>

                                <div style={{paddingLeft: "1rem"}}>
                                    <h2 className="h2-calculator-attribute">Efficiency</h2>
                                    <div style={{display: "flex"}}>
                                        <input value="80" className="calculator-input" style={{width: "2rem"}}></input>
                                        <h2 className="h2-calculator-attribute" style={{paddingLeft: "0.5rem", paddingTop: "0.2rem"}}>%</h2>
                                    </div>
                                </div>

                            </div>

                            <div style={{marginTop: "2rem"}}>
                                <Button variant="outlined" style={{color: "white", borderColor: "white"}}>Calculate</Button>
                            </div>
                            
                        </div>

                    </div>

                </div>

            </div>

        )

    }
}

export default LandingPage;