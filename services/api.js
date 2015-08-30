import _ from 'lodash';

let data = {
  firstname: '',
  lastname: '',
  message: ''
};

export function save(newData) {
  console.log(data);
  console.log(newData);
  console.log(_.assign({}, data, newData));
  data = _.assign({}, data, newData);
  return Promise.resolve();
}

export function fetch() {
  return Promise.resolve(data);
}
