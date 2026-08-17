const fileInput = document.getElementById('fileInput');
const imagePreview = document.getElementById('imagePreview');
const toggleColor = document.getElementById('toggleColor');
const dropZone = document.getElementById('dropZone');

// Secure file handling engine for uploaded images
function handleFile(file) {
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreview.src = e.target.result;
            // Force reset to black and white state on fresh upload
            imagePreview.classList.remove('colored');
            toggleColor.textContent = "Reveal Full Color";
        };
        reader.readAsDataURL(file);
    }
}

// Input event listener
fileInput.addEventListener('change', function() {
    if (this.files && this.files[0]) handleFile(this.files[0]);
});

// Drag and drop layout events
['dragenter', 'dragover'].forEach(eventName => {
    dropZone.addEventListener(eventName, (e) => { 
        e.preventDefault(); 
        dropZone.classList.add('dragover'); 
    }, false);
});

['dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, (e) => { 
        e.preventDefault(); 
        dropZone.classList.remove('dragover'); 
    }, false);
});

dropZone.addEventListener('drop', (e) => {
    const dt = e.dataTransfer;
    const files = dt.files;
    if (files && files[0]) handleFile(files[0]);
});

// The fixed color flip logic
toggleColor.addEventListener('click', function() {
    imagePreview.classList.toggle('colored');
    
    // When 'colored' class is active, image is full color, so button offers to reverse it
    if (imagePreview.classList.contains('colored')) {
        toggleColor.textContent = "Make Black & White";
    } else {
        toggleColor.textContent = "Reveal Full Color";
    }
});
