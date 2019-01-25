document.addEventListener('DOMContentLoaded', init)

const btn = document.createElement('button')
btn.innerText = "Login"
function init(){
  getAllTopics()
  loginForm()
  logout()



  let searchForm = document.querySelector('#new-search-form')
  searchForm.addEventListener('submit', searchNews)
}


function loginForm(){
  let jumbo = document.createElement('div')
  jumbo.classList.add('jumbotron')

  let form = document.createElement('form')
  form.method = "POST"
  let input1 = document.createElement('input')
  input1.id = "input-id"
  input1.placeholder = "E-mail"
  let btn = document.createElement('button')
  btn.id = `input-btn`
  btn.innerText = "Login"
  btn.addEventListener('click', (e) => {
    e.preventDefault()
    fetch('http://localhost:3000/users')
    .then(res => res.json())
    .then(users => {users.forEach( (user) =>
      {
        if (user.email === document.querySelector('#input-id').value){
          document.querySelector('#news-container').innerHTML = ""
          navbar.id = user.id
          getAllTopics()
          myFavorites()
        }
      }

    )
  })
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
    header4.innerHTML = ''
  } else {
    header4.innerHTML = `<strong>Author:</strong> ${topic.author}`
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
    document.querySelector('#input-btn').innerText = "Logout"
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

    newsDiv.appendChild(likeButton)
    newsDiv.appendChild(removeButton)
  }
}

function logout(){
  let logoutButton = document.getElementById('input-btn')
  logoutButton.addEventListener('click', () => {
    logoutButton.innerText = "Login"
  })
}


// topic1 = Topic.create!(author: , title: , description: , published_at: ,
//   source_id: , source_name: , url: , urlToImage: , user_id: )

function saveArticle(e){
  const author = e.target.parentNode.childNodes[4].innerText
  const title = e.target.parentNode.childNodes[0].innerText
  const description = e.target.parentNode.childNodes[2].innerText
  const urlToImage = e.target.parentNode.childNodes[1].src
  const url = e.target.parentNode.childNodes[3].firstChild.href
  let navBar = document.querySelector('nav')
  let navBarId = parseInt(navBar.id)
  let parentNode = e.target.parentNode
  // debugger
  fetch(`http://localhost:3000/topics/`,{
    method: "POST",
    body: JSON.stringify({
      topic: {
        user_id: navBarId,
        url: url,
        author: author,
        title: title,
        description: description,
        url_to_image: urlToImage
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

    let myFavorites = document.createElement('button')
    myFavorites.innerText = "My Favorites"
    myFavorites.addEventListener('click', showFavorites)
    navBar.appendChild(myFavorites)
  }
}

function showFavorites(){
  console.log('beginning')
  let navBarId = document.querySelector('nav').id
  fetch(`http://localhost:3000/users/${navBarId}/favorites`)
  .then(res => res.json())
  .then(data => console.log(data))
  document.getElementById('news-container').innerHTML = ""
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
