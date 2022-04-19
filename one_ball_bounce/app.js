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
    for (let i = 0; i < 20; i++) {
      this.ball = new Ball(this.stageWidth, this.stageHeight, Math.random() * i + 15, Math.random() * i + 10);
      this.balls.push(this.ball)
    }


    window.requestAnimationFrame(this.animate)
  }

  animate = () => {
    window.requestAnimationFrame(this.animate);
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    for (let i = 0; i < 20; i++) {
      this.balls[i].draw(this.ctx, this.stageWidth, this.stageHeight);
    }
    // this.ball.draw(this.ctx, this.stageWidth, this.stageHeight);
  }

}

window.onload = () => {
  new App();
}
