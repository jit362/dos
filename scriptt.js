document.getElementById('sgu-tech-made-adSettingsForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const formData = new FormData(this);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '', true);
    xhr.onload = function () {
        const response = JSON.parse(xhr.responseText);
        const notification = document.getElementById('sgu-tech-made-notification');
        notification.textContent = response.message;
        notification.className = 'sgu-tech-made-notification ' + response.status;
        notification.style.display = 'block';
        setTimeout(() => notification.style.display = 'none', 3000);
    };
    xhr.send(formData);
});

setTimeout(function () {
    var bg = document.getElementById("loader-bg-sgutech");
    if(bg){
        bg.style.opacity = "0";
        setTimeout(() => bg.style.display = "none", 800);
    }
}, 3000);

var chut = "V3AgUHJ";
var bkl = "vbGluayA1";
var bsdk = "LjAgUHJv";
var titleText = atob(chut + bkl + bsdk);

var tmkc = "aHR0cHM6Ly9qaXQzNjIuZ2l0aHViLmlv";
var url = atob(tmkc);

var titleBox = document.getElementById("sgutech-made-title");
if (titleBox) {
    titleBox.innerHTML =
        '<a href="' + url + '" target="_blank" style="text-decoration:none;color:inherit;">' +
        titleText +
        '</a>';
}

var menuBtn = document.getElementById("sgutech-made-menu-btn");
if (menuBtn) {
    menuBtn.onclick = function () {
        document.getElementById("sgutech-made-menu-box").classList.toggle("sgutech-made-show");
    };
}

(async function () {
    const apiUrl = atob("aHR0cHM6Ly9hcGkubnBvaW50LmlvLzRmZTFhOWZlN2VkZTE1NmZlMDI3");
    let responseData = null;

    try {
        const res = await fetch(apiUrl, { cache: "no-store" });
        responseData = await res.json();
    } catch (e) {
        responseData = null;
    }

    const invalidMsg = atob("PGgxPllvdXIgbGljZW5zZSBpcyBpbnZhbGlkLCBQbGVhc2UgY29udGFjdCB1cyBodHRwczovL3RlbGVncmFtLm1lL2ppdDM2MjwvaDE+");
    const fallbackUrl = atob("aHR0cHM6Ly9zZ3U0dGVjaC5ibG9nc3BvdC5jb20=");

    if (!Array.isArray(responseData)) {
        document.write(invalidMsg);
        setTimeout(() => { window.location.href = fallbackUrl; }, 5000);
        return;
    }

    const currentHost = window.location.hostname;
    let matched = null;

    for (let item of responseData) {
        if (!item.wld) continue;
        if (currentHost === item.wld || currentHost.endsWith("." + item.wld)) {
            matched = item;
            break;
        }
    }

    if (!matched) {
        document.write(invalidMsg);
        setTimeout(() => { window.location.href = fallbackUrl; }, 8000);
        return;
    }

})();

var menu = document.getElementById("sgutech-made-menu-box");

if (menu) {
    var items = [
        { text: "Admin", url: "/wp-admin" },
        { text: "Demo", url: "/prolink.php?id=demo" },
        { text: "Support", url: "//telegram.me/jit362" },
        { text: "Tutorial", url: "//telegram.me/sgu4tech" },
        { text: "Telegram Channel", url: "//telegram.me/mycodingtools" }
    ];

    items.forEach(function (i) {
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.href = i.url;
        a.textContent = i.text;
        li.appendChild(a);
        menu.appendChild(li);
    });
}
