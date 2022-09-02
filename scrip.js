// key + lenguaje
let KEY = '?api_key=492787c600f0335c5093e4ef2dd9c932&language=es';

const API = 'https://api.themoviedb.org/3/';
const busca = '550';

let topRatio = 'https://api.themoviedb.org/3/movie/top_rated?api_key=492787c600f0335c5093e4ef2dd9c932&language=en-US&page=1';
const proximos = 'https://api.themoviedb.org/3/movie/upcoming?api_key=492787c600f0335c5093e4ef2dd9c932&language=en-US&page=1'

// const gAction = 
// https://api.themoviedb.org/3/genre/movie/list?api_key=492787c600f0335c5093e4ef2dd9c932&language=en-US

const API_KEY = (id) => { return API + 'movie/' + id + KEY; }
let moviesUrl = API + 'movie/popular' + KEY;
let cast = (id) => { return API + 'movie/' + id + '/credits' + KEY }

// https://api.themoviedb.org/3/movie/616037/credits?api_key=492787c600f0335c5093e4ef2dd9c932&language=en-US



let per = (id) => { return API + 'person/' + id + '/movie_credits' + KEY }

//let per ='https://api.themoviedb.org/3/person/74568/movie_credits?api_key=492787c600f0335c5093e4ef2dd9c932&language=en-US'
//https://api.themoviedb.org/3/person/74568/movie_credits?api_key=492787c600f0335c5093e4ef2dd9c932&language=en-US




// let moviesUrl = 'https://api.themoviedb.org/3/movie/now_playing' + KEY;



let nano;

let tActores;
let idpeliculas;


const getDatos = (apiURL) => {
    return fetch(apiURL)
        .then(respuesta => respuesta.json())
        .then(datosJSON => {
            nano = datosJSON;
            imprime(datosJSON)
            paginas(datosJSON.page)
        })
        .catch(errores => { console.error('Error', errores) })
}

const actores = (apiURL) => {
    return fetch(apiURL)
        .then(respuesta => respuesta.json())
        .then(datosJSON => {
            tActores = datosJSON;
            console.log("1111", tActores);
        })
        .catch(errores => { console.error('Error', errores) })
}

const imprime = (data) => {
    let html = '';
    tipo = data.page;

    if (data.page != null) {
        data.results.forEach(p => {
            html += '<div class="col" >';
            html += '<div class="card" style="width : 15rem; margin-top: 20px;  background-color: rgba(255, 255, 255, 0);">'
            html += `<img src="https://image.tmdb.org/t/p/original${p.poster_path}" class="card-img-top" alt="..."type="submit" 
                    onclick="actores('${cast(p.id)}'), getDatos('${API_KEY(p.id)}')">`
            html += '<div class="card-body">'
            html += '</div>'
            html += '</div>'
            html += '</div>'
        });
    }
    else if (data.cast != null) {
        data.cast.forEach(p => {

            html += '<div class="col" >';
            html += '<div class="card" style="width : 15rem; margin-top: 20px;   background-color: rgba(255, 255, 255, 0);">'
            html += `<img src="https://image.tmdb.org/t/p/original${p.poster_path}" class="card-img-top" alt="..."type="submit" 
                    onclick="actores('${cast(p.id)}'), getDatos('${API_KEY(p.id)}')">`
            html += '<div class="card-body">'
            html += '</div>'
            html += '</div>'
            html += '</div>'
        });
    }
    else {


        html += '<div class="card" style = "width: 50rem; background-color: rgba(255, 255, 255, 0);" > '
        html += `<img src="https://image.tmdb.org/t/p/original${data.backdrop_path}" class="card-img-top" alt="...">`
        html += `</div>`
        html += '<div class="card" style = "width: 30rem;  background-color: rgba(255, 255, 255, 0); color: whitesmoke;" > '
        html += `<div class="card-body">`
        html += `<h5 class="card-title">${data.title}</h5>`
        html += `<p class="card-text">${data.overview}</p>`
        html += `</div>`

        // html += `<ul class="list-group list-group-flush">`

        html += `<div class="card-body">`
        data.genres.forEach(p => {
            html += `<li class="list-group text-center"> ${p.name}</li>`
        });

        html += `</ul>`
        html += `<div class="card-body">`

        tActores.cast.slice(0, 5).forEach(a => {

            html += `<li  class=" list "> <a type="submit" onclick="getDatos('${per(a.id)}')">  ${a.name}</a> /  ${a.character}</li>`

        });
        html += `</div>`
        html += `</div>`



    }

    document.getElementById('peliculas').innerHTML = html;
}



let pAnt;
let pSig;


var prb1;
const paginas = (numPag) => {
    let html = '';

    // html += `<li class="page-item"><a class="page-link" href="#" onclick="getDatos('${moviesUrl}')">HOME</a></li>`

    pAnt = moviesUrl + '&page=' + (numPag - 1)
    pSig = moviesUrl + '&page=' + (numPag + 1)
    // if (numPag != null) {

    //     if (numPag != 1) {
    //         html += `<li class="page-item "> <a class="page-link" href="#" onclick="getDatos('${moviesUrl + '&page=' + (numPag - 1)}')">Anterior</a> </li>`
    //     }
    //     html += `<li class="page-item"><a class="page-link" href="#" onclick="getDatos('${moviesUrl + '&page=' + (numPag + 1)}')">Siguiente</a></li>`
    // }
    document.getElementById('paginas').innerHTML = html;
}


getDatos(moviesUrl);