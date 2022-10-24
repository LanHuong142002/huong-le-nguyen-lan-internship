export default class PreventEvents {
  /**
   * @description function stop overlay bubbling event of 2 input note form
   */
  static stopEvents(element) {
    element.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }
}
