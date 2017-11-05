import "./style.scss"

const _FACE = document.querySelector('rect');
const _MOUTH = document.querySelector('path');
const RMAX = .5*_FACE.getAttribute('width');
const DATA = _MOUTH.getAttribute('d').slice(1).replace(/C|M/g, '').split(/\s+/).map(c => +c);
const CPY_INI = DATA[3];
const CPY_RANGE = 2*(DATA[1] - DATA[3]);
const NF = 32;
// console.log(_FACE, RMAX);

let f=0, dir = -1, rID = null;

function update(){
  f += dir;
  let k = f/NF;
  let cpy = CPY_INI + k*CPY_RANGE;
  _FACE.setAttribute('rx', k*RMAX);
  _MOUTH.setAttribute(
    'd', 
    `M${DATA.slice(0,2)}
    C${DATA[2]} ${cpy}
      ${DATA[4]} ${cpy}
      ${DATA.slice(-2)}`
  );

  if(!(f%NF)){
    cancelAnimationFrame(rID);
    rID = null;
    return;
  }
  rID = requestAnimationFrame(update)
};

addEventListener('click', e => {
  if(!rID)
    dir *= -1;
    update();
})



