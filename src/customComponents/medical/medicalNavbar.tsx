import React from "react";
import { Nav, Navbar as BootstrapNavbar, NavDropdown } from "react-bootstrap";
import { Link, To } from "react-router-dom";

const medicalHomepage = "/medicalHomepage";

const MedicalNavbar: React.FC = () => {
  return (
    <>
      <Link to={medicalHomepage} className="nav-link text-lightblue fs-5">
        Medical Analysis Service
      </Link>
      <BootstrapNavbar expand="lg" bg="dark" variant="dark">
        {/* <BootstrapNavbar.Brand href="#">Your Brand</BootstrapNavbar.Brand> */}
        <br />
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown title="Emergency Detection" id="emergency-dropdown">
              <NavDropdown.Item href="/DetectMIEmergencies">
                Detect MI Emergencies
              </NavDropdown.Item>
              <NavDropdown.Item href="/GenerateExplanations">
                Generate Explanations
              </NavDropdown.Item>
              <NavDropdown.Item href="/DemoMIEmergency">Demo</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Medical Analysis" id="medical-dropdown">
              <NavDropdown.Item href="/VisualizeECG">
                Visualize ECG
              </NavDropdown.Item>
              <NavDropdown.Item href="/IdentifySegments">
                Identify Segments
              </NavDropdown.Item>
              <NavDropdown.Item href="/TickImportance">
                Tick Importance
              </NavDropdown.Item>
              <NavDropdown.Item href="/TimeImportance">
                Time Importance
              </NavDropdown.Item>
              <NavDropdown.Item href="/LeadImportance">
                Lead Importance
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#">Model Administration & Application</Nav.Link>
          </Nav>
        </BootstrapNavbar.Collapse>
      </BootstrapNavbar>{" "}
    </>
  );
};

export default MedicalNavbar;
