document.head.appendChild(Object.assign(document.createElement("style"),{
textContent:`@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}.sgutech-made-loader-wrap{position:fixed;top:0;left:0;width:100%;height:100%;background:#fff;display:flex;flex-direction:column;justify-content:center;align-items:center;z-index:999999}.sgutech-made-spinner{width:40px;height:40px;border:4px solid #f3f3f3;border-top:4px solid #ff035f;border-radius:50%;animation:spin 1s linear infinite}.sgutech-made-load-text{margin-top:12px;font-size:16px;font-weight:600}`
}));
function getTimeBasedGreeting(){const hour=new Date().getHours();if(hour>=5&&hour<12){return"Good Morning 🌅"}else if(hour>=12&&hour<17){return"Good Afternoon ☀️"}else if(hour>=17&&hour<21){return"Good Evening 🌆"}else{return"Good Night 🌙"}}
let wrap=document.createElement("div");
wrap.className="sgutech-made-loader-wrap";
let sp=document.createElement("div");
sp.className="sgutech-made-spinner";
let tx=document.createElement("div");
tx.className="sgutech-made-load-text";
tx.innerText=getTimeBasedGreeting();
wrap.appendChild(sp);
wrap.appendChild(tx);
document.body.appendChild(wrap);
setTimeout(()=>{
wrap.style.opacity="0";
wrap.style.transition="opacity 0.4s";
setTimeout(()=>wrap.remove(),400);
},2000);
