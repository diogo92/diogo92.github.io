Phaser.World.prototype.wrap = function (sprite, padding, useBounds, horizontal, vertical) {

    if (padding === undefined) { padding = 0; }
    if (useBounds === undefined) { useBounds = false; }
    if (horizontal === undefined) { horizontal = true; }
    if (vertical === undefined) { vertical = true; }

    if (!useBounds)
    {
        if (horizontal && sprite.world.x + padding < this.bounds.x)
        {
            sprite.x = (sprite.x / sprite.world.x) * (this.bounds.right + padding);
        }
        else if (horizontal && sprite.world.x - padding > this.bounds.right)
        {
            sprite.x = (sprite.x / sprite.world.x) * (this.bounds.left - padding);
        }

        if (vertical && sprite.world.y + padding < this.bounds.top)
        {
            sprite.y = (sprite.y / sprite.world.y) * (this.bounds.bottom + padding);
        }
        else if (vertical && sprite.world.y - padding > this.bounds.bottom)
        {
            sprite.y = (sprite.y / sprite.world.y) * (this.bounds.top - padding);
        }
    }
    else
    {
        sprite.getBounds();

        if (horizontal)
        {
            if ((sprite.world.x + sprite._currentBounds.width) < this.bounds.x)
            {
                sprite.x = (sprite.x / sprite.world.x) * this.bounds.right;
            }
            else if (sprite.world.x > this.bounds.right)
            {
                sprite.x = (sprite.x / sprite.world.x) * this.bounds.left;
            }
        }

        if (vertical)
        {
            if ((sprite.world.y + sprite._currentBounds.height) < this.bounds.top)
            {
                sprite.y = (sprite.y / sprite.world.y) * this.bounds.bottom;
            }
            else if (sprite.world.y > this.bounds.bottom)
            {
                sprite.y = (sprite.y / sprite.world.y) * this.bounds.top;
            }
        }
    }

};