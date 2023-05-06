function getCurrentUrl() {
    return new Promise((resolve, reject) => {
        //Chrome extension API
        // The object passed as the first argument to chrome.tabs.query() specifies that it should return information about the currently active tab in the currently active window, by setting the active and currentWindow properties to true.
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            if (tabs.length === 0) {
                reject("No active tabs found.");
            } else {
                resolve(tabs[0].url);
            }
        });
    });
}

getCurrentUrl()
    .then(url => {
        const btn = document.getElementById('btn')

        const postThread = async (title, message, callback) => {
            try {
                const response = await fetch('https://cache.showwcase.com/threads', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': 'YOUR API_KEY' //Put your api key here
                    },
                    body: JSON.stringify({
                        title: title,
                        message: message
                    })
                });
                console.log(response.data);
                callback()
            } catch (error) {
                console.error(error);
            }
        };

        btn.addEventListener('click', () => {
            const messageArea = document.getElementById('message')
            let message = messageArea.value
            const titleArea = document.getElementById('title')
            const title = titleArea.value
            message = message+'\n   '+url
            postThread(title, message, ()=>{
                window.close()
            });
        })
    })
    .catch(error => {
        console.error(error)
    });


