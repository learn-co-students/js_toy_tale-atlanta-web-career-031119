const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const submitBtn = document.querySelector('.submit')
let addToy = false

fetchToys() // STEP 2 && 3: Fetch initial toys and create full cards


addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})

submitBtn.addEventListener('click', () => {
  let inputs = document.querySelectorAll('.input-text')
  createToy(inputs[0].value, inputs[1].value);
})

function fetchToys(){
    fetch("http://localhost:3000/toys")
    .then(resp => resp.json())
    .then(data => data.forEach(toy => handleToy(toy)))
}

function handleToy(toy){
  let parent = document.querySelector('#toy-collection')

    let div = document.createElement('div')
    div.className = 'card'

    let h2 = document.createElement('h2')
    h2.innerText = toy.name

    let img = document.createElement('img')
    img.src = toy.image
    img.className = 'toy-avatar'

    let p = document.createElement('p')
    p.innerText = `${toy.likes} likes`
    p.id = `toy-${toy.id}`

    let button = document.createElement('button')
    button.className = 'like-btn'
    button.innerText = 'Like <3'
    button.dataset.id = toy.id
    button.dataset.likes = toy.likes
    button.addEventListener('click', () => {
      increaseLikes(button.dataset.id, button.dataset.likes);
    })

    div.appendChild(h2)
    div.appendChild(img)
    div.appendChild(p)
    div.appendChild(button)
    parent.appendChild(div)
}

function createToy(name, image){
  fetch('http://localhost:3000/toys', {
        method: 'POST',
        headers:    {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          image: image,
          likes: 0
        })
    })
}

function increaseLikes(id, likes){
  let newLikes = Number(likes);
  newLikes += 1;
  fetch(`http://localhost:3000/toys/${id}`, {
    method: 'PATCH',
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },

    body: JSON.stringify({
      likes: newLikes
    })
  })
  editDom(id, newLikes);
}

function editDom(id, newLikes){
  let p = document.querySelector(`#toy-${id}`)
  p.innerText = `${newLikes} likes`
}
