class Entry {
  constructor(entry, entryAttributes) {
    this.id = entry.id
    this.date = entryAttributes.date
    this.content = entryAttributes.content
    this.category = entryAttributes.category
    Entry.all.push(this)
  }

  renderEntryCard() {
    return `
      <li><div data-id=${this.id}>
        <p style="font-family: Amatic SC, sans-serif; font-size: 2em; display: inline;">
        ${this.date}&nbsp &nbsp &nbsp${this.content} — ${this.category.name} &nbsp &nbsp &nbsp </p>
        
        <button id="edit-button" data-id=${this.id} onclick="editEntries(this)">
          edit</button>       
        <button id="delete-button" data-id=${this.id} onclick="deleteEntries(this)">
          delete</button>
        </div></li>`
  }

  renderUpdateForm() {
      return `
      <form data-id=${this.id}>
        <h3>Edit an entry</h3>

        <label>Date</label>&nbsp &nbsp
        <input id='input-date' type="date" name="date" value="${this.date}" class="input-text">
        <br><br>

        <label>Content</label>&nbsp &nbsp
        <input id='input-content' type="text" name="content" value="${this.content}" class="input-text">
        <br><br>

        <label>Category</label>&nbsp &nbsp
        <select id="categories" name="categories" value="${this.category.name}">
          <option value="1">event</option>
          <option value="2">quote</option>
        </select>
        <br><br>

        <input id='edit-button' type="submit" name="submit" value="Edit this entry" class="submit" 
        style="background-color: #fae4b1;">
      </form>
    `;
    }

    static findById(id) {
      return this.all.find(entry => entry.id === id);
    }
}

Entry.all = [];

