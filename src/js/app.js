import InputValidater from './InputValidater';
import CheckValidater from './CheckValidater';
import SelectValidater from './SelectValidater';
import SubmitValidater from './SubmitValidater';



let nameValid = new InputValidater('#js-form-name',{
  read: false
});

let nValid = new InputValidater('.js-form-name',{
  sync: true,
  read: false,
  errorMsg: '#js-form-name-error'
});

let numberValid = new InputValidater('#js-form-number',{
  read: false
});
let testValid = new InputValidater('#js-form-test');
let genderValid = new CheckValidater('[name=gender]',{
  parent: '#radio-wrapper'
});
let checkValid = new CheckValidater('[name=meta]',{
  parent: '#check-wrapper',
  read: false
});
let selectValidater = new SelectValidater('.js-select',{})
let selectGroupValidater = new SelectValidater('.js-select-group',{
  group: true
})
let watchItems = [
  nValid,
  numberValid,
  testValid,
  genderValid,
  checkValid,
  selectValidater,
  selectGroupValidater
];

let submitValid = new SubmitValidater('#js-submit',watchItems,{
  read: false
});
