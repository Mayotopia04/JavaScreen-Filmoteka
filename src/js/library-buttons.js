 import renderLibrary from "./renderLibrary";



 const watchedLibraryButton = document.querySelector('#watched-library-btn');
  const qdLibraryButton = document.getElementById('qd-library-btn');
  
  watchedLibraryButton.addEventListener( "click", async (ev) => {
    await renderLibrary.render('watchedMovies');
    watchedLibraryButton.classList.add('selected-button');
    qdLibraryButton.classList.remove('selected-button');
  })


  qdLibraryButton.onclick = async function (ev) {
    await renderLibrary.render('queuedMovies');
    qdLibraryButton.classList.add('selected-button');
    watchedLibraryButton.classList.remove('selected-button');
  }

  /* export const paging = (event)=>{
    console.log(parseInt(event.target.dataset.index));
    switch(parseInt(event.target.dataset.index)){
      case -1:
        return this.render({page:data.page - 1,text:options.text});
      case 21:
        return this.render({page:data.page + 1,text:options.text});
      default:
        this.render({page:event.target.dataset.index,text:options.text});
    }
  } */