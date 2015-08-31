import _ from 'lodash';

let notes = [{
  id: "0",
  subject: 'Subject 0',
  content: 'Content 0'
}, {
  id: "1",
  subject: 'Subject 1',
  content: 'Content 1'
}, {
  id: "2",
  subject: 'Subject 2',
  content: 'Content 2'
}];

let notesCount = notes.length;

export function createNewNote() {
  let id = notesCount++;

  notes.push({
    id: id.toString(),
    subject: '(no subject)',
    content: '(no content)'
  });

  return new Promise((resolve, reject) => {
    setTimeout(resolve.bind(null, id, 1000));
  });
}

export function deleteNoteById(id) {
  let index = _.findIndex(notes, { id: id });
  notes.splice(index, 1);

  return new Promise((resolve, reject) => {
    setTimeout(resolve, 1000);
  });
}

export function updateNoteById(id, newData) {
  let index = _.findIndex(notes, { id: id });
  notes.splice(index, 1, _.assign({}, { id: id }, newData));

  return new Promise((resolve, reject) => {
    setTimeout(resolve, 1000);
  });
}

export function getNoteById(id) {
  return new Promise((resolve, reject) => {
    let note = _.find(notes, { id: id });
    setTimeout(resolve.bind(null, _.assign({}, note)), 1000);
  })
}

export function getInbox() {
  return new Promise((resolve, reject) => {
    setTimeout(resolve.bind(null, _.assign([], notes)), 1000);
  });
}
