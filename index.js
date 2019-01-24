document.addEventListener('DOMContentLoaded', () => {
  getAllTopics()
  loginForm()



  let searchForm = document.querySelector('#new-search-form')
  searchForm.addEventListener('submit', searchNews)
})

const btn = document.createElement('button')
btn.innerText = "Login"

function loginForm(){
  let jumbo = document.createElement('div')
  jumbo.classList.add('jumbotron')

  let form = document.createElement('form')
  form.method = "POST"
  let input1 = document.createElement('input')
  input1.id = "input-id"
  input1.placeholder = "E-mail"
  let btn = document.createElement('button')
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

// function checkValidUser(user){
//   if (user.email !== document.querySelector('#input-id').value){
//     alert('User not found')
//   }
//
// }





function getAllTopics(){
  fetch(`https://newsapi.org/v2/top-headlines?language=en&apiKey=c1787a15125449dca4ac46f1dd0b8a0f`)
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
  aTag.href = `${topic.url}`
  aTag.innerText = "Link to article here!"
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
    // welcomeMessage.innerText = `Welcome ${grabUserName()}!`

    navBar.appendChild(welcomeMessage)}


  newsDiv.appendChild(header1)
  newsDiv.appendChild(image)
  newsDiv.appendChild(header2)
  newsDiv.appendChild(header3)
  newsDiv.appendChild(header4)
  newsContainer.appendChild(newsDiv)

  if (navBar.id !== "0"){
    let likeButton = document.createElement('button')
    likeButton.innerText = "Like"

    let removeButton = document.createElement('button')
    removeButton.innerText = "Remove"

    newsDiv.appendChild(likeButton)
    newsDiv.appendChild(removeButton)
  }
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

function searchNews(e) {
  e.preventDefault()

  let searchTerm = document.querySelector('#new-search').value
  if(searchTerm === ""){
    alert("Search for something!")
  }
  else{

  fetch(`https://newsapi.org/v2/everything?q=${searchTerm}&language=en&apiKey=c1787a15125449dca4ac46f1dd0b8a0f`)
  .then(res => res.json())
  .then(data => {
    document.querySelector('#news-container').innerHTML = ""
  	data.articles.forEach( (article) => {
      renderTopic(article)
    })
  })
}}
