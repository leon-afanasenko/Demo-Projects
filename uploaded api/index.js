let currentPage = 1;
const postsPerPage = 1;

document.addEventListener("DOMContentLoaded", () => {
  loadPost(currentPage);

  document.getElementById("prev-btn").addEventListener("click", () => {
    currentPage--;
    loadPost(currentPage);
  });

  document.getElementById("next-btn").addEventListener("click", () => {
    currentPage++;
    loadPost(currentPage);
  });

  document.getElementById("search-input").addEventListener("input", (event) => {
    const searchQuery = event.target.value.toLowerCase();
    searchAndLoadPost(searchQuery);
  });
});

function searchAndLoadPost(query = "") {
  const queryNumber = parseInt(query);
  let targetPage = 1;
  if (!isNaN(queryNumber)) {
    targetPage = Math.ceil(queryNumber / postsPerPage);
  }
  loadPost(targetPage, query);
}

function loadPost(page, query = "") {
  fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${postsPerPage}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Posts on page ${page} not found`);
      }
      return response.json();
    })
    .then((posts) => {
      if (posts.length === 0) {
        document.getElementById("post-title").innerText =
          "No posts found on this page.";
        document.getElementById("post-body").innerText = "";
        document.getElementById("user-id").innerText = "";
        document.getElementById("prev-btn").disabled = page === 1;
        document.getElementById("next-btn").disabled = true;
        return;
      }

      const queryNumber = parseInt(query);
      const filteredPosts = query
        ? posts.filter(
            (post) =>
              post.title.toLowerCase().includes(query) ||
              post.body.toLowerCase().includes(query) ||
              (queryNumber && post.id === queryNumber)
          )
        : posts;

      if (filteredPosts.length > 0) {
        const post = filteredPosts[0];
        document.getElementById("post-title").innerText = post.title;
        document.getElementById("post-body").innerText = post.body;
      } else {
        document.getElementById("post-title").innerText =
          "No matching posts found.";
        document.getElementById("post-body").innerText = "";
      }

      document.getElementById("user-id").innerText = `User ${page}`;

      document.getElementById("prev-btn").disabled = page === 1;
      document.getElementById("next-btn").disabled = page === 100;
    })
    .catch((error) => {
      console.error("Error fetching posts:", error);
      if (page > 1) {
        currentPage--;
      } else {
        currentPage = 1;
      }
      document.getElementById("next-btn").disabled = true;
      alert("No more posts available.");
    });
}
