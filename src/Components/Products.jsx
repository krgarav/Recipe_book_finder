import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import Carditem from "./Carditem";
import Container from "react-bootstrap/esm/Container";
import { Col, Row } from "react-bootstrap";
const Products = () => {
  const recipeList = useSelector((state) => state.recipe.recipeList);
  const elements = recipeList.map((item, index) => {
    const calories = Math.floor(+item.recipe.calories);
    const length = item.recipe.ingredients.length;
    console.log(calories,length);
    
    return (
      <Col xs={12} sm={6} md={4} lg={3} key={index}>
        <Carditem
          title={item.recipe.label}
          image={item.recipe.image}
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
        <Row>{elements}</Row>
        {/* <div className="row justify-content-between">{elements}</div> */}
      </Container>
    </Fragment>
  );
};

export default Products;
