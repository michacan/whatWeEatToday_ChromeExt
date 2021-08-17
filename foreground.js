console.log('foreground.js start');

// var pay_btn_selector_10bis = "#main-setion > div.styled__NewWidthContainer-h0boa1-5.MenuBodyList__NewWidthContainer-sc-1rtvosc-0.eBdYmF.hBNCLA > aside > div > div > div.ShoppingCartDishesstyled__PaymentContainer-sc-1ifkpzb-1.cAuvGo > button > div";
// var pay_btn_selector1_10bis = "#main-setion > div.styled__NewWidthContainer-h0boa1-5.MenuBodyList__NewWidthContainer-sc-1rtvosc-0.eBdYmF.hBNCLA > aside > div > div > div.ShoppingCartDishesstyled__PaymentContainer-sc-1ifkpzb-1.cAuvGo > button";
//var pay_btn_selector_10bis = "#main-setion > div.styled__NewWidthContainer-h0boa1-5.MenuBodyList__NewWidthContainer-sc-1rtvosc-0.eBdYmF.hBNCLA > aside > div > div > div.ShoppingCartDishesstyled__PaymentContainer-sc-1ifkpzb-1.cAuvGo > button";
var pay_btn_selector_10bis = "[class*='PaymentActionButton']";
var name_selector_10bis = "div.ShoppingCartDishesstyled__DishContainer-sc-1ifkpzb-13.ccyJGX > div.ShoppingCartDishesstyled__Row-sc-1ifkpzb-17.imhXsJ > div";
                          
//var bill_selector_10bis = "#main-setion > div.styled__NewWidthContainer-h0boa1-5.MenuBodyList__NewWidthContainer-sc-1rtvosc-0.eBdYmF.hBNCLA > aside > div > div > div.ShoppingCartDishesstyled__List-sc-1ifkpzb-6.fQDIfI > div.ShoppingCartDishesstyled__BillingLinesContainer-sc-1ifkpzb-14.kplBtb > div.ShoppingCartDishesstyled__BillingLine-sc-1ifkpzb-15.fTJPPx > div > div > div > div";
var bill_selector_10bis = "div.ShoppingCartDishesstyled__BillingLine-sc-1ifkpzb-15.fTJPPx > div > div > div > div";
// var meal_selector_10bis = "#main-setion > div.styled__NewWidthContainer-h0boa1-5.MenuBodyList__NewWidthContainer-sc-1rtvosc-0.eBdYmF.hBNCLA > aside > div > div > div.ShoppingCartDishesstyled__List-sc-1ifkpzb-6.fQDIfI > div.ShoppingCartDishesstyled__DishesWrapper-sc-1ifkpzb-18.kAjplf > div > div > div > div.ShoppingCartDishesstyled__DishContainer-sc-1ifkpzb-13.ccyJGX > div.ShoppingCartDishesstyled__Row-sc-1ifkpzb-17.ePyzRl > button";
var meal_selector_10bis = "div.ShoppingCartDishesstyled__Row-sc-1ifkpzb-17.ePyzRl > button";
var meals_selector_10bis = ".MenuList__Item-hekqeg-1 kzucme > button";
var pic_url_selector_10bis = "";
//var restaurant_selector_10bis = "#root > div:nth-child(2) > div.MenuBody__Root-kwk1vz-0.bLdXNs > section > div.MenuBodyHeader__Root-sc-1as6uuz-0.hylRgH > div > div.styled__NewWidthContainer-h0boa1-5.RestaurantInfo__Root-sqojc2-0.eBdYmF.pctZM > div.RestaurantInfo__Row-sqojc2-1.RestaurantInfo__RestautantNameAndTagRow-sqojc2-2.cdgRBZ.kqxDLU > h1";
var restaurant_selector_10bis = "div.RestaurantInfo__Row-sqojc2-1.RestaurantInfo__RestautantNameAndTagRow-sqojc2-2.cdgRBZ.kqxDLU > h1";
var restaurant_url_selector_10bis = "";
var pay_btn_found = false;
var interval_counter = 0;
var interval_counter_max = 10;
var interval_time = 1000;
var meal_add_btn_slct = "#modals > div > div > div > div > div > div.styled__ModalFooter-xuhu2v-23.gDDfbe > div > button > div";
var meal_cost_slct    = "#modals > div > div > div > div > div > div.styled__ModalFooter-xuhu2v-23.gDDfbe > div > button > div > div > div > div";
var meal_name_slct    = "#modal-title";
var meal_desc_slct    = "#modal-content";
var meal_pic_slct     = "div.styled__ImageContainer-xuhu2v-4.cZRwjl > div";
var post_url = "https://us-central1-algo-what-we-eat.cloudfunctions.net/addNewOrder";

// document.querySelector("body > div.L3eUgb > div.o3j99.LLD4me.yr19Zb.LS8OJ > div > img").style.transitionDuration = '3.0s';
// document.querySelector("body > div.L3eUgb > div.o3j99.LLD4me.yr19Zb.LS8OJ > div > img").style.transform = 'rotate(1080deg)';

// const ce_main_container = document.createElement('DIV');
// const ce_name = document.createElement('DIV');
// const ce_input = document.createElement('INPUT');
// const ce_button = document.createElement('DIV');

// ce_main_container.classList.add('ce_main');
// ce_name.id = 'ce_name';
// ce_input.id = 'ce_input';
// ce_button.id = 'ce_button';

// ce_name.innerHTML = 'Hello NAME';
// ce_button.innerHTML = 'Change name.';

// ce_main_container.appendChild(ce_name);
// ce_main_container.appendChild(ce_input);
// ce_main_container.appendChild(ce_button);

// document.querySelector('body').appendChild(ce_main_container);

// chrome.runtime.sendMessage({
//     message: "get_name"
// }, response => {
//     if(response.message === 'success'){
//         ce_name.innerHTML = `Hello ${response.payload}`;
//     }
// }
// );

// console.log('foreground.js end');


// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     if(request.message === 'change_name'){
//         ce_name.innerHTML = `Hello ${request.payload}`;
//     }
// });
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    //console.log('onMessage request=',request); 
    if(request.message === 'change_url'){
        //console.log('onMessage, request.payload = ', request.payload);
        window.location.href = request.payload;
    }
    else if (request.message === 'register_on_pay_click') {
        let payment_slct = pay_btn_selector_10bis + 
                " , " + pay_btn_selector_10bis + ' > div'
                // + " , div[class*='PaymentContainer']";
        //console.log('register_on_pay_click '); 
        // $('body').one('click', payment_slct, function (event) {
        //     console.log('body 0 on click');
        //     //event.stopPropagation();
        //     //createOrder();
        // });
        $('body').one('click', pay_btn_selector_10bis, function (event) {
            console.log('body1 on click');
            //event.stopPropagation();
            //createOrder();
        });
        $('body').one('click', pay_btn_selector_10bis + ' > div ', function (event) {
            console.log('body2 on click');
            //event.stopPropagation();
            //createOrder();
        });
        // $('body').on('click', "div[class*='PaymentContainer']", function (event) {
        //     console.log('body3 on click');
        //     //event.stopPropagation();
        //     //createOrder();
        // });
        //tryRegisterOnPayBtnClick();
    }
});

function findMealPicUrl(dish_name){
    console.log('findMealPicUrl()');
    let list_item_slctr = "MenuBodyDishList__Item";
    let all_dishes = $("div[class*='"+list_item_slctr+"']");
    console.log('all_dishes.length='+all_dishes.length);
    // all_dishes.each(function () {
    //     let found = $(this).find("div[class*='DishInfo'] > div > h3").text();
    //     if(found == dish_name){
    //         let bg = $(this).find("div[class*='BaseDishImage']").css('background-image');
    //         console.log('bg 1:',bg);
    //         bg = bg.replace('url(','').replace(')','').replace(/\"/gi, "");
    //         console.log('bg 2:',bg);
    //         console.log('');
    //         return bg;
    //     }
    // });
    for (const dish of all_dishes) { // You can use `let` instead of `const` if you like
        found_dish_name = $(dish).find("div[class*='DishInfo'] > div > h3").text();
        if(found_dish_name == dish_name){
            let bg = $(dish).find("div[class*='BaseDishImage']").css('background-image');
            bg = bg.replace('url(','').replace(')','').replace(/\"/gi, "");
            //console.log('bg 1:',bg);
            return bg;
        }
    }
    // let found = all_dishes.find(dish => dish_name ===  dish.find("div[class*='DishInfo'] > div > h3").text());
    // let found_ng = found.find("div[class*='BaseDishImage']").css('background-image');
    // console.log('found_ng 1:',found_ng);
    return "";
}

function createOrder(){
    console.log('createOrder()');
    // let restaurant = document.querySelector(restaurant_selector_10bis);
    // let text = "textContent" in restaurant ? "textContent" : "innerText";
    // console.log('restaurant before='+restaurant);
    // restaurant = restaurant[text];
    // console.log('restaurant='+restaurant);

    let restaurant = $("h1[class*='RestaurantName']").text();
    console.log('restaurant='+restaurant);

    let dishes = $("div[class*='DishContainer']");
    console.log('dishes.length='+dishes.length);
    dishes.each(function () {
        let dish_name = $(this).find("div:nth-child(1) > button").text();
        let dish_cost = $(this).find("div:nth-child(1) > div > div ").text();
        let dish_desc = "";
        let dish_user = "";
        if($(this).children().length === 2){
            dish_user = $(this).find("div:eq(3) > div ").text();
        }
        else if($(this).children().length === 3){
            dish_desc = $(this).find("div:eq(3)").text();
            dish_user = $(this).find("div:eq(4) > div ").text();
        }
        // console.log("dish_name = ", dish_name);
        // console.log("dish_cost = ", dish_cost);
        // console.log("dish_user = ", dish_user);
        // console.log("dish_desc = ", dish_desc);
        let bill = $(bill_selector_10bis).text();
        //console.log('bill=' + bill);
        let pic_url = findMealPicUrl(dish_name);
        // console.log('pic_url:', pic_url);
        // console.log('');
        // console.log('');
        // return;
        let order = {
            "from": /10bis/.test(window.location.href) ? "10Bis" : "Cibus",
            "restaurant": restaurant,
            "restaurant_url": window.location.href,
            "meal": dish_name,
            "name": dish_user,
            "dish_cost": dish_cost,
            "bill": bill,
            "dateTime": new Date(),
            "pic_url": pic_url
        };
        console.log("order=", order);
        
        chrome.runtime.sendMessage({
            message: "send_json",
            payload: order//JSON.stringify(order)
        });
    });
    return;
    // let name$ = $(name_selector_10bis);
    // let name = name$.text();
    // console.log('name='+name);


    let meal$ = $(meal_selector_10bis);
    console.log('meal$='+meal$.length);
    let meal = meal$.text();
    console.log('meal='+meal);

    console.log('from='+ (/10bis/.test(window.location.href)?"10Bis":"Cibus") );
    
    return;
    $("div").click(function() {
        var bg = $(this).css('background-image');
        bg = bg.replace('url(','').replace(')','').replace(/\"/gi, "");
        alert(bg);
    });
    
    //.textContent

    let order = {
        "from": /10bis/.test(window.location.href)?"10Bis":"Cibus",
        "restaurant": restaurant,
        "restaurant_url": window.location.href,
        "meal": "אש ולהבה",
        "name": "יוליה פרידמן",
        "bill": 80,
        "dateTime": "2021-08-03T13:00:43.511Z",
        "pic_url": "https://d25t2285lxl5rf.cloudfront.net/images/dishes/95318728-8dc2-4bb5-8987-dc91cf4856d1.jpg"
      }

    

}


// chrome.runtime.sendMessage({
//     message: "get_name"
// }, response => {
//     if(response.message === 'success'){
//         ce_name.innerHTML = `Hello ${response.payload}`;
//     }
// }
// );

// ce_button.addEventListener('click',() =>{
//     chrome.runtime.sendMessage({
//         message: "change_name",
//         payload: ce_input.value
//     }, response => {
//         if(response.message === 'success'){
//             ce_name.innerHTML = `Hello ${ce_input.value}`;
//         }
//     }
//     );
// });