# Game Assets Directory

This folder contains all game assets (sprites, animations, sounds, etc.)

## Folder Structure

```
public/game/assets/
├── player/          # Player sprites and animations
│   ├── idle/        # Idle animation frames
│   ├── walk/         # Walking animation frames
│   ├── run/         # Running animation frames
│   └── attack/      # Attack animation frames
├── sprites/         # Other game sprites (NPCs, items, etc.)
├── animations/      # General animations
├── tiles/           # Tile sprites for maps
└── sounds/          # Sound effects and music
```

## How to Use

Assets in the `public` folder are accessible via URL:
- `/game/assets/player/idle/frame1.png`
- `/game/assets/player/walk/frame1.png`

In Phaser, load them using:
```typescript
this.load.image('player-idle', '/game/assets/player/idle/frame1.png');
this.load.spritesheet('player-walk', '/game/assets/player/walk/spritesheet.png', {
  frameWidth: 32,
  frameHeight: 32
});
```

