const KEY = '8dfc5d1ac309ff5cb12d83610ea01f69';
let searchText = 'MMA';
const div = document.querySelector('#wrapper');
let input = document.querySelector('input');
let select = document.querySelector('select');
const button = document.querySelector('button');
let numbers = document.getElementById('numbers')
//här ska vi pussla ihop bild-urlen
function getImageUrl(photoObject) {
    let photo = photoObject;
    let size = document.querySelector('select').value;

    let imgUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_${size}.jpg`;

    // console.log(imgUrl);
    displayImg(imgUrl);
}

//för att visa bilden
function displayImg(url) {
    let img = document.createElement('img');
    img.src = url;

    div.appendChild(img);
}




button.addEventListener('click', function () {
    let url = `https://www.flickr.com/services/rest/?api_key=${KEY}&method=flickr.photos.search&text=${input.value}&sort=relevance&safe_search=1&accuracy=1&content_type=1&format=json&nojsoncallback=1&per_page=${numbers.value}&page=1`;
    if (numbers.value == '') {
        alert('Skriv ett nummer');
    };
    if (input.value == '') {
        alert('Skriv vad du vill söka på');
    }

    fetch(url).then(
        function (response) {
            console.log(response);
            if (response.status >= 200 && response.status < 300) {
                return response.json();
            }
            else {
                throw 'Something went wrong. :(';
            }
        }
    ).then(
        function (data) {
            console.log(data);
            //Vi hämtar första bilden
            for (let i = 0; i < numbers.value; i++) {
                getImageUrl(data.photos.photo[i]);


            }
        }
    ).catch(
        function (error) {
            console.log(error);

        }
    )

}
)

