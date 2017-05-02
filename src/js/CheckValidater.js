/**
 * CheckValidater.js
 * options = {
 *  parent: dom or selector (validateのクラスを付ける親を選択。*デフォルトは直上)
 *  read: boolean（読み込み時に判定するかの設定）
 * }
 */
class CheckValidater {
  constructor(elements,options) {
      this.targets = typeof elements === 'object'? elements : document.querySelectorAll(elements);

      // set option params
      let parent = '';
      if(options && options.parent) {
        parent = typeof options.parent === 'object'? element : document.querySelector(options.parent);
      }else{
        parent = this.targets[0].parentNode;
      }
      this.options = {
        'parent': parent,
        'read': options && options.read || false
      };

      // set validate status
      this.status = false;

      // create Event Handler
      this.changeHandler = (e) => {
        e.preventDefault();
        this.update();
      };

      // Event start
      this.addEvent();
      if(this.options.read){
        this.update();
      }
  }

  addEvent() {
    for(let i = 0, len = this.targets.length; i < len; i++){
      this.targets[i].addEventListener('change',this.changeHandler);
    }
  }

  update() {
    for(let i = 0, len = this.targets.length; i < len; i++){
      if(this.targets[i].checked){
        this.removeClass(this.options.parent,'is-required');
        this.setValidStatus(true);
        break;
      }else{
        this.addClass(this.options.parent,'is-required');
        this.setValidStatus(false);
      }
    }
  }

  setValidStatus(bool) {
    this.status = bool;
  }

  getValidStatus() {
    return this.status;
  }

  addClass(element,str){
    let klassName = element.className;
    let item = '';
    if(klassName.indexOf(str) === -1){
      if(klassName.slice(-1) !== ' '){
        item += ' ' + str.replace(/\s+/g, "");
      }else{
        item = str;
      }
    }
    element.className += item;
  }

  removeClass(element,str){
    let item = '';
    let klasses = element.className.split(' ');
    for(var i = 0, len = klasses.length; i < len; i++){
      if(klasses[i] !== str){
        let klass = klasses[i] + ' ';
        if(klass !== ' ') {
          item += klass;
        }
      }
    }
    element.className = item.replace(/\s\s+/g, "");
  }

}
export default CheckValidater;
