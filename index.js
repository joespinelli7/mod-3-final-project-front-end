document.addEventListener('DOMContentLoaded', getAllTopics())

function getAllTopics(){
  fetch(`http://localhost:3000/topics`)
  .then(res => res.json())
  .then(data => {console.log(data)})
}
