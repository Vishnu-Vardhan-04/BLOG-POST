// public/js/scripts.js

// Simple form validation for the article posting page
document.addEventListener('DOMContentLoaded', function() {
    const postForm = document.querySelector('#postForm');
    
    if (postForm) {
        postForm.addEventListener('submit', function(event) {
            const title = document.querySelector('input[name="title"]').value;
            const description = document.querySelector('textarea[name="description"]').value;

            if (!title || !description) {
                alert('Please provide both a title and description for your article.');
                event.preventDefault(); // Prevent form submission
            }
        });
    }

    // Profile form validation
    const profileForm = document.querySelector('#profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', function(event) {
            const name = document.querySelector('input[name="name"]').value;
            const email = document.querySelector('input[name="email"]').value;

            if (!name || !email) {
                alert('Name and Email are required!');
                event.preventDefault(); // Prevent form submission
            }
        });
    }
});
