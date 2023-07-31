//start lovomotive scroll: =======================================
gsap.registerPlugin(ScrollTrigger , CustomEase , Observer);

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"), //give main wrapper tag name
    smooth: true,
  });
  locoScroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy("#main", {
    //give main wrapper tag name
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed", //give main wrapper tag name
  });
   ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
   ScrollTrigger.refresh();

//end locomotive scroll: =========================================

//stat mouse circle move: ========================================
let cursor_cir = document.querySelector("#cursor_circle");
let cursor_img_cont = document.querySelector("#page4_img_show");

var prevX = 0;
var prevY = 0;

var clampX =1 ; 
var clampY =1 ; 


var cursor_circle_scale = ()=>{

   window.addEventListener("mousemove", (e) => {
      //cursor bottom circle part ===========
      let cursor_cir_width = window.getComputedStyle(cursor_cir).getPropertyValue("width");
      let cursor_cir_height = window.getComputedStyle(cursor_cir).getPropertyValue("height");

      //cursor bottom img part ===========
      let cursor_img_width = window.getComputedStyle(cursor_img_cont).getPropertyValue("width");
      let cursor_img_height = window.getComputedStyle(cursor_img_cont).getPropertyValue("height");

      //cursor bottom circle part ===========
      let val_width = parseInt(cursor_cir_width[1]) + (parseInt(cursor_cir_width[0])*10);
      let val_height = parseInt(cursor_cir_height[1]) + (parseInt(cursor_cir_height[0])*10);

      //cursor bottom img part ===========
      let val_img_width = parseInt(cursor_img_width[2]) + parseInt(cursor_img_width[1])*10 + (parseInt(cursor_img_width[0])*100);
      let val_img_height =parseInt(cursor_img_height[2]) + parseInt(cursor_img_height[1])*10 + (parseInt(cursor_img_height[0])*100);

      var distX = (e.clientX  - prevX);
      var distY = (e.clientY  - prevY);
     if(distX< 0 ){
         distX = Math.abs(distX) ;
      }
      if(distY< 0){
         distY = Math.abs(distY);
      }
      //console.log(distX+ " " +distY);
      
      prevX = e.clientX;
      prevY = e.clientY;
      //console.log(prevX+ " " +prevY);

      clampX = gsap.utils.clamp(0.8 , 1.2 , distX);
      clampY = gsap.utils.clamp(0.8 , 1.2 , distY);
      //console.log(distX+ " " +distY);
      gsap.to(cursor_cir , {
         translateY:  e.clientY -(val_height/2) + "px" , 
         translateX: e.clientX - (val_width/2) + "px",
         scaleX: clampX,
         scaleY: clampY,
         duration: 0.4,
      })
      gsap.to(cursor_img_cont , {
         translateY:  e.clientY -(val_img_width/2) + "px" , 
         translateX: e.clientX - (val_img_height/2) + "px",
         duration: 0.4,
      })
   });
   var temp_posX = 0;
   var temp_posY = 0;
   setInterval(function(){
      if(prevX == temp_posX && prevY == temp_posY){
         gsap.to(cursor_cir , {
            scaleX:  1,
            scaleY: 1,
            duration: 0.2,
         })
      }
      temp_posX = prevX;
      temp_posY = prevY ; 
   } , 50)
}
cursor_circle_scale();


//start nav animation:============================================
var nav_menu = document.querySelector(".nav_right_elem2>div>a");
var nav_body_size = document.querySelector("body").offsetWidth;

var page1_right_top_name = document.querySelector("#page1>nav>.nav_left>a");
var page1_right_elem2_name1 = document.querySelector("#page1>nav>.nav_right>.nav_right_elem2");
if(nav_body_size>700){
   gsap.to(page1_right_top_name , {
      marginTop:"0px",
      duration:1,
      delay:0.4,
      ease:"power4.inOut",
   });
   gsap.to(page1_right_elem2_name1 , {
      translateY:"-100%",
      duration:1 ,
      delay: 0.4 , 
      ease:"power4.inOut",
   })
   
}else if(nav_body_size<=700){
   gsap.to(page1_right_top_name , {
      marginTop:"0px",
      duration:1,
      delay:0.4,
      ease:"power4.inOut",
   });
   gsap.to(page1_right_elem2_name1 , {
      translateY:"0%",
      duration:1 ,
      delay: 0.4 , 
      ease:"power4.inOut",
   })
}
var io=0 ; 
nav_menu.addEventListener("click", () => {
   var nav_body_width = document.querySelector("body").offsetWidth;
   console.log(document.querySelector("body").offsetWidth);

  if(nav_body_width <=830 && nav_body_width>700){
   gsap.to("#page1>nav>.nav_right>.nav_right_elem2" , {
      translateY:"100%",
      duration:0.1 , 
      delay:0 , 
      ease:"power4.easeOut",
   })
   gsap.to(".nav_right_top" , {
      translateY:"20%",
      duration:0.4 , 
      stagger:0.07,
   })
   Observer.create({
      target:"#main" ,
      type:"wheel , touch , pointer , scroll" ,
      overWrite:true , 
      onDown :(elem)=>{
         gsap.to(".nav_right_top" , {
            translateY:"-60%",
            duration:0.4 , 
            delay:0,
            stagger:0.07,
         })
         gsap.to("#page1>nav>.nav_right>.nav_right_elem2" , {
            translateY:"-100%",
            duration:0.1 , 
            delay:0.5, 
            ease:"power4.easeOut",
         })
         console.log("detects downward movement")
      }
   })
   Observer.create({
      target:"#main" ,
      type:"wheel , touch , pointer , scroll" ,
      overWrite:true , 
      onDown :(elem)=>{
         gsap.to(".nav_right_top" , {
            translateY:"-60%",
            duration:0.4 , 
            delay:0,
            stagger:0.07,
         })
         gsap.to("#page1>nav>.nav_right>.nav_right_elem2" , {
            translateY:"-100%",
            duration:0.1 , 
            delay:0.5, 
            ease:"power4.easeOut",
         })
         console.log("detects downward movement")
      }
   })
  }else if(nav_body_width >830){
   gsap.to("#page1>nav>.nav_right>.nav_right_elem2" , {
      translateY:"100%",
      duration:0.1 , 
      delay:0 , 
      ease:"power4.easeOut",
   })
   gsap.to(".nav_right_top" , {
      translateY:"0%",
      duration:0.4 , 
      stagger:0.07,
   })
   Observer.create({
      target:"#main" ,
      type:"wheel , touch , pointer , scroll" ,
      overWrite:true , 
      onDown :(elem)=>{
         gsap.to(".nav_right_top" , {
            translateY:"-60%",
            duration:0.4 , 
            delay:0,
            stagger:0.07,
         })
         gsap.to("#page1>nav>.nav_right>.nav_right_elem2" , {
            translateY:"-100%",
            duration:0.1 , 
            delay:0.5, 
            ease:"power4.easeOut",
         })
         console.log("detects downward movement")
      }
   })
  }
})

var set_year = document.querySelector(".nav_right>.nav_right_elem1>.nav_bottom_small>.nav_year");
var set_time = document.querySelector(".nav_right>.nav_right_elem1>.nav_bottom_small>.nav_time");
var date = new Date();
var nav_year =  date.getFullYear();
var nav_month =  date.getMonth()+1;
var nav_date =  date.getDate();

var nav_tot_date = `${nav_date}-${nav_month}-${nav_year}`;
set_year.innerHTML = nav_tot_date;

var nav_h_time = date.getHours() ;
var nav_m_time = date.getMinutes() ;
if(nav_h_time>12){
   nav_h_time = nav_h_time-12 ;
   set_time.innerHTML =   nav_h_time+  ":" + nav_m_time +" PM EST ";
}else{
   nav_h_time = nav_h_time ;
   set_time.innerHTML =   nav_h_time+  ":" + nav_m_time +" AM EST ";
}

var resp_navbar = ()=>{
   var right_elem1 = document.querySelector(".nav_right_elem1");
   if(nav_body_size<=700){
      right_elem1.classList.add("resp_nav");
      var resp_nav_var = document.querySelector(".resp_nav");
      var nav_menu_btn = document.querySelector("#page1>nav>.nav_right>.nav_right_elem2");

      var nav_menu_btn_anc1 = document.querySelector("#page1>nav>.nav_right>.nav_right_elem2>.nav_right_proto");
      var nav_menu_btn_anc2 = document.querySelector("#page1>nav>.nav_right>.nav_right_elem2>.nav_right_bottom_wrapper>a");
      var nav_left_name = document.querySelector("#page1>nav>.nav_left>a");

      nav_menu_btn_anc1.addEventListener("click", function(){
         gsap.to(resp_nav_var , {
            scaleY:1 ,
            duration:0.5 ,
            delay:0,
            ease:"power4.inOut",
         });
         gsap.to([nav_left_name , nav_menu_btn_anc1] , {
            translateY:"30px",
            duration:0.3 ,
         })
         gsap.to(nav_left_name  , {
            translateY:"-30px",
            duration:0 ,
            delay:0.3,
            color:"black"
         })
         gsap.to(nav_left_name  , {
            translateY:"0px",
            duration:0.2 ,
            delay: 0.3,
         })
         gsap.to(nav_menu_btn_anc1,{
            display:"none",
            delay:0.3 , 
            duration:0,
         })
         gsap.to(nav_menu_btn_anc2,{
            display:"flex",
            color:"black",
            delay:0.3 , 
            duration:0,
         })
         gsap.to(nav_menu_btn_anc2,{
            translateY:"0px",
            delay:0.3 , 
            duration:0.2,
         })
         gsap.to([".nav_right_elem1>.nav_right_top"  , ".nav_right_elem1>.nav_bottom_small"],{
            translateY:"20px",
            delay:0 , 
            duration:0.2,
            stagger:0.1,
         })
      })
      nav_menu_btn_anc2.addEventListener("click",function(e){
         gsap.to(resp_nav_var , {
            scaleY:0 ,
            duration:0.5 ,
            delay:0,
            ease:"power4.inOut",
         });
         gsap.to([nav_left_name , nav_menu_btn_anc2] , {
            translateY:"-30px",
            duration:0.3 ,
         })
         gsap.to(nav_left_name  , {
            translateY:"30px",
            duration:0 ,
            delay:0.3,
            color:"white"
         })
         gsap.to(nav_left_name  , {
            translateY:"0px",
            duration:0.2 ,
            delay: 0.3,
         })
         gsap.to(nav_menu_btn_anc2,{
            display:"none",
            delay:0.3 , 
            duration:0,
         })
         gsap.to(nav_menu_btn_anc1,{
            display:"flex",
            color:"white",
            delay:0.3 , 
            duration:0,
         })
         gsap.to(nav_menu_btn_anc1,{
            translateY:"0px",
            delay:0.3 , 
            duration:0.2,
         })
         gsap.to([".nav_right_elem1>.nav_right_top"  , ".nav_right_elem1>.nav_bottom_small"],{
            translateY:"-20px",
            delay:0 , 
            duration:0.2,
            stagger:0.1,
         })
      })
   }
}
resp_navbar();


//page3 animation: ================================================
var page3_txt1 = document.querySelector("#page3>.page3_top>.page3_top_top>h1");
var page3_txt2 = document.querySelector("#page3>.page3_top>.page3_top_bottom>.page3_top_bottom_top>h1"); 
var page3_txt3 = document.querySelector("#page3>.page3_top>.page3_top_bottom_bottom>h4");

gsap.to(page3_txt1 , {
   paddingTop: "0px",
   duration:1 , 
   delay: 0.3 , 
   ease: "power4.inOut",
})
gsap.to(page3_txt2 , {
   paddingTop: "0px",
   duration: 1 , 
   delay: 0.4 , 
   ease: "power4.inOut",
})
gsap.to(page3_txt3 , {
   marginTop: "0%",
   duration: 1, 
   delay: 0.8, 
   ease: "power4.inOut",
})

var page3_center_txt1 = document.querySelector("#page3>.page3_center>.page3_center_wrapper>.page3_center_top>h3");
var page3_center_txt2 = document.querySelector("#page3>.page3_center>.page3_center_wrapper>.page3_center_bottom>h3");
gsap.to(page3_center_txt1 , {
   translateY:"0%", 
   duration: 1, 
   delay: 1.4 , 
   ease: "power4.inOut",
})
gsap.to(page3_center_txt2 , {
   translateY:"0%", 
   duration: 1, 
   delay: 1.6 , 
   ease: "power4.inOut",
})

var page3_bottom_opacity = document.querySelector("#page3>.page3_bottom");
gsap.to(page3_bottom_opacity , {
   opacity: 1 , 
   duration: 1.8, 
   delay: 2 , 
})

var page3_bottom_arrow1 = document.querySelector(".page3_bottom_right>.page3_bottom_icon1");
var page3_bottom_arrow1_elem = document.querySelector(".page3_bottom_right>.page3_bottom_icon1>svg");
var page3_bottom_arrow2 = document.querySelector(".page3_bottom_right>.page3_bottom_icon2");
var page3_bottom_arrow2_elem = document.querySelector(".page3_bottom_right>.page3_bottom_icon2>svg");

page3_bottom_arrow1.addEventListener("mouseenter", function () {
   var tl = gsap.timeline();
   tl.to(page3_bottom_arrow1_elem , {
      translateY:"110%",
      duration: 0.1 , 
      delay: 0 ,
      ease:"power0.easeNone"
   });
   tl.to(page3_bottom_arrow1_elem , {
      translateY:"-110%",
      duration: 0 , 
      delay: 0.1 ,
      ease:"power0.easeNon"
   });
   tl.to(page3_bottom_arrow1_elem , {
      translateY:"0%",
      duration: 0.1 , 
      delay: 0.3 ,
      ease:"power0.easeNon"
   });
})
page3_bottom_arrow2.addEventListener("mouseenter", function () {
   var tl = gsap.timeline();
   tl.to(page3_bottom_arrow2_elem , {
      translateY:"110%",
      duration: 0.1 , 
      delay: 0 ,
      ease:"power0.easeNone"
   });
   tl.to(page3_bottom_arrow2_elem , {
      translateY:"-110%",
      duration: 0 , 
      delay: 0.1 ,
      ease:"power0.easeNon"
   });
   tl.to(page3_bottom_arrow2_elem , {
      translateY:"0%",
      duration: 0.1 , 
      delay: 0.3 ,
      ease:"power0.easeNon"
   });
})

//page4 animation: =====================================================
var page4_cursor = document.querySelector("#page4>.page4_wrapper");
var page4_cursor_txt = document.querySelector(".resp_sir_show");
var cursor4_cir_width = document.querySelector("#cursor_circle");

page4_cursor.addEventListener("mouseenter", function (e) {
   cursor4_cir_width.style.width = "60px";
   cursor4_cir_width.style.height = "60px";
   page4_cursor_txt.style.display = "initial";
   cursor4_cir_width.style.transition = " width 0.5s 0s , height 0.5s 0s";
})
page4_cursor.addEventListener("mouseleave", function (e) {
   cursor4_cir_width.style.width = "14px"
   cursor4_cir_width.style.height = "14px"
   page4_cursor_txt.style.display = "none";
   cursor4_cir_width.style.transition = " width 0.5s 0s , height 0.5s 0s , display 0s 0.5s";
})

if(nav_body_size>=500){
   var page4_img_src_array =["./imgs/plug.png","./imgs/ixperience.png" , "./imgs/hudu.png"];
   var page4_img_src = document.querySelector("#page4_img_show>img");
   var page4_img_visible = document.querySelector("#page4_img_show");

   var page4_divs =[document.querySelector("#page4>.page4_wrapper>.page4_top"),
                  document.querySelector("#page4>.page4_wrapper>.page4_center"),
                   document.querySelector("#page4>.page4_wrapper>.page4_bottom")
   ];


   for(let i=0 ; i<3 ; i++){
      page4_divs[i].addEventListener("mouseenter",()=>{
         page4_img_src.src = page4_img_src_array[i];
         page4_img_visible.style.display = "initial";
         gsap.to(page4_img_visible,{
            display:"initial",
            opacity:1 ,
            duration: 0.5 , 
         })
      })
      var pg4_prevX = 0 ;
      page4_divs[i].addEventListener("mousemove",(e)=>{

         var currX = e.offsetX - pg4_prevX ; 
         var pg4_tempX = (currX/125)*200;

        // console.log(pg4_tempX);
         var pg4_clampX = gsap.utils.clamp(-45 , 45 , pg4_tempX)
         //console.log(pg4_clampX);

         pg4_prevX = e.offsetX;  

         gsap.to(cursor_img_cont , {
            rotateZ: pg4_clampX + "deg",
            duration: 0.5 ,
         })
      })
      var temp_pg4_x = 0;
      setInterval(function(){
         if(pg4_prevX == temp_pg4_x){
            gsap.to(cursor_img_cont , {
               rotateZ:"0deg",
               duration: 0.5 ,
            })
         }
         temp_pg4_x = pg4_prevX; 
      } , 50)


      page4_divs[i].addEventListener("mouseleave",()=>{
         page4_img_visible.style.display = "initial";
         gsap.to(page4_img_visible,{
            display:"none",
            opacity:0 ,
            duration: 0.5 , 
         })
      });
   }


}

















