// Add the following functions to the existing scripts.js file

// Function to save blog posts

function savePost() {
    var title = document.getElementById('blogTitle').value;
    var author = document.getElementById('authorName').value;
    var categories = document.getElementById('categories').value.split(',').map(function (item) {
        return item.trim();
    });
    var tags = document.getElementById('tags').value.split(',').map(function (item) {
        return item.trim();
    });
    var content = document.getElementById('blogContent').value;
    var image = document.getElementById('blogImage').files[0];

    if (title && author && categories && tags && content) {
        var reader = new FileReader();
        reader.onload = function () {
            var blogPost = {
                title: title,
                author: author,
                categories: categories,
                tags: tags,
                content: content,
                image: reader.result
            };

            if (localStorage.getItem('blogPosts') === null) {
                var blogPosts = [];
                blogPosts.unshift(blogPost);
                localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
            } else {
                var blogPosts = JSON.parse(localStorage.getItem('blogPosts'));
                blogPosts.unshift(blogPost);
                localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
            }
            document.getElementById('blogTitle').value = '';
            document.getElementById('authorName').value = '';
            document.getElementById('categories').value = '';
            document.getElementById('tags').value = '';
            document.getElementById('blogContent').value = '';
            document.getElementById('blogImage').value = '';
            displayPosts();
        };
        if (image) {
            reader.readAsDataURL(image);
        } else {
            reader.readAsText(new Blob());
        }
    } else {
        alert('Please fill in all fields');
    }
}

// Function to display blog posts
function displayPosts() {
    var blogSection = document.getElementById('blogSection');
    blogSection.innerHTML = '';
    if (localStorage.getItem('blogPosts') !== null) {
        var blogPosts = JSON.parse(localStorage.getItem('blogPosts'));
        blogPosts.forEach(function (post, index) {
            var postDiv = document.createElement('div');
            postDiv.classList.add('blog-post');
            var comments = post.comments ? post.comments.map(function (comment) {
                return '<li>' + comment + '</li>';
            }).join('') : '';
            postDiv.innerHTML = `
                <h2>${post.title}</h2>
                <p class="post-meta">Published by ${post.author}</p>
                <p>${post.content}</p>
                <div class="tags">
                    ${post.tags.map(tag => `<span>${tag}</span>`).join('')}
                </div>
                <img src="${post.image}" alt="Blog Image" style="max-width: 100%;">
                <div class="comment-section">
                    <h3>Comments</h3>
                    <ul>${comments}</ul>
                    <textarea id="commentText${index}" placeholder="Write your comment"></textarea>
                    <input type="button" value="Post Comment" onclick="postComment(${index})">
                </div>
                <button onclick="editPost(${index})">Edit</button>
                <button onclick="deletePost(${index})">Delete</button>
            `;
            blogSection.appendChild(postDiv);
        });
    }
}

// Function to post comments
function postComment(index) {
    var commentText = document.getElementById('commentText' + index).value;
    if (commentText) {
        var blogPosts = JSON.parse(localStorage.getItem('blogPosts'));
        if (!blogPosts[index].comments) {
            blogPosts[index].comments = [];
        }
        blogPosts[index].comments.push(commentText);
        localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
        displayPosts();
    } else {
        alert('Please enter a comment');
    }
}

// Function to edit a blog post
function editPost(index) {
    var blogPosts = JSON.parse(localStorage.getItem('blogPosts'));
    var post = blogPosts[index];
    document.getElementById('blogTitle').value = post.title;
    document.getElementById('authorName').value = post.author;
    document.getElementById('categories').value = post.categories.join(', ');
    document.getElementById('tags').value = post.tags.join(', ');
    document.getElementById('blogContent').value = post.content;
    blogPosts.splice(index, 1);
    localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
    displayPosts();
}

// Function to delete a blog post
function deletePost(index) {
    var blogPosts = JSON.parse(localStorage.getItem('blogPosts'));
    blogPosts.splice(index, 1);
    localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
    displayPosts();
}

// The remaining functions remain unchanged

// Display saved posts on page load
displayPosts();

let slideIndex = 0;
showSlides();

function showSlides() {
    let i;
    let slides = document.getElementsByClassName("destination-card");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length - 2) {
        slideIndex = 0;
    }
    slides[slideIndex].style.display = "block";
    slides[slideIndex + 1].style.display = "block";
    setTimeout(showSlides, 2000); // Change image every 2 seconds
}

