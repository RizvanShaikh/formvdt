
var loadImage = function(event) {
	// console.log(event)
    var image = document.getElementById("showImage");
    let url = URL.createObjectURL(event.target.files[0]);
    image.src = url; 
    // localStorage.setItem("imgUrl",url);
    // localStorage.setItem("imgObj",event.target.files[0]);

    let reader = new FileReader();
    reader.addEventListener("load", function () {
        window.localStorage.setItem('newImgUrl', this.result);
    });
     reader.readAsDataURL(event.target.files[0]);
     console.log(event.target.files[0])
     console.log(image.src);
}

//https://stackoverflow.com/questions/19183180/how-to-save-an-image-to-localstorage-and-display-it-on-the-next-page
