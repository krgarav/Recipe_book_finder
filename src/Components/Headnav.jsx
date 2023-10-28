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
const Headnav = () => {
  // const [state,setState]=useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputRef = useRef();
  const savedArrayList = useSelector((state) => state.recipe.savedList);
  const searchHandler = () => {
    const searchInput = inputRef.current.value;
    console.log("clicked")
    dispatch(search(searchInput));
    dispatch(recipeAction.setSavedState(false));
  };

  const savedRecipesHandler = () => {
    const savedItems = localStorage.getItem("saveditems")
      ? localStorage.getItem("saveditems")
      : [];
    if (savedItems.length > 0) {
      const savedList = JSON.parse(savedItems);
      console.log(savedList);

      dispatch(recipeAction.setSavedList(savedList));
    }
    dispatch(recipeAction.setSavedState(true));
    navigate("/",{replace:true});
    
  };
  return (
    <Navbar expand="lg" className="bg-body-tertiary" sticky="top">
      <Container fluid>
        <Navbar.Brand href="#">
          <span className={classes.title}>
            <BiFoodMenu className={classes.icon} />
            <h3 className={classes.head}>Recipe Book</h3>
          </span>
        </Navbar.Brand>
        <Form className="d-flex mx-auto" style={{ width: "50%" }}>
          <Form.Control
            type="search"
            placeholder="Find the best recipies across the web..."
            className="me-2"
            aria-label="Search"
            ref={inputRef}
          />
          <Button onClick={searchHandler} variant="outline-success">
            Search
          </Button>
        </Form>

        <Button onClick={savedRecipesHandler}>Saved Recipes</Button>
      </Container>
    </Navbar>
  );
};

export default Headnav;
