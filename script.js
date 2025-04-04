const promtbtn=document.querySelector(".promt-button");
const promtinput=document.querySelector(".promt-input");
const promtform=document.querySelector(".promt-form");
const modelselect=document.getElementById("modelselect");
const countselect=document.getElementById("countselect");
const ratioselect=document.getElementById("ratioselect");
const gridgallery=document.querySelector(".gallery-grid");


const examplepromt=[
"A futuristic city floating in the clouds, with neon lights and flying cars, cyberpunk style.",
"A mystical forest glowing with bioluminescent plants and fairies under a starry night sky.",
"A steampunk pirate airship sailing through a stormy sky with giant mechanical wings.",
"An ancient library hidden inside a giant tree, with magical books floating in mid-air.",
"A lone astronaut standing on an alien planet, gazing at a double sunset.",
"A post-apocalyptic wasteland with abandoned ruins and a lone robot walking through the sand.",
"A surreal dreamscape where giant fish swim through the sky above a floating village.",
"A cybernetic samurai with glowing red armor standing in a rain-soaked neon alley.",
"A cozy cottage in the middle of an enchanted autumn forest, with a warm fireplace inside.",
"A massive dragon made of constellations flying across a twilight sky."
];
const getimagedime=(aspectratio)=>{

}
const generateimage=async(selsectedmodel,imagecount,aspectratio,promttext)=>{

getimagedime(aspectratio);
try{
    const response= await fetch(modelurl,{
        headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
            inputs:promttext,
            parameters:{width,height},
            options:{wait_for_model:true,user_cache:false},
        }),
    });
    const result = await response.blob();
}catch(error){
console.log(error)
}

}
const createimagecard=(selsectedmodel,imagecount,aspectratio,promttext)=>{
    gridgallery.innerHTML="";
for(let i=0;i<imagecount;i++){
gridgallery.innerHTML+=` <div class="image-card loading" id="image-card-${i}" style="aspect-ratio:${aspectratio}">
                        <div class="status-container">
                            <div class="sppiner"></div>
                            <i class="fa-solid fa-triangle-exclamation"></i>
                            <p class="status-text">Genarating...</p>
                        </div>
                        <img src="test.png"class="result-image">
                    </div>`;
}
generateimage(selsectedmodel,imagecount,aspectratio,promttext);
}
const handleFromSubmit=(e)=>{
    e.preventDefault();

    const selsectedmodel=modelselect.value;
    const imagecount=parseInt(countselect.value) ||1;
    const aspectratio=ratioselect.value || "1/1";
    const promttext=promtinput.value.trim();

    createimagecard(selsectedmodel,imagecount,aspectratio,promttext);

}
promtbtn.addEventListener("click",()=>{
    const promt=examplepromt[Math.floor(Math.random()*examplepromt.length)];
    promtinput.value=promt;
    promtinput.focus();
});

promtform.addEventListener("submit",handleFromSubmit)