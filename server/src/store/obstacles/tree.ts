import { world } from "../..";
import { CircleHitbox } from "../../types/math";
import { Obstacle } from "../../types/obstacle";
import { randomBetween } from "../../utils";

export default class Tree extends Obstacle {
	type = "tree";

	constructor() {
		const salt = randomBetween(0.9, 1.1);
		super(world, new CircleHitbox(1.5).scaleAll(salt), new CircleHitbox(0.8).scaleAll(salt), 180, 180);
		while (world.terrainAtPos(this.position).id != "plain" || world.obstacles.find(obstacle => obstacle.collided(this))) this.position = world.size.scale(Math.random(), Math.random());
	}
	
	damage(dmg: number) {
		super.damage(dmg);
		world.onceSounds.push({ path: `obstacle/hit/wood/wood_hit_01.mp3`, position: this.position });
	}

	die() {
		super.die();
		world.onceSounds.push({ path: "obstacle/break/tree/tree_break.mp3", position: this.position });
	}
}