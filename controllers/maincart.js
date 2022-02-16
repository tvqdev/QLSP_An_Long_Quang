const cartClose = document.querySelector(".fa-times")
const cartShow = document.querySelector(".fa-opencart")
cartShow.addEventListener("click",function(){
    document.querySelector(".cart").style.right = "0"
})
cartClose.addEventListener("click",function(){
    document.querySelector(".cart").style.right = "-100%"
})