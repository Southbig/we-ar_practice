import { Ball } from './ball.js';


class App {
  constructor() {
    this.canvas = document.querySelector('canvas')
    this.ctx = this.canvas.getContext('2d')

    // this.stageWidth = 1000;
    // this.stageHeight = 500;

    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth;
    this.canvas.height = this.stageHeight;

    // this.ball = new Ball(this.stageWidth, this.stageHeight, 15, 10);
    this.balls = [];

    // 공만들기
    for (let i = 0; i < 20; i++) {
      this.ball = new Ball(this.stageWidth, this.stageHeight, Math.random() * i + 15, Math.random() * Math.sqrt(i) + 5);
      this.balls.push(this.ball)
    }

    window.requestAnimationFrame(this.animate)

  }



  animate = () => {
    window.requestAnimationFrame(this.animate);
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    // 공 시작지점
    // for (let i = 0; i < 20; i++) {
    //   this.balls[i].draw(this.ctx, this.stageWidth, this.stageHeight);
    // }
    for (let i = 0; i < this.balls.length; i++) {
      const ball_1 = this.balls[i];

      for (let j = 0; j < this.balls.length; j++) {
        const ball_2 = this.balls[j];

        if (i !== j) {
          const d = Math.sqrt(
            Math.pow(ball_1.x - ball_2.x, 2) + Math.pow(ball_1.y - ball_2.y, 2)
          );
          if (d <= ball_1.radius + ball_2.radius) {
            const r = Math.atan2(ball_1.y - ball_2.y, ball_1.x - ball_2.x);

            const m1 = 5
            const m2 = 5

            const v1 = ball_1.vector();
            const v2 = ball_2.vector();

            const t1 = ball_1.theta();
            const t2 = ball_2.theta();

            const x =
              (v1 * Math.cos(t1 - r) * (m1 - m2) +
                (2 * m2 * v2 * Math.cos(t2 - r)) / (m1 + m2)) *
              Math.cos(r) +
              v1 * Math.sin(t1 - r) * Math.cos(r + Math.PI / 2);

            const y =
              (v1 * Math.cos(t1 - r) * (m1 - m2) +
                (2 * m2 * v2 * Math.cos(t2 - r)) / (m1 + m2)) *
              Math.sin(r) +
              v1 * Math.sin(t1 - r) * Math.sin(r + Math.PI / 2);

            const x_ =
              (v2 * Math.cos(t2 - r) * (m2 - m1) +
                (2 * m1 * v1 * Math.cos(t1 - r)) / (m2 + m1)) *
              Math.cos(r) +
              v2 * Math.sin(t2 - r) * Math.cos(r + Math.PI / 2);

            const y_ =
              (v2 * Math.cos(t2 - r) * (m2 - m1) +
                (2 * m1 * v1 * Math.cos(t1 - r)) / (m2 + m1)) *
              Math.sin(r) +
              v2 * Math.sin(t2 - r) * Math.sin(r + Math.PI / 2);

            ball_1.update(x, y);
            ball_2.update(x_, y_);
          }
        }
      }
      this.balls[i].draw(this.ctx, this.stageWidth, this.stageHeight);
    }
  }

}


window.onload = () => {
  new App();
}
