import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Carditem from "./Carditem";
import Container from "react-bootstrap/esm/Container";
import { Col, Row, Spinner } from "react-bootstrap";
import { recipeAction } from "../Store/recipe-slice";
const Products = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(recipeAction.setResult(true))
  },[])
  const savedState = useSelector((state) => state.recipe.savedState);
  const loadingState = useSelector((state) => state.recipe.loading);
  const resultState = useSelector((state) => state.recipe.result);
  // console.log(savedState);
  const recipeList = savedState
    ? useSelector((state) => state.recipe.savedList)
    : useSelector((state) => state.recipe.recipeList);

  const elements = recipeList.map((item, index) => {
    const calories = Math.floor(+item.recipe.calories);
    const length = item.recipe.ingredients.length;
    console.log(item.recipe.images.THUMBNAIL.url)
    return (
      <Col xs={12} sm={6} md={4} lg={3} key={index}>
        <Carditem
          title={item.recipe.label}
          image={item.recipe.images.SMALL.url}
          // image={item.recipe.image}
          calories={calories}
          ingredients={length}
          source={item.recipe.source}
          item={item}
        />
      </Col>
    );
  });

  return (
    <Fragment>
      <Container>
        {elements.length > 0 && (
          <Row style={{ alignSelf: "center" }}>{elements}</Row>
        )}
        {elements.length === 0 && !savedState &&resultState && (
          <Row style={{ textAlign: "center" }}>
            <h2>Search for the recipe.</h2>
          </Row>
        )}
        {elements.length === 0 && !savedState && !resultState && !loadingState&&  (
          <Row style={{ textAlign: "center" }}>
            <h2>No recipe found for the entered keyword .</h2>
          </Row>
        )}
        {elements.length === 0 && savedState && (
          <Row style={{ textAlign: "center" }}>
            <h2>No saved recipe present.</h2>
          </Row>
        )}
          {elements.length === 0 && loadingState && (
          <Spinner animation="grow"/>
        )}
      </Container>
    </Fragment>
  );
};

export default Products;
