import {  Observable } from 'rxjs'

/*const cors_url: string = 'https://cors-anywhere.herokuapp.com/'
const api_url: string = '9000-be6584a3-cbb0-481e-94ee-ca97cc4252c9.ws-eu0.gitpod.io/';
*/

export function createHttpObservable(url:string) {
  return Observable.create(observer => {

      const controller = new AbortController();
      const signal = controller.signal;

      fetch(url, {signal})
      //fetch(cors_url + api_url + url)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            observer.error('Request failed with status code: ' + response.status);

          }

        })
        .then(body => {
          observer.next(body);
          observer.complete();
        })
        .catch(err => {
          observer.error(err);
        })

        return () => controller.abort();

    });
}
