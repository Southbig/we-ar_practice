export class Ball {
  constructor(stageWidth, stageHeight, radius, speed) {

    // 원의 반지름
    this.radius = radius;

    // x, y축으로 얼마나 이동할 것인가, 속도
    this.vx = speed;
    this.vy = speed;

    // 원의 크기
    const diameter = this.radius * 2;

    //draw 공의 시작지점 정하는 x,y 값
    this.x = Math.random() * (stageWidth - (diameter))
    this.y = Math.random() * (stageHeight - (diameter))
  }

  draw(ctx, stageWidth, stageHeight) {

    this.x += this.vx;
    this.y += this.vy;
    ctx.fillstyle = '#f5f5f5'

    this.bounce(stageWidth, stageHeight);

    ctx.beginPath(); // 새로운 경로를 만든다
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI); // 원을 그린다
    ctx.fill(); // 채운다
  }

  bounce(stageWidth, stageHeight) {
    this.minX = this.radius;
    this.minY = this.radius;
    this.maxX = stageWidth - this.radius;
    this.maxY = stageHeight - this.radius;

    // if (this.x <= this.minX || this.x >= this.maxX) {
    //   this.vx = this.vx * -1;
    //   this.x = this.x + this.vx;
    // } else if (this.y <= this.minY || this.y >= this.maxY) {
    //   this.vy = this.vy * -1;
    //   this.y = this.y + this.vy
    // }
    if (this.x <= this.minX || this.x >= this.maxX) {
      this.vx *= -1;
      this.x += this.vx;
    } else if (this.y <= this.minY || this.y >= this.maxY) {
      this.vy *= -1;
      this.y += this.vy;
    }
  }
}
