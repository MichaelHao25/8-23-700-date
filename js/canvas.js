// // draw functions :
function clear() { // clear canvas function
    
}
// 绘制圆环
function drawCircle(ctx, params, radius, coord){
  ctx.beginPath();
  ctx.lineCap = params.lineCap;
  ctx.strokeStyle = params.color;
  ctx.lineWidth = params.lineWidth;
  ctx.arc(coord.x, coord.y, radius, params.startAng, params.endAng, false);
  ctx.stroke();
  ctx.closePath()
}
// // 绘制文字
function fillText(ctx, params){
    ctx.save();
    ctx.font = params.font;
    ctx.fillStyle = params.fillStyle;
    ctx.textBaseline = params.textBaseline;
    ctx.textAlign = params.textAlign;
    ctx.fillText(params.text, params.location.x, params.location.y);
    ctx.restore();
  
}
  
function calcuPos(width, per, i){
  var x = width/2,y=30, //起始点坐标
  a = width/2,b= width/2,//圆心坐标
  addx =0,
  addy = 0,
  sum = 0;

  per.forEach(function(val, index){
    if(index<i){
      sum+=val;
    } else if(index==i){
      sum+=val/2;
    } 
  });
  if(sum >0 && sum<=0.25){
    addx+=10;
    addy-=10;
  } else if(sum>0.25 && sum<=0.5){
    addx+=10;addy+=10;
  }else if(sum>0.5 && sum<=0.75){
    addx-=10;addy+=10;
  }else if(sum>0.75 && sum<=1){
    addx-=10;addy-=10;
  }

  return {
   x: (x-a)*Math.cos(sum * 2*Math.PI) - (y-b)*Math.sin(sum * 2*Math.PI) + a + addx,
   y: (y-b)*Math.cos(sum * 2*Math.PI)+(x-a)*Math.sin(sum * 2*Math.PI)+ b + addy
  }
  // return sum;
}

// // 第一个圆环的主绘图函数
function drawScene(params) { // main drawScene function
  var ctx = params.ctx;
    ctx.clearRect(0, 0, params.width, params.height);
      // 绘制圆环
      var circleOption1 = [
        {
          'lineCap': 'round',
          'color': '#f1f3fd',
          lineWidth: 40,
          startAng: 0.75*Math.PI,
          endAng: 2.25*Math.PI,
        },
        {
          lineCap: 'round',
          color: '#84ee96',
          lineWidth: 20,
          startAng: 0.75*Math.PI,
          endAng: Math.PI,
        },
        {
          lineCap: 'butt',
          color: '#84ee96',
          lineWidth: 20,
          startAng: 0.75*Math.PI,
          endAng: (0.75+0.5*1.5)*Math.PI
        },
        {
          lineCap: 'butt',
          color: '#ffc80f',
          lineWidth: 20,
          startAng: (0.75+0.5*1.5)*Math.PI,
          endAng: (0.75+0.8*1.5)*Math.PI
        },
        {
          lineCap: 'butt',
          color: '#fe5253',
          lineWidth: 20,
          startAng: (0.75+0.8*1.5)*Math.PI,
          endAng: 2.25*Math.PI
        },
        {
          lineCap: 'round',
          color: '#fe5253',
          lineWidth: 20,
          startAng: 2*Math.PI,
          endAng: 2.25*Math.PI
        }
      ],
      coord1 = {
        x: params.width/2,
        y: params.height/2
      };
      circleOption1.forEach(function(val){
        drawCircle(ctx, val, params.radius, coord1);
      });
    ctx.save();
    ctx.translate(params.width / 2, params.height / 2);

     // 绘制文字
    var textOption = [{
      font: '65px Arial',
      fillStyle: params.textColor,
      textBaseline: 'middle',
      textAlign: 'center',
      text: params.data,
      location:{
        x: -5,
        y: -20
      }
    },{
      font: '30px Arial',
      fillStyle: params.textColor,
      textBaseline: 'top',
      textAlign: 'right',
      text: '%',
      location:{
        x: 60,
        y: -45
      }
    },{
      font: '20px Arial',
      fillStyle: '#666',
      textBaseline: 'top',
      textAlign: 'center',
      text: '贷款被拒率:'+ params.leverText,
      location:{
        x: 0,
        y: 20
      }
    }];
    textOption.forEach(function(val){
      fillText(ctx, val);
    });
  //   // 绘制指针
    var theta = params.position * Math.PI / 180;
    ctx.rotate(theta);
    ctx.save();
    ctx.lineWidth = 5;
    ctx.lineCap = 'butt';
    ctx.strokeStyle = '#0a77fe';
    ctx.beginPath();
    ctx.moveTo(-(params.radius-10),0);
    ctx.lineTo(-(params.radius+10),0);
    ctx.stroke();
    ctx.restore();

    ctx.save();
    ctx.fillStyle = '#0a77fe';
    ctx.beginPath();
    ctx.moveTo(-(params.radius+20),0);
    ctx.lineTo(-(params.radius+40),-10);
    ctx.lineTo(-(params.radius+40),10);
    ctx.fill();
    ctx.restore();

    ctx.restore();


}
function drawScene2(params){
  var per = params.per,
    width = params.width,
    height = params.height,
    data = params.data,
    especial = params.especial;

  params.ctx.clearRect(0, 0, width, height);
    var circleOption2 = [
      {
        lineCap: 'butt',
        color: '#f6f7fb',
        lineWidth: 50,
        data:100,
        startAng: -0.5*Math.PI,
        endAng: 1.5*Math.PI,
      },
      {
        lineCap: 'butt',
        color: '#3b92ff',
        lineWidth: 30,
        data:data[0],
        startAng: -0.5*Math.PI,
        endAng: (-0.5+per[0]*2)*Math.PI,
      },
      {
        lineCap: 'butt',
        color: '#c8c8c8',
        lineWidth: 30,
        data:data[1],
        startAng:(-0.5+per[0]*2)*Math.PI,
        endAng: (-0.5+(per[0]+per[1])*2)*Math.PI
      },
      {
        lineCap: 'butt',
        color: '#ff495e',
        lineWidth: 30,
        data:data[2],
        startAng: (-0.5+(per[0]+per[1])*2)*Math.PI,
        endAng: (-0.5+(per[0]+per[1]+per[2])*2)*Math.PI
      },
      {
        lineCap: 'butt',
        color: '#872dfe',
        lineWidth: 30,
        data:data[3],
        startAng: (-0.5+(per[0]+per[1]+per[2])*2)*Math.PI,
        endAng: (-0.5+1*2)*Math.PI
      }
    ],
    coord2 = {
      x: width/2,
      y: height/2
    };
    
  // 绘制文字
  var c1 = calcuPos(width, per, 0),
    c2 = calcuPos(width, per, 1),
    c3 = calcuPos(width, per,2),
    c4 = calcuPos(width, per,3);
  var textOption2 = [{
    font: '20px Arial',
    fillStyle: '#fff',
    textBaseline: 'middle',
    textAlign: 'center',
    text:data[0],
    location:{
      x: c1.x,
      y: c1.y
    }
  },{
    font: '20px Arial',
    fillStyle: '#fff',
    textBaseline: 'middle',
    textAlign: 'center',
    text: data[1],
    location:{
      x: c2.x,
      y: c2.y
    }
  },{
    font: '20px Arial',
    fillStyle: '#fff',
    textBaseline: 'middle',
    textAlign: 'center',
    text: data[2],
    location:{
      x: c3.x,
      y: c3.y
    }
  },{
    font: '20px Arial',
    fillStyle: '#fff',
    textBaseline: 'middle',
    textAlign: 'center',
    text: data[3],
    location:{
      x: c4.x,
      y: c4.y
    }
  }];
  var ImagePrefix = 'https://html.51nbapi.com/html/wanghei-new/images/',
  imageList = ['14@3x.png', '15@3x.png', '16@3x.png', '17@3x.png'];
  var imgOptions = [{
    imgSrc: ImagePrefix + '17@3x.png',
    data: data[0],
    position:{
      x: c1.x,
      y: c1.y
    }
  },{
    imgSrc: ImagePrefix + '16@3x.png',
    data: data[1],
    position:{
      x: c2.x,
      y: c2.y
    }
  },{
    imgSrc:ImagePrefix + '15@3x.png',
    data: data[2],
    position:{
      x: c3.x,
      y: c3.y
    }
  },{
    imgSrc:ImagePrefix + '14@3x.png',
    data: data[3],
    position:{
      x: c4.x,
      y: c4.y
    }
  }];
  var imageArr = [],
  i=0,
  imageloader = function(imageUrlArr, callback){
    for (var j = 0, length = imageUrlArr.length; j < length; j++) {
      imageArr[j] = new Image();
      imageArr[j].src = imageUrlArr[j].imgSrc;
      imageArr[j].onload = imageArr[j].onerror = callback;
    }
  };
  // 绘制圆环
    circleOption2.forEach(function(val,index,arr){
      drawCircle(params.ctx, val, params.radius, coord2);
    });
  // 绘制图片
  imageloader(imgOptions, function(){
    i++;
    if(i === 4){
      for(var k=0;k<4;k++){
        if(!especial || (especial && imgOptions[k].data!=0)){
          params.ctx.drawImage(imageArr[k],imgOptions[k].position.x-25,imgOptions[k].position.y-22, 50, 50);
        }
      }
      // 绘制文字
      textOption2.forEach(function(val){
        if(!especial || (especial && val.text!=0)){
          fillText(params.ctx, val);
        }
      });
    }
  });
  // 特殊绘制
  if(params.especial){
    var es = circleOption2.filter(function(val){
      return val.data==0
    });
    es.forEach(function(val,index,arr){
      val.startAng = -0.5*Math.PI+index*0.05;
      val.endAng = -0.5*Math.PI+index*0.05+0.05;
      drawCircle(params.ctx, val, params.radius, coord2);
    });
  }
  
}

