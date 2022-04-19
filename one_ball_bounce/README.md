# 공튀기기

## canvas

canvas API는 javascrip와 HTML `<canvas>` 엘리먼트를 통해 그래픽을 그리기 위한 수단을 제공
애니메이션, 게임 그래픽, 데이터 시각화, 사진 조작 및 실시간 비디오 처리를 위해 사용

canvas API는 주로 2D 그래픽에 중점을 두고 있다

## 공튀기기 원리

- x,y : 공의 위치 값
- r : 공의 반지름
- vx ,vy : 공의 속도 ( x, y값에 +할 변수)
- minX, maxX : canvas width의 시작과 끝
- minY, maxY : canvas height의 시작과 끝
  x,y 공의 중심점을 기준으로 vx,vy 변수로 더해가면서 canvas 영역에서 움직이도록 만든다
  minX, maxX, minY, maxY로 공이 충돌했을때를 판단해서 -1 을 곱해주면 공의 기존 방향을 반대로 보낼 수 있다

<img width="994" alt="스크린샷 2022-04-18 오후 8 04 05" src="https://user-images.githubusercontent.com/83868259/163799621-ee723069-781f-4ad6-85a7-726d9e7c19f4.png">

## app.js

```
class App {
  constructor() {
    this.canvas = document.querySelector('canvas')
    this.ctx = this.canvas.getContext('2d')

    this.stageWidth = 1000;
    this.stageHeight = 500;

    this.canvas.width = this.stageWidth;
    this.canvas.height = this.stageHeight;

    window.requestAnimationFrame(this.animate)
  }

  animate = () => {
    window.requestAnimationFrame(this.animate)
  }

}

window.onload = () => {
  new App();
}
```

- canvas 객체를 선택한다
- 선택한 canvas 객체를 getContext() 함수로 그리기(2d) 컨텍스트를 지정해 준다
- width와 height를 지정해 준다
- 지정한 width,height로 canvas의 width,height를 설정해준다
- 공을 움직이기 위해 window.requestAnimationFrame(this.animate)로 설정해주고 animate()함수를 만들어주도록 한다
- **animate 메서드는 최대 1ms(1/1000s)로 제한되며 1초에 60번을 동작하게 된다**

# ball.js

```
export class Ball {
  constructor(stageWidth, stageHeight, radius, speed) {

    // 원의 반지름
    this.radius = radius

    // x, y축으로 얼마나 이동할 것인가, 속도
    this.vx = speed;
    this.vy = speed;

    // 원의 크기
    const diameter = this.radius * 2;

    //draw 공의 시작지점 정하는 x,y 값
    // this.x = (Math.floor(Math.random() * (stageWidth - (diameter * 2))) + diameter)
    // this.y = (Math.floor(Math.random() * (stageHeight - (diameter * 2))) + diameter)

    //draw 공의 시작지점 정하는 x,y 값
    this.x = Math.random() * (stageWidth - (diameter))
    this.y = Math.random() * (stageHeight - (diameter))
  }

  draw(ctx, stageWidth, stageHeight) {
    this.x = this.x + this.vx;
    this.y = this.y + this.vy;

    ctx.fillstyle = '#DDA13E'

    this.bounce(stageWidth, stageHeight);

    ctx.beginPath(); // 새로운 경로를 만든다
    ctx.arc(this.x, this.y, this.rodius, 0, 2 * Math.PI); // 원을 그린다
    ctx.fill(); // 채운다
  }

  bounce(stageWidth, stageHeight) {
    this.minX = this.radius;
    this.minY = this.radius;
    this.maxX = stageWidth - this.radius;
    this.maxY = stageHeight - this.radius;

    if (this.x <= this.minX || this.x >= this.maxX) {
      this.vx = this.vx * -1;
      this.x = this.x + this.vx;
    } else if (this.y <= this.minY || this.y >= this.maxY) {
      this.vy = this.vy * -1;
      this.y = this.y + this.vy
    }
  }
}
```

- Ball 클래스에서 생성자로 stageWidth, stageheight,radius,speed의 매개변수를 받는다
  볼의 충돌여부와 공을 만들고, 공의 속도를 조절하려면 필요한 값
- 지름을 구하는 diameter 변수가 필요한 이유는 이후 draw() 함수에서 공의 시작점을 랜덤으로 설정해야 하는데 공의 중심점인 x,y 의 값이 화면 밖에서부터 시작하는 것을 방지하기 위해서다
- draw(ctx, stageWidth, stageHeight)
  - draw함수는 app.js에서 전달인자(argument)로 ctx,stageWidth, stageheight 보낸 값을 매개변수(parameter)로 받는다
  - this.x,y 에는 Ball 객체를 생성할 때 원의 위치를 랜덤으로 지정한 x,y 값이 들어있고 vx,vy를 더해감으로서 원이 움직이게 된다
- ctx.fillStyle : 원의 색을 지정
- this.bounce(stageWidth, stageHeight)
  - 벽에 충돌하는 것을 판단할 함수
  - min은 당연히 원의 반지름보다 커야 원이 정상적으로 화면 안에서 튕기게 보인다
  - max는 canvas의 width 이지만 마찬가지로 원이 정상적으로 화면 안에서 튕기게 보이려면 원의 반지름을 빼줘야한다
  - vx,vy는 각각 원의 중심축인 x,y축에 더해지면서 공이 움직이도록 보인다
    여기서 -1값을 곱셈하면 원래 진행하던(x,y 포함) 반대방향으로 공이 진행하게 된다
