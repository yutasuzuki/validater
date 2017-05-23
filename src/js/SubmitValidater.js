/**
 * SubmitValidater.js
 * target: classをつけたいもの
 * validates: 各validaterのインスタンスを配列で渡す。
 * options = {
 *  read: boolean（読み込み時に判定するかの設定）
 * }
 */
class SubmitValidater {
  constructor(target,validates = [],options) {
      this.target = typeof target === 'object'? target : document.querySelector(target);

      // find parent form tag
      let parent = this.target.parentNode;
      let parentNodeName = parent.nodeName;
      while(parentNodeName !== 'FORM'){
        parent = parent.parentNode;
        parentNodeName = parent.nodeName;
      }
      this.form = parent;

      // set options
      this.options = {
        read: options && options.read || false
      }

      //set validate instances
      this.validates = validates;
      this.status = false;

      // create handler
      this.validateHandler = (e) => {
        e.preventDefault();
        this.update();
      };

      this.submitHandler = (e) => {
        e.preventDefault();
        this.form.submit();
      }

      // Event start
      this.addEvent();
  }

  addEvent() {
    window.addEventListener('input',this.validateHandler);
    window.addEventListener('change',this.validateHandler);
    window.addEventListener('load',this.validateHandler);
  }

  update() {
    let bools = [];
    Object.keys(this.validates).forEach((key,value) => {
      if(this.options.read){
        this.validates[key].update();
      }
      bools.push(this.validates[key].getValidStatus());
    });
    this.changeValid(bools);
    this.changeSubmitEvent(bools);
  }

  changeValid(bools) {
    if(bools.every(this.checkArrayBoolean)){
      this.removeClass(this.target,'is-disabled');
      this.status = true;
    }else{
      this.addClass(this.target,'is-disabled');
      this.status = false;
    }
  }

  changeSubmitEvent(bools) {
    if(bools.every(this.checkArrayBoolean)){
      this.target.addEventListener('click',this.submitHandler);
    }else{
      this.target.removeEventListener('click',this.submitHandler);
    }
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
export default SubmitValidater;
