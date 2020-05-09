function makeCall() {
    let xhr = new XMLHttpRequest();
    xhr.open('get', 'https://dog.ceo/api/breeds/image/random');
    xhr.responseType = 'json';
    xhr.onload = () => {
        let data = xhr.response;
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log(data);
            const ul = document.querySelector('ul');
            const li = document.createElement('li');
            li.innerHTML = `<img = src="${data.message}">`;
            ul.appendChild(li);
        } else {
            console.log(data.status);
        }
    };
    xhr.send();
}



function makeCall2() {
    axios.get('https://cors-anywhere.herokuapp.com/https://dog.ceo/api/breeds/image/random')
        .then(response => {
            console.log(response);
            const ul = document.querySelector('ul');
            const li = document.createElement('li');
            li.innerHTML += `<img src="${response.data.message}">`;
            ul.appendChild(li);
        })
        .catch(function(error) {
            console.log(error);
        });
}


document.getElementById('click1').addEventListener('click', makeCall);
document.getElementById('click2').addEventListener('click', makeCall2);