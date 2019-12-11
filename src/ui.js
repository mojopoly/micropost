class UI {
  constructor() {
    this.post = document.querySelector('#posts');
    this.titleInput = document.querySelector('#title');
    this.bodyInput = document.querySelector('#body');
    this.idInput = document.querySelector('#id');
    this.postSubmit = document.querySelector('.post-submit');
    this.formState = 'add';
  }

  showPosts(posts) {
    //console.log(posts)
    let output = '';
    posts.forEach(post => {
      output += `
        <div class="card mb-3">
          <div class="card-body">
            <h4 class="card-title">${post.title}</h4>
            <p class="card-text">${post.body}</p>
            <a href="#" class="edit card-link" data-id="${post.id}">
              <i class="fa fa-pencil"></i>
            </a>
            <a href="#" class="delete card-link" data-id="${post.id}">
            <i class="fa fa-remove"></i>
          </a>
          </div>
        </div>
      `;
    });

    this.post.innerHTML = output;
  }

  fillForm(data) {
    this.titleInput.value = data.postTitle;
    this.bodyInput.value = data.postBody;
    this.idInput.value = data.postId;

    this.changeFormState('edit')
  }

  // Change form state
  changeFormState(type) {
    if(type === 'edit') {
      this.postSubmit.textContent = 'Update Post'
      this.postSubmit.className = 'post-submit btn btn-warning btn-block'
      
      // Create cancel button
      const button = document.createElement('button')
      button.className = 'post-cancel btn btn-light btn-block'
      button.appendChild(document.createTextNode('Cancel'))

      //Get Parent and post submit
      const cardForm = document.querySelector('.card-form')
      const formEnd = document.querySelector('.form-end')
      cardForm.insertBefore(button, formEnd)
    } else {
      this.postSubmit.textContent = 'Post It!'
      this.postSubmit.className = 'post-submit btn btn-primary btn-block'
      if(document.querySelector('.post-cancel'))
      {
        document.querySelector('.post-cancel').remove()
      }      
      // clear id from hidden field
      this.clearIdInput()

      // clear text fields
      this.clearFields()
    }
  }

  showAlert(message, className) {
    this.clearAlert();

    const div = document.createElement('div')
    div.className = className
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.postsContainer');
    const posts = document.querySelector('#posts')
    container.insertBefore(div, posts)
    setTimeout(() => {
      this.clearAlert()
    }, 3000)
  }

  clearAlert() {
    const currentAlert = document.querySelector('.alert')
    if(currentAlert) {
      currentAlert.remove()
    }
  }

  clearFields() {
    this.titleInput.value= '';
    this.bodyInput.value = '';
  }
  clearIdInput() {
    this.idInput.value = '';
  }


}

export const ui = new UI();
