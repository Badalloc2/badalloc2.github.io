function toggleDrawer(){
  document.getElementById('drawer').classList.toggle('open');
  document.getElementById('scrim').classList.toggle('open');
}

window.addEventListener('scroll', function(){
  var h = document.getElementById('siteHeader');
  if(h) h.style.background = window.scrollY > 40 ? 'rgba(20,23,26,.92)' : 'rgba(20,23,26,.72)';
}, {passive:true});

var reveals = document.querySelectorAll('.reveal');
if('IntersectionObserver' in window){
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(en.isIntersecting){ en.target.classList.add('in-view'); io.unobserve(en.target); }
    });
  }, {threshold:.14});
  reveals.forEach(function(el){ io.observe(el); });
} else {
  reveals.forEach(function(el){ el.classList.add('in-view'); });
}

// safety sweep: never let content stay hidden if JS misfires
setTimeout(function(){
  document.querySelectorAll('.reveal').forEach(function(el){ el.classList.add('in-view'); });
}, 1500);

document.addEventListener('keydown', function(e){
  if(e.key === 'Escape'){
    var d = document.getElementById('drawer'), s = document.getElementById('scrim');
    if(d) d.classList.remove('open');
    if(s) s.classList.remove('open');
  }
});

// contact form -> composes a real WhatsApp message, no fake success state
var form = document.getElementById('enquiry-form');
if(form){
  form.addEventListener('submit', function(e){
    e.preventDefault();
    if(!form.reportValidity()) return;
    var data = new FormData(form);
    var waNumber = form.getAttribute('data-wa');
    var lines = [
      "Hi, I'd like to discuss a project.",
      "",
      "Name: " + (data.get('name') || ''),
      "Phone: " + (data.get('phone') || ''),
      "Project type: " + (data.get('project_type') || 'Not sure'),
      "Details: " + (data.get('message') || '')
    ];
    window.location.href = 'https://wa.me/' + waNumber + '?text=' + encodeURIComponent(lines.join('\n'));
  });
}
