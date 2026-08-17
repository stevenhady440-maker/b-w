const fileInput = document.getElementById('fileInput');
const imagePreview = document.getElementById('imagePreview');
const toggleColor = document.getElementById('toggleColor');

fileInput.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreview.src = e.target.result;
            imagePreview.classList.remove('colored');
            toggleColor.textContent = "Reveal Full Color";
        }
        reader.readAsDataURL(file);
    }
});

toggleColor.addEventListener('click', function() {
    imagePreview.classList.toggle('colored');
    if (imagePreview.classList.contains('colored')) {
        toggleColor.textContent = "Make Black & White";
    } else {
        toggleColor.textContent = "Reveal Full Color";
    }
});