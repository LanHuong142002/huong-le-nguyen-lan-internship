/**
 * @class noteController
 * @description Controller is an intermediary for views and models
 *
 * @param model
 * @param view
 */
export default class NoteController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  init() {
    this.renderAllNotes();
  }

  renderAllNotes = () => {
    this.listEvents();

    this.view.changePage();

    // function increase textarea
    this.view.bindInputBreakDown();

    // function show input form
    this.view.bindShowInput(this.addNote);

    // function delete list notes
    this.view.bindDeleteListNotes(this.deleteNote);
  };

  listEvents = async () => {
    const listNotes = await this.model.filterListNotes();
    const listTrash = await this.model.filterTrashNotes();

    // function render list notes
    this.view.renderListNotes(listNotes);

    // function render trash notes
    this.view.renderTrashNote(listTrash);

    // function show header
    this.view.bindShowHeader();

    // function show note form
    this.view.constructor.showNoteForm(this.findNote);

    // function delete
    this.view.constructor.bindDeleteNotes(this.deleteNote);

    this.view.constructor.bindDeleteNotInTrash(this.removeTrash);
  };

  removeTrash = (index) => {
    const note = this.model.findNote(index);
    // function render confirm message
    this.view.renderConfirmMessage(note);

    // function close and remove trash
    this.view.closeConfirmMessage((id) => {
      this.model.deleteNoteInTrash(id);

      this.view.renderTrashNote(this.model.filterTrashNotes());
      this.listEvents();
    });
  };

  /**
   * @description function add note
   *
   * @param {String} title is title from input
   * @param {String} description is description from input
   */
  addNote = async (title, description) => {
    await this.model.addNote(title, description);
    this.listEvents();
  };

  /**
   * @description function delete note in model
   *
   * @param {String} index is index of note
   */
  deleteNote = (index) => {
    this.model.deleteNote(index);
    this.listEvents();
  };

  /**
   * @description function edit note
   *
   * @param {String} id is a id of note
   * @param {String} title is title of note
   * @param {String} description is description of note
   */
  editNote = (id, title, description) => {
    this.model.editNote(id, title, description);
    this.listEvents();
  };

  /**
   * @description function find note
   *
   * @param {String} id is a id of note
   */
  findNote = (id) => {
    const note = this.model.findNote(id);
    // function render form note
    this.view.renderFormNote(note);

    // function input break down of form note
    this.view.constructor.inputBreakDownNoteForm();

    // function save form note by click out or button close
    this.view.saveNoteForm(this.editNote);

    // function delete note
    this.view.deleteNoteForm(this.deleteNote);
  };
}
