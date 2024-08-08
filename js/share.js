// share.js
document.addEventListener('DOMContentLoaded', function() {
    const url = window.location.href;
    const title = document.title;
  
    document.getElementById('share-whatsapp').href = `https://wa.me/?text=${encodeURIComponent(title)}%20${encodeURIComponent(url)}`;
    document.getElementById('share-twitter').href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
    document.getElementById('share-facebook').href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    document.getElementById('share-linkedin').href = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
    document.getElementById('share-email').href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`;
  });
  