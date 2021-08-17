let color = '#3aa757';
let whatWeEatId = "algo-what-we-eat";

console.log('background is running');

chrome.runtime.onInstalled.addListener(function () {

    console.log('chrome.runtime.onInstalled.addListener()');
    chrome.storage.sync.set({ color }, function () {
        console.log('chrome.storage.sync.set()');
        console.log('Default background color set to %cgreen', `color: ${color}`);
    });

    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        console.log('chrome.storage.sync.set()');
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: { hostEquals: 'mysodexo.co.il' },
                }),
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: { hostEquals: '10bis.co.il' },
                })
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});

//chrome.browserAction.onClicked.addListener(buttonClicked);


function buttonClicked(tab){
    let msg = { txt: "hello"};
    chrome.tabs.sendMessage(tab.id, msg);
}