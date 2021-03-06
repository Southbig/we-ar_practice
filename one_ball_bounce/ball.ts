export class Ball {
  radius: number;
  vx: number;
  vy: number;
  x: number;
  y: number;
  minX:number;
  minY:number;
  maxX:number;
  maxY:number;
  constructor(stageWidth: number, stageHeight: number, radius: number, speed: number) {

    // 원의 반지름
    this.radius = radius;

    // x, y축으로 얼마나 이동할 것인가, 속도
    this.vx = speed;
    this.vy = speed;

    // 원의 크기
    const diameter:number = this.radius * 2;

    //draw 공의 시작지점 정하는 x,y 값
    this.x = Math.random() * (stageWidth - (diameter))
    this.y = Math.random() * (stageHeight - (diameter))
  }

  vector(): number {
    return Math.sqrt(this.vx * this.vx + this.vy * this.vy);
  }

  theta(): number {
    return Math.atan2(this.vy, this.vx);
  }

  update(vx: number, vy: number) {
    this.vx = vx;
    this.vy = vy;
  }

  draw(ctx: CanvasRenderingContext2D, stageWidth: number, stageHeight: number) {

    this.x += this.vx;
    this.y += this.vy;
    // ctx.fillstyle = '#f5f5f5'
    ctx.fillStyle =  '#f5f5f5'

    this.bounce(stageWidth, stageHeight);
    // this.check()

    ctx.beginPath(); // 새로운 경로를 만든다
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI); // 원을 그린다
    ctx.fill(); // 채운다
  }

  bounce(stageWidth: number, stageHeight: number) {
    this.minX = this.radius;
    this.minY = this.radius;
    this.maxX = stageWidth - this.radius;
    this.maxY = stageHeight - this.radius;


    if (this.x <= this.minX || this.x >= this.maxX) {
      this.vx *= -1;
      this.x += this.vx;
    } else if (this.y <= this.minY || this.y >= this.maxY) {
      this.vy *= -1;
      this.y += this.vy;
    }
  }
}
