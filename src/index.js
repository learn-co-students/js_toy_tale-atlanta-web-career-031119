const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyDataURL = 'http://localhost:3000/toys'
let addToy = false

document.addEventListener('DOMContentLoaded', 
  getToyData(),
  document.querySelector('.add-toy-form').addEventListener('submit', handleForm)
)

function getToyData() {
  fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then(toyData => allToys(toyData))
}

function allToys(toyData) {
  toyData.forEach(toy => createToy(toy))
}

function createToy(toy) {
  const mainPage = document.querySelector('#toy-collection')

  let toyCard = document.createElement('div')
    toyCard.className = "card"
    toyCard.dataset.id = toy.id

  let toyName = document.createElement('h2')
    toyName.innerText = toy.name

  let toyImage = document.createElement('img')
    toyImage.className = "toy-avatar"
    toyImage.src = toy.image 

  let toyLikes = document.createElement('p')
  toyLikes.innerText = `${toy.likes} Likes`

  let likeButton = document.createElement('button')
    likeButton.className = "like-btn"
    likeButton.dataset.id = toy.likes
    likeButton.innerText = "Like"
    likeButton.addEventListener('click', increaseLikes)
  
  toyCard.appendChild(toyName)
  toyCard.appendChild(toyImage)
  toyCard.appendChild(toyLikes)
  toyCard.appendChild(likeButton)
  mainPage.appendChild(toyCard)

}

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})

function handleForm(e) {
  
  e.preventDefault()
  let newToy = {
    name: e.target.name.value,
    image: e.target.image.value,
    likes: 0
  }
  addNewToy(newToy, e)
  e.target.reset()
}
  

function addToPage (brandNewToy, e){
  console.log(e)
  createToy(brandNewToy)
  
}
function addNewToy(newToy, e){
  fetch('http://localhost:3000/toys', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(newToy)
  }).then(res => res.json())
    .then(brandNewToy => addToPage(brandNewToy, e))
}

function increaseLikes(e) {
  let newLikeCount = Number(e.target.dataset.id) + 1
  let patchURL = `http://localhost:3000/toys/${Number(e.target.parentElement.dataset.id)}`
  fetch(patchURL, {
    method: "PATCH", 
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({likes: newLikeCount})
   })
  .then(res => res.json())
  .then(updatedToy => displayNewCount(updatedToy, e))
}

function displayNewCount(updatedToy, e){
  let toyToUpdate = e.target.parentElement
  let likeCounter = e.target.previousSibling
  likeCounter.innerText = `${updatedToy.likes} Likes`
  e.target.dataset.id = updatedToy.likes
    
}