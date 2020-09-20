// array of object instances
class Entry {

// mapping values from DB onto new entry instances:
  constructor(entry, entryAttributes) {
    this.id = entry.id;
    this.date = entryAttributes.date;
    this.content = entryAttributes.content;
    this.type = entryAttributes.type;
    // we do a GET anyway, why not store them in an array for future use?
    Entry.all.push(this);
  }

// put data ids on divs so we can find them again

  renderEntryCard() {
    return `
      <div data-id=${this.id}>
        <p>${this.date}</p>
        <p>${this.content}</p>
        <p>${this.type.name}</p>
        <button data-id=${this.id}>edit</button>
      </div>
      <br><br>`;
  }
}

// global scope, outside the class
Entry.all = [];
