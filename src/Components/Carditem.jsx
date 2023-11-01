import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import Figure from "react-bootstrap/Figure";
import { Fragment, useState } from "react";
import classes from "./Carditem.module.css";
import { useDispatch, useSelector } from "react-redux";
import { recipeAction } from "../Store/recipe-slice";
import { useNavigate } from "react-router";
import { CloseButton } from "react-bootstrap";
const Carditem = (props) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const savedList = useSelector((state) => state.recipe.savedList);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCardClick = () => {
    dispatch(recipeAction.setDetailPage(props.item));
    navigate("/details");
  };
  const handleClose = () => {
    // console.log(props.item.recipe)
    const updatedProduct = savedList.filter(
      (item) => item.recipe.label !== props.item.recipe.label
    );

    dispatch(recipeAction.setSavedList(updatedProduct));
    localStorage.setItem("saveditems", JSON.stringify(updatedProduct));
  };

  return (
    <Fragment>
      <div style={{ position: "relative" }}>
        <Card
          className={classes.card}
          onClick={handleCardClick}
          style={{
            margin: "0.1rem",
            backgroundColor:
              "linear-gradient(to bottom right, lightgrey, white)",
          }}
        >
          {props.state && (
            <CloseButton
              onClick={(event) => {
                event.stopPropagation(); // Stop event propagation here
                handleClose();
              }}
              className={`${classes.closebtn} `}
        

            />
          )}
          {props.image && !imageLoaded ? (
            <Figure>
              <Figure.Image
                width={"300"}
                height={"300"}
                style={{ backgroundColor: "gray" }}
                className={classes.figure}
                // alt="171x180"
                // src="holder.js/171x180"
              />
              <Spinner
                className={classes.spinner}
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            </Figure>
          ) : // <Spinner
          //   className={classes.spinner}
          //   animation="grow"
          //   variant="primary"
          // />
          null}
          <Card.Img
            className={`${classes.image} my-2`}
            style={{
              display: imageLoaded ? "block" : "none",
              maxWidth: "100%",
              width: "95%",
            }}
            variant="top"
            src={props.image}
            onLoad={() => setImageLoaded(true)}
          />
          <Card.Body>
            <Card.Title>
              <h3 className={classes.title}>{props.title}</h3>
            </Card.Title>
            <hr />
            <Card.Text>
              <span
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <span style={{ fontSize: "0.9rem" }}>
                  <span className={classes.highlight}>{props.calories} </span>
                  {/* <span></span> */}
                  CALORIES
                </span>
                <span style={{ fontSize: "0.9rem" }}>
                  <span className={classes.highlight}>{props.ingredients}</span>{" "}
                  INGREDIENTS
                </span>
              </span>
            </Card.Text>
            <hr />
            <h5 style={{ color: "grey" }}>{props.source}</h5>
          </Card.Body>
        </Card>
      </div>
    </Fragment>
  );
};

export default Carditem;
