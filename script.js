const IMG={portada:'img/portada.png',historia:'img/historia.png',libre:'img/libre.png',pecho:'img/pecho.png',espalda:'img/espalda.png',mariposa:'img/mariposa.png',aguas:'img/aguas-abiertas.png',artistica:'img/natacion-artistica.png',clavados:'img/clavados.png'};
const AUDIO={fondo:'audio/fondo.mp3',clic:'audio/clic.mp3',final:'audio/final.mp3'};

const stations=[
 ['history','01','HISTORIA','Del origen de la natación a su transformación en deporte.'],
 ['styles','02','ESTILOS','Libre, pecho, espalda y mariposa.'],
 ['disciplines','03','DISCIPLINAS','Aguas abiertas, artística, clavados, waterpolo y paralímpica.'],
 ['competition','04','COMPETENCIA','Pruebas, piscinas, virajes y reglas.'],
 ['technique','05','TÉCNICA','Posición, propulsión, respiración y coordinación.'],
 ['equipment','06','EQUIPAMIENTO','Materiales que acompañan el entrenamiento y la práctica.'],
 ['safety','07','SEGURIDAD','Prevención, supervisión y responsabilidad.'],
 ['quiz','08','QUIZ FINAL','Comprueba cuánto descubriste durante el recorrido.']
];

document.getElementById('stations').innerHTML=stations.map(s=>`<button class="station" data-section="${s[0]}"><span class="num">${s[1]}</span><div class="icon">${s[0]==='quiz'?'Q':s[1]}</div><h3>${s[2]}</h3><p>${s[3]}</p><span class="station-arrow">${s[0]==='quiz'?'↗':'→'}</span></button>`).join('');

const visited=new Set();
const units=stations.map(s=>s[0]);
function updateProgress(){const p=units.reduce((n,id)=>n+(visited.has(id)?1:0),0);document.getElementById('progressText').textContent=`${p}/8`;document.getElementById('progressBar').style.width=`${p*12.5}%`;document.querySelectorAll('.station').forEach(x=>x.classList.toggle('done',visited.has(x.dataset.section)))}
function showSection(id){document.querySelectorAll('.page').forEach(x=>x.classList.toggle('active-page',x.id===id));if(id!=='map')visited.add(id);updateProgress();window.scrollTo({top:0,behavior:'smooth'});if(id==='quiz')renderQuiz();playClick()}
document.addEventListener('click',e=>{const b=e.target.closest('[data-section]');if(b)showSection(b.dataset.section)});
window.addEventListener('load',()=>{setTimeout(()=>{const l=document.getElementById('loader');l.style.opacity=0;setTimeout(()=>l.remove(),650)},850)});
document.getElementById('startBtn').onclick=()=>{document.getElementById('cover').classList.add('hidden');document.getElementById('topbar').classList.remove('hidden');document.getElementById('app').classList.remove('hidden');showSection('map')};
document.getElementById('restartBtn').onclick=()=>{visited.clear();qIndex=0;score=0;updateProgress();showSection('map')};

const timelineData=[
 ['ANTIGÜEDAD','La natación aparece en registros y representaciones de distintas civilizaciones. Nadar podía relacionarse con la supervivencia, el desplazamiento y la preparación física.'],
 ['EDAD MEDIA','La práctica no desapareció, aunque su presencia y valoración variaron según las sociedades y los contextos.'],
 ['EDAD MODERNA','La enseñanza de la natación comenzó a organizarse de manera más sistemática y se difundieron métodos y manuales.'],
 ['SIGLO XIX','Clubes, piscinas, competencias y reglamentos ayudaron a convertir la natación en un deporte organizado.'],
 ['OLIMPISMO MODERNO','La natación pasó a formar parte del programa olímpico moderno y sus pruebas se fueron estructurando con mayor precisión.'],
 ['SIGLOS XX–XXI','Se expandieron los estilos competitivos, las marcas internacionales y las distintas disciplinas acuáticas.']
];
document.getElementById('timeline').innerHTML=timelineData.map((x,i)=>`<article class="timeline-item"><span class="year">${String(i+1).padStart(2,'0')} / ${x[0]}</span><h3>${x[0]}</h3><p>${x[1]}</p></article>`).join('');
const facts=['La natación aparece representada en arte antiguo de distintas regiones del mundo.','El estilo libre no obliga a utilizar crol: en la prueba se permite cualquier estilo, aunque el crol suele ser el más rápido.','Las aguas abiertas añaden orientación y adaptación a condiciones ambientales que no existen de la misma forma en una piscina.','La natación artística combina elementos deportivos y artísticos dentro de una rutina acuática.','En los clavados, la entrada al agua es una parte técnica de la ejecución y no solo el final del salto.'];
let fi=0;document.getElementById('historyFact').textContent=facts[0];document.getElementById('newFact').onclick=()=>{fi=(fi+1)%facts.length;document.getElementById('historyFact').textContent=facts[fi];playClick()};

const styles={
 libre:{name:'ESTILO LIBRE',num:'01',sub:'VELOCIDAD · COORDINACIÓN · RESISTENCIA',text:'En las pruebas de estilo libre el reglamento permite utilizar cualquier estilo, aunque el crol se emplea habitualmente por su eficiencia y velocidad.',focus:['POSICIÓN DEL CUERPO','BRAZADA','PATADA','RESPIRACIÓN'],desc:['Cuerpo alineado y horizontal para reducir la resistencia.','Movimiento alternado de los brazos que genera propulsión.','Patada continua que acompaña la acción de brazos y estabiliza el cuerpo.','Giro coordinado de la cabeza para tomar aire sin romper demasiado la posición.']},
 pecho:{name:'ESTILO PECHO',num:'02',sub:'FUERZA · COORDINACIÓN · PRECISIÓN',text:'Se caracteriza por acciones simultáneas de brazos y piernas y por una fase de deslizamiento después de la propulsión.',focus:['BRAZOS','PATADA','DESLIZAMIENTO','RESPIRACIÓN'],desc:['Los brazos realizan una acción simultánea para generar apoyo y propulsión.','Las piernas realizan la patada característica con apertura y cierre.','Después de la patada se aprovecha el impulso antes del siguiente ciclo.','La respiración se coordina con el movimiento de brazos.']},
 espalda:{name:'ESTILO ESPALDA',num:'03',sub:'POSICIÓN DORSAL · RITMO · CONTROL',text:'Se realiza sobre la espalda, con movimientos alternados de brazos y una patada continua que ayuda a mantener la posición.',focus:['POSICIÓN','BRAZADA','PATADA','VIRAJE'],desc:['El cuerpo se mantiene alineado en posición dorsal.','Los brazos alternan sus acciones alrededor del eje corporal.','La patada contribuye a la propulsión y estabilidad.','En la pared se realiza un giro específico antes de iniciar el siguiente largo.']},
 mariposa:{name:'ESTILO MARIPOSA',num:'04',sub:'POTENCIA · RITMO · COORDINACIÓN',text:'Utiliza movimientos simultáneos de brazos y una patada ondulatoria de delfín, coordinados con la respiración.',focus:['ENTRADA','TIRÓN','EMPUJE','PATADA DE DELFÍN'],desc:['Los brazos entran juntos al agua delante de los hombros.','El tirón genera apoyo para avanzar.','El empuje completa la fase propulsiva de los brazos.','La ondulación del cuerpo y las piernas acompaña el ciclo.']}
};
document.getElementById('styleTabs').innerHTML=Object.keys(styles).map(k=>`<button class="style-tab" data-style="${k}">${styles[k].name.replace('ESTILO ','')}</button>`).join('');
function renderStyle(k){const s=styles[k];document.querySelectorAll('.style-tab').forEach(b=>b.classList.toggle('active',b.dataset.style===k));document.getElementById('styleDetail').innerHTML=`<div class="technique-art"><img src="${IMG[k]}" alt="${s.name}" onerror="this.style.opacity='.25'"><div class="style-number">${s.num}</div><div class="style-label">${s.name}</div></div><div class="detail-copy"><span class="kicker">${s.sub}</span><h3>${s.name}</h3><p id="styleText">${s.text}</p><div class="mini-grid">${s.focus.map((f,i)=>`<button data-info="${encodeURIComponent(s.desc[i])}"><b>${f}</b><span>+</span></button>`).join('')}</div></div>`}
document.getElementById('styleTabs').onclick=e=>{const b=e.target.closest('[data-style]');if(b){renderStyle(b.dataset.style);playClick()}};document.getElementById('styleDetail').onclick=e=>{const b=e.target.closest('[data-info]');if(b){document.getElementById('styleText').textContent=decodeURIComponent(b.dataset.info);playClick()}};renderStyle('libre');
document.getElementById('compareGrid').innerHTML=[['LIBRE','Crol habitual · posición horizontal'],['PECHO','Simetría · deslizamiento'],['ESPALDA','Posición dorsal · alternancia'],['MARIPOSA','Simultaneidad · ondulación']].map(x=>`<div><b>${x[0]}</b><span>${x[1]}</span></div>`).join('');

const equipment=[['GAFAS','Ayudan a proteger los ojos y permiten una visión más cómoda bajo el agua.','VISIÓN'],['GORRO','Reduce el movimiento del cabello y puede ayudar a disminuir la resistencia.','COMODIDAD'],['TRAJE DE BAÑO','Debe permitir libertad de movimiento y ser adecuado para la actividad.','MOVILIDAD'],['TABLA','Material de entrenamiento utilizado para trabajar determinadas acciones de piernas.','ENTRENAMIENTO'],['PULL BUOY','Elemento de flotación que puede utilizarse para aislar el trabajo de brazos durante ciertos ejercicios.','TÉCNICA'],['ALETAS','Pueden utilizarse en ejercicios específicos para trabajar sensaciones de propulsión y posición.','PROPULSIÓN']];document.getElementById('equipmentGrid').innerHTML=equipment.map(x=>`<article class="equipment-card"><span>${x[2]}</span><strong>${x[0]}</strong><p>${x[1]}</p></article>`).join('');

document.querySelectorAll('.tech-list button').forEach(b=>b.addEventListener('click',()=>{document.getElementById('tipText').textContent=b.dataset.tip;playClick()}));

const questions=[
 ['¿Qué estilo se utiliza normalmente en las pruebas de estilo libre?','Crol',['Pecho','Crol','Espalda','Mariposa']],
 ['¿Qué estilo se realiza en posición dorsal?','Espalda',['Mariposa','Pecho','Espalda','Libre']],
 ['¿Qué estilo utiliza la patada de delfín?','Mariposa',['Pecho','Espalda','Mariposa','Libre']],
 ['¿En qué espacios se practican las aguas abiertas?','Mares, lagos y otros espacios naturales',['Solo piscinas','Mares, lagos y otros espacios naturales','Solo gimnasios','Solo ríos']],
 ['¿Qué disciplina combina música, coreografía y elementos acuáticos?','Natación artística',['Clavados','Natación artística','Estilo espalda','Aguas abiertas']],
 ['¿Cuál es la diferencia básica entre trampolín y plataforma?','El trampolín es flexible y la plataforma es fija',['Son iguales','El trampolín es flexible y la plataforma es fija','Ambos son carriles','La plataforma es una piscina']],
 ['¿Qué caracteriza al estilo mariposa?','Movimientos simultáneos de brazos y patada de delfín',['Solo un brazo','Movimientos simultáneos de brazos y patada de delfín','Nadar boca arriba','Nadar sin patada']],
 ['¿Qué capacidad es especialmente importante en aguas abiertas?','Orientación',['Solo velocidad','Orientación','Solo flexibilidad','Solo fuerza']],
 ['¿Qué elementos forman parte de la ejecución de un clavado?','Posición, giros, control y entrada al agua',['Solo velocidad','Posición, giros, control y entrada al agua','Solo resistencia','Solo altura']],
 ['¿Qué ayudó a organizar la natación como deporte?','Clubes, competencias y reglas',['Eliminar las reglas','Clubes, competencias y reglas','Solo nadar en el mar','No establecer técnicas']]
];
let qIndex=0,score=0,answered=false;
function renderQuiz(){if(qIndex>=questions.length){finishQuiz();return}const [q,c,opts]=questions[qIndex];document.getElementById('quizBox').innerHTML=`<div class="quiz-meta"><span>PREGUNTA ${qIndex+1}/10</span><span>${score} ACIERTOS</span></div><div class="question">${q}</div><div class="answers">${opts.map((o,i)=>`<button class="answer" data-answer="${i}">${o}</button>`).join('')}</div><div id="feedback"></div>`;answered=false}
document.getElementById('quizBox').onclick=e=>{const a=e.target.closest('.answer');if(a&&!answered){answered=true;const [q,c,opts]=questions[qIndex],selected=opts[+a.dataset.answer];document.querySelectorAll('.answer').forEach(x=>x.disabled=true);if(selected===c){a.classList.add('correct');score++}else{a.classList.add('wrong');document.querySelectorAll('.answer').forEach(x=>{if(x.textContent===c)x.classList.add('correct')})}document.getElementById('feedback').innerHTML=`<div class="feedback">${selected===c?'Respuesta correcta.':'La respuesta correcta es: '+c+'.'}</div><button class="hero-btn next-btn"><span>${qIndex===9?'VER RESULTADO':'SIGUIENTE'}</span><b>→</b></button>`;playClick()}else if(e.target.closest('.next-btn')){qIndex++;renderQuiz()}};
function finishQuiz(){let title=score===10?'RECORRIDO COMPLETO':score>=8?'GRAN RECORRIDO':score>=6?'BUENA EXPLORACIÓN':'SIGUE DESCUBRIENDO';let msg=score>=8?'Has identificado gran parte de los conceptos del museo.':'Puedes volver a visitar las estaciones y reforzar lo aprendido.';document.getElementById('quizBox').innerHTML=`<div class="result"><span class="kicker">RESULTADO FINAL</span><h3>${title}</h3><p>${msg}</p><p>Obtuviste <b>${score}/10</b>.</p><button class="hero-btn" id="finalBtn"><span>VER FINAL</span><b>→</b></button><button class="outline-btn" id="retryBtn">REPETIR QUIZ</button></div>`;visited.add('quiz');updateProgress();document.getElementById('finalBtn').onclick=()=>{document.getElementById('finalScore').textContent=`PUNTUACIÓN FINAL: ${score}/10`;document.getElementById('final').classList.remove('hidden');playFinal()};document.getElementById('retryBtn').onclick=()=>{qIndex=0;score=0;renderQuiz()}}

let soundOn=false,bgAudio=null;function playClick(){if(!soundOn)return;const a=new Audio(AUDIO.clic);a.volume=.22;a.play().catch(()=>{})}function playFinal(){if(!soundOn)return;const a=new Audio(AUDIO.final);a.volume=.4;a.play().catch(()=>{})}
document.getElementById('soundBtn').onclick=e=>{soundOn=!soundOn;e.currentTarget.innerHTML=`SONIDO <span>${soundOn?'ON':'OFF'}</span>`;if(soundOn){bgAudio=new Audio(AUDIO.fondo);bgAudio.loop=true;bgAudio.volume=.14;bgAudio.play().catch(()=>{})}else if(bgAudio){bgAudio.pause();bgAudio=null}};
document.getElementById('restartFromFinal').onclick=()=>{if(bgAudio){bgAudio.pause();bgAudio.currentTime=0}soundOn=false;bgAudio=null;document.getElementById('soundBtn').innerHTML='SONIDO <span>OFF</span>';visited.clear();qIndex=0;score=0;updateProgress();document.getElementById('final').classList.add('hidden');document.getElementById('topbar').classList.add('hidden');document.getElementById('app').classList.add('hidden');document.getElementById('cover').classList.remove('hidden');window.scrollTo({top:0,behavior:'smooth'})};
