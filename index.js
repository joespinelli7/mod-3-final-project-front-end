document.addEventListener('DOMContentLoaded', init)

const btn = document.createElement('button')
btn.innerText = "Login"
function init(){
  getAllTopics()

  loginForm()

  showCategories()


  let searchForm = document.querySelector('#new-search-form')
  searchForm.addEventListener('submit', searchNews)
}

function showCategories() {
  let div = document.querySelector('#myDiv')

  let sportsBtn = document.createElement('button')
  sportsBtn.classList.add('btn-info')
  sportsBtn.innerText = "Sports 🏈"
  div.appendChild(sportsBtn)

  let entertainmentBtn = document.createElement('button')
  entertainmentBtn.classList.add('btn-info')
  entertainmentBtn.innerText = "Entertainment 🎥"
  div.appendChild(entertainmentBtn)

  let politicsBtn = document.createElement('button')
  politicsBtn.classList.add('btn-info')
  politicsBtn.innerText = "Politics 🎺"
  div.appendChild(politicsBtn)

  let worldBtn = document.createElement('button')
  worldBtn.classList.add('btn-info')
  worldBtn.innerText = "World 🌎"
  div.appendChild(worldBtn)

  let businessBtn = document.createElement('button')
  businessBtn.classList.add('btn-info')
  businessBtn.innerText = "Business 💸"
  div.appendChild(businessBtn)

  let musicBtn = document.createElement('button')
  musicBtn.classList.add('btn-info')
  musicBtn.innerText = "Music 🎶"
  div.appendChild(musicBtn)

  let grabCategoryButtons = document.querySelectorAll('.btn-info')
  for (var i = 0; i < grabCategoryButtons.length; i++) {
    grabCategoryButtons[i].addEventListener('click', (e) => {
      let query = e.target.innerText.split(' ')[0].toLowerCase()
      fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=${APIKEY}`)
      .then(res => res.json())
      .then(data => {
        let newsContainer = document.querySelector('#news-container').innerHTML = ""
        data.articles.forEach( (topic) => {
        renderCategoryTopics(topic)
        })
      })
    })
  }
}


function renderCategoryTopics(topic) {

  let newsContainerNew = document.querySelector('#news-container')

  let navBar = document.querySelector('nav')

  let newsDiv = document.createElement('div')
  newsDiv.classList.add(`row-${++topicId}`)

  let header1 = document.createElement('h3')
  header1.innerHTML = `<strong>Title:</strong> ${topic.title}`

  let header2 = document.createElement('h4')
  header2.innerText = topic.description

  let header3 = document.createElement('h5')
  // header3.innerText = topic.url

  let aTag = document.createElement('a')
  let newWindow = document.createAttribute("target")
  newWindow.value = "_blank"
  aTag.href = `${topic.url}`
  aTag.innerText = "Link to article here!"
  aTag.setAttributeNode(newWindow)
  header3.appendChild(aTag)

  let header4 = document.createElement('h6')

  if (topic.author === null) {
    header4.innerHTML = `<hr class="my-${topicId}"><br>`
  } else {
    header4.innerHTML = `<strong>Author:</strong> ${topic.author}
    <hr class="my-${topicId}"><br>`
  }

  let image = document.createElement('img')
  if (topic.urlToImage === null){
    image.innerHTML = `<br><br><br>`
  } else {
    image.src = topic.urlToImage
    image.classList.add('rounded')
    image.alt = "No Image Available"
  }

  let br = document.createElement('br')

  newsDiv.appendChild(header1)
  newsDiv.appendChild(image)
  newsDiv.appendChild(header2)
  newsDiv.appendChild(header3)
  newsDiv.appendChild(header4)
  newsContainerNew.appendChild(newsDiv)

  if (navBar.id !== "hi"){
    let likeButton = document.createElement('button')
    likeButton.classList.add('like-button')
    likeButton.innerText = "Like 👍"
    likeButton.addEventListener('click', saveArticle)

    let removeButton = document.createElement('button')
    removeButton.classList.add('remove-button')
    removeButton.innerText = "Remove 👎"
    removeButton.addEventListener('click', removeMainNewsArticle)

    //LOGOUT!!!!

    let logoutButton = document.getElementById('input-btn')
    logoutButton.innerText = "Logout"
    logoutButton.addEventListener('click', () => {

      if(logoutButton.innerText === "Login"){
        debugger
      }
    }
    // document.addEventListener('DOMContentLoaded', init)
  )

    newsDiv.appendChild(likeButton)
    newsDiv.appendChild(removeButton)

    if (topic.author === null) {
      header4.innerHTML = `<hr class="my-${topicId}"><br>`
    } else {
      header4.innerHTML = `<strong>Author:</strong> ${topic.author}
      <hr class="my-${topicId}"><br>`
    }

    newsDiv.appendChild(header4)


  }
}




function loginForm(){
  let jumbo = document.createElement('div')
  jumbo.classList.add('jumbotron')

  let form = document.createElement('form')
  let input1 = document.createElement('input')
  input1.id = "input-id"
  input1.placeholder = "E-mail"
  let btn = document.createElement('button')
  btn.id = `input-btn`
  btn.innerText = "Login"
  btn.addEventListener('click', (e) => {
    if(btn.innerText === "Login"){
    e.preventDefault()
    fetch('http://localhost:3000/users')
    .then(res => res.json())
    .then(users => {users.forEach( (user) =>
      {if (user.email === document.querySelector('#input-id').value){
          document.querySelector('#news-container').innerHTML = ""
          navbar.id = user.id
          getAllTopics()
          myFavorites()
        }
      }

    )
  })
}       //closes out if statement on line 181
  else{
    init()
  }
  })

  const navbar = document.querySelector('nav')
  form.appendChild(input1)
  form.appendChild(btn)
  jumbo.appendChild(form)
  navbar.appendChild(jumbo)

}


function getAllTopics(){
  fetch(`https://newsapi.org/v2/top-headlines?language=en&apiKey=${APIKEY}`)
  .then(res => res.json())
  .then(topics => {
    topics.articles.forEach( (topic) => {
      renderTopic(topic)
    })
  })
}
let topicId = 0

function renderTopic(topic) {
  const newsContainer = document.querySelector('#news-container')

  let navBar = document.querySelector('nav')

  let newsDiv = document.createElement('div')
  newsDiv.classList.add(`row-${++topicId}`)

  let header1 = document.createElement('h3')
  header1.innerHTML = `<strong>Title:</strong> ${topic.title}`

  let header2 = document.createElement('h4')
  header2.innerText = topic.description

  let header3 = document.createElement('h5')

  let aTag = document.createElement('a')
  let newWindow = document.createAttribute("target")
  newWindow.value = "_blank"
  aTag.href = `${topic.url}`
  aTag.innerText = "Link to article here!"
  aTag.setAttributeNode(newWindow)
  header3.appendChild(aTag)

  let header4 = document.createElement('h6')

  if (topic.author === null) {
    header4.innerHTML = `<hr class="my-${topicId}"><br>`
  } else {
    header4.innerHTML = `<strong>Author:</strong> ${topic.author}
    <hr class="my-${topicId}"><br>`
  }

  let image = document.createElement('img')
  if (topic.urlToImage === null){
    image.innerHTML = `<br><br><br>`
  } else {
    image.src = topic.urlToImage
    image.classList.add('rounded')
    image.alt = "No Image Available"
  }

  let br = document.createElement('br')

  //welcomes user when they sign in
  //add box or highlight to it
  if (navBar.id !== "0"){
    let welcomeMessage = document.createElement('h1')
    welcomeMessage.id = "welcome"


    grabUserName()
    // document.querySelector('#input-id').reset()
    document.querySelector('#input-btn').innerText = "Login"
    navBar.appendChild(welcomeMessage)
    }


  newsDiv.appendChild(header1)
  newsDiv.appendChild(image)
  newsDiv.appendChild(header2)
  newsDiv.appendChild(header3)
  newsDiv.appendChild(header4)
  newsContainer.appendChild(newsDiv)

  if (navBar.id !== "hi"){

    let likeButton = document.createElement('button')
    likeButton.classList.add('like-button')
    likeButton.innerText = "Like 👍"
    likeButton.addEventListener('click', saveArticle)

    let removeButton = document.createElement('button')
    removeButton.classList.add('remove-button')
    removeButton.innerText = "Remove 👎"
    removeButton.addEventListener('click', removeMainNewsArticle)

    let logoutButton = document.getElementById('input-btn')
  logoutButton.innerText = "Logout"

    newsDiv.appendChild(likeButton)
    newsDiv.appendChild(removeButton)

    if (topic.author === null) {
    header4.innerHTML = `<hr class="my-${topicId}"><br>`
  } else {
    header4.innerHTML = `<strong>Author:</strong> ${topic.author}
    <hr class="my-${topicId}"><br>`
  }
  newsDiv.appendChild(header4)

  }
}

function saveArticle(e){
  const author = e.target.parentNode.childNodes[3].innerText
  const title = e.target.parentNode.childNodes[0].innerText
  const description = e.target.parentNode.childNodes[2].innerText
  const urlToImage = e.target.parentNode.childNodes[1].src
  const url = e.target.parentNode.childNodes[3].firstChild.href
  let navBar = document.querySelector('nav')
  let navBarId = parseInt(navBar.id)
  let parentNode = e.target.parentNode
  fetch(`http://localhost:3000/topics/`,{
    method: "POST",
    body: JSON.stringify({
      topic: {
        user_id: navBarId,
        url: url,
        author: author,
        title: title,
        description: description,
        urlToImage: urlToImage
      }}),
    headers:{
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
}

function removeMainNewsArticle(e){
  let parentNode = e.target.parentNode
  parentNode.remove()
}

function grabUserName(){
  fetch('http://localhost:3000/users')
  .then(res => res.json())
  .then(users => {users.forEach((user) => {
    if(parseInt(document.querySelector('nav').id) === user.id){
      document.querySelector('#welcome').innerText = `Welcome ${user.name}`}
      }
    )
})}
// Need to figure this myFavorites function out, not exactly working
function myFavorites(){
  let navBar = document.querySelector('nav')
  if (navBar.id !== "hi"){

    if(!navBar.myFavorites){
    let myFavorites = document.createElement('button')
    myFavorites.innerText = "My Favorites"
    myFavorites.addEventListener('click', showFavorites)
    navBar.appendChild(myFavorites)}
  }
}

function showFavorites(){
  document.getElementById('news-container').innerHTML = ""
  let navBarId = document.querySelector('nav').id
  fetch(`http://localhost:3000/users/${navBarId}/favorites`)
  .then(res => res.json())
  .then(data =>
    {data.forEach( (topic) => {
    renderFavorites(topic)
  })
})
}

function renderFavorites(topic){
  let newsContainer = document.querySelector('#news-container')

  let navBar = document.querySelector('nav')

  let newsDiv = document.createElement('div')
  newsDiv.classList.add(`row-${++topicId}`)
  newsDiv.classList.add(`col-sm`)

  let header1 = document.createElement('h3')
  header1.innerHTML = `<strong>Title:</strong> ${topic.title}`

  let header2 = document.createElement('h4')
  header2.innerText = topic.description

  let header3 = document.createElement('h5')

  let aTag = document.createElement('a')
  let newWindow = document.createAttribute("target")
  newWindow.value = "_blank"
  aTag.href = `${topic.url}`
  aTag.innerText = "Link to article here!"
  aTag.setAttributeNode(newWindow)
  header3.appendChild(aTag)

  let header4 = document.createElement('h6')

  if (topic.author === null) {
    header4.innerHTML = ''
  } else {
    header4.innerHTML = `<strong>Author:</strong> ${topic.author}`
  }

  let image = document.createElement('img')
  if (topic.url_to_image === null){
    image.innerHTML = `<br><br><br>`
  } else {
    image.src = topic.url_to_image
    image.classList.add('rounded')
    image.alt = "No Image Available"
  }
  if (navBar.id !== "hi"){
    let welcomeMessage = document.createElement('h1')
    welcomeMessage.id = "welcome"


    grabUserName()
    navBar.appendChild(welcomeMessage)
    }

    newsContainer.prepend(newsDiv)
    newsDiv.prepend(header4)
  newsDiv.prepend(header3)
  newsDiv.prepend(header2)
  newsDiv.prepend(image)
  newsDiv.prepend(header1)

  if (navBar.id !== "hi"){

    let removeButton = document.createElement('button')
    removeButton.classList.add('remove-button')
    removeButton.innerText = "Destroy 🧨"
    removeButton.addEventListener('click', ()=> {removeFavNewsArticle(topic.url, topic.id)})

    newsDiv.appendChild(removeButton)
  }
}

function removeFavNewsArticle(url,id){
  let navBarId = document.querySelector('nav').id
  fetch(`http://localhost:3000/users/${navBarId}/favorites/${id}`,{
    method: "DELETE"
  }).then(showFavorites)
}

function searchNews(e) {
  e.preventDefault()
  let searchTerm = document.querySelector('#new-search').value
  if(searchTerm === ""){
    alert("Search for something!")
  }
  else{
  fetch(`https://newsapi.org/v2/everything?q=${searchTerm}&language=en&apiKey=${APIKEY}`)
  .then(res => res.json())
  .then(data => {
    document.querySelector('#news-container').innerHTML = ""
  	data.articles.forEach( (article) => {
      renderTopic(article)
    })
  })
}}
