document.addEventListener('DOMContentLoaded', getAllTopics())

function getAllTopics(){
  fetch(`http://localhost:3000/topics`)
  .then(res => res.json())
  .then(topics => {
    topics.forEach( (topic) => {
      renderTopics(topic)
    })
  })
}

function renderTopics(topic) {
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
image.src = topic.url_to_image



newsDiv.appendChild(header1)
newsDiv.appendChild(image)
newsDiv.appendChild(header2)
newsDiv.appendChild(header3)
newsDiv.appendChild(header4)
}
