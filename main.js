// var app = new Vue({
//   el: '#app',
//   data: {
//     message: 'Hello Vue!'
//   }
// })

let genRandomImage = function() {
    return getRandomInt( 1, NO_IMAGE ) + '.jpg';
} 
let app2 = new Vue({
    el: '.background',
    data: {
	styleObject: {
	    "background-color": '#ff6600',
	    "background-image": 'url(' + genRandomImage() + ')'
	},
	imgSrc: '2.jpg'
    }
})


