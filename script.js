window.addEventListener('DOMContentLoaded', () => {
    const videoDisplay = document.querySelector('#videoDisplay');
    const imageDisplay = document.querySelector('#imageDisplay');
    const videoForm = document.querySelector('#videoForm');
    const imageForm = document.querySelector('#imageForm');

    function displaySocialLinks() {
        const socialLinksDisplay = document.querySelector('#socialLinksDisplay');
        socialLinksDisplay.innerHTML = `
            <a href="https://www.facebook.com/profile.php?id=61556301363251" target="_blank">
                <img src="facebook-icon.png" alt="Facebook" width="40">
            </a>
            <a href="https://www.instagram.com/3bgwed/" target="_blank">
                <img src="instagram-icon.png" alt="Instagram" width="40">
            </a>
            <a href="https://www.youtube.com/@3bgwed2003" target="_blank">
                <img src="youtube-icon.png" alt="YouTube" width="40">
            </a>
        `;
    }

    function displaySavedVideos() {
        const storedVideos = JSON.parse(localStorage.getItem('videoLinks')) || [];
        videoDisplay.innerHTML = '';

        storedVideos.forEach(video => {
            if (isValidURL(video)) {
                const videoElement = document.createElement('iframe');
                // التأكد من تحويل الرابط إلى شكل embed إذا كان من Shorts
                if (video.includes('shorts/')) {
                    const videoId = video.split('shorts/')[1];
                    video = `https://www.youtube.com/embed/${videoId}`;
                }
                videoElement.src = video;
                videoElement.width = "560";
                videoElement.height = "315";
                videoElement.frameBorder = "0";
                videoElement.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
                videoElement.allowFullscreen = true;
                videoDisplay.appendChild(videoElement);
            }
        });
    }

    function displaySavedImages() {
        const storedImages = JSON.parse(localStorage.getItem('imageLinks')) || [];
        imageDisplay.innerHTML = '';

        storedImages.forEach(image => {
            if (isValidURL(image)) {
                const imgElement = document.createElement('img');
                imgElement.src = image;
                imgElement.alt = 'My Work';
                imgElement.style.width = "300px";
                imgElement.style.height = "auto";
                imgElement.style.margin = "10px";
                imageDisplay.appendChild(imgElement);
            }
        });
    }

    function isValidURL(url) {
        const pattern = /^https?:\/\/[a-zA-Z0-9.-]+(?:\/[^\s]*)?$/;
        return pattern.test(url);
    }

    if (videoForm) {
        videoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const videoInput = document.querySelector('#video');
            const videoLink = videoInput.value.trim();
            
            if (isValidURL(videoLink)) {
                let storedVideos = JSON.parse(localStorage.getItem('videoLinks')) || [];
                
                // تأكد من أن الفيديو يحتوي على رابط Embed إذا كان من Shorts
                if (videoLink.includes('shorts/')) {
                    const videoId = videoLink.split('shorts/')[1];
                    videoLink = `https://www.youtube.com/embed/${videoId}`;
                }
                
                storedVideos.push(videoLink);
                localStorage.setItem('videoLinks', JSON.stringify(storedVideos));
                displaySavedVideos();
                alert('تم إضافة الفيديو بنجاح!');
                videoInput.value = '';
            } else {
                alert('يرجى إدخال رابط فيديو صحيح!');
            }
        });
    }

    if (imageForm) {
        imageForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const imageInput = document.querySelector('#image');
            const imageLink = imageInput.value.trim();
            
            if (isValidURL(imageLink)) {
                let storedImages = JSON.parse(localStorage.getItem('imageLinks')) || [];
                storedImages.push(imageLink);
                localStorage.setItem('imageLinks', JSON.stringify(storedImages));
                displaySavedImages();
                alert('تم إضافة الصورة بنجاح!');
                imageInput.value = '';
            } else {
                alert('يرجى إدخال رابط صورة صحيح!');
            }
        });
    }

    displaySocialLinks();
    displaySavedVideos();
    displaySavedImages();
});
