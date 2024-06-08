async function commentFormHandler(e) {
    e.preventDefault();

    const comment = document.querySelector('textarea[name="comment-text"]').value;
    const id = document.querySelector('span[name="id"]').textContent.trim();

    if (comment) {
        const response = await fetch("/api/comments", {
        method: "POST",
        body: JSON.stringify({ id, comment }),
        headers: { "Content-Type": "application/json" }
        });

        if (response.ok) {
            document.location.reload();
        }
        else {
            alert(response.statusText);
        }
    };
};
  
document.querySelector(".comment-form").addEventListener("submit", commentFormHandler);