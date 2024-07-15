// Navbar Script
function closeNav(){
    $('nav').animate({left:`-${minWidth}`},800);
    $('.navOpener #closeOpenNav').removeClass('fa-close')
    $('.navOpener #closeOpenNav').addClass('fa-bars')
    $('nav .booker ul').removeClass('animate__animated animate__bounceInDown')
    flag=false
}
let flag=false
let minWidth=$('.booker').innerWidth()
$('nav').css('left',-minWidth)
$('#closeOpenNav').click(function(){
    if(flag){
   closeNav();
        flag=false;
}else{
    $('nav').animate({left:0},800)
    $('.navOpener #closeOpenNav').removeClass('fa-bars')
    $('.navOpener #closeOpenNav').addClass('fa-close')
    $('nav .booker ul').addClass('animate__animated animate__bounceInDown')
    flag=true
}
})

$(window).on('load',function(){
    $('.loading').fadeOut(1000)
})
function showload(){
    $('.loadingin').fadeIn(200)
}
function hideHeader(){
    $('header').removeClass('d-flex');
    $('header').addClass('d-none');
}
function openHeader(){
    $('header').removeClass('d-none');
    $('header').addClass('d-flex');
}

//Fetching Random Meals from Api
async function getAllApi(){
    showload()       //Shows loading screen when accessing this function and the same for the rest of functions having fetch
    let response=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
    let data=await response.json();
    await $('.loadingin').fadeOut(200)       //Awaits the data to be received first and then removes the loading screen
    displayAll(data)
}
$('#home').click(function(){
    openHeader()
    getAllApi()
    closeNav()
    removeSearch()
})

function displayAll(arr){
    let show=``;
    for(let i=0;i<arr.meals.length;i++){
        show+=`
        <div class="col-12 col-lg-3 meals allOf ms-5 ms-lg-0">
                <div class="image position-relative overflow-hidden">
                    <img src="${arr.meals[i].strMealThumb}" alt="" class="w-100">
                    <div class="coler position-absolute translate-middle w-100">
                        <h3>${arr.meals[i].strMeal}</h3>
                    </div>
                </div>
            </div>
        `
    }

    document.getElementById('shwData').innerHTML=show;
}
getAllApi()
 


class Meal{
  
  displayMeal(x,filteredRecipes){
    hideHeader()
    let show=``;
    let v=x.strTags
    let tags
    if(v!=null){
        tags=v.split(" ")
    }else{
        console.log('no');
    }
    show+=`
    <div class="col-12 col-lg-4 text-white">
    <img src="${x.strMealThumb}" alt="meal" class="w-100 rounded jamimg">
    <h1 class="jameson head">${x.strMeal}</h1>
    </div>
    <div class="col-12 col-lg-8 text-white">
    <h1 class="jameson">Instructions</h1>
    <p class="jameson">${x.strInstructions}</p>
    <h2 class="jameson">Area: ${x.strArea}</h2>
    <h2 class="jameson">Category: ${x.strCategory}</h2>
    <h2 class="jameson">Recipes:</h2>
    <ul class="jameson list-unstyled gap-3 recipe">
    ${filteredRecipes.map((x)=>`<li class="rounded">${x}</li>`).toString().replaceAll(',','')}
    </ul>
    <h2 class="jameson">tags</h2>
    <ul class="list-unstyled tag jameson">
    ${tags!=null?tags.map((tag)=>`<li class="ms-1 rounded">${tag}</li>`).toString().replaceAll(',',' '):`No Tags`}
    </ul>
    <div class="mt-5 jameson">
    <a href="${x.strSource}" class="text-decoration-none text-reset"><button class="btn btn-success">Source</button></a>
    <a href="${x.strYoutube}" class="text-decoration-none text-reset"><button class="btn btn-danger">Youtube</button></a>
    </div>
    </div>
    `
    document.getElementById('shwData').innerHTML=show;
    
  }  
}

    $('body').on('click','.meals .coler',async function(e){
        showload()
        let res= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${e.target.innerText}`);
        let receive= await res.json()
        await $('.loadingin').fadeOut(200)
        let x=receive.meals[0];
        let y=[x.strMeasure1 + x.strIngredient1,
            x.strMeasure2 + x.strIngredient2,
            x.strMeasure3 + x.strIngredient3,
            x.strMeasure4 + x.strIngredient4,
            x.strMeasure5 + x.strIngredient5,
            x.strMeasure6 + x.strIngredient6,
            x.strMeasure7 + x.strIngredient7,
            x.strMeasure8 + x.strIngredient8,
            x.strMeasure9 + x.strIngredient9,
            x.strMeasure10 + x.strIngredient10,
            x.strMeasure11 + x.strIngredient11,
            x.strMeasure12 + x.strIngredient12,
            x.strMeasure13 + x.strIngredient13,
            x.strMeasure14 + x.strIngredient14,
            x.strMeasure15 + x.strIngredient15,
            x.strMeasure16 + x.strIngredient16,
            x.strMeasure17 + x.strIngredient17,
            x.strMeasure18 + x.strIngredient18,
            x.strMeasure19 + x.strIngredient19,
            x.strMeasure20 + x.strIngredient20] //Storing Recipe Received From API in Array
        let filteredRecipes=y.filter((x)=>x!=' '&&x!=''); //Sending Filtered Array to the method displayMeal
        let meal=new Meal().displayMeal(x,filteredRecipes);
        removeSearch()
        return meal
    })

        // Search Script
    //shows search inputs when you click on navlink
function displaySearch(){
    let show=``;
    show+=`
    <div class="inputS col-md-6">
    <input class="form-control" id="byName" type="search" placeholder="search by Name...">
    </div>
    <div class="inputS col-md-6">
    <input class="form-control" maxlength="1" id="byLetter" type="search" placeholder="search by First Letter...">
    </div>
    `
    document.getElementById('shwSearch').innerHTML=show
}
$('#search').click(function(){
    hideHeader()
    displaySearch()
    closeNav()
    let show=``
    // this to remove the results fetched from getAllMeals()
    document.getElementById('shwData').innerHTML=show
})
function removeSearch(){
    let show=``;
    document.getElementById('shwSearch').innerHTML=show
}
       // Search by Name 
$('body').on('keyup','#byName',async function(e){
    let x=this.value
    showload()
    let searchforMeal=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${x}`)
    let result=await searchforMeal.json()
    await $('.loadingin').fadeOut(200)
    displaySearchResults(result);
})
       //Search by First Letter
$('body').on('keyup','#byLetter',async function(e){
    showload()
    let x=this.value
    let searchforMeal=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${x}`)
    let result=await searchforMeal.json()
    await $('.loadingin').fadeOut(200)
    displaySearchResults(result);
})
       ///Display The Search Results
function displaySearchResults(search){
    hideHeader()
    let show=``;
    for(let i=0;i<search.meals.length;i++){
    show+=`
    <div class="col-12 col-lg-3 meals searchResu">
                <div class="image position-relative overflow-hidden">
                    <img src="${search.meals[i].strMealThumb}" alt="" class="w-100">
                    <div class="coler position-absolute translate-middle w-100">
                        <h3>${search.meals[i].strMeal}</h3>
                    </div>
                </div>
            </div>
    `
    }
    document.getElementById('shwData').innerHTML=show
}

     //Fetching Categories

$('#categories').click(async function(){
    showload()
    let categoryResponse= await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    let categoryData= await categoryResponse.json();
    await $('.loadingin').fadeOut(200)
    let allCategories=categoryData.categories
    removeSearch()
    closeNav()
    displayCategories(allCategories);
})
function displayCategories(categories){
    hideHeader()
    let show=``;
    for(let i=0;i<categories.length;i++){
    show+=`
    <div class="col-12 col-lg-3 categories allOf ms-5 ms-lg-0">
                <div class="image position-relative overflow-hidden">
                    <img src="${categories[i].strCategoryThumb}" alt="" class="w-100">
                    <div class="coler d-flex flex-column align-items-center position-absolute translate-middle w-100">
                        <h3>${categories[i].strCategory}</h3>
                        <p class="overflow-hidden">${categories[i].strCategoryDescription}</p>
                    </div>
                </div>
            </div>
    `
    }
    document.getElementById('shwData').innerHTML=show
    
}

$('body').on('click','.categories .coler',async function(e){
    showload()
    let targetCategory=e.currentTarget.childNodes[1].innerText;
    let categoryFilter= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${targetCategory}`);
    let fetchedFilter= await categoryFilter.json();
    await $('.loadingin').fadeOut(200)
    displaySearchResults(fetchedFilter);
})

       //Fetching Area
$('#area').click(async function(){
    let area=await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    let areaFetched=await area.json()
    removeSearch()
    closeNav()
    displayArea(areaFetched.meals);
})
      //Displaying Area
function displayArea(area){
    hideHeader()
    let show=``;
    for(let i=0;i<area.length;i++){
        show+=`
        <div class="col-md-3 text-center text-white area">
                    <i class="fa-solid fa-house fs-1"></i>
                        <h3>${area[i].strArea}</h3>
                </div>
            </div>
        `
    }
    document.getElementById('shwData').innerHTML=show
        //Display Meals When The User Click On a Country
$('body').on('click','#shwData .area',async function(e){
    showload()
    let getCountry= e.currentTarget.childNodes[3].innerText;
    let getMealFromArea=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${getCountry}`)
    let mealsFromCountry=await getMealFromArea.json()
    await $('.loadingin').fadeOut(200)
    displaySearchResults(mealsFromCountry)
})

        //Displaying Ingredients
$('#ingredients').click(async function(){
    showload()
    let ingredientsResponse=await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    let IngredientsData=await ingredientsResponse.json()
    await $('.loadingin').fadeOut(200)
    closeNav()
    removeSearch()
    displayIngredients(IngredientsData.meals);
})
        //Displaying Ingredients
function displayIngredients(ing){
    hideHeader()
    let show=``;
    for(let i=0;i<20;i++){
        show+=`
        <div class="col-md-3 text-center text-white area">
                    <i class="fa-solid fa-drumstick-bite fa-4x ingr"></i>
                        <h3 class="ingr">${ing[i].strIngredient}</h3>
                        <div class="dokki ingr">
                        <p>${ing[i].strDescription}</p>
                        </div>
                </div>
            </div>
        `
    }
    document.getElementById('shwData').innerHTML=show
}
        //adding click Event in order to show the Meals
$('body').on('click','#shwData .area',async function(e){
    showload()
    let getIng=e.currentTarget.childNodes[3].innerText;
    let getMealsIngredients= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${getIng}`)
    let gotMealsIng=await getMealsIngredients.json()
    await $('.loadingin').fadeOut(200)
    displaySearchResults(gotMealsIng)
})

        //Contact Page
let nameMe
let email
let phone
let age
let pass
let repass
let showButn
$('#contact').click(function(){
    hideHeader()
    let show=``;
    show+=`
    <div class="col-md-6 inputS">
    <input class="form-control" id="name" placeholder="Write Your Name" type="text">
    <div class="bg-danger mt-2 text-center p-2 d-none" id="nameMsg">Alphabetical Characters Only</div>
    </div>
    <div class="col-md-6 inputS">
    <input class="form-control col-md-6" id="email" placeholder="Write Your Email" type="email">
    <div class="bg-danger mt-2 text-center p-2 d-none" id="emailMsg">Email isn't Valid</div>
    </div>
    <div class="col-md-6 inputS">
    <input class="form-control col-md-6" id="phone" placeholder="Write Your Phone" type="text">
    <div class="bg-danger mt-2 text-center p-2 d-none" id="phoneMsg">Enter Valid Phone Number</div>
    </div>
    <div class="col-md-6 inputS">
    <input class="form-control col-md-6" id="age" placeholder="Write Your Age" type="number">
    <div class="bg-danger mt-2 text-center p-2 d-none" id="ageMsg">Enter Valid Age</div>
    </div>
    <div class="col-md-6 inputS">
    <input class="form-control col-md-6" id="pass" placeholder="Write Your Password" type="password">
    <div class="bg-danger mt-2 text-center p-2 d-none" id="passMsg">Enter a Valid Password: Min Eight Characters and Must Contain at Least One Letter, Two Numbers and one symbol(!@#$%^&*)</div>
    </div>
    <div class="col-md-6 inputS">
    <input class="form-control col-md-6" id="repass" placeholder="Repassword" type="password">
    <div class="bg-danger mt-2 text-center p-2 d-none" id="repassMsg">Enter a Valid RePassword</div>
    </div>
    <div class="d-flex justify-content-center">
    <button class="btn btn-outline-danger" id="shwBtn" disabled>Submit</button>
    </div>
`
document.getElementById('shwData').innerHTML=show
 nameMe=document.getElementById('name')
 email=document.getElementById('email')
 phone=document.getElementById('phone')
 age=document.getElementById('age')
 pass=document.getElementById('pass')
repass=document.getElementById('repass')
showButn=document.getElementById('shwBtn')
showBtn()
removeSearch()
closeNav()
}
)

let regexName=/^[A-Z a-z]{2,}$/
let regexEmail=/^(www\.)?[A-Z a-z 0-9 \/ \*]{2,}@(hotmail|gmail|outlook|yahoo)?\.com$/
let regexPhone=/^(010|012|015)[0-9]{8}$/
let regexAge=/^[0-9]{2}$/
let regexPass=/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/

$('body').on('keyup','#shwData #name',function(e){
    if(regexName.test(nameMe.value)==true){
        $('#nameMsg').addClass('d-none')
        showBtn()
    }else{
        $('#nameMsg').removeClass('d-none');
        showBtn()
    }
})
$('body').on('keyup','#shwData #email',function(){
    if(regexEmail.test(email.value)==true){
        $('#emailMsg').addClass('d-none')
        showBtn()
    }else{
        $('#emailMsg').removeClass('d-none');
        showBtn()
    }
})
$('body').on('keyup','#shwData #phone',function(){
    if(regexPhone.test(phone.value)==true){
        $('#phoneMsg').addClass('d-none')
        showBtn()
    }else{
        $('#phoneMsg').removeClass('d-none');
        showBtn()
    }
    
})
$('body').on('keyup','#shwData #age',function(){
    if(regexAge.test(age.value)==true){
        $('#ageMsg').addClass('d-none')
        showBtn()
    }else{
        $('#ageMsg').removeClass('d-none');
        showBtn()
    }
})
$('body').on('keyup','#shwData #pass',function(){
    if(regexPass.test(pass.value)==true){
        $('#passMsg').addClass('d-none')
        showBtn()
    }else{
        $('#passMsg').removeClass('d-none');
        showBtn()
    }
})
$('body').on('keyup','#shwData #repass',function(){
    if(pass.value==repass.value){
        $('#repassMsg').addClass('d-none')
        showBtn()
    }else{
        $('#repassMsg').removeClass('d-none');
        showBtn()
    }
})
    function showBtn() {
    if(regexName.test(nameMe.value)==true&&regexEmail.test(email.value)==true&&regexPhone.test(phone.value)==true&&regexAge.test(age.value)==true&&regexPass.test(pass.value)==true&&pass.value==repass.value)
    {
        $(showButn).removeAttr('disabled')
    }else{
        $(showButn).prop('disabled',true)
    }    
    }
}