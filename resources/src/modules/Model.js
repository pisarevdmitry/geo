export default class Model {
    postData(data) {
        let myInit = { method: 'POST',
            body: data,
            mode: 'cors',
            cache: 'default' };
      return fetch('/api/posts', myInit)
    }
    getPosts() {
        let myInit = { method: 'GET',
            mode: 'cors',
            cache: 'default' };
        return fetch('/api/posts', myInit)
    }
}