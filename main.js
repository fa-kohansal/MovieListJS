window.onload=()=>{
    const movieList=[]
    const movieListE1=document.getElementById("movieList");
    const moviesBtn = document.getElementById("moviesBtn");
    const showMovies = document.getElementById("listM");
    const deletedList = document.getElementById("removalPart");
    let addMovieBtn= document.getElementById("addBtn");
    let removalBtn = document.getElementById("removalBtn");
    const renderMovies = () => {
      movieListE1.innerHTML = movieList.map((elem, index) => {
        if(movieList[index].delete===false){
           return `
            <li data-index="${index}" class="list-group d-flex flex-row flex-nowrap col-12">
                <button class="fave-btn btn btn-sm ${elem.favorite? "text-warning":"text-white"} mb-1 col-1 bi bi-star-fill"></button>
                <p class="col-1 text-center mt-2 text-white">${elem.num}</p>
                <p class="col-8 mt-2 text-white ">${elem.name}</p> 
                <button class=" plus-btn btn btn-sm bi bi-check-circle col-1 text-white mb-1"></button> 
                <button class=" delete-btn mb-1 btn btn-sm bi bi-trash-fill col-1 text-white"></button> 
            </li>
        `; 
        }
      }).join(" ");
    };
    addMovieBtn.addEventListener("click", () => {
      let movieName = document.getElementById("addMovie").value;
      movieList.push({ name: movieName, num: 0, favorite: false, delete:false });
      document.getElementById("addMovie").value = "";
      renderMovies();
    });
    movieListE1.addEventListener("click",(e)=>{
        const li= e.target.closest("li");
        if(!li) return;
        const index= li.dataset.index;
        if (e.target.classList.contains("fave-btn")){
            movieList[index].favorite = !movieList[index].favorite
            
        }
        if(e.target.classList.contains("plus-btn")){
            movieList[index].num++;
        }
        if(e.target.classList.contains("delete-btn")){
            movieList[index].delete=!movieList[index].delete
            console.log(movieList);
            
        }
      renderMovies();

    })
    removalBtn.addEventListener("click",()=>{
        showMovies.classList.add("d-none");
        deletedList.classList.remove("d-none")
        removalBtn.classList.add("d-none");
        moviesBtn.classList.remove("d-none")
        deletedList.innerHTML = movieList.map((elem)=>{
            if (elem.delete=== true) {
                return`
                    <li class="text-light">${elem.name}</li>
                `                
                
            }
        }).join(" ")
            
            
          
    })

    
   
    
    renderMovies()
}

