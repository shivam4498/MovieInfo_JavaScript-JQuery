$(document).ready(()=>{
    $('#searchForm').on('submit', (e)=>{
         //console.log($('#searchText').val());
        let searchText=$('#searchText').val();
        getMovies(searchText);
        e.preventDefault(); // means when to make submit event it will prevent you to submit the form
    
    })
})

function getMovies(searchText){
    // console.log(searchText);
    // we will use this searchText to request the API
    axios.get('http://www.omdbapi.com/?i=tt3896198&apikey=6b832f53&s=' + searchText)
    .then((response)=>{
        console.log(response);
        let movies=response.data.Search;// to attach the array of movies
        let output='';// to append each other
    $.each(movies, (index, movie)=>{ //each will iterate over all the objects of movies
        output+=`
        <div class="col-md-3">
        <div class="well text-center">
         <img src="${movie.Poster}"> 
         <h5>${movie.Title}</h5>
         <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details  </a>
        </div>
        </div>
        `;
    });
         $('#movies').html(output);
    })
    .catch((err)=>{
        console.log(err);
    })
}

function movieSelected(id){
    sessionStorage.setItem('movieId', id);// will keep storing the data till the browser closed
    window.location='movie.html';
    return false;
}

function getMovie(){
    let movieId=sessionStorage.getItem('movieId');
    // axios.get('http://www.omdbapi.com/?i=tt3896198&apikey=6b832f53&i=' + movieId)
    axios.get('https://www.omdbapi.com/?apikey=59ead2b5&i=' + movieId)
    .then((response)=>{
        console.log(response);
        let movie = response.data;
        let output = `
            <div  class="row">
                <div class="col-md-4">
                    <img src="${movie.Poster}" class="thumbnail">
                </div>
                <div>
                <div class="col-md-8">
                    <h2>${movie.Title}</h2>
                    <ul class="list-group">
                        <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
                        <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
                        <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
                        <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
                        <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
                        <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
                        <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
                    </ul>
                </div>
            <div class="row">
                <div class="well">
                    <h3>Plot</h3>
                    ${movie.Plot}
                    <hr>
                    <a href="https://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
                    <a href="index.html" class="btn btn-secondary">Go Back To Search</a>
                    </div>
            </div>
        `;
        $('#movie').html(output);

    })
    .catch((err)=>{
        console.log(err);
    })
}