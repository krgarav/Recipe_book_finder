import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import { Nav } from "react-bootstrap";
import classes from "./Headnav.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { BiFoodMenu } from "react-icons/bi";
import { search } from "../Store/recipe-slice";
import { recipeAction } from "../Store/recipe-slice";
import { useNavigate } from "react-router";
import { useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
const Headnav = () => {
  const [show, setShow] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputRef = useRef();
  const loadingState = useSelector((state) => state.recipe.loading);
  const searchHandler = () => {
    dispatch(recipeAction.setRecipeList([]));
    setShow(false);
    const searchInput = inputRef.current.value;
    console.log("clicked");
    dispatch(search(searchInput));
    dispatch(recipeAction.setSavedState(false));
    setShow(true);
  };

  const savedRecipesHandler = () => {
    const savedItems = localStorage.getItem("saveditems")
      ? localStorage.getItem("saveditems")
      : [];
    if (savedItems.length > 0) {
      const savedList = JSON.parse(savedItems);

      dispatch(recipeAction.setSavedList(savedList));
    }
    dispatch(recipeAction.setSavedState(true));
    navigate("/", { replace: true });
    setShow(false);
  };

  const handleBrandClick = () => {
    dispatch(recipeAction.setRecipeList([]));
    dispatch(recipeAction.setSavedList([]));
    dispatch(recipeAction.setSavedState(false));
    setShow(true);
    // navigate('/',{replace:true})
    console.log("Navbar.Brand clicked!");
  };
  return (
    <Navbar expand="lg" className="bg-body-tertiary" sticky="top">
      <Container className={classes.container} fluid>
        <NavLink to="/" className={classes.navLink} onClick={handleBrandClick}>
          <Navbar.Brand>
            <span className={classes.title}>
              <BiFoodMenu className={classes.icon} />
              <h3 className={classes.head}>Recipe Book</h3>
            </span>
          </Navbar.Brand>
        </NavLink>
        {/* <Navbar.Brand to="/" as={NavLink} onClick={handleBrandClick}>
          <span className={classes.title}>
            <BiFoodMenu className={classes.icon} />
            <h3 className={classes.head}>Recipe Book</h3>
          </span>
        </Navbar.Brand> */}
        <Form className="d-flex mx-auto" style={{ width: "50%" }}>
          <Form.Control
            type="search"
            placeholder="Find the best recipies across the web..."
            className="me-2"
            aria-label="Search"
            ref={inputRef}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                searchHandler();
                inputRef.current.blur();
              }
            }}
          />
          <Button
            onClick={searchHandler}
            disabled={loadingState}
            variant="outline-success"
          >
            {loadingState && <span>Searching...</span>}
            {!loadingState && <span>Search</span>}
            {/* <span>Search</span> */}
          </Button>
        </Form>

        <Button
          className={classes.savebtn}
          onClick={savedRecipesHandler}
          disabled={!show}
        >
          Saved Recipes
        </Button>
      </Container>
    </Navbar>
  );
};

export default Headnav;
