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
      <div data-id=${this.id}>
        <p style="font-family: Amatic SC, sans-serif; font-size: 2em;">
        ${this.date}&nbsp &nbsp &nbsp${this.content} — ${this.category.name}&nbsp &nbsp &nbsp
        
        <button id="edit-button" data-id=${this.id} onclick="editEntries(this)">
          edit</button>
        
        <button id="delete-button" data-id=${this.id} onclick="deleteEntries(this)">
          delete</button>
        </div>`
  }

  renderUpdateForm() {
      return `
      <form data-id=${this.id}>
        <h3>Edit an entry</h3>

        <label id="date">Date</label>&nbsp &nbsp
        <input id='input-date' type="date" name="date" value="${this.date}" class="input-text">
        <br><br>

        <label id="content">Content</label>&nbsp &nbsp
        <input id='input-content' type="text" name="content" value="${this.content}" class="input-text">
        <br><br>

        <label id="category">Category</label>&nbsp &nbsp
        <select id="input-category" name="categories" value="${this.category.name}">
          <option value="1">event</option>
          <option value="2">quote</option>
        </select>
        <br><br>

        <input id='edit-button' type="submit" name="submit" value="Edit this entry" class="submit"
          style="color: black;
          font-family: Amatic SC, sans-serif;
          font-size: 1.5em;
          font-weight: bold;
          background-color: #f3d899;
          padding: 4px 32px;
          border-radius: 10px 10px;
          border: none;"
        >
      </form>
    `;
    }

    static findById(id) {
      return this.all.find(entry => entry.id === id);
    }
}

Entry.all = [];