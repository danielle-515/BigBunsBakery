let rating = 0;
//get stars from html
const stars = Array.from(document.querySelectorAll('.star'));

function updateStars() {
    stars.forEach((s, i) => {
        s.classList.toggle("active", i < rating) //highlight all previous stars
    });
}

function setRating(value) {
    rating = value;
    updateStars();
}

function previewRating(value){
    stars.forEach((s, i) => s.classList.toggle('active', i < value));
}
//only for hovering


stars.forEach((s) => {
    const val = Number(s.dataset.value);
    s.addEventListener('mouseenter', () => previewRating(val));
    s.addEventListener('mouseleave', () => updateStars());
    //highlight and unhighlight
    s.addEventListener('click', () => setRating(val));
});


function displayReviews() {
    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    let container = document.getElementById("reviews");
    container.innerHTML = " ";
    
    reviews.forEach(r => {
        let htmlstars = "";
        for(let i = 1; i < 6; i++){
            htmlstars += `<span class="star ${i <= r.rating ? "active" : ""}"></span>`;
        }


        container.innerHTML += `
            <div class="review">
                <strong>${r.name}</strong>
                <div class="stars-display">
                    ${htmlstars}
                </div>
                <p>${r.text}</p>
            </div>`;
    });
    //thanks chatgpt for this one
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
    reviews.push({name, text, rating});

    localStorage.setItem("reviews", JSON.stringify(reviews));

    rating = 0;
    updateStars();
    displayReviews();
}

displayReviews();
