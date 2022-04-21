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

# 공여러개 만들기

```
    this.balls = [];
    for (let i = 0; i < 20; i++) {
      this.ball = new Ball(this.stageWidth, this.stageHeight, Math.random() * i + 15, Math.random() * i + 10);
      this.balls.push(this.ball)
    }
```

```
  animate = () => {
    window.requestAnimationFrame(this.animate);
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    for (let i = 0; i < 20; i++) {
      this.balls[i].draw(this.ctx, this.stageWidth, this.stageHeight);
    }
  }
```

공 하나의 생성과정을 배열에 담아 만들고,
다시 반복문으로 각각의 공의 위치와 공의 속도를 투여하여 생성해 준다

# 공끼리 충돌

이동하는 두개의 공은 충돌하게 된다

<img width="830" alt="스크린샷 2022-04-21 오후 3 16 33" src="https://user-images.githubusercontent.com/83868259/164434557-8873d4dd-6f47-4e0b-9133-66d4745a8581.png">


충돌 조건은 `r1 + r2 < D1` 이다


<img width="390" alt="스크린샷 2022-04-21 오후 3 19 23" src="https://user-images.githubusercontent.com/83868259/164434614-00cf8a4a-a560-4384-9f91-0caa778e1bb9.png">


충돌의 여부는 두 물체의 반지름 값을 합한 수치가 두 물체의 중심점 좌표간의 거리보다 작으면 충돌로 인식한다

![스크린샷 2022-04-21 오후 3 22 47](https://user-images.githubusercontent.com/83868259/164434664-961fdc65-b072-4159-81a8-2f7c94ca9a45.png)


충돌이 발생했을때 M(질량변수)과 V(가속도 변수) 그리고 COR(반발계수)를 이용하여 반사각 계산 알고리즘이 실행된다

## 충돌시 발생 문제

![스크린샷 2022-04-21 오후 3 23 07](https://user-images.githubusercontent.com/83868259/164434715-1d7d23c9-d1b2-43a2-a9a4-7690b54664e8.png)


반복문으로 진행된다면 한 개의 물체씩 충돌 연산을 진행하게 된다

즉, 각각의 물체마다 반목문을 통해서 각각의 충돌여부 감지와 충돌 연산이 들어가는데 이 연산은 두개의 물체에 대해서는 문제없이 동작한다

3개 이상일때 문제가 발생한다,
3개 이상의 물체가 동시에 충돌 할 때 이미 각각의 물체들은 충돌 한 하나의 물체에 대해서만 충돌계산을 하고 그 이후 간섭되는 힘에 대해서는 계산을 하지 않는다

![스크린샷 2022-04-21 오후 3 23 34](https://user-images.githubusercontent.com/83868259/164434751-a3896c38-a7a1-4d23-951f-da7b52261b37.png)


3개 이상의 물체가 충돌시 해결 점은,
**g1은 g2와의 충돌 연산을 마치고 g3와의 충돌을 감지하여 방금전의 속도에 간섭을 발생시켜야 한다**

g1은 g2와의 충돌만을 g2는 g1과의 충돌만을 계산했기 때문에 반사되는 각도는 정확하지 않고 심지어 물체가 겹치게 되는 문제가 있다

## 참고

[Elastic collision](https://en.wikipedia.org/wiki/Elastic_collision) </br>
[n-body problem](https://en.wikipedia.org/wiki/N-body_problem)
