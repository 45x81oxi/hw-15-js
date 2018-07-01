//1 вариант

// Init http
const http = new Http();
// Init UI
const ui = new UI();
// Api key
const apiKey = "04b16f6e801b4af7bcd41a973b7f4776";
const categories = [
    {
        title: 'Business',
        value: 'business'
    },
    {
        title: 'Entertainment',
        value: 'entertainment'
    },
    {
        title: 'Health',
        value: 'health'
    },
    {
        title: 'Science',
        value: 'science'
    },
    {
        title: 'Sports',
        value: 'sports'
    },
    {
        title: 'Technology',
        value: 'technology'
    }
];
const resources = [
    {
        title: 'ABC News',
        value: 'abc-news'
    },
    {
        title: 'CNN',
        value: 'cnn'
    },
    {
        title: 'BBC News',
        value: 'bbc-news'
    },
    {
        title: 'News24',
        value: 'news24'
    },
    {
        title: 'NBC News',
        value: 'nbc-news'
    }
];


// Init elements
const select = document.getElementById("country");
const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("searchBtn");
const container = document.querySelector('.container');

// All events
searchBtn.addEventListener("click", onSearch);
container.addEventListener('change', onChoice);

function onChoice(e) {
    if (e.target.id === "country") {
        resetOptions(document.querySelector('#sources'), document.querySelector('#category'));
        onChange("country");
        document.querySelector('.category').style.display = 'block';
    }
    else if (e.target.id === "sources") {
        document.querySelector('.category').style.display = 'none';
        resetOptions(select, document.querySelector('#category'));
        onChange("sources");
    }
    else if (e.target.id === "category") {
        resetOptions(document.querySelector('#sources'));
        onChange("category");
    }

}

document.addEventListener("DOMContentLoaded", function () {
    //генерируем select
    ui.createSelect(resources, 'sources', 'afterbegin');

    //генерируем select категорий
    ui.createSelect(categories, 'category', 'beforeend');
    document.querySelector('.category').style.display = 'none';

});


// Event handlers
function onChange(val) {
    let selectChoice = document.getElementById(val);
    let url;
    ui.showLoader();
    if (val === "category") {
        url = `https://newsapi.org/v2/top-headlines?${select.id}=${select.value}&${val}=${selectChoice.value}&apiKey=${apiKey}`
    } else {
        url = `https://newsapi.org/v2/top-headlines?${val}=${selectChoice.value}&apiKey=${apiKey}`;
    }

    http.get(url)
        .then(response => {
            if (response.totalResults) {
                ui.clearContainer();
                response.articles.forEach(news => ui.addNews(news));
            } else {
                val === 'category' ? ui.showInfo(`Новости по ${selectChoice.value} по стране ${select.value} не найдены`) :
                    ui.showInfo(`Новостей по ${selectChoice.value} не найдено!`);
            }
        })
        .catch(err => ui.showError(err));
}


function onSearch(e) {
    ui.showLoader();
    http.get(`https://newsapi.org/v2/everything?q=${searchInput.value}&apiKey=${apiKey}`)
        .then(response => {
            if (response.totalResults) {
                ui.clearContainer();
                response.articles.forEach(news => ui.addNews(news));
            } else ui.showInfo('По вашему запрсу новостей не найдено!');
        })
        .catch(err => ui.showError(err));
}


function resetOptions() {
    Array.prototype.slice.apply(arguments).forEach(item => item[0].selected = true);
    $('select').formSelect();
}

//2 вариант======================

// // Init http
// const http = new Http();
//
// // Init UI
// const ui = new UI();
// // Api key
// const apiKey = "04b16f6e801b4af7bcd41a973b7f4776";
// const categories = [
//     {
//         title: 'Business',
//         value: 'business'
//     },
//     {
//         title: 'Entertainment',
//         value: 'entertainment'
//     },
//     {
//         title: 'Health',
//         value: 'health'
//     },
//     {
//         title: 'Science',
//         value: 'science'
//     },
//     {
//         title: 'Sports',
//         value: 'sports'
//     },
//     {
//         title: 'Technology',
//         value: 'technology'
//     }
// ];
// const resources = [
//     {
//         title: 'ABC News',
//         value: 'abc-news'
//     },
//     {
//         title: 'CNN',
//         value: 'cnn'
//     },
//     {
//         title: 'BBC News',
//         value: 'bbc-news'
//     },
//     {
//         title: 'News24',
//         value: 'news24'
//     },
//     {
//         title: 'NBC News',
//         value: 'nbc-news'
//     }
// ];
//
//
// // Init elements
// const select = document.getElementById("country");
// const searchInput = document.getElementById("search");
// const searchBtn = document.getElementById("searchBtn");
//
//
// // All events
// select.addEventListener("change", onChangeCountry);
// searchBtn.addEventListener("click", onSearch);
//
// document.addEventListener("DOMContentLoaded", function () {
//     ui.createSelect(resources, 'resource', 'afterbegin');
//     document.querySelector('#resource').addEventListener("change", function (e) {
//         onChangeResource();
//     });
//
//
//     ui.createSelect(categories, 'category', 'beforeend');
//     document.querySelector('.category').style.display = 'none';
//     document.querySelector('#category').addEventListener("change", function (e) {
//         onChangeCountryAndCategory();
//     });
// });
//
//
// // Event handlers
// function onChangeCountry() {
//     resetOptions(document.querySelector('#resource'), document.querySelector('#category'));
//     document.querySelector('.category').style.display = 'block';
//     ui.showLoader();
//     http.get(`https://newsapi.org/v2/top-headlines?country=${select.value}&apiKey=${apiKey}`)
//         .then(response => {
//             ui.clearContainer();
//             response.articles.forEach(news => ui.addNews(news));
//         })
//         .catch(err => {
//             ui.showError(err);
//         });
// }
//
//
// function onChangeResource() {
//     ui.showLoader();
//     let selectResource = document.getElementById("resource");
//     http.get(`https://newsapi.org/v2/top-headlines?sources=${selectResource.value}&apiKey=${apiKey}`)
//         .then(response => {
//             ui.clearContainer();
//             document.querySelector('.category').style.display = 'none';
//             resetOptions(select, document.querySelector('#category'));
//             response.articles.forEach(news => ui.addNews(news));
//         })
//         .catch(err => ui.showError(err));
// }
//
//
// function onSearch(e) {
//     ui.showLoader();
//     http.get(`https://newsapi.org/v2/everything?q=${searchInput.value}&apiKey=${apiKey}`)
//         .then(response => {
//             if (response.totalResults) {
//                 ui.clearContainer();
//                 response.articles.forEach(news => ui.addNews(news));
//             } else ui.showInfo('По вашему запрсу новостей не найдено!');
//         })
//         .catch(err => ui.showError(err));
// }
//
//
// function onChangeCountryAndCategory() {
//     resetOptions(document.querySelector('#resource'));
//     let selectCategory = document.getElementById("category");
//     ui.showLoader();
//     http.get(`https://newsapi.org/v2/top-headlines?country=${select.value}&category=${selectCategory.value}&apiKey=${apiKey}`)
//         .then(response => {
//             if (response.totalResults) {
//                 ui.clearContainer();
//                 response.articles.forEach(news => ui.addNews(news));
//             } else ui.showInfo(`Новостей по ${selectCategory.value} по стране ${select.value} не найдено!`);
//         })
//         .catch(err => ui.showError(err));
// }
//
//
// function resetOptions() {
//     Array.prototype.slice.apply(arguments).forEach(item => item[0].selected = true);
//     $('select').formSelect();
// }
