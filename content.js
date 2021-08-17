console.log('Chrome extension GO GO GO!');

/*
var rule1 = {
    conditions: [
        new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: '*.10bis.co.il', schemes: ['https'] },
            css: ["button"]
        })
    ],
    actions: [new chrome.declarativeContent.ShowPageAction()]
};*/


// let pars = document.getElementsByTagName('p');
// for(let par in pars){
//     console.log(par);
//     // par.style['background-color'] = '#FF00FF'
// }

chrome.runtime.onMessage.addListener(gotMessageCallback);

function gotMessageCallback(message, sender, sendResponse){
    console.log(message.txt);
}