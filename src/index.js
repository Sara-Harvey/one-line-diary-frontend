const endPoint = "http://localhost:3000/entries";

document.addEventListener('DOMContentLoaded', () => {
   getEntries()

  const createEntryForm = document.querySelector("#create-entry-form")

createEntryForm.addEventListener("submit", (e) => 
    createFormHandler(e))
  })

function getEntries() {
  fetch(endPoint)
    .then(res => res.json())
    .then(entries => {
      entries.data.forEach(entry => {
      const newEntry = new Entry(entry.id, entry.attributes)

      document.querySelector('#entries-container').innerHTML += newEntry.renderEntryCard();
    })
     // .catch(err => console.log(err))
  })
}

function createFormHandler(e) {
  e.preventDefault()
  const dateInput = document.querySelector('#input-date').value
  const contentInput = document.querySelector('#input-content').value
  const typeId = parseInt(document.querySelector('#types').value)
  postFetch(dateInput, contentInput, typeId)
}

function postFetch(date, content, type_id) {
  const bodyData = {date, content, type_id}

  fetch(endPoint, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(bodyData)
    })
  .then(response => response.json())
  .then(entry => {
    const entryData = entry.data
    
    let newEntry = new Entry(entryData, entryData.attributes)
    document.querySelector('#entries-container').innerHTML += newEntry.renderEntryCard()
  })
}