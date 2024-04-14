
const searchBtn=document.getElementById("srch_btn");
const dishList=document.getElementById("dish");
const dishDetailsContent = document.querySelector('.dish_details_content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

searchBtn.addEventListener('click',getMealList);
dishList.addEventListener('click',getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    dishDetailsContent.parentElement.classList.remove('showRecipe');
});


function getMealList()
{
    let inp=document.getElementById("srch_inp").value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${inp}`)
    .then(response => response.json())
    .then(data=>{
        let html="";
        
        if(inp==="")
        {
            html1 = "Please choose an item!";
            html="";
            document.getElementById('not_found').innerHTML=html1;    
        }
        else if(data.meals)
        {
            document.getElementById('not_found').innerHTML="<h1 class = 'head3'>Some dishes with your favourite ingredient are here</h1>";
            data.meals.forEach(dish => {
                html += `
                    
                    <div id= "dish" data-id = "${dish.idMeal}">
                        <div class = "dish_item">
                            <div class = "dish_img">
                                <img src = "${dish.strMealThumb}" alt = "food">
                            </div>
                            <div class = "dish_name">
                                <h3>${dish.strMeal}</h3>
                                <a href = "#" class = "recipe_btn" id="${dish.idMeal}">Get Recipe</a>
                            </div>
                        </div>
                    </div>
                `;
            });
            dishList.classList.add('result');
        }
        else
        {
            html1 = "Sorry, we didn't find any meal!";
            html="";
            document.getElementById('not_found').innerHTML=html1;
            // dishList.classList.remove('result');
        }
        dishList.innerHTML = html;
    });
}

function getMealRecipe(e)
{
    e.preventDefault();
    // console.log(e.target);
    if(e.target.classList.contains('recipe_btn'))
    {
        let mealItem = e.target.parentElement.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealRecipeModal(data.meals));
    }

    
}

function mealRecipeModal(dish){
    dish = dish[0];
    console.log(dish);
    let html="";
    html += `
        <div id="recipe">
            <button type = "button" onclick="click_btn()" class = "recipe_close_btn" id = "recipe_close_btn" >
                <i class = "fas fa-times"></i>
            </button>
            <h3>${dish.strMeal}</h3>
            <h3>${dish.strCategory}</h3>
            <div class = "recipe_instruct">
                <h3>Instructions:</h3>
                <p>${dish.strInstructions}</p>
            </div>
            <div class = "recipe_dish_img">
                <img src = "${dish.strMealThumb}" alt = "">
            </div>
            <div class = "recipe_link">
                <a href = "${dish.strYoutube}" class = "recipe_btn1" target = "_blank">Watch Video</a>
            </div>
        </div>
    `;    
    dishDetailsContent.innerHTML = html;
    dishDetailsContent.parentElement.classList.add('showRecipe');

    
}


// JS for Recipe close button
function click_btn()
{
    x=document.getElementById('recipe');
    if(x.style.display==="none")
    {
        x.style.display="block";
    }
    else
    {
        x.style.display="none";
    }
}
