document.addEventListener("DOMContentLoaded", () => {
    getRandomJoke();
    getCategories();
  });
  
  async function getRandomJoke() {
    try {
      const response = await fetch('/api/jokebook/joke/random');
      
      if (!response.ok) {
        throw new Error('Failed to fetch joke');
      }
  
      const data = await response.json();
      
      if (data && data.joke && data.joke.setup && data.joke.delivery) {
        document.getElementById('random-joke').innerHTML = `<strong>${data.joke.setup}</strong><br>${data.joke.delivery}`;
      } else {
        document.getElementById('random-joke').textContent = "No joke found.";
      }
    } catch (error) {
      console.error("Error fetching joke:", error);
      document.getElementById('random-joke').textContent = "Failed to load a joke.";
    }
  }
  
  document.getElementById('getJokeButton').addEventListener('click', getRandomJoke);


  function getCategories() {
    fetch('/api/jokebook/categories')
      .then(response => response.json())
      .then(data => {
        const categoriesList = document.getElementById('categories-list');
        categoriesList.innerHTML = '';
  
        data.categories.forEach(category => {
          const listItem = document.createElement('li');
          listItem.textContent = category.name;
          listItem.onclick = () => loadJokesByCategory(category.name);
          categoriesList.appendChild(listItem);
        });
      })
      .catch(error => {
        console.error("Error fetching categories:", error);
      });
  }
  
  function loadJokesByCategory(category) {
    fetch(`/api/jokebook/joke/${category}`)
      .then(response => response.json())
      .then(data => {
        const jokesList = document.getElementById('category-jokes-list');
        const currentCategory = document.getElementById('current-category');
        jokesList.innerHTML = '';
        currentCategory.textContent = category;
  
        data.jokes.forEach(joke => {
          const listItem = document.createElement('li');
          listItem.innerHTML = `<strong>Setup:</strong> ${joke.setup} <br> <strong>Delivery:</strong> ${joke.delivery}`;
          jokesList.appendChild(listItem);
        });
      })
      .catch(error => {
        console.error("Error fetching jokes by category:", error);
      });
  }
  
  function filterJokesByCategory() {
    const categoryInput = document.getElementById('category-search').value;
    if (categoryInput) {
      loadJokesByCategory(categoryInput);
    }
  }
  
  document.getElementById('add-joke-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const category = document.getElementById('new-category').value;
    const setup = document.getElementById('new-setup').value;
    const delivery = document.getElementById('new-delivery').value;
  
    const jokeData = { category, setup, delivery };
  
    fetch('/api/jokebook/joke/new', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jokeData)
    })
      .then(response => response.json())
      .then(data => {
        alert('Joke added successfully!');
        loadJokesByCategory(category);
      })
      .catch(error => {
        console.error("Error adding new joke:", error);
      });
  });
  