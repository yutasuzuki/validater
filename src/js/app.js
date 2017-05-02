import InputValidater from './InputValidater';
import CheckValidater from './CheckValidater';
import SelectValidater from './SelectValidater';
import SubmitValidater from './SubmitValidater';

// let currentZipValid = new InputValidater('#request_current_zip_code','#js-current-zip-wrapper');
// let currentAddressNumValid = new InputValidater('#js-current-address-number','#js-current-address-wrapper');
// let currentBuildingTypeValid = new CheckValidater('[name="request[current_building_type]"]','#js-current-building-type-wrapper');
//
// let newZipValid = new InputValidater('#request_new_zip_code','#js-new-zip-wrapper');
// let newCityValid = new InputValidater('#request_new_city_name','#js-new-address-wrapper');
// let newBuildingTypeValid = new CheckValidater('[name="request[new_building_type]"]','#js-new-building-type-wrapper');
//
// let submitValid = new SubmitValidater('#js-submit','#request',[currentZipValid,currentAddressNumValid,currentBuildingTypeValid,newZipValid,newCityValid,newBuildingTypeValid]);

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
  selectValidater
];

let submitValid = new SubmitValidater('#js-submit',watchItems,{
  read: false
});
//let submitValid = new SubmitValidater('#js-submit','#js-form',[nameValid,numberValid,testValid,genderValid,checkValid]);
