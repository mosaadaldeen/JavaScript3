function makeXhrCall() {
    let xhr = new XMLHttpRequest();
    xhr.addEventListener("load", function reqListener() {
        let data = this.responseText;
        if (this.readyState == 4 && this.status == 200) {
            console.log(JSON.parse(data));
        } else {
            console.log("Error", xhr.statusText);
        }
    });
    xhr.open('get', 'https://www.randomuser.me/api');
    xhr.send();
}

function makeAxiosCall() {
    // this will work if there is a html file attached to it to include the cdn.
    axios.get('https://www.randomuser.me/api')
        .then(function(response) {
            console.log(response.data);
        })
        .catch(function(error) {
            console.log(error);
        });
}

makeXhrCall();
makeAxiosCall();