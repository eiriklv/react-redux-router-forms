import _ from 'lodash';

let data = {
  firstname: '',
  lastname: '',
  message: ''
};

export function save(newData) {
  data = _.assign({}, data, newData);
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 1000);
  });
}

export function fetch() {
  return new Promise((resolve, reject) => {
    setTimeout(resolve.bind(null, _.assign({}, data)), 1000);
  })
}
