/*
    동적으로 DOM 생성하는법
    부모요소.innerHTML = "집어넣을 태그를 문자열 형태로 만듬";
    --> 기존 부모안쪽의 자식요소를 모두 제거하고 새로 생성

    부모요소.append(DOM node);
    --> 인수로 생성할 태그의 문자열이 아닌 노드를 생성해서 삽입

    새로운 DOM노드 생성방법
    document.creatElement('dom이름')

*/

const main = document.querySelector('main');
const loading = document.querySelector('aside');
const logo = document.querySelector('p img');

for(let i=0; i<200; i++){
    const imgNode = document.createElement('img');
    imgNode.setAttribute('src', `img/pic${i}.jpg`);
    main.append(imgNode);
}

imageLoaded();

window.addEventListener('mousemove', e=>{
    let x = e.pageX;
    let y = e.pageY;
    let cx = -x/10;
    let cy = -y/10;

    logo.style.transform = `translate(${cx}px, ${cy}px)`;

    let wid = window.innerWidth;    //브라우저 위치값
    let percent = parseInt((x/wid)*200);
    const imgs = document.querySelectorAll('main img');

    for(let img of imgs) img.style.display = 'none';
    imgs[percent].style.display = 'block';

})

function imageLoaded(){
    const imgs = document.querySelectorAll('img');
    const len = imgs.length;    //img 총 갯수
    let total = 0;
    let percent = 0;

    imgs.forEach((img, index)=>{
        img.addEventListener('load', ()=>{
            total++;
            percent = parseInt((total/len)*100);
            loading.innerText = `${total} / ${len} (${percent}%)`;
                            // = total + '/' + len; 
            if(total === len){
                main.classList.add('on');
                loading.classList.add('off');

                setTimeout(()=>{
                    loading.remove();
                },convertSpeed(loading));        // transition을 2.5초 줬기때문.
            } 
        })
    })
}

function convertSpeed(el){
    let speed = getComputedStyle(el).transitionDuration;
    speed = parseFloat(speed)*1000;
    return speed;
}



/*
let tags = '';
for(let i=0; i<200; i++){
    tags += `<img src='img/pic${i}.jpg' />`
}
//console.log(tags);
main.innerHTML = tags;
*/