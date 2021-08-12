let seuVotoPara = document.querySelector('.info-1 span');
let cargo = document.querySelector('.info-2 span');
let descricao = document.querySelector('.info-4');
let aviso = document.querySelector('.d-2');
let lateral = document.querySelector('.foto');
let numeros = document.querySelector('.info-3');


let etapaAtual = 0;

let numero = '';
let votobranco = false;
let votos = [];

function comecarEtapa() {
    let etapa = etapas[etapaAtual];

    let numeroHtml = '';
        numero = '';
        votobranco = false;

    for(let i=0;i<etapa.numeros;i++) {
        if(i === 0) {
            numeroHtml +='<div class="numero pisca"></div>';
        } else {
            numeroHtml +='<div class="numero"></div>';
        }
        
    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;
}

    function atualizainterface() {
        let etapa = etapas[etapaAtual];
        let candidato = etapa.candidatos.filter((item)=>{
            if(item.numero === numero) {
                return true;
            } else {
                return false;
            }
        });
        if (candidato.length > 0) {
            candidato = candidato[0];
            seuVotoPara.style.display = 'block'
            descricao.innerHTML = `nome: ${candidato.nome}<br/>partido: ${candidato.partido}`;
            aviso.style.display = 'block';

            let fotosHtml = '';
            for(let i in candidato.fotos) {
                if(candidato.fotos[i].smmall){
                    fotosHtml += `<div class="foto1 small"><img src="asses/image/${candidato.fotos[i].url}" alt="" />${candidato.fotos[i].legenda}</div>`;
                } else {
                    fotosHtml += `<div class="foto1"><img src="asses/image/${candidato.fotos[i].url}" alt="" />${candidato.fotos[i].legenda}</div>`;
                }
                
            }

            lateral.innerHTML = fotosHtml;
        } else {
            seuVotoPara.style.display = 'block'
            aviso.style.display = 'block';
            descricao.innerHTML = '<div class="aviso--grande pisca">VOTO NULO</div>';
        }
        
}

    function clicou(n) {
        let elnumero = document.querySelector('.numero.pisca');
        if(elnumero !==null) {
            elnumero.innerHTML = n;
            numero =`${numero}${n}`;

            elnumero.classList.remove('pisca');
            if(elnumero.nextElementSibling !== null) {
                elnumero.nextElementSibling.classList.add('pisca');
            } else {
                atualizainterface();
            }
            

        }

    }
    function branco() {
        if(numero === '') {
            votobranco = true;
            seuVotoPara.style.display = 'block'
            aviso.style.display = 'block';
            numeros.innerHTML = '';
            descricao.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO</div>';
        } else {
            alert("Para votar em branco nao pode ter digitado nenhum numero");
        }
    }
    function corrige() {
        comecarEtapa();
    }
    function confirma() {
        let etapa = etapas[etapaAtual];

        let votoConfirmado = false;

        if(votobranco === true) {
            votoConfirmado = true;
            votos.push({
                etapa: etapas[etapaAtual].titulo,
                voto: 'branco'
            });
            
        } else if(numero.length === etapa.numeros) {
           votoConfirmado = true;
           votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        });
           

        }
        if(votoConfirmado) {
            etapaAtual++;
            if(etapas[etapaAtual] !== undefined) {
                comecarEtapa();
            } else {
                document.querySelector('.tela').innerHTML = '<div class="aviso--gigante pisca">FIM</div>';
                console.log(votos);
            }
        }
    }
    comecarEtapa();
