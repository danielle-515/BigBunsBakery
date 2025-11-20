function displayReviews() {
    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    let container = document.getElementById("reviews");
    container.innerHTML = " ";
    
    reviews.forEach(r => {
        container.innerHTML += `
            <div class="review">
                <strong>${r.name}</strong>
                <p>${r.text}</p>
            </div>`;
    });
}

function addReview() {
    let name = document.getElementById("name").value;
    let text = document.getElementById("review-text").value;

    //null case
    if ((name === "") || (text === "")) { 
        alert("Fill out both fields.");
        return;
    }

    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    reviews.push({name, text});

    localStorage.setItem("reviews", JSON.stringify(reviews));

    displayReviews();
}

displayReviews();