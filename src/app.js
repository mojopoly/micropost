import { http } from './http';
import { ui } from './ui';

// Get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);

// Listen for add posts
document.querySelector('.post-submit').addEventListener('click', submitPost);

// Listen for delete posts
document.querySelector('#posts').addEventListener('click', deletePost);


// Listen for edit state
document.querySelector('#posts').addEventListener('click', enableEdit);

// Listen for cancel event
document.querySelector('.card-form').addEventListener('click', cancelEditPost);


function getPosts() {
  http
    .get('http://localhost:3000/posts')
    .then(data => ui.showPosts(data))
    .catch(err => console.log(err));
}

function submitPost() {
  const title = document.querySelector('#title').value;
  const body = document.querySelector('#body').value;
  const id = document.querySelector('#id').value

  const data = {
    title,
    body
  };

  // Create Post
  if (title && data) {
    if(id) {
    // // Update Post
    http
      .put(`http://localhost:3000/posts/${id}`, data)
      .then(data => {
        ui.showAlert('Post Updated', 'alert alert-success');
        ui.changeFormState('add');
        getPosts();
      })
      .catch(err => console.log(err));
    } else {
      http
      .post('http://localhost:3000/posts', data)
      .then(data => {
        ui.showAlert('Post Added', 'alert alert-success');
        ui.clearFields();
        getPosts();
      })
      .catch(err => console.log(err));
    }
  } else {
    ui.showAlert('All fields are mandatory', 'alert alert-danger')
  }
}

// Delete Post
function deletePost(e) {
  if (e.target.parentElement.classList.contains('delete')) {
    const postId = e.target.parentElement.dataset.id
    if(confirm('Are you sure?')) {
        http.delete(`http://localhost:3000/posts/${postId}`)
        .then(data => {
          ui.showAlert('Post Deleted', 'alert alert-success');
          getPosts()
        })
        .catch(err => console.log(err))
    }
  }
  e.preventDefault();
}


// Edit post
function enableEdit(e) {
  if(e.target.parentElement.classList.contains('edit')) {
    const postId = e.target.parentElement.dataset.id
    const postTitle = e.target.parentElement.previousElementSibling.previousElementSibling.textContent
    const postBody = e.target.parentElement.previousElementSibling.textContent
  
    const data = {
      postId,
      postTitle,
      postBody
    };

    // Fill form with current post
    ui.fillForm(data);
  }

  e.preventDefault()
}

function cancelEditPost(e) {
  if(e.target.classList.contains('post-cancel')){
    ui.changeFormState('add')
  }
}