console.log('popup.js started');

// to be moved to the "help.js"
function isToday(someDate) {
    const today = new Date()
    return (someDate instanceof Date) && someDate.getDate() == today.getDate() &&
        someDate.getMonth() == today.getMonth() &&
        someDate.getFullYear() == today.getFullYear();
}

function getAppVersion() {
    var manifestData = chrome.runtime.getManifest();
    // console.log(manifestData.version);
    // console.log(manifestData.default_locale);
    return manifestData.version;
}

const locale = 'en-IL'

function date2text(d) {
    let ye = new Intl.DateTimeFormat(locale, { year: '2-digit' }).format(d);
    let mo = new Intl.DateTimeFormat(locale, { month: '2-digit' }).format(d);
    let da = new Intl.DateTimeFormat(locale, { day: '2-digit' }).format(d);
    return `${da}.${mo}.${ye}`;
}
function time2text(d) {
    let hour = new Intl.DateTimeFormat(locale, { hour: '2-digit' }).format(d);
    let min = new Intl.DateTimeFormat(locale, { minute: '2-digit' }).format(d);
    //console.log(`${da}.${mo}.${ye} ${hour}:${min}`);
    return `${hour}:${min}`;
}
function dateTime2text(d) {
    let ye = new Intl.DateTimeFormat(locale, { year: '2-digit' }).format(d);
    let mo = new Intl.DateTimeFormat(locale, { month: '2-digit' }).format(d);
    let da = new Intl.DateTimeFormat(locale, { day: '2-digit' }).format(d);
    let hour = new Intl.DateTimeFormat(locale, { hour: '2-digit' }).format(d);
    let min = new Intl.DateTimeFormat(locale, { minute: '2-digit' }).format(d);
    //console.log(`${da}.${mo}.${ye} ${hour}:${min}`);
    return `${da}.${mo}.${ye} ${hour}:${min}`;
}
//===============================================================
let url = 'https://us-central1-algo-what-we-eat.cloudfunctions.net/getOrders';
let orders = {}

let tableIdName = "#ordersToday";
let tableOtherIdName = "#ordersNotToday";
let sum_txt_heb = "סך הזמנה";

fetch(url)
    .then(res => res.json())
    .then((out) => {
        orders = out;
        organizeOrdersBy();
        buildHtmlTable('#ordersTable');
    })
    .catch(err => { throw err });


// Builds the HTML Table out of orders.
function organizeOrdersBy() {
    let orderBy = {}
    for (let i in orders) {
        if (!orderBy[orders[i]["restaurant"]]) {
            orderBy[orders[i]["restaurant"]] = [];
        }
        orderBy[orders[i]["restaurant"]].push(orders[i]);
    }
    orders = {};
    for (let i in orderBy) {
        for (order of orderBy[i]) {
            orders[order.name] = order;
        }
    }
}
// Builds the HTML Table out of orders.
function buildHtmlTable(ordersTable) {
    for (let i in orders) {
        let row$ = $('<tr/>');
        let name$ = $('<div/>').text(orders[i]["name"]).addClass('thick');
        let meal$ = $('<div/>').text(orders[i]["meal"]).addClass('thick');
        let restaurant$ = $('<div/>').text(orders[i]["restaurant"]);
        let dish_cost$ = $('<span/>').text(orders[i]["dish_cost"]);
        let sum_cost$ = $('<span/>').text(" (" + sum_txt_heb + ":" + orders[i]["bill"] + ")").addClass('small');
        let bill$ = $('<div/>').append(dish_cost$).append(sum_cost$);
        let date = new Date(orders[i]["dateTime"]);
        let is_today = isToday(date);
        let date$ = $('<span/>').text(date2text(date));
        let time$ = $('<span/>').text(time2text(date)).addClass('small');
        let dateTime$ = "";
        if (!is_today) {
            dateTime$ = $('<div/>').append(date$).append(time$).addClass("wrong_date");
        }
        let td$ = $('<td/>').append(name$).append(meal$).append(restaurant$).append(bill$).append(dateTime$);
        row$.append(td$);
        td$ = $('<td/>').addClass("restaurant_pic");
        if (orders[i]["restaurant_pic"]) {
            let img$ = $('<img/>', {
                src: orders[i]["restaurant_pic"],
            });
            td$.html(img$);
        }
        row$.append(td$);
        td$ = $('<td/>').addClass("pic_url");
        if (orders[i]["pic_url"]) {
            let img$ = $('<img/>', {
                src: orders[i]["pic_url"],
            });
            td$.html(img$);
        }
        row$.append(td$);
        let restaurant_url = orders[i]["restaurant_url"];
        row$.click(function () {
            // console.log('Row clicked!');
            let url = restaurant_url;
            chrome.runtime.sendMessage({
                message: "change_url",
                payload: url
            });
        });
        if (is_today) {
            $(tableIdName).append(row$);
        }
        else {
            $(tableOtherIdName).append(row$);
            $('.ordersNotToday').show();
        }
    }
}

$(document).ready(function () {
    let version_he = "גרסה:";
    $('#version').text('(' + version_he + getAppVersion() + ')');

    $('#suggestImprovement').click(function () {
        console.log('popup.js suggest_improvement_clicked');
        chrome.runtime.sendMessage({
            message: "suggest_improvement_clicked"
        });
    });
});

console.log('popup.js ended');
