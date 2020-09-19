const endPoint = "http://localhost:3000/entries";

document.addEventListener('DOMContentLoaded', () => {
   getEntries()

  const createSyllabusForm = document.querySelector("#create-entry-form")

  createSyllabusForm.addEventListener("submit", (e) => 
    createFormHandler(e))
  })

function getEntries() {
  fetch(endPoint)
    .then(res => res.json())
    .then(entries => {

      entries.data.forEach(entry => {
        const entryMarkup = `
          <div data-id=${entry.id}>
            <p>${entry.attributes.date}</p>
            <p>${entry.attributes.content}</p>
            <p>${entry.attributes.type.name}</p>
            <button data-id=${entry.id}>edit</button>
          </div>
          <br><br>`;

          document.querySelector('#entries-container').innerHTML += entryMarkup
      })
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
    const entryData = entry.data.attributes
    const entryMarkup = `
    <div data-id=${entry.id}>
     <p>${entryData.date}</p>
     <p>${entryData.content}</p>
     <p>${entryData.type.name}</p>
     <button data-id=${entryData.id}>edit</button>
    </div>
    <br><br>`;

    document.querySelector('#entries-container').innerHTML += entryMarkup;
  })
}