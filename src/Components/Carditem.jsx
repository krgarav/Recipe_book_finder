import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import { useState } from "react";
import classes from "./Carditem.module.css";
import { useDispatch, useSelector } from "react-redux";
import { recipeAction } from "../Store/recipe-slice";
// import { Navigate } from "react-router";
import { useNavigate } from "react-router";
const Carditem = (props) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCardClick = () => {
    dispatch(recipeAction.setDetailPage(props.item));
    navigate("/details");
  };
  return (
    <Card
      className={classes.card}
      onClick={handleCardClick}
      style={{ margin: "1rem"}}
    >
      {props.image && !imageLoaded ? (
        <Spinner
          className={classes.spinner}
          animation="grow"
          variant="primary"
        />
      ) : null}
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
        <Card.Title className={classes.title}>{props.title}</Card.Title>
        <hr />
        <Card.Text>
          <span style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: "0.9rem" }}>
              <span className={classes.highlight}>{props.calories} </span>{" "}
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
  );
};

export default Carditem;
