const endPoint = "http://localhost:3000/entries"

document.addEventListener('DOMContentLoaded', () => {
   getEntries(); todaysDate();

  const createEntryForm = document.querySelector("#create-entry-form")
  createEntryForm.addEventListener("submit", (e) => createFormHandler(e))
  const entryContainer = document.querySelector("#entries-container")

})

function todaysDate() {
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  document.getElementById("todays-date").innerHTML = 'Today is ' + date;
}

function getEntries() {
  fetch(endPoint)
    .then(res => res.json())
    .then(entries => {
      entries.data.forEach(entry => {
      let newEntry = new Entry(entry, entry.attributes)
      document.querySelector('#entries-container').innerHTML += newEntry.renderEntryCard()
      })
     // .catch(err => console.log(err))
    })
}

function editEntries(elmnt) {
      const id = elmnt.dataset.id;
      const entry = Entry.findById(id);
      document.querySelector('#update-entry').innerHTML = entry.renderUpdateForm();
      document.querySelector('#update-entry').addEventListener('submit', e => updateFormHandler(e));
}

function deleteEntries(elmnt) {
	const id = elmnt.dataset.id;
	const entry = Entry.findById(id);
  
  var result = confirm("Are you sure you want to delete?");
  if (result) {

	let delObj = { method: "DELETE" }
	fetch(`http://localhost:3000/entries/${entry.id}`, delObj)
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            elmnt.parentNode.remove(elmnt);           
        })
    }
  }

function entryCategory() {
    const x = document.getElementById("entriesByCat");    
    const i = x.selectedIndex;
    const entries = Entry.all  
    
    const eventEntries = entries.filter(function (entry) {
      return entry.category.id == x.options[i].value;
    });
    const eventEntryNames = eventEntries.map(function (entry) {
      return entry.content;
    });
    document.getElementById("see-by-entry").innerHTML = eventEntryNames.join('<BR>');
}

function createFormHandler(e) {
  e.preventDefault()
  const dateInput = document.querySelector('#input-date').value
  const contentInput = document.querySelector('#input-content').value
  const categoryId = parseInt(document.querySelector('#categories').value)
  postFetch(dateInput, contentInput, categoryId)
}

function postFetch(date, content, category_id) {
  const bodyData = {date, content, category_id}

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

function updateFormHandler(e) {
  e.preventDefault();
  //const id = parseInt(e.target.dataset.id);
  const id = e.target.dataset.id;
  const entry = Entry.findById(id);
  const date = e.target.querySelector('#input-date').value;
  const content = e.target.querySelector('#input-content').value;
  const category_id = e.target.querySelector('#categories').value;
  //const category_id = parseInt(e.target.querySelector('#categories').value);
  patchEntry(entry, date, content, category_id)
}

function patchEntry(entry, date, content, category_id) {
  const bodyJSON = { entry, date, content, category_id }
  fetch(`http://localhost:3000/entries/${entry.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: 'application/json',
    },
    body: JSON.stringify(bodyJSON) //,
  })
    .then(response => response.json())
    // our backend responds with the updated syllabus instance represented as JSON
    .then(updatedEntry => console.log(updatedEntry));
}

