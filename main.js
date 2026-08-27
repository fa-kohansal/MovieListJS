const movieList = [];

window.onload = () => {
  //-------------------------
  // DOM
  //-------------------------
  
  const movieListE1 = document.getElementById("movieList");
  const moviesBtn = document.getElementById("moviesBtn");
  // const showMovies = document.getElementById("listM");
  const movieDetail = document.getElementById("movieDetils");
  const deletedList = document.getElementById("removalPart");
  const deletedMovies = document.getElementById("deletedMovies");
  const numMovies = document.getElementById("countMovies");
  const favoriteCount = document.getElementById("favoriteCount");
  const addMovieBtn = document.getElementById("addBtn");
  const removalBtn = document.getElementById("removalBtn");
  // const viewsMovie = 0;
  const totalView = document.getElementById("totalView");
  const deletedCount = document.getElementById("deletedCount");
  const searchInput = document.getElementById("searchMovie");
  const addMovieInput = document.getElementById("addMovie");

  //------------------------------
  // STATS
  //------------------------------
  const updateStats = () => {
    numMovies.textContent = movieList.filter((movie) => !movie.deleted).length;
    favoriteCount.textContent = movieList.filter(
      (movie) => movie.favorite,
    ).length;
    totalView.textContent = movieList.reduce(
      (total, movie) => total + movie.view,
      0,
    );
    deletedCount.textContent = movieList.filter(
      (movie) => movie.deleted,
    ).length;
  };

  // ------------------------------
  // RENDER
  // ------------------------------

  const renderMovies = (movies = movieList) => {
    movieListE1.innerHTML = movies
      .filter((m) => !m.deleted)
      .map((elem) => {
        return `
            <li data-id="${elem.id}" class="animate__animated animate__fadeIn list-group ${elem.view > 0 ? "watched " : ""} ${elem.favorite ? "border-danger" : " "} listStyle mb-1 d-flex flex-row flex-nowrap col-12">
                <button class="fave-btn btn btn-sm ${elem.favorite ? "text-danger" : "movieActions"} mb-1 col-1 bi bi-heart-fill"></button>
                
                <p class="col-9 mt-2 text-light  text-capitalize">${elem.name}</p> 
                <p class="plus-btn pointer-event col-1 text-center mt-2 bg ${elem.view > 0 ? "watchedIcon" : "movieActions"}"><i class="plus-btn bi bi-eye"></i> ${elem.view}</p>
                
                <button class="delete-btn mb-1 btn btn-sm bi bi-trash-fill col-1"></button> 
            </li>
        `;
      })
      .join("");
    updateStats();
  };

  //----------------------------
  // ADD MOVIES
  //----------------------------

  addMovieBtn.addEventListener("click", () => {
    const movieName = addMovieInput.value.trim();
    if (!movieName) return;

    movieList.push({
      id: Date.now(),
      name: movieName,
      view: 0,
      favorite: false,
      deleted: false,
    });
    addMovieInput.value = "";
    renderMovies();
  });

  // -----------------------------
  // SEARCH
  // -----------------------------

  searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase();
    const filteredMovie = movieList.filter((movie) =>
      movie.name.toLowerCase().includes(value),
    );
    renderMovies(value ? filteredMovie : movieList);
  });

  // -------------------------------
  // MOVIE ACTIONS
  // -------------------------------

  movieListE1.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (!li) return;
    const id = Number(li.dataset.id);
    const movie = movieList.find((m) => m.id === id);
    if (!movie) return;
    if (e.target.classList.contains("fave-btn")) {
      movie.favorite = !movie.favorite;
    }
    if (e.target.classList.contains("plus-btn")) {
      movie.view++;
    }
    if (e.target.classList.contains("delete-btn")) {
      movie.deleted = !movie.deleted;
    }
    renderMovies();
  });

  // ----------------------------
  // SORT
  // ----------------------------

  removalBtn.addEventListener("click", () => {
    movieDetail.classList.add("d-none");
    movieDetail.classList.remove("d-flex");
    deletedList.classList.remove("d-none");
    moviesBtn.classList.remove("d-none");
    deletedMovies.innerHTML = movieList
      .filter((movie) => movie.deleted)
      .map((elem) => {
        if (elem.deleted === true) {
          return `<li class="text-light">${elem.name}</li>`;
        }
      })
      .join(" ");
  });

  // --------------------------
  // BACK TO MOVIES
  // --------------------------
  moviesBtn.addEventListener("click", () => {
    movieDetail.classList.remove("d-none");
    movieDetail.classList.add("d-flex");
    deletedList.classList.add("d-none");
    removalBtn.classList.remove("d-none");
    moviesBtn.classList.add("d-none");
  });
  
}