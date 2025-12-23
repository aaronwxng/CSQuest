'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { shopItems } from '@/lib/shopItems';
import { GameState, InventoryItem, saveGameState, loadGameState } from '@/lib/gameState';
import { HUD } from '@/components/ui/HUD';
import { updatePlayerClothing } from '@/src/phaser-init';

export function Shop() {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [filter, setFilter] = useState<'all' | 'weapon' | 'armor' | 'consumable' | 'cosmetic'>('all');

  useEffect(() => {
    const state = loadGameState();
    if (state) {
      setGameState(state);
    } else {
      // If no state, redirect to character select
      window.location.href = '/character';
    }
  }, []);

  if (!gameState) {
    return <div className="text-white">Loading...</div>;
  }

  const filteredItems = filter === 'all' 
    ? shopItems 
    : shopItems.filter(item => item.type === filter);

  const handlePurchase = (item: InventoryItem) => {
    if (gameState.playerStats.coins < item.price) {
      alert('Not enough coins!');
      return;
    }

    // Check if item already exists in inventory
    const existingItemIndex = gameState.inventory.findIndex(i => i.id === item.id);
    
    const newState: GameState = {
      ...gameState,
      playerStats: {
        ...gameState.playerStats,
        coins: gameState.playerStats.coins - item.price,
      },
      inventory: existingItemIndex >= 0
        ? gameState.inventory.map((invItem, idx) => 
            idx === existingItemIndex && invItem.type === 'consumable'
              ? { ...invItem, quantity: (invItem.quantity || 0) + 1 }
              : invItem
          )
        : [...gameState.inventory, { ...item, quantity: item.type === 'consumable' ? 1 : undefined }],
      stats: {
        ...gameState.stats,
        itemsCollected: existingItemIndex < 0 ? gameState.stats.itemsCollected + 1 : gameState.stats.itemsCollected,
      },
    };

    setGameState(newState);
    saveGameState(newState);
    // Force a small delay to ensure save
    setTimeout(() => saveGameState(newState), 100);
    alert(`Purchased ${item.name}!`);
  };

  const handleEquip = (item: InventoryItem) => {
    if (item.type !== 'weapon' && item.type !== 'armor') {
      return;
    }

    const newState: GameState = {
      ...gameState,
      equipped: {
        ...gameState.equipped,
        [item.type]: item,
      },
    };

    // Apply stats
    if (item.stats) {
      newState.playerStats = {
        ...newState.playerStats,
        maxHealth: gameState.playerStats.maxHealth + (item.stats.health || 0),
        maxMana: gameState.playerStats.maxMana + (item.stats.mana || 0),
        health: Math.min(
          newState.playerStats.health,
          newState.playerStats.maxHealth + (item.stats.health || 0)
        ),
        mana: Math.min(
          newState.playerStats.mana,
          newState.playerStats.maxMana + (item.stats.mana || 0)
        ),
      };
    }

    setGameState(newState);
    saveGameState(newState);
    setTimeout(() => saveGameState(newState), 100);
    updatePlayerClothing(); // Update sprite clothing
    alert(`Equipped ${item.name}!`);
  };

  const canAfford = (price: number) => gameState.playerStats.coins >= price;
  const isEquipped = (item: InventoryItem) => {
    return (item.type === 'weapon' && gameState.equipped.weapon?.id === item.id) ||
           (item.type === 'armor' && gameState.equipped.armor?.id === item.id);
  };
  const inInventory = (itemId: string) => {
    return gameState.inventory.some(item => item.id === itemId);
  };

  if (!gameState) {
    return <div className="min-h-screen bg-gradient-to-b from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 via-purple-500 to-pink-500">
      <HUD 
        level={gameState.playerStats.level}
        xp={gameState.playerStats.experience}
        xpToNext={1000}
        coins={gameState.playerStats.coins}
        showBackButton
        backHref="/game"
      />
      <div className="pt-24 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <Link 
                  href="/game"
                  className="text-2xl hover:scale-110 transition-transform"
                >
                  ←
                </Link>
                <h1 className="text-4xl font-bold text-gray-800">🛒 Shop</h1>
              </div>
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-xl px-6 py-3 border-4 border-white shadow-lg">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🪙</span>
                  <span className="text-white font-bold text-xl">{gameState.playerStats.coins}</span>
                </div>
              </div>
            </div>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2 flex-wrap">
            {(['all', 'weapon', 'armor', 'consumable', 'cosmetic'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  filter === type
                    ? 'bg-purple-600 text-white shadow-lg scale-105'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Items Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const owned = inInventory(item.id);
            const equipped = isEquipped(item);
            const affordable = canAfford(item.price);

            return (
              <div
                key={item.id}
                className={`bg-white rounded-2xl shadow-xl p-6 border-4 transition-all ${
                  equipped
                    ? 'border-green-400 bg-green-50'
                    : owned && item.type !== 'consumable'
                    ? 'border-blue-400 bg-blue-50'
                    : 'border-gray-300'
                }`}
              >
                <div className="text-center mb-4">
                  <div className="text-6xl mb-2">{item.emoji}</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{item.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                  
                  {item.stats && (
                    <div className="text-xs text-gray-500 space-y-1">
                      {item.stats.attack && <div>⚔️ +{item.stats.attack} Attack</div>}
                      {item.stats.defense && <div>🛡️ +{item.stats.defense} Defense</div>}
                      {item.stats.health && <div>❤️ +{item.stats.health} Health</div>}
                      {item.stats.mana && <div>⚡ +{item.stats.mana} Mana</div>}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🪙</span>
                    <span className="text-xl font-bold text-gray-800">{item.price}</span>
                  </div>
                  {equipped && (
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      EQUIPPED
                    </span>
                  )}
                  {owned && !equipped && item.type !== 'consumable' && (
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      OWNED
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  {!owned || item.type === 'consumable' ? (
                    <button
                      onClick={() => handlePurchase(item)}
                      disabled={!affordable}
                      className={`flex-1 py-2 px-4 rounded-lg font-bold transition-all ${
                        affordable
                          ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:scale-105'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Buy
                    </button>
                  ) : null}
                  
                  {owned && (item.type === 'weapon' || item.type === 'armor') && !equipped && (
                    <button
                      onClick={() => handleEquip(item)}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:scale-105 transition-all"
                    >
                      Equip
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

