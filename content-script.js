// console.log('content-script.js start');
var pay_btn_selector_10bis = "[class*='PaymentActionButton']";
var bill_selector_10bis = "div.ShoppingCartDishesstyled__BillingLine-sc-1ifkpzb-15.fTJPPx > div > div > div > div";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    //console.log('onMessage request=',request);
    if (request.message === 'change_url') {
        //console.log('onMessage, request.payload = ', request.payload);
        window.location.href = request.payload;
    }
    else if (request.message === 'suggest_improvement_clicked') {
        console.log('content-script.js suggest_improvement_clicked');
    }
});
$('body').on('click', pay_btn_selector_10bis, function (event) {
    console.log('body1 on click');
    createOrder();
});
$('body').on('click', pay_btn_selector_10bis + ' > div ', function (event) {
    console.log('body2 on click');
    createOrder();
});

function findMealPicUrl(dish_name) {
    console.log('findMealPicUrl()');
    let list_item_slctr = "List__Item";
    let all_dishes = $("div[class*='" + list_item_slctr + "']");
    console.log('all_dishes.length=' + all_dishes.length);
    for (const dish of all_dishes) { // You can use `let` instead of `const` if you like
        found_dish_name = $(dish).find("div[class*='DishInfo'] > div > h3").text();
        if (found_dish_name == dish_name) {
            let bg = $(dish).find("div[class*='BaseDishImage']").css('background-image');
            bg = bg.replace('url(', '').replace(')', '').replace(/\"/gi, "");
            //console.log('bg 1:',bg);
            return bg;
        }
    }
    return "";
}

function createOrder() {

    // console.log('createOrder()');
    let rep = /\s\s+/g;//double white space

    let restaurant = $("h1[class*='RestaurantName']").text().trim();
    let restaurant_pic = $("img[class*='CircleImage']").attr('src');//$('.img1 img').attr('src');
    // console.log('restaurant=' + restaurant);
    orders = {};

    let dishes = $("div[class*='DishContainer']");
    // console.log('dishes.length=' + dishes.length);
    dishes.each(function () {
        let dish_name = $(this).find("div:nth-child(1) > button").text().trim();
        let dish_cost = $(this).find("div:nth-child(1) > div > div ").text().trim();
        let dish_desc = "";
        let dish_user = "";
        if ($(this).children().length === 2) {
            dish_user = $(this).find("div:eq(3) > div ").text().trim();
        }
        else if ($(this).children().length === 3) {
            dish_desc = $(this).find("div:eq(3)").text().trim();
            dish_user = $(this).find("div:eq(4) > div ").text().trim();
        }
        dish_user = dish_user.replace(/\s+/g, " ").trim();
        // console.log("dish_name = ", dish_name);
        // console.log("dish_cost = ", dish_cost);
        // console.log("dish_user = ", dish_user);
        // console.log("dish_desc = ", dish_desc);
        let bill = $(bill_selector_10bis).text().trim();
        //console.log('bill=' + bill);
        let pic_url = findMealPicUrl(dish_name);
        // console.log('pic_url:', pic_url);
        let order = {
            "from": /10bis/.test(window.location.href) ? "10Bis" : "Cibus",
            "restaurant": restaurant,
            "restaurant_url": window.location.href,
            "restaurant_pic": restaurant_pic,
            "meal": dish_name,
            "name": dish_user,
            "dish_cost": dish_cost,
            "bill": bill,
            "dateTime": new Date(),
            "pic_url": pic_url
        };
        console.log("order=", order);

        orders[dish_user] = order;
    });
    
    // Send message to background script to send this JSON to the remote server
    chrome.runtime.sendMessage({
        message: "send_json",
        payload: orders
    });
}
// console.log('content-script.js end');