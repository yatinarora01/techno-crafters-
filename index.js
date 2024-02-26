
     //Function to translate the content when the page language changes
 
        function googleTranslateElementInit() {
            // Initialize Google Translate widget
            new google.translate.TranslateElement({
                pageLanguage: 'en',
                includedLanguages: 'hi',  // Specify languages you want to support
                layout: google.translate.TranslateElement.InlineLayout.SIMPLE
            }, 'google_translate_element');

            // Translate content when the page language changes
            google.translate.TranslateService.getInstance().addEventListener('pageLanguageChanged', function (e) {
                var selectedLanguage = e.target.getLanguage();
                var elementsToTranslate = document.querySelectorAll('[data-lang]');

                elementsToTranslate.forEach(function (element) {
                    var lang = element.getAttribute('data-lang');
                    translateText(lang, selectedLanguage, function (translatedText) {
                        element.innerHTML = translatedText;
                    });
                });
            });
        }

        // Function to translate text using Google Translate API
        function translateText(sourceLanguage, targetLanguage, callback) {
            var apiUrl = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=' + sourceLanguage + '&tl=' + targetLanguage + '&dt=t&q=';

            fetch(apiUrl + document.querySelector('[data-lang="' + sourceLanguage + '"]').innerText)
                .then(response => response.json())
                .then(data => {
                    var translatedText = data[0][0][0];
                    callback(translatedText);
                })
                .catch(error => console.error('Error:', error));
        }

       let currentIndex = 0;
const slides = document.querySelectorAll('.image-slider img');
const totalSlides = slides.length;
const slideInterval = 15000; // Set the interval for each slide (15 seconds)

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.style.transform = `translateX(${100 * (i - index)}%)`;
  });
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % totalSlides;
  showSlide(currentIndex);
}

// Start automatic slideshow
setInterval(nextSlide, slideInterval);
