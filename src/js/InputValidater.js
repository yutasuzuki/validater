/**
 * InputValidater.js
 * options = {
 *  parent: dom or selector (validateのクラスを付ける親を選択。*デフォルトは直上)
 *  read: boolean（読み込み時に判定するかの設定）
 * }
 */
class InputValidater {
  constructor(element,options) {
      this.targets = typeof element === 'object'? element : document.querySelectorAll(element);

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
        'firstTouch': options && options.firstTouch || false
      };
      // firstTouch check
      var isFirstTouch = false;
      this.firstTouchFlag = {};

      // set validate status
      this.status = false;

      // create Event Handler
      this.changeHandler = (e) => {
        e.preventDefault();
        this.update();
      };
      this.inputHandler = (e) => {
        e.preventDefault();
        this.update();
      };
      this.firstTouchHandler = (e) => {
        e.preventDefault();
        this.firstTouchFlag[e.target.name] = true;
        if (this.isFirstTouch()) {
          this.options.firstTouch = true;
        }
        this.update();
      };

      // Event start
      this.addEvent();
      if (this.options.read) {
        this.update();
      }
  }

  isFirstTouch() {
    return Object.keys(this.firstTouchFlag)
      .map((key) => {
        return this.firstTouchFlag[key]
      })
      .every(this.checkArrayBoolean);
  }

  //add Event
  addEvent() {
    for(var i = 0,len = this.targets.length; i < len; i++) {
      this.targets[i].addEventListener('change', this.changeHandler);
      this.targets[i].addEventListener('input', this.inputHandler);
      this.targets[i].addEventListener('blur', this.firstTouchHandler);
      this.firstTouchFlag[this.targets[i].name] = false;
    }
  }

  update() {
    if (!this.options.firstTouch) return;
    let validItems = {
      str: [],
      valid: []
    }
    for(var i = 0,len = this.targets.length; i < len; i++){
      let str = this.targets[i].value;
      let valid = this.targets[i].validity.valid;
      if(str){
        validItems.str.push(true);
        if (valid) {
          validItems.valid.push(true);
        }else{
          validItems.valid.push(false);
        }
      }else{
        validItems.str.push(false);
      }
    }

    if(validItems.str.every(this.checkArrayBoolean)){
      this.removeClass(this.options.parent,'is-required');
      if (validItems.valid.every(this.checkArrayBoolean)) {
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

  destroy(){
    this.targets.removeEventListener('change',this.changeHandler);
    this.targets.removeEventListener('input',this.inputHandler);
    this.targets.removeEventListener('submit',this.submitHandler);
  }

}
export default InputValidater;
