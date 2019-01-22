document.addEventListener('DOMContentLoaded', getAllTopics())

function getAllTopics(){
  fetch(`http://localhost:3000/topics`)
  .then(res => res.json())
  .then(topics => topics.forEach( (topic) => {
    let div = document.createElement('div')
    let li = document.createElement('li')
    let src = topic.url
    li.appendChild(src)
    div.appendChild(li)
  }))
}

function renderTopics() {
  let div = document.createElement('div')
  let li = document.createElement('li')
  let src = topic.url
}
