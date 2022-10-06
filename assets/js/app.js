document.querySelector('.get-jokes').addEventListener('click', getJokes);


document.addEventListener('DOMContentLoaded', getJokesCategories);

function getJokesCategories(e) {
   const xhr = new XMLHttpRequest();
   xhr.open('GET', 'https://api.chucknorris.io/jokes/categories', true);

   xhr.onload = function() {   
      if(this.status === 200) {
         const categories = JSON.parse(this.responseText);
         let output = '';
         categories.forEach(function(category) {
            output += `<option value="${category}">${category.charAt(0).toUpperCase()+category.substring(1)}</option>`;
         });
         document.querySelector('#joke-category').innerHTML = output;
      }
   }

   xhr.send();
   xhr.onerror = function() {
      console.log('Request error...');
   }
   e.preventDefault();
}


function getJokes(e) {
   const category = document.querySelector('#joke-category').value;
   
   const xhr = new XMLHttpRequest();
   
   xhr.open('GET', `https://api.chucknorris.io/jokes/random?category=${category}`, true);

   xhr.onload = function() {
      if(this.status === 200){
         const jokes = JSON.parse(this.responseText);
         document.querySelector('.jokes').innerHTML = `<li>${jokes.value}</li>`;
      }else{
         document.querySelector('.jokes').innerHTML = `<li style='border: 1px solid red; color:red;'>Something went wrong!!</li>`;
      }
   }

   xhr.send();

   e.preventDefault();
}