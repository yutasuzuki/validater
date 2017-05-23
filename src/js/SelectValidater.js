/**
 * SelectValidater.js
 * options = {
 *  parent: dom or selector (validateのクラスを付ける親を選択。*デフォルトは直上)
 *  read: boolean（読み込み時に判定するかの設定）
 * }
 */
class SelectValidater {
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
        'read': options && options.read || false,
        'firstTouch': options && options.firstTouch || false,
        'group': options && options.group || false
      };
      // firstTouch check
      let isFirstTouch = false;
      this.firstTouchFlag = {};

      // set validate status
      this.status = false;

      // create Event Handler
      this.changeHandler = (e) => {
        e.preventDefault();
        this.firstTouchFlag[e.target.name] = true;
        if (this.isFirstTouch()) {
          this.options.firstTouch = true;
        }
        this.update();
      };

      // Event start
      this.addEvent();
      if(this.options.read){
        this.update();
      }
  }

  isFirstTouch() {
    const arrayFirstTouchFlags = Object.keys(this.firstTouchFlag).map( key => this.firstTouchFlag[key] )
    if (this.options.group) {
      return arrayFirstTouchFlags.includes(true);
    } else {
      return arrayFirstTouchFlags.every(this.checkArrayBoolean);
    }
  }

  addEvent() {
    for(let i = 0, len = this.targets.length; i < len; i++){
      this.targets[i].addEventListener('change', this.changeHandler);
      this.firstTouchFlag[this.targets[i].name] = false;
    }
  }

  update() {
    if (!this.options.firstTouch) return;
    let validItems = {
      str: [],
      valid: []
    }
    for(let i = 0, len = this.targets.length; i < len; i++){
      let str = this.targets[i].value;
      if (!this.targets[i].value) {
        validItems.valid.push(false);
      } else if (this.targets[i].value == '0') {
        validItems.valid.push(false);
      } else {
        validItems.valid.push(true);
      }
    }

    let isValid = this.isValidate(validItems);
    if(isValid){
      this.removeClass(this.options.parent,'is-required');
      if (isValid) {
        this.removeClass(this.options.parent,'is-error');
        this.setValidStatus(true);
      }else{
        this.addClass(this.options.parent,'is-error');
        this.setValidStatus(false);
      }
    }else{
      this.addClass(this.options.parent,'is-required');
      this.removeClass(this.options.parent,'is-error');
      this.setValidStatus(false);
    }
  }

  isValidate(validItems) {
    if (this.options.group) {
      return validItems.valid.includes(true)
    } else {
      return validItems.valid.every(this.checkArrayBoolean);
    }
  }

  setValidStatus(bool) {
    this.status = bool;
  }

  getValidStatus() {
    return this.status;
  }

  checkArrayBoolean(value) {
    if (value) {
      return true;
    } else {
      return false;
    }
  }

  addClass(element,str){
    let klassName = element.className;
    let item = '';
    if(klassName.indexOf(str) === -1){
      if(klassName.slice(-1) !== ' '){
        item += ' ' + str.replace(/\s+/g, '');
      }else{
        item = str;
      }
    }
    element.className += item;
  }

  removeClass(element,str){
    let item = '';
    let klasses = element.className.split(' ');
    for(let i = 0, len = klasses.length; i < len; i++){
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
export default SelectValidater;
