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
