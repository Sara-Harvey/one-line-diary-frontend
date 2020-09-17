const endPoint = "http://localhost:3000/entries"

document.addEventListener('DOMContentLoaded', () => {
   
   fetch(endPoint)
   .then(response => response.json())
      .then(entries => {
      console.log(entries);
   })
})
