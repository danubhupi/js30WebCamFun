const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');


 function getsVideo(){ 
    // console.log(video.attributes);
     navigator.mediaDevices.getUserMedia({audio:false,video:true})
     .then(mediastream =>{
        video.srcObject= mediastream;
        video.play();

     }).catch(error=> console.log(error));

    
    
    // video.src = window.URL.createObjectURL(mediastream);
    
    // console.log(video.clientWidth);
}

pasteToCanvas=()=>{
    
     const width=video.videoWidth;
     const height=video.videoHeight;
    // console.log(pixels);
    //  getSnap();

     return setInterval(()=>{
         canvas.width=width;
         canvas.height=height;
    ctx.drawImage(video,0,0,width,height);

    let pixels=ctx.getImageData(0,0,width,height);


    // pixels=redShift(pixels);
    pixels=rgbSplit(pixels);
    ctx.putImageData(pixels,0,0);
    
     },20);
   
    
}

getSnap=()=>{
    snap.currentTime=0;
    snap.play();
    // const width=video.videoWidth;
    //  const height=video.videoHeight;
    // console.log(ctx.getImageData(0,0,width,height));
    let link=document.createElement('a');
    link.setAttribute('download','DanuDoes');
   
    let img=document.createElement('img');
    src=canvas.toDataURL('image/jpeg');
    link.setAttribute('href',`${src}`);
    img.src=src;
    link.appendChild(img);
    strip.appendChild(link);
}


redShift=(pixels)=>{
   
    for(let i=0;i<pixels.data.length;i+=4){
        pixels.data[i + 0]=pixels.data[i + 0] +255 ;
        pixels.data[i + 1]=pixels.data[i + 1]+0;
        pixels.data[i + 2]=pixels.data[i + 2]+0;
        // pixels.data[i + 3]=pixels.data[i + 3]+0.1;
        }
    return pixels;

}



rgbSplit=(pixels)=>{
    for(let i=0;i<pixels.data.length;i+=4){
        pixels.data[i -100]=pixels.data[i +0]  ;
        pixels.data[i - 150]=pixels.data[i+1 ];
        pixels.data[i + 200]=pixels.data[i+2 ];
        // pixels.data[i + 3]=pixels.data[i + 3]+0.1;
        }

return pixels;
}


// setInterval(getsVideo(),1000);
getsVideo();
// setInterval(pasteToCanvas,20);
video.addEventListener('canplay',pasteToCanvas);
// pasteToCanvas();
