import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import classes from "./Headnav.module.css";
import { useRef } from "react";
import { BiFoodMenu } from "react-icons/bi";

const Headnav = () => {
  const inputRef = useRef();
  const searchHandler = () => {
    console.log(inputRef.current.value);
  };
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#">
          <span>
            <BiFoodMenu />
            <h3 className={classes.head}>Recipe Book</h3>
          </span>
        </Navbar.Brand>
        {/* <Navbar.Toggle aria-controls="navbarScroll" /> */}
        <Form className="d-flex mx-auto" style={{ width: "50%" }}>
          <Form.Control
            type="search"
            placeholder="Find the best recipies across the web..."
            className="me-2"
            aria-label="Search"
            ref={inputRef}
            // style={{ width: '100%' }}
          />
          <Button onClick={searchHandler} variant="outline-success">
            Search
          </Button>
        </Form>
      </Container>
    </Navbar>
  );
};

export default Headnav;
