import { drawPlayer } from "../scenes/draws.mjs";
import { GameObject } from "./GameObject.mjs";
import { GameConfig } from "./GameConfig.mjs";

export class Player extends GameObject {
  constructor(
    x,
    y,
    width,
    height,
    color,
    velocity,
    isJumping = false,
    jumpPower,
    jumpCounter = 0,
    lives = 3
  ) {
    super(x, y, width, height, color);
    this.velocity = velocity;

    // Jump properties
    this.isJumping = isJumping;
    this.jumpPower = jumpPower || GameConfig.PLAYER.JUMP_POWER;
    this.jumpCounter = jumpCounter;
    this.maxJumpFrames = 15;
    this.isGrounded = false;
    this.coyoteTime = 0;
    this.maxCoyoteTime = 6; // frames
    this.jumpBuffer = 0;
    this.maxJumpBuffer = 8; // frames

    // Game properties
    this.lives = lives || GameConfig.PLAYER.LIVES;
    this.maxLives = 5;
    this.invulnerable = false;
    this.invulnerabilityTime = 0;
    this.maxInvulnerabilityTime = 120; // frames (2 seconds at 60fps)

    // Abilities
    this.abilities = {
      doubleJump: false,
      wallJump: false,
      dash: false,
    };
  }

  resetPosition() {
    this.x = 0;
    this.y = 0;
  }

  /**
   * Make the player jump
   */
  jump() {
    this.velocityY = -this.jumpPower;
    this.isJumping = true;
    this.jumpCounter = 0;
    this.isGrounded = false;
  }

  draw() {
    drawPlayer(this.x, this.y);
    // stroke(0);
    // strokeWeight(2);
    // fill(this.color);
    // rect(this.x, this.y, this.width, this.height);
    // image(mario, player.x, player.y, player.width, player.height);
  }

  /**
   * Add a life
   */
  addLife() {
    if (this.lives < this.maxLives) {
      this.lives++;
    }
  }
}
