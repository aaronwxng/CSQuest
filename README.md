# CSQuest - Educational Coding RPG Game

A top-down multiplayer RPG-style educational game built with Next.js and Phaser 3, teaching people how to code (similar to Prodigy Math Game).

## Features

- 🎮 **Top-down RPG gameplay** with smooth movement and physics
- ⚛️ **React UI** for menus, HUD, and game overlays
- 🌐 **Multiplayer support** using Socket.io for real-time player interactions
- 💻 **Integrated code editor** with Monaco Editor for coding challenges
- 📚 **Educational coding challenges** with test cases and rewards
- 👥 **Player management** system with usernames and player states
- 🏗️ **Modular architecture** ready for expansion
- 🚀 **Next.js 16** for modern web app structure and routing

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

Start the Next.js development server:

```bash
npm run dev
```

This will start:
- **Next.js App**: `http://localhost:3000` - The main application

To run the game server separately (if needed):

```bash
npm run dev:server
```

This will start:
- **Server (Express + Socket.io)**: `http://localhost:3001` - The multiplayer backend

### Building for Production

Build the Next.js application:

```bash
npm run build
```

Build the server:

```bash
npm run build:server
```

## Project Structure

```
csquest/
├── app/                          # Next.js app directory
│   ├── page.tsx                  # Home page
│   ├── town/
│   │   └── page.tsx              # Town page
│   └── quest/
│       └── [id]/
│           └── page.tsx          # Quest detail page
├── src/                          # Game source code (from Phaser version)
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
├── public/                       # Static assets
├── next.config.ts                # Next.js configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Project dependencies
```

## Current Features

- ✅ Next.js routing structure (home, town, quest pages)
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

- Integrate Phaser game into Next.js pages
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

- **Next.js 16**: React framework for production
- **Phaser 3**: Game framework for rendering and physics
- **React 19**: UI framework for menus, HUD, and overlays
- **TypeScript**: Type-safe JavaScript
- **Socket.io**: Real-time multiplayer communication
- **Express**: Server framework
- **Monaco Editor**: VS Code's editor for code editing in the browser
- **Tailwind CSS**: Utility-first CSS framework
- **UUID**: For generating unique player IDs

## Architecture

The game uses a client-server architecture:
- **Client**: Next.js app with Phaser game running in the browser, handles rendering and user input
- **Server**: Node.js server managing game state, player connections, and multiplayer synchronization

Player actions are sent to the server via Socket.io, which broadcasts updates to all connected clients for real-time multiplayer functionality.
