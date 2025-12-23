'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { GameState, InventoryItem, saveGameState, loadGameState } from '@/lib/gameState';
import { HUD } from '@/components/ui/HUD';
import { updatePlayerClothing } from '@/src/phaser-init';

export function Inventory() {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [filter, setFilter] = useState<'all' | 'weapon' | 'armor' | 'consumable' | 'cosmetic'>('all');

  useEffect(() => {
    const state = loadGameState();
    if (state) {
      setGameState(state);
    } else {
      window.location.href = '/character';
    }
  }, []);

  if (!gameState) {
    return <div className="text-white">Loading...</div>;
  }

  const filteredInventory = filter === 'all'
    ? gameState.inventory
    : gameState.inventory.filter(item => item.type === filter);

  const handleEquip = (item: InventoryItem) => {
    if (item.type !== 'weapon' && item.type !== 'armor') {
      return;
    }

    // Unequip current item if any
    const currentEquipped = gameState.equipped[item.type];
    let newState: GameState = { ...gameState };

    if (currentEquipped && currentEquipped.stats) {
      // Remove old stats
      newState.playerStats = {
        ...newState.playerStats,
        maxHealth: newState.playerStats.maxHealth - (currentEquipped.stats.health || 0),
        maxMana: newState.playerStats.maxMana - (currentEquipped.stats.mana || 0),
      };
    }

    // Equip new item
    newState.equipped = {
      ...newState.equipped,
      [item.type]: item,
    };

    // Apply new stats
    if (item.stats) {
      newState.playerStats = {
        ...newState.playerStats,
        maxHealth: newState.playerStats.maxHealth + (item.stats.health || 0),
        maxMana: newState.playerStats.maxMana + (item.stats.mana || 0),
        health: Math.min(newState.playerStats.health, newState.playerStats.maxHealth),
        mana: Math.min(newState.playerStats.mana, newState.playerStats.maxMana),
      };
    }

    setGameState(newState);
    saveGameState(newState);
    setTimeout(() => saveGameState(newState), 100);
    updatePlayerClothing(); // Update sprite clothing
    alert(`Equipped ${item.name}!`);
  };

  const handleUnequip = (itemType: 'weapon' | 'armor') => {
    const equipped = gameState.equipped[itemType];
    if (!equipped) return;

    const newState: GameState = {
      ...gameState,
      equipped: {
        ...gameState.equipped,
        [itemType]: undefined,
      },
    };

    // Remove stats
    if (equipped.stats) {
      newState.playerStats = {
        ...newState.playerStats,
        maxHealth: newState.playerStats.maxHealth - (equipped.stats.health || 0),
        maxMana: newState.playerStats.maxMana - (equipped.stats.mana || 0),
        health: Math.min(newState.playerStats.health, newState.playerStats.maxHealth),
        mana: Math.min(newState.playerStats.mana, newState.playerStats.maxMana),
      };
    }

    setGameState(newState);
    saveGameState(newState);
    setTimeout(() => saveGameState(newState), 100);
    updatePlayerClothing(); // Update sprite clothing
    alert(`Unequipped ${equipped.name}!`);
  };

  const handleUseConsumable = (item: InventoryItem) => {
    if (item.type !== 'consumable') return;

    const newState: GameState = {
      ...gameState,
      inventory: gameState.inventory.map(invItem => {
        if (invItem.id === item.id) {
          const newQuantity = (invItem.quantity || 1) - 1;
          if (newQuantity <= 0) {
            return null; // Remove item
          }
          return { ...invItem, quantity: newQuantity };
        }
        return invItem;
      }).filter(Boolean) as InventoryItem[],
      playerStats: {
        ...gameState.playerStats,
        health: Math.min(
          gameState.playerStats.maxHealth,
          gameState.playerStats.health + (item.stats?.health || 50)
        ),
        mana: Math.min(
          gameState.playerStats.maxMana,
          gameState.playerStats.mana + (item.stats?.mana || 30)
        ),
      },
    };

    setGameState(newState);
    saveGameState(newState);
    setTimeout(() => saveGameState(newState), 100);
    alert(`Used ${item.name}!`);
  };

  const isEquipped = (item: InventoryItem) => {
    return (item.type === 'weapon' && gameState.equipped.weapon?.id === item.id) ||
           (item.type === 'armor' && gameState.equipped.armor?.id === item.id);
  };

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
            <div className="flex items-center gap-4 mb-4">
              <Link 
                href="/game"
                className="text-2xl hover:scale-110 transition-transform"
              >
                ←
              </Link>
              <h1 className="text-4xl font-bold text-gray-800">🎒 Inventory</h1>
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

        {/* Equipped Items */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">⚔️ Equipped</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border-2 border-gray-300 rounded-xl p-4">
              <div className="text-sm text-gray-600 mb-2">Weapon</div>
              {gameState.equipped.weapon ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{gameState.equipped.weapon.emoji}</span>
                    <div>
                      <div className="font-bold text-gray-800">{gameState.equipped.weapon.name}</div>
                      <div className="text-sm text-gray-600">{gameState.equipped.weapon.description}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleUnequip('weapon')}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm font-bold"
                  >
                    Unequip
                  </button>
                </div>
              ) : (
                <div className="text-gray-400 text-center py-4">No weapon equipped</div>
              )}
            </div>
            <div className="border-2 border-gray-300 rounded-xl p-4">
              <div className="text-sm text-gray-600 mb-2">Armor</div>
              {gameState.equipped.armor ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{gameState.equipped.armor.emoji}</span>
                    <div>
                      <div className="font-bold text-gray-800">{gameState.equipped.armor.name}</div>
                      <div className="text-sm text-gray-600">{gameState.equipped.armor.description}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleUnequip('armor')}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm font-bold"
                  >
                    Unequip
                  </button>
                </div>
              ) : (
                <div className="text-gray-400 text-center py-4">No armor equipped</div>
              )}
            </div>
          </div>
        </div>

        {/* Inventory Items */}
        {filteredInventory.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-2xl p-12 text-center">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Your inventory is empty</h3>
            <p className="text-gray-600">Visit the shop to buy items!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInventory.map((item) => {
              const equipped = isEquipped(item);

              return (
                <div
                  key={item.id}
                  className={`bg-white rounded-2xl shadow-xl p-6 border-4 ${
                    equipped ? 'border-green-400 bg-green-50' : 'border-gray-300'
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

                    {item.type === 'consumable' && item.quantity && (
                      <div className="mt-2 text-sm font-bold text-blue-600">
                        Quantity: {item.quantity}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    {equipped && (
                      <div className="flex-1 bg-green-500 text-white text-center py-2 px-4 rounded-lg font-bold">
                        EQUIPPED
                      </div>
                    )}
                    {!equipped && (item.type === 'weapon' || item.type === 'armor') && (
                      <button
                        onClick={() => handleEquip(item)}
                        className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:scale-105 transition-all"
                      >
                        Equip
                      </button>
                    )}
                    {item.type === 'consumable' && (
                      <button
                        onClick={() => handleUseConsumable(item)}
                        className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:scale-105 transition-all"
                      >
                        Use
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
        </div>
      </div>
    </div>
  );
}

