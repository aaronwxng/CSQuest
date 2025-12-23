import { InventoryItem } from './gameState';

export const shopItems: InventoryItem[] = [
  // Weapons
  {
    id: 'wooden-sword',
    name: 'Wooden Sword',
    type: 'weapon',
    emoji: '🗡️',
    description: 'A basic wooden sword. +5 Attack',
    price: 50,
    stats: { attack: 5 },
  },
  {
    id: 'iron-sword',
    name: 'Iron Sword',
    type: 'weapon',
    emoji: '⚔️',
    description: 'A sturdy iron sword. +15 Attack',
    price: 200,
    stats: { attack: 15 },
  },
  {
    id: 'code-blade',
    name: 'Code Blade',
    type: 'weapon',
    emoji: '💻',
    description: 'A blade forged from pure code. +25 Attack',
    price: 500,
    stats: { attack: 25 },
  },
  {
    id: 'python-staff',
    name: 'Python Staff',
    type: 'weapon',
    emoji: '🐍',
    description: 'A magical staff with Python powers. +35 Attack, +10 Mana',
    price: 1000,
    stats: { attack: 35, mana: 10 },
  },
  
  // Armor
  {
    id: 'leather-armor',
    name: 'Leather Armor',
    type: 'armor',
    emoji: '🛡️',
    description: 'Basic leather protection. +10 Defense, +20 Health',
    price: 75,
    stats: { defense: 10, health: 20 },
  },
  {
    id: 'iron-armor',
    name: 'Iron Armor',
    type: 'armor',
    emoji: '⚙️',
    description: 'Strong iron protection. +25 Defense, +50 Health',
    price: 300,
    stats: { defense: 25, health: 50 },
  },
  {
    id: 'code-armor',
    name: 'Code Armor',
    type: 'armor',
    emoji: '💾',
    description: 'Armor made of compiled code. +40 Defense, +80 Health',
    price: 750,
    stats: { defense: 40, health: 80 },
  },
  
  // Consumables
  {
    id: 'health-potion',
    name: 'Health Potion',
    type: 'consumable',
    emoji: '🧪',
    description: 'Restores 50 HP',
    price: 25,
    quantity: 1,
  },
  {
    id: 'mana-potion',
    name: 'Mana Potion',
    type: 'consumable',
    emoji: '⚗️',
    description: 'Restores 30 Mana',
    price: 20,
    quantity: 1,
  },
  {
    id: 'energy-drink',
    name: 'Energy Drink',
    type: 'consumable',
    emoji: '🥤',
    description: 'Restores 30 HP and 20 Mana',
    price: 40,
    quantity: 1,
  },
  
  // Cosmetics
  {
    id: 'golden-crown',
    name: 'Golden Crown',
    type: 'cosmetic',
    emoji: '👑',
    description: 'A shiny golden crown. Look like royalty!',
    price: 500,
  },
  {
    id: 'rainbow-cloak',
    name: 'Rainbow Cloak',
    type: 'cosmetic',
    emoji: '🌈',
    description: 'A colorful rainbow cloak. Stand out in style!',
    price: 300,
  },
  {
    id: 'coding-glasses',
    name: 'Coding Glasses',
    type: 'cosmetic',
    emoji: '🤓',
    description: 'Stylish glasses for serious coders.',
    price: 150,
  },
];

