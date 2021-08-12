let totalSlides = document.querySelectorAll('.slider--item').length;
let curentSlide = 0;

let sliderWidth = document.querySelector('.slider').clientWidth;

document.querySelector('.slider--width').style.width = 
    `${ sliderWidth * totalSlides}px)`;

document.querySelector('.slider--controls').style.width = 
    `${sliderWidth}px`;
document.querySelector('.slider--controls').style.heigth = 
    `${document.querySelector('.slider').clientHeight}px`;

    function goPrev() {
        curentSlide--;
        if(curentSlide < 0) {
            curentSlide = totalSlides - 1;
        }
        updateMargin();
    }
    function goNext() {
        curentSlide++;
        if(curentSlide > (totalSlides - 1)) {
                currentSlide = 0;
        }
        updateMargin();
}
    function updateMargin() {

        let sliderItemWidth = document.querySelector('.slider--item').clientWidth;
        let newMargin = (curentSlide * sliderItemWidth);
        document.querySelector('.slider--width').style.marginLeft = 
            `-${newMargin}px`;

    }
    setInterval(goNext, 2000);