function canvas_3rd_page(){
    const canvas = document.querySelector("#page3>canvas");  /// change here with your canvas container tag============================================
    const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  render();
});

function files(index) {
  var data = `
  //enter the pics here (with maintaining the sequence=================================
`;

  return data.split("\n")[index];
}

const frameCount = ; //enter the number of pics =======================================

const images = [];
const imageSeq = {
  frame: 1,
};

for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = files(i);
  images.push(img);
}

gsap.to(imageSeq, {
  frame: frameCount - 1,
  snap: "frame",
  ease: `none`,
  scrollTrigger: {
    scrub: .5,
    trigger: `#page3`,   /// change here with your canvas container tag============================================
    start: `top top`,//that line determine where your canvas stops and start animation
    end: `250% top`,//that line determine where your canvas stops and start animation
    scroller: `#main`, //change the name according to wrapper tag =================================================
  },
  onUpdate: render,
});

images[1].onload = render;

function render() {
  scaleImage(images[imageSeq.frame], context);
}

function scaleImage(img, ctx) {
  var canvas = ctx.canvas;
  var hRatio = canvas.width / img.width;//controls width/height of canvas images
  var vRatio = canvas.height / img.height;//controls width/height of canvas images
  var ratio = Math.max(hRatio, vRatio);//controls width/height of canvas images
  var centerShift_x = (canvas.width - img.width * ratio) / 2;
  var centerShift_y = (canvas.height - img.height * ratio) / 2;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(
    img,
    0, // 
    0, // 
    img.width, //width and height of the actual images inside canvas
    img.height, //width and height of the actual images inside canvas
    centerShift_x,
    centerShift_y,
    img.width * ratio,//controls The width of the image to use (stretch or reduce the image)
    img.height * ratio//controls The height of the image to use (stretch or reduce the image)
  );
}
ScrollTrigger.create({
  trigger: "#page3", /// change here with your canvas container tag============================================
  pin: true,
  scroller: `#main`,/// change here with your wrapper tag======================================================
  start: `top top`,//that line determine where your canvas stops and start animation
  end: `250% top`,//that line determine where your canvas stops and start animation
});
};
canvas_3rd_page();