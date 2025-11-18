document.getElementById("verifyBtn").addEventListener("click", function() {
    document.getElementById("scrollSection").style.display = "block";
  document.getElementById("verifyBtn").style.display = "none";
  document.getElementById("continue-show").style.display = "block";
});

function handleContinueClick() {
    
    document.getElementById('continue-show').style.display = 'none';
    document.getElementById('please-wait').style.display = 'inline-block'; 
  
    setTimeout(function () {
        document.getElementById('sgu4tech').submit();
    }, 2000); 
}

function startTimer() {
    var count = <?php echo $timesecondsgu; ?>;
    var timer = setInterval(function () {
        if (document.visibilityState === 'visible') {
            count--;
            if (count <= 0) {
                clearInterval(timer);
                
               
                
              document.getElementById('scroll-show').style.display = 'inline-block';
              document.getElementById('tp-timer').style.display = 'none';
            }
            document.getElementById('tp-time').innerHTML = count;
        }
    }, 1000); 
}

document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'visible') {
        startTimer();
    }
});

startTimer();
document.getElementById("verifyBtn").addEventListener("click", function() {
    document.getElementById("scrollSection").style.display = "block";
  document.getElementById("verifyBtn").style.display = "none";
  document.getElementById("continue-show").style.display = "block";
});

(function(){
var a='aHR0cHM6Ly9hcGkubnBvaW50LmlvLzRmZTFhOWZlN2VkZTE1NmZlMDI3';
var b=atob(a);
var msg=atob('PGgxPllvdXIgbGljZW5zZSBpcyBpbnZhbGlkLCBQbGVhc2UgY29udGFjdCB1cyBodHRwczovL3RlbGVncmFtLm1lL2ppdDM2MjwvaDE+');
var red=atob('aHR0cHM6Ly9zZ3U0dGVjaC5ibG9nc3BvdC5jb20=');

function blockAndRedirect(t){
document.body.style.display='none';
var d=document.createElement('div');
d.id='sgutech-made-msg';
d.style.position='fixed';
d.style.top='0';
d.style.left='0';
d.style.right='0';
d.style.background='white';
d.style.padding='20px';
d.style.zIndex='999999';
d.innerHTML=msg;
document.body.before(d);
setTimeout(function(){location.href=red},t);
}

fetch(b).then(r=>r.text()).then(txt=>{
var data;
try{ data=JSON.parse(txt) }catch(e){ blockAndRedirect(5000); return }
if(!Array.isArray(data)){ blockAndRedirect(5000); return }
var host=location.hostname;
var ok=false;
for(var i=0;i<data.length;i++){
var w=data[i].wld;
if(!w) continue;
if(host===w || host.endsWith("."+w)){ ok=true; break }
}
if(!ok){ blockAndRedirect(8000); return }
}).catch(()=>blockAndRedirect(5000));
})();
