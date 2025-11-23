(function(){
var a='aHR0cHM6Ly9hcGkubnBvaW50LmlvLzRmZTFhOWZlN2VkZTE1NmZlMDI3';
var b=atob(a);
var msg=atob('PGgxIHN0eWxlPSJjb2xvcjpyZWQiPldhcm5pbmc6IFRoaXMgRG9tYWluIGlzIG5vdCBMaWNlbnNlZCBYLiBDb250YWN0IHRvIFlvdXIgTGluayBBZG1pbi48L2gxPjxicj48YnI+PGgxPkRvbnQgdXNlIGFkYmxvY2tlciBvciBhZGJsb2NrIGJyb3dzZXIgb3IgbGluayB3aWxsIG5vdCBvcGVuLjwvaDE+PGJyPjxicj48cD5UaGlzIFNhZmVsaW5rIGlzIG1hZGUgYnkgaHR0cHM6Ly9qaXQzNjIuZ2l0aHViLmlvPC9wPg==');
var red=atob('aHR0cHM6Ly90ZWNoeXNndS5ibG9nc3BvdC5jb20=');

function blockAndRedirect(t){
document.body.style.display='none';
var d=document.createElement('div');
d.id='sgutech-made-msg';
d.style.position='fixed';
d.style.top='0';
d.style.left='0';
d.style.right='0';
d.style.color='red';
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
if(!ok){ blockAndRedirect(10000); return }
}).catch(()=>blockAndRedirect(5000));
})();
