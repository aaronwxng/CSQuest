# CSQuest - Educational Coding RPG Game

A top-down multiplayer RPG-style educational game built with Phaser 3, teaching people how to code (similar to Prodigy Math Game).

## Features

- 🎮 **Top-down RPG gameplay** with smooth movement and physics
- ⚛️ **React UI** for menus, HUD, and game overlays
- 🌐 **Multiplayer support** using Socket.io for real-time player interactions
- 💻 **Integrated code editor** with Monaco Editor for coding challenges
- 📚 **Educational coding challenges** with test cases and rewards
- 👥 **Player management** system with usernames and player states
- 🏗️ **Modular architecture** ready for expansion

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

Install all dependencies:

```bash
npm install
```

### Development

Start both the client and server concurrently:

```bash
npm run dev
```

This will start:
- **Client (Vite)**: `http://localhost:3000` - The game frontend
- **Server (Express + Socket.io)**: `http://localhost:3001` - The multiplayer backend

You can also run them separately:
```bash
npm run dev:client  # Client only
npm run dev:server  # Server only
```

### Building for Production

Build the client:
```bash
npm run build
```

Build the server:
```bash
npm run build:server
```

The built files will be in the `dist` directory.

## Project Structure

```
phaser-coding-game/
├── src/
│   ├── scenes/
│   │   └── GameScene.ts          # Main game scene
│   ├── entities/
│   │   └── Player.ts             # Player entity class
│   ├── managers/
│   │   ├── NetworkManager.ts     # Socket.io client manager
│   │   └── PlayerManager.ts      # Player state management
│   ├── ui/
│   │   └── CodeEditor.ts         # Monaco Editor wrapper
│   ├── educational/
│   │   └── ChallengeManager.ts   # Coding challenges system
│   ├── types/
│   │   └── GameTypes.ts          # TypeScript type definitions
│   └── main.tsx                  # Game entry point
├── server/
│   └── index.ts                  # Express + Socket.io server
├── index.html                    # HTML entry point
├── vite.config.ts               # Vite configuration
├── tsconfig.json                # TypeScript configuration (client)
├── tsconfig.server.json         # TypeScript configuration (server)
└── package.json                 # Project dependencies
```

## Current Features

- ✅ Basic top-down movement (WASD or Arrow Keys)
- ✅ React UI components (HUD, Menu, Challenge Panel)
- ✅ Multiplayer support with real-time player synchronization
- ✅ Player management with usernames and colors
- ✅ NetworkManager for handling Socket.io connections
- ✅ Code editor integration (Monaco Editor)
- ✅ Challenge system with test runner
- ✅ Type-safe TypeScript architecture
- ✅ Phaser + React integration (game canvas + UI overlays)

## Next Steps

- Add sprites and animations for players and NPCs
- Create NPCs and dialogue system
- Implement full coding challenge UI flow
- Add quest system and progression
- Create different game areas/levels/maps
- Add inventory and item system
- Implement XP and leveling system
- Add collision detection and tilemaps
- Create more coding challenges with different difficulty levels

## Technologies

- **Phaser 3**: Game framework for rendering and physics
- **React 18**: UI framework for menus, HUD, and overlays
- **TypeScript**: Type-safe JavaScript
- **Vite**: Fast build tool and dev server
- **Socket.io**: Real-time multiplayer communication
- **Express**: Server framework
- **Monaco Editor**: VS Code's editor for code editing in the browser
- **UUID**: For generating unique player IDs

## Architecture

The game uses a client-server architecture:
- **Client**: Phaser game running in the browser, handles rendering and user input
- **Server**: Node.js server managing game state, player connections, and multiplayer synchronization

Player actions are sent to the server via Socket.io, which broadcasts updates to all connected clients for real-time multiplayer functionality.
