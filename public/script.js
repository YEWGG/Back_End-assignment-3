const blogForm = document.getElementById('blogForm');
const blogList = document.getElementById('blogList');

async function fetchBlogs() {
    const res = await fetch('/blogs');
    const blogs = await res.json();
    blogList.innerHTML = blogs.map(blog => `
                <div class="blog-card">
                    <h3>${blog.title}</h3>
                    <small>By ${blog.author} on ${new Date(blog.createdAt).toLocaleDateString()}</small>
                    <p>${blog.body}</p>
                    <button class="delete-btn" onclick="deleteBlog('${blog._id}')">Delete</button>
                </div>
            `).join('');
}

blogForm.onsubmit = async (e) => {
    e.preventDefault();
    const data = {
        title: document.getElementById('title').value,
        author: document.getElementById('author').value || 'Anonymous',
        body: document.getElementById('body').value
    };

    await fetch('/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    blogForm.reset();
    fetchBlogs();
};

async function deleteBlog(id) {
    if (confirm('Are you sure?')) {
        await fetch(`/blogs/${id}`, { method: 'DELETE' });
        fetchBlogs();
    }
}

fetchBlogs();