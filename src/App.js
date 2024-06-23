import styled from "styled-components";
import React, { useState } from "react";
import Axios from "axios";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';


const Container = styled.div`
display: flex;
flex-direction: column;
`;

const Header = styled.div`
  background-color: #c9a2bf;
  color: #500000;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 20px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
`;

const AppNameComponent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const AppIcon = styled.img`
width: 36px;
height: 36px;
margin: 2px;
`;

const SearchComponent = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  border-radius: 6px;
  margin-left: 20px;
  width: 50%;
  background-color: #fafae7;
`;

const SearchInput =styled.input`
border:none;
outline: none;
margin-left: 15px;
font-size: 16px;
font-weight: bold;
`;

const RecipeList = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
padding: 30px;
justify-content: space-evenly;
`;

const RecipeContainer = styled.div`
display: flex;
flex-direction: column;
padding: 10px;
width: 300px;
box-shadow: 0 3px 10px 0 #aaa;
gap:30px
`;

const Image = styled.div`
height: 180px;
`;

const RecipeName = styled.div`
font-size: 18px;
font-weight: bold;
color: #500000;
margin: 10px 0 
`;

const Ingredients = styled.div`
font-size: 18px;
border: solid 1px green;
color: #aea1ca;
margin: 10px 0;
cursor: pointer;
padding: 10px 15px;
border-radius: 3px;
color: #aea1ca;
text-align: center;
`;

const MoreText = styled.div`
font-size: 18px;
border: solid 1px red;
color: #aea1ca;
margin: 10px 0;
cursor: pointer;
padding: 10px 15px;
border-radius: 3px;
color: #aea1ca;
text-align: center;
`;
const Placeholder = styled.img`
  width: 200px;
  height: 200px;
  margin: 200px;
  opacity: 40%;`
;

const RecipeComponent = (props) => {
  const [show, setShow] = useState(false);
  const { recipeObj } = props;

  return (
    <>
      <Dialog open={show}>
        <DialogTitle id="alert-dialog-slide-title"> Ingredients</DialogTitle>
        <DialogContent>
          <table>
            <thead>
              <th>Ingredient</th>
              <th>Weight</th>
            </thead>
            <tbody>
              {recipeObj.ingredients.map((ingredientObj) => (
                <tr className="ingredient-list">
                  <td>{ingredientObj.text}</td>
                  <td>{ingredientObj.weight}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </DialogContent>
        <DialogActions>
          <MoreText onClick={() => setShow("")}>Close</MoreText>
        </DialogActions>
      </Dialog>
      <RecipeList>
        <RecipeContainer>
          <img src={recipeObj.image} alt="" />
          <RecipeName> {recipeObj.label}</RecipeName>
          <Ingredients onClick={() => setShow(true)}> Ingredients </Ingredients>
          <MoreText onClick={() => window.open(recipeObj.url)}>  See More </MoreText>
        </RecipeContainer>

      </RecipeList>
     </> 

  )
}


function App() {
  const [timeoutID, updateTimeoutID] = useState();
  const [recipeList, updateRecipeList] = useState([]);


const fetchRecipe = async(searchString) => {
  const response = await Axios.get(`https://api.edamam.com/api/recipes/v2?type=public&q=${searchString}&app_id=d36683aa&app_key=79ad56093b04baf4fbf0ce65f325194a`
  );
  updateRecipeList(response.data.hits);
};

  const textChange = (event) => {
    clearTimeout(timeoutID)
    const timeout = setTimeout(() => fetchRecipe(event.target.value), 400);
    updateTimeoutID(timeout);
  };

  return (
    <Container>
      <Header>
        <AppNameComponent>      
          <AppIcon src="/potion-svgrepo-com.svg" /> 
          Przepisownia Zuzanny Biniewskiej
        </AppNameComponent>

        <SearchComponent> 
          <AppIcon src="/search.svg" alt="search"/> 
          <SearchInput placeholder="search" onChange={textChange}/>
        </SearchComponent>

      </Header>

      <RecipeList>

{recipeList.length ?
  recipeList.map((recipeObj) => (
    <RecipeComponent recipeObj={recipeObj.recipe} />
  )) : <Placeholder src="cook.svg" />
}
        

      </RecipeList>
    
    </Container>
  );
}

export default App;
