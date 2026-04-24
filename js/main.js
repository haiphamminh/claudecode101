var i18nCache={};var SUPPORTED_LANGS=["en","vi"];

function detectLang(){
  try{
    var stored=localStorage.getItem("lang");
    if(stored&&SUPPORTED_LANGS.indexOf(stored)>-1)return stored;
    var params=new URLSearchParams(location.search);
    var q=params.get("lang");
    if(q&&SUPPORTED_LANGS.indexOf(q)>-1)return q;
    var nav=(navigator.language||navigator.userLanguage||"en").toLowerCase();
    for(var i=0;i<SUPPORTED_LANGS.length;i++){if(nav.indexOf(SUPPORTED_LANGS[i])===0)return SUPPORTED_LANGS[i]}
  }catch(e){}
  return "en";
}

function sanitizeI18n(html){
  if(typeof html!=="string")return "";
  return html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,"").replace(/\son\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi,"").replace(/javascript:/gi,"");
}

function loadLangInline(lang){
  var el=document.getElementById("i18n-"+lang);
  if(!el)return null;
  try{return JSON.parse(el.textContent)}catch(e){console.error("i18n inline parse error:",e);return null}
}

function loadLang(lang){
  if(i18nCache[lang])return Promise.resolve(i18nCache[lang]);
  var inline=loadLangInline(lang);
  if(inline){i18nCache[lang]=inline;return Promise.resolve(inline)}
  return fetch("data/"+lang+".json").then(function(r){if(!r.ok)throw new Error("HTTP "+r.status);return r.json()}).then(function(d){i18nCache[lang]=d;return d}).catch(function(err){console.error("i18n load error:",err);showToast("Could not load "+lang+" translations");return null})
}

function applyLang(e,t){
  if(!t)return;
  var n=document.querySelectorAll("[data-i18n]");
  for(var o=0;o<n.length;o++){
    var r=n[o].getAttribute("data-i18n");
    if(void 0!==t[r]){n[o].innerHTML=sanitizeI18n(t[r])}
  }
  var attrEls=document.querySelectorAll("[data-i18n-attr]");
  for(var a=0;a<attrEls.length;a++){
    var spec=attrEls[a].getAttribute("data-i18n-attr");
    var pairs=spec.split(",");
    for(var p=0;p<pairs.length;p++){
      var kv=pairs[p].split(":");
      if(kv.length===2){
        var attrName=kv[0].trim(),key=kv[1].trim();
        if(void 0!==t[key])attrEls[a].setAttribute(attrName,t[key])
      }
    }
  }
  var i=document.getElementById("lang-flag"),l=document.getElementById("lang-label");
  if(i)i.textContent="en"===e?"🇬🇧":"🇻🇳";
  if(l)l.textContent="en"===e?"EN":"VI";
  try{localStorage.setItem("lang",e)}catch(err){}
  document.documentElement.setAttribute("lang",e);
  if(t["site.title"])document.title=t["site.title"];
  var metaDesc=document.querySelector('meta[name="description"]');
  if(metaDesc&&t["site.description"])metaDesc.setAttribute("content",t["site.description"]);
  var liveRegion=document.getElementById("lang-live-region");
  if(liveRegion){liveRegion.textContent=("en"===e?"Language switched to English":"Đã chuyển sang tiếng Việt")}
  var btn=document.getElementById("lang-btn");
  if(btn){btn.setAttribute("aria-label",("en"===e?"Switch language to Vietnamese":"Switch language to English"))}
}

function switchLang(e){
  if(!e){var current=localStorage.getItem("lang")||"en";e="en"===current?"vi":"en"}
  if(SUPPORTED_LANGS.indexOf(e)===-1)e="en";
  loadLang(e).then(function(data){applyLang(e,data)})
}

function showToast(msg){
  var t=document.getElementById("copy-toast");
  if(!t){t=document.createElement("div");t.id="copy-toast";t.setAttribute("role","status");t.setAttribute("aria-live","polite");document.body.appendChild(t)}
  t.textContent=msg||"Copied!";
  t.classList.add("visible");
  clearTimeout(t._hide);
  t._hide=setTimeout(function(){t.classList.remove("visible")},1800)
}

function copyCode(e,t){
  if(!navigator.clipboard){showToast("Clipboard unavailable");return}
  navigator.clipboard.writeText(t).then(function(){
    var original=e.innerHTML;
    e.innerHTML='<svg class="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>';
    e.setAttribute("aria-label","Copied");
    showToast("Copied to clipboard");
    setTimeout(function(){e.innerHTML=original;e.setAttribute("aria-label","Copy to clipboard")},2000)
  }).catch(function(){showToast("Copy failed")})
}

function toggleMobileMenu(){
  var e=document.getElementById("mobile-menu"),t=document.getElementById("mobile-menu-btn");
  var n=e.classList.toggle("open");
  t.setAttribute("aria-expanded",n)
}

function scrollToTop(){window.scrollTo({top:0,behavior:"smooth"})}

function closeAllDropdowns(){
  var openGroups=document.querySelectorAll("nav .group.open");
  for(var i=0;i<openGroups.length;i++){openGroups[i].classList.remove("open")}
  var btns=document.querySelectorAll('nav [aria-haspopup="true"]');
  for(var j=0;j<btns.length;j++){btns[j].setAttribute("aria-expanded","false")}
  var nav=document.querySelector("nav");
  if(nav)nav.classList.remove("nav-locked")
}

function toggleDropdown(btn,ev){
  if(ev){ev.preventDefault();ev.stopPropagation()}
  var group=btn.closest(".group");
  if(!group)return;
  var wasOpen=group.classList.contains("open");
  closeAllDropdowns();
  if(!wasOpen){
    group.classList.add("open");
    btn.setAttribute("aria-expanded","true");
    var nav=document.querySelector("nav");
    if(nav)nav.classList.add("nav-locked")
  }
  try{btn.focus({preventScroll:true})}catch(e){btn.focus()}
}

document.addEventListener("click",function(e){
  var dropdownBtn=e.target.closest('nav [aria-haspopup="true"]');
  if(dropdownBtn){toggleDropdown(dropdownBtn,e);return}
  if(!e.target.closest("nav .group")){closeAllDropdowns()}
  if(e.target.closest("#mobile-menu a")){
    var t=document.getElementById("mobile-menu"),n=document.getElementById("mobile-menu-btn");
    if(t)t.classList.remove("open");
    if(n)n.setAttribute("aria-expanded","false")
  }
});

document.addEventListener("keydown",function(e){
  if(e.key==="Escape"){
    var openDropdown=document.querySelector("nav .group.open");
    if(openDropdown){
      var btn=openDropdown.querySelector('[aria-haspopup="true"]');
      closeAllDropdowns();
      if(btn)btn.focus();
      return
    }
    var t=document.getElementById("mobile-menu"),n=document.getElementById("mobile-menu-btn");
    if(t&&t.classList.contains("open")){t.classList.remove("open");if(n){n.setAttribute("aria-expanded","false");n.focus()}}
  }
});

window.addEventListener("scroll",function(){
  var e=document.getElementById("scroll-progress"),t=document.getElementById("back-to-top"),n=window.scrollY,o=document.documentElement.scrollHeight-window.innerHeight;
  if(e&&o>0)e.style.width=n/o*100+"%";
  if(t)n>400?t.classList.add("visible"):t.classList.remove("visible")
},{passive:true});

(function(){
  var sections=document.querySelectorAll("section[id]"),links=document.querySelectorAll(".nav-link");
  if(!sections.length||!links.length)return;
  var observer=new IntersectionObserver(function(entries){
    for(var i=0;i<entries.length;i++){
      if(entries[i].isIntersecting){
        var id="#"+entries[i].target.id;
        for(var j=0;j<links.length;j++){
          links[j].classList.remove("active");
          links[j].removeAttribute("aria-current");
          if(links[j].getAttribute("href")===id){
            links[j].classList.add("active");
            links[j].setAttribute("aria-current","page")
          }
        }
      }
    }
  },{rootMargin:"-20% 0px -60% 0px"});
  for(var k=0;k<sections.length;k++)observer.observe(sections[k])
})();

document.addEventListener("DOMContentLoaded",function(){
  var lang=detectLang();
  if(lang!=="en"){switchLang(lang)}
  else{
    document.documentElement.setAttribute("lang","en");
    var btn=document.getElementById("lang-btn");
    if(btn)btn.setAttribute("aria-label","Switch language to Vietnamese")
  }
});
