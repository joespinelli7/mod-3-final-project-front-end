document.addEventListener('DOMContentLoaded', () => {
  getAllTopics()

  let searchForm = document.querySelector('#new-search-form')
  searchForm.addEventListener('submit', searchNews)
})

function getAllTopics(){
  fetch(`https://newsapi.org/v2/top-headlines?language=en&apiKey=c1787a15125449dca4ac46f1dd0b8a0f`)
  .then(res => res.json())
  .then(topics => {
    topics.articles.forEach( (topic) => {
      renderTopic(topic)
    })
  })
}

function renderTopic(topic) {
const newsContainer = document.querySelector('#news-container')

let newsDiv = document.createElement('div')
newsDiv.classList.add('row')
newsContainer.appendChild(newsDiv)

let header1 = document.createElement('h3')
header1.innerText = topic.title

let header2 = document.createElement('h4')
header2.innerText = topic.description

let header3 = document.createElement('h5')
header3.innerText = topic.url

let header4 = document.createElement('h6')
header4.innerText = topic.author

let image = document.createElement('img')
image.src = topic.urlToImage



newsDiv.appendChild(header1)
newsDiv.appendChild(image)
newsDiv.appendChild(header2)
newsDiv.appendChild(header3)
newsDiv.appendChild(header4)
}

function searchNews(e) {
  e.preventDefault()

  let searchTerm = document.querySelector('#new-search').value

  fetch(`https://newsapi.org/v2/everything?q=${searchTerm}&language=en&apiKey=c1787a15125449dca4ac46f1dd0b8a0f`)
  .then(res => res.json())
  .then(data => {
    document.querySelector('#news-container').innerHTML = ""
  	data.articles.forEach( (article) => {
      renderTopic(article)
    })
  })
}
