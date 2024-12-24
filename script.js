document.addEventListener('DOMContentLoaded', () => {
    fetchUsers();
    handleRouting();
    window.addEventListener('popstate', handleRouting);
});

function fetchUsers() {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => {
            const userList = document.getElementById('user-list');
            users.forEach(user => {
                const userLink = document.createElement('a');
                userLink.href = `#user/${user.id}`;
                userLink.className = 'user-link';

                const userItem = document.createElement('li');
                userItem.textContent = user.name;

                userLink.appendChild(userItem);
                userList.appendChild(userLink);
            });
        })
        .catch(error => console.error('Ошибка при загрузке пользователей:', error));
}

function showUserDetails(userId) {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then(response => response.json())
        .then(user => {
            document.getElementById('user-name').textContent = user.name;
            document.getElementById('user-email').textContent = user.email;
            fetchComments(userId);
            document.getElementById('user-list').style.display = 'none';
            document.getElementById('user-details').style.display = 'block';
        })
        .catch(error => console.error('Ошибка при загрузке данных пользователя:', error));
}

function fetchComments(userId) {
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${userId}`)
        .then(response => response.json())
        .then(comments => {
            const commentsList = document.getElementById('comments-list');
            commentsList.innerHTML = '';
            comments.forEach(comment => {
                const commentItem = document.createElement('li');
                commentItem.textContent = comment.body;
                commentsList.appendChild(commentItem);
            });
        })
        .catch(error => console.error('Ошибка при загрузке комментариев:', error));
}

function backToUsers() {
    history.pushState(null, '', '/');
    handleRouting();
}

function handleRouting() {
    const hash = window.location.hash;
    if (hash.startsWith('#user/')) {
        const userId = hash.split('/')[1];
        showUserDetails(userId);
    } else {
        document.getElementById('user-details').style.display = 'none';
        document.getElementById('user-list').style.display = 'block';
    }
}