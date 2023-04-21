import dotenv from 'dotenv';
import filestack from 'filestack-js';

dotenv.config();

const API_KEY = process.env.API_KEY
const client = filestack.init(API_KEY);
const options = {
    fromSources: ['local_file_system', 'instagram', 'facebook']
};
console.log(API_KEY);
client.picker(options).open();

window.addEventListener('DOMContentLoaded', function() {


    const apikey = API_KEY;
    const client = filestack.init(apikey);

    const onProgress = (evt) => {
      document.getElementById('progress').innerHTML = `${evt.totalPercent}%`;
    };

    document.querySelector('input').addEventListener('change', (event) => {
      const files = event.target.files[0];
      const token = {};
      const cancel = document.getElementById('cancel');
      const pause = document.getElementById('pause');
      const resume = document.getElementById('resume');

      [cancel, resume, pause].forEach((btn) => {
        const id = btn.id;
        btn.addEventListener('click', () => {
          token[id]();
        });
      });


      client.upload(files, { onProgress }, {}, token)
        .then(res => {
          console.log('success: ', res)
        })
        .catch(err => {
          console.log(err)
        });
    });
  });
