import { Fragment } from "react";
import { Button, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import Headnav from "./Headnav";
import classes from "./Detailpage.module.css";
const Detailpage = () => {
  const recipeList = useSelector((state) => state.recipe.detailPage);
  const ingredientList = recipeList.recipe.ingredients.map((item, index) => {
    return <li key={index}>{item.text}</li>;
  });
  const nutrientArray = Object.entries(recipeList.recipe.totalNutrients).map(
    ([key, value]) => ({
      key,
      label: value.label,
      quantity: value.quantity,
      unit: value.unit,
    })
  );
  const nutritionList = nutrientArray.map((nutrient) => (
    <li key={nutrient.key}>
      {nutrient.label}: {Math.floor(nutrient.quantity)} {nutrient.unit}
    </li>
  ));
  const containerStyle = {
    backgroundImage: `url(${recipeList.recipe.image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
  const saveHandler = () => {
    const localStorageItem = localStorage.getItem("saveditems");
    const prevList = localStorageItem
      ? JSON.parse(localStorage.getItem("saveditems"))
      : [];
    const savedItems = [...prevList];
    // if (recipeList.length > 0) {
    savedItems.push(recipeList);
    // }
    const stringifiedArray = JSON.stringify(savedItems);
    // console.log(JSON.parse(stringifiedArray));
    localStorage.setItem("saveditems", stringifiedArray);
    // console.log(recipeList.recipe)
  };

  return (
    <Fragment>
      <Headnav />
      <br />
      <Container style={containerStyle} className={classes.container}>
        <div className={classes.overlay}>
          <div className={classes.firstbox} style={{ display: "flex" }}>
            <img src={recipeList.recipe.image} />
            <div>
              <h3>{recipeList.recipe.label}</h3>
              <Button onClick={saveHandler}>Save</Button>
            </div>
          </div>

          <br />
          <div className={classes.secondbox}>
            <div>
              <h4>{ingredientList.length} Ingredients</h4>
              <ul>{ingredientList}</ul>
            </div>
            <div>
              <h4> Nutrition</h4>
              <ul>{nutritionList}</ul>
            </div>
          </div>
        </div>
      </Container>
    </Fragment>
  );
};

export default Detailpage;
