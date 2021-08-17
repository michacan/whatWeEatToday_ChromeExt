// console.log('background.js start');

chrome.runtime.onInstalled.addListener(() => {
    // chrome.storage.local.set({
    //     name: "Jack"/*,
    //     lName: "Canayev"*/
    // });
});

var getJSON = function (url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function () {
        var status = xhr.status;
        if (status === 200) {
            callback(null, xhr.response);
        } else {
            callback(status, xhr.response);
        }
    };
    xhr.send();
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'change_url') {
        // console.log('calling chrome.tabs.query');
        chrome.tabs.query({ currentWindow: true, active: true }, function (tab) {
            chrome.tabs.update(tab.id, { url: request.payload });
        });
    }
    else if (request.message === 'send_json') {
        fetch('https://us-central1-algo-what-we-eat.cloudfunctions.net/addOrder', {
            method: 'POST',
            body: JSON.stringify(request.payload),
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
        })
            //then(response => response.json())
            .then(response => {
                console.log('Success:', response);
            })
            .catch(error => {
                console.error('Error:', error);
            });

    }
    else if (request.message === 'suggest_improvement_clicked') {
        let email = "mailto:Michael.Canayev@philips.com"
        let subject = 'subject=Improvements suggestions for Where We Eat Today';
        let body = 'body=Here are some improvements that can be done:';
        let emailUrl = email + '?' + subject + '&' + body;
        chrome.tabs.create({ url: emailUrl });
    }
});

// console.log('background.js end');
