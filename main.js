window.onload=()=>{
    const movieList=[]
    let addMovieBtn= document.getElementById("addBtn")
    addMovieBtn.addEventListener("click",()=>{
        let movieName = document.getElementById("addMovie").value;
        movieList.push({ name: movieName , num:0 });
        document.getElementById("addMovie").value=" "
        let movieLi = movieList.map((elem) => {
          return `
        <li class="list-group d-flex flex-row">
                        <p class="col-10 mt-2 text-white ">${elem.name}</p> 
                        <button class=" btn btn-sm bi bi-check-circle col-1 text-white"></button> 
                        <button class="btn btn-sm bi bi-trash-fill col-1 text-white"></button> 
                    </li>
        `;
        });   
        document.getElementById("movieList").innerHTML = movieLi.join(" ")

    })
    

}

