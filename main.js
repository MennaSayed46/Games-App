let xCancel = document.querySelector('#cancel')

let allData = [];
let row = document.querySelector('.row');
let mainHome = document.querySelector('main');
let detailsOfTheGame = document.querySelector('.details-of-the-game');
let detailsArray = [];

let shooter = document.querySelector('.shooter');
let sailing = document.querySelector('.sailing');
let permadeath = document.querySelector('.permadeath');
let superhero = document.querySelector('.superhero');
let pixel = document.querySelector('.pixel');
let mmorpg = document.querySelector('.mmorpg');

async function getData(genre) {
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'f17cbbc35cmsh2f9b4cebd3a6317p1a9e9ejsn1237dcb46cb5',
            'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };

    let api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/filter?tag=${genre}&platform=pc`, options);
    let response = await api.json();
    allData = response;
    console.log(allData);
    displayData();
}

getData('3d.mmorpg.fantasy.pvp');

function displayData() {
    let cartoona = '';

    for (let i = 0; i < allData.length; i++) {
        cartoona += `<div class="col-lg-3 mb-3 " id="${allData[i].id}">
            <div class="card px-3 pt-3">
                <div class="img position-relative">
                    <img src="${allData[i].thumbnail}" alt="img-card" class="w-100">
                    <div class="gardient position-absolute"></div>
                </div>
                <div class="caption position-relative mt-3">
                    <div class="d-flex justify-content-between">
                        <p class="nameOfGame text-capitalize">${allData[i].title}</p>
                        <button type="button" class="btn btn-primary py-0 my-0">free</button>
                    </div>
                    <p class="description">${allData[i].short_description.split(' ').splice(0, 8).join(' ')}</p>
                    <div class="gardient position-absolute"></div>
                </div>
                <div class="details pt-3 mb-3 d-flex justify-content-between">
                    <div class="typeGame rounded-3">
                        <p class="type m-0 px-1">${allData[i].genre}</p>
                    </div>
                    <div class="platform rounded-3">
                        <p class="m-0 px-1">${allData[i].platform}</p>
                    </div>
                </div>
            </div>
        </div>`;
    }

    row.innerHTML = cartoona;
    addEventListeners();
}

function addEventListeners() {
    let cards = document.querySelectorAll('.col-lg-3');
    cards.forEach(card => {
        card.addEventListener('click', function () {
            console.log('Card clicked:', card);
            mainHome.classList.add('d-none');
            detailsOfTheGame.classList.remove('d-none');
            let gameId = card.getAttribute('id');
            getDetails(gameId);
        });
    });
}

async function getDetails(id) {
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'f17cbbc35cmsh2f9b4cebd3a6317p1a9e9ejsn1237dcb46cb5',
            'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };

    let api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`, options);
    const response = await api.json();
    detailsArray = response;
    console.log('DETAILS OF THIS ID', detailsArray);
    displayDetailsOfTheGame(detailsArray);
}

function displayDetailsOfTheGame(detailsArray) {
    let content = `
    <div class="col-lg-4 col-md-4">
        <img src="${detailsArray.thumbnail}" alt="img of the game in details">
    </div>
    <div class="col-lg-8 col-md-8">
        <div class="item">
            <p class="publisher">Title: ${detailsArray.title}</p>
            <p class="text-capitalize category">Category: <span class="p-1 categorytype">${detailsArray.genre}</span></p>
            <p class="text-capitalize category">Platform: <span class="p-1">${detailsArray.platform}</span></p>
            <p class="text-capitalize category">Status: <span class="plat p-1">${detailsArray.status}</span></p>
            <p class="deta">${detailsArray.description}</p>
            <a href="${detailsArray.game_url}" target="_blank"><button class="btn btn-primary">Show Game</button></a>
        </div>
    </div>`;

    document.querySelector('#row').innerHTML = content;
}


xCancel.addEventListener('click', function (e) {
    document.querySelector('.details-of-the-game').classList.add('d-none');
    // displayData();
    mainHome.classList.remove('d-none');

})


$(window).on('scroll', function (e) {
    var scroll = $(window).scrollTop();
    // console.log(scroll);
    let navBarOffset = $('.navBar').offset().top;
    // console.log(navBarOffset);
    if (scroll > navBarOffset) {
        $('.navBar').addClass('fixed-top');
    }
});

$(function (e) {
    
    $('.spinner').fadeOut(1000, function () {
        $(".loading").fadeOut(1000)
        $("body").css({
            overflow: 'auto'
        });
    });
});

//get data of shooter
shooter.addEventListener('click', function (e) {
    console.log('the shooter is clicked');
    getData('shooter');


});
sailing.addEventListener('click', function (e) {
    console.log('the sailing is clicked');
    getData('sailing');


});
permadeath.addEventListener('click', function (e) {
    console.log('the permadeath is clicked');
    getData('permadeath');


});
superhero.addEventListener('click', function (e) {
    console.log('the superhero is clicked');
    getData('superhero');


});
pixel.addEventListener('click', function (e) {
    console.log('the pixel is clicked');
    getData('pixel');


});
mmorpg.addEventListener('click', function (e) {
    console.log('the mmorpg is clicked');
    getData('mmorpg');


});




