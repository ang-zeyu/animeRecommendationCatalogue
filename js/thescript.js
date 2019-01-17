async function changeButtonState(page){
  var openornot = document.getElementById("genresdropdown").style.display;
  var devicewidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
  if(openornot == "" && devicewidth < 1201){
    document.getElementsByClassName("navtext")[0].style.transform ="rotate(480deg)";
    await sleep(500);
    document.getElementsByClassName("navtext")[0].style.transform ="translateY(100vh)";
    await sleep(400);
    document.getElementById("genresdropdown").style.display = "block";
    document.getElementsByClassName("navtext")[0].style.visibility = "hidden";
    document.getElementsByClassName("navtext")[1].style.visibility = "hidden";
    document.getElementsByClassName("navtext")[2].style.display = "block";
    document.getElementsByClassName("navtext")[3].style.display= "block";
    document.getElementsByClassName("navtext")[4].style.display= "block";
    document.getElementsByTagName("nav")[0].style.height = "110vh";
    document.getElementsByClassName("navtext")[0].style.transform ="rotate(-360deg)";

  } else if(openornot == "block" && devicewidth < 1201){
    document.getElementById("genresdropdown").style.display = "";
    document.getElementsByClassName("navtext")[0].style.visibility = "visible";
    document.getElementsByClassName("navtext")[1].style.visibility = "visible";
    document.getElementsByClassName("navtext")[2].style.display = "";
    document.getElementsByClassName("navtext")[3].style.display = "";
    document.getElementsByClassName("navtext")[4].style.display = "";
    document.getElementsByTagName("nav")[0].style.height = "6vh";
  }

  if(devicewidth>1200){
    event.preventDefault();
    var theid = page.getAttribute("href");
    theid = theid.slice(1);
    var position = document.getElementById(theid).offsetTop;
    var currentposition = window.pageYOffset;
    var difference = position - currentposition;
    // alert(difference);
    var delta = difference / 30;
    for(i=0;i<30;i++){
      window.scrollBy(0, delta);
      await sleep(1);
    }
  }

  if (openornot == "block" && devicewidth < 670) {
    document.getElementsByTagName("nav")[0].style.height = "8vh";
  }



}

var overlayitem;

// just copying ans pasting a way to implement a sleep function in javascript without really understanding it *laughs*, definetely a to do
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


async function displaydahoverlay(itemtodisplay){
  overlayitem = itemtodisplay.nextElementSibling;
  var devicewidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
  if (devicewidth < 670 && overlayitem.classList[0]=="glossaryoverlay") {
    itemtodisplay.style.backgroundColor ="#fff2fa";
    itemtodisplay.style.color = "#291720";
    await sleep(700);
  }
  overlayitem.style.display = "grid";
  if (devicewidth < 670 && overlayitem.classList[0]=="glossaryoverlay") {
    itemtodisplay.style.backgroundColor ="#291720";
    itemtodisplay.style.color = "#fff2fa";
  }
}

function exitdahoverlay(){
  overlayitem.style.display = "none";
}
var thecolor = true;

function changecontrast(contrastitem){

  if(thecolor){
    thecolor = false;
    contrastitem.parentElement.style.backgroundColor = "rgb(22,22,22)";
  } else if(thecolor == false){
    thecolor = true;
    contrastitem.parentElement.style.backgroundColor = "rgba(22,22,22,0.8)";
  }
}



function changecheck(itemtocheck){

  if(itemtocheck.dataset.checked=="no") {
    itemtocheck.dataset.checked="yes";
    itemtocheck.setAttribute("src","images/checked.png");
    itemtocheck.setAttribute("alt","checked anime watching progress checkbox");
    itemtocheck.setAttribute("title","checkbox By Bohdan Burmich from the Noun Project");
  } else if(itemtocheck.dataset.checked=="yes"){
    itemtocheck.dataset.checked="no";
    itemtocheck.setAttribute("src","images/unchecked.png");
    itemtocheck.setAttribute("alt","unchecked anime watching progress checkbox");
    itemtocheck.setAttribute("title","just a black circle I drew using gimp");
  }

  var checkboxes = document.getElementsByClassName("animeprogressbox");
  var checkboxesamount = checkboxes.length;
  var amountchecked = 0;
  var storagearray = [0];

  for(i=0;i<checkboxesamount;i++){
    if(checkboxes[i].lastElementChild.dataset.checked=="yes"){
      amountchecked++;
      storagearray[i]=1;
    } else if(checkboxes[i].lastElementChild.dataset.checked=="no"){
      storagearray[i]=0;
    }

    storagearray.push();
  }

  localStorage.setItem("progressarray", JSON.stringify(storagearray));

  document.getElementById("overallprogress").setAttribute("max",checkboxesamount);
  document.getElementById("overallprogress").setAttribute("value",amountchecked);
  localStorage.setItem("progressvalue", amountchecked);
  localStorage.setItem("progressmax", checkboxesamount);
}

function updatecheckonload(){
  var pv = localStorage.getItem("progressvalue");
  var pm = localStorage.getItem("progressmax");
  var storagearraystring = localStorage.getItem("progressarray");
  var storagearray = JSON.parse(storagearraystring);
  console.log(storagearray.length);
  document.getElementById("overallprogress").setAttribute("max",pm);
  document.getElementById("overallprogress").setAttribute("value",pv);
  var checkboxes = document.getElementsByClassName("animeprogressbox");

  for(i=0;i<pm;i++){
    if(storagearray[i]==1){
      checkboxes[i].lastElementChild.dataset.checked="yes";
      checkboxes[i].lastElementChild.setAttribute("src","images/checked.png");
      checkboxes[i].lastElementChild.setAttribute("alt","checked anime watching progress checkbox");
      checkboxes[i].lastElementChild.setAttribute("title","checkbox By Bohdan Burmich from the Noun Project");
    }
  }

}
