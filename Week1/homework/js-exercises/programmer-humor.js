function makeXhrCall() {
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.onload = () => {
        let data = xhr.response;
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log(data);
            const image = document.querySelector('img');
            image.src = data.img;
        } else {
            console.log(data.status);
        }
    };
    xhr.open('get', 'https://xkcd.now.sh/?comic=latest');
    xhr.send();
}

function makeAxiosCall() {
    axios.get('https://xkcd.now.sh/?comic=latest')
        .then(function(response) {
            console.log(response);
            const image = document.querySelector('img');
            image.src = response.data.img;
        })
        .catch(function(error) {
            console.log(error);
        });
}

makeAxiosCall();
makeXhrCall();