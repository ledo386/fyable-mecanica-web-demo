'use strict';
const menu=document.querySelector('#menu'), nav=document.querySelector('#nav');
function closeMenu(){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Abrir menú');}
menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
document.querySelectorAll('[data-service]').forEach(a=>a.addEventListener('click',()=>{document.querySelector('#servicio').value=a.dataset.service;}));
const cards=[...document.querySelectorAll('.gallery-card')],filters=[...document.querySelectorAll('[data-filter]')];
const dialog=document.querySelector('#gallery-modal'),modalImg=document.querySelector('#modal-img'),modalTitle=document.querySelector('#modal-title'),modalDesc=document.querySelector('#modal-desc');
let active=0,opener=null;
const visible=()=>cards.filter(c=>!c.hidden);
filters.forEach(b=>b.addEventListener('click',()=>{filters.forEach(x=>x.setAttribute('aria-pressed',String(x===b)));cards.forEach(c=>c.hidden=b.dataset.filter!=='all'&&c.dataset.category!==b.dataset.filter);document.querySelector('#gallery-count').textContent=visible().length+' referencias visuales · Fotografías de inspiración';}));
function showImage(i){const list=visible();active=(i+list.length)%list.length;const c=list[active];modalTitle.textContent=c.dataset.title;modalDesc.textContent=c.dataset.desc;modalImg.alt='Referencia visual: '+c.dataset.title;modalImg.src=c.dataset.src;}
cards.forEach(c=>c.addEventListener('click',()=>{opener=c;showImage(visible().indexOf(c));dialog.showModal();}));
document.querySelector('.modal-close').addEventListener('click',()=>dialog.close());
document.querySelector('#modal-prev').addEventListener('click',()=>showImage(active-1));document.querySelector('#modal-next').addEventListener('click',()=>showImage(active+1));
dialog.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){e.preventDefault();showImage(active-1)}if(e.key==='ArrowRight'){e.preventDefault();showImage(active+1)}});
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});dialog.addEventListener('close',()=>opener?.focus());
document.querySelectorAll('.gallery-image img').forEach(img=>{const fail=()=>img.parentElement.classList.add('image-unavailable');img.addEventListener('error',fail);if(img.complete&&!img.naturalWidth)fail();});
modalImg.addEventListener('error',()=>{modalImg.removeAttribute('src');modalImg.alt='Imagen de referencia no disponible';});
const situations={
revision:{n:'01',title:'Mantenimiento periódico',text:'Consulta el mantenimiento que corresponde a tu vehículo según su kilometraje, antigüedad y uso habitual.',items:['Marca, modelo y año','Kilómetros actuales','Fecha de la última revisión'],service:'Mantenimiento'},
averia:{n:'02',title:'Un síntoma inesperado',text:'Describe el comportamiento del coche con precisión. No conduzcas si un aviso o fallo compromete la seguridad.',items:['Cuándo apareció el síntoma','Testigos, ruidos o vibraciones','Si ocurre al arrancar, frenar o circular'],service:'Consulta de averías'},
ruedas:{n:'03',title:'Neumáticos y medidas',text:'Identifica las medidas autorizadas para tu vehículo y consulta la disponibilidad de montaje.',items:['Medida de los neumáticos','Número de ruedas que necesitas sustituir','Marca, modelo y año del coche'],service:'Neumáticos'},
viaje:{n:'04',title:'Preparar un viaje',text:'Consulta con suficiente antelación qué revisión se puede realizar antes de un desplazamiento largo.',items:['Kilometraje y última revisión','Fecha prevista del viaje','Cualquier incidencia reciente'],service:'Revisión preventiva'}};
const tabs=[...document.querySelectorAll('[data-situation]')];
tabs.forEach(b=>b.addEventListener('click',()=>{tabs.forEach(x=>x.setAttribute('aria-pressed',String(x===b)));const s=situations[b.dataset.situation];document.querySelector('#advisor-kicker').textContent='ORIENTACIÓN / '+s.n;document.querySelector('#advisor-title').textContent=s.title;document.querySelector('#advisor-text').textContent=s.text;const list=document.querySelector('#advisor-list');list.replaceChildren(...s.items.map(t=>{const li=document.createElement('li');li.textContent=t;return li}));document.querySelector('#advisor-link').dataset.service=s.service;}));
const form=document.querySelector('#form');
form.addEventListener('submit',e=>{e.preventDefault();if(!form.checkValidity()){form.reportValidity();return;}const d=new FormData(form);document.querySelector('#status').textContent='Solicitud de ejemplo preparada.\nServicio: '+d.get('servicio')+'\nNo se ha enviado ni almacenado ningún dato. Para contactar realmente, utiliza el teléfono publicado.';form.reset();});
form.querySelector('button[type=submit]').disabled=false;
document.querySelector('#year').textContent=new Date().getFullYear();
