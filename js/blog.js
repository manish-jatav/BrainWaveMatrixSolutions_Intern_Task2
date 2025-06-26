document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('postForm');
  const container = document.getElementById('postsContainer');
  const imageInput = document.getElementById('imageInput');

  let posts = JSON.parse(localStorage.getItem('posts')) || [];

  const renderPosts = () => {
    container.innerHTML = '';
    posts.forEach((post, index) => {
      const postDiv = document.createElement('div');
      postDiv.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.content}</p>
        ${post.image ? `<img src="${post.image}" class="uploaded-img" />` : ''}
        <button onclick="deletePost(${index})">Delete</button>
        <div>
          <input type="text" placeholder="Add comment" onkeydown="addComment(event, ${index})" />
          <ul>${(post.comments || []).map(c => `<li>${c}</li>`).join('')}</ul>
        </div>
        <hr>
      `;
      container.appendChild(postDiv);
    });
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = form[0].value;
    const content = form[1].value;
    const file = imageInput.files[0];
    let image = "";

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        image = reader.result;
        posts.push({ title, content, comments: [], image });
        localStorage.setItem('posts', JSON.stringify(posts));
        renderPosts();
        form.reset();
      };
      reader.readAsDataURL(file);
    } else {
      posts.push({ title, content, comments: [], image });
      localStorage.setItem('posts', JSON.stringify(posts));
      renderPosts();
      form.reset();
    }
  });

  window.deletePost = (index) => {
    posts.splice(index, 1);
    localStorage.setItem('posts', JSON.stringify(posts));
    renderPosts();
  };

  window.addComment = (e, index) => {
    if (e.key === 'Enter') {
      const comment = e.target.value.trim();
      if (comment) {
        posts[index].comments = posts[index].comments || [];
        posts[index].comments.push(comment);
        localStorage.setItem('posts', JSON.stringify(posts));
        renderPosts();
      }
    }
  };

  window.toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
  };

  renderPosts();
});
