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
        <p>${this.date}</p>
        <p>${this.content}</p>
        <p>${this.category.name}</p>
        <button id="edit-button" data-id=${this.id} onclick="editEntries(this)">edit</button></p>
        <button id="delete-button" data-id=${this.id} onclick="deleteEntries(this)">delete</button></p>
      </div>
      <br><br>`
  }

  renderUpdateForm() {
      return `
      <form data-id=${this.id} >
        <h3>Edit an entry</h3>

        <label>Date</label>
        <input id='input-date' type="text" name="date" value="${this.date}" class="input-text">
        <br><br>

        <label>Content</label>
        <input id='input-content' type="text" name="content" value="${this.content}" class="input-text">
        <br><br>

        <label>Category</label>
        <select id="categories" name="categories" value="${this.category.name}">
          <option value="1">event</option>
          <option value="2">quote</option>
        </select>
        <br><br>

        <input id='edit-button' type="submit" name="submit" value="Edit this entry" class="submit">
      </form>
    `;
    }

    static findById(id) {
      return this.all.find(entry => entry.id === id);
    }
}

Entry.all = [];