import React, { useState } from 'react';
import { ScreenState, UserState, GeneratedSoul } from './types';
import { INITIAL_INVENTORY } from './constants';
import { Layout } from './components/Layout';
import { ScreenTitle } from './components/ScreenTitle';
import { ScreenIdentity } from './components/ScreenIdentity';
import { ScreenMap } from './components/ScreenMap';
import { ScreenInventory } from './components/ScreenInventory';
import { ScreenLoom } from './components/ScreenLoom';
import { ScreenWeaving } from './components/ScreenWeaving';
import { ScreenDiagnosis } from './components/ScreenDiagnosis';
import { ScreenObservatory } from './components/ScreenObservatory';
import { ScreenMarket } from './components/ScreenMarket';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenState>(ScreenState.TITLE);
  const [user, setUser] = useState<UserState>({
    name: '',
    energy: 60,
    faith: 1240,
    inventory: INITIAL_INVENTORY,
    equippedBlueprint: 'bp_standard',
    equippedChips: []
  });
  const [lastGeneratedSoul, setLastGeneratedSoul] = useState<GeneratedSoul | null>(null);

  const handleConnect = () => setCurrentScreen(ScreenState.IDENTITY);
  
  const handleInitialize = (name: string) => {
    setUser(prev => ({ ...prev, name }));
    setCurrentScreen(ScreenState.MAP);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case ScreenState.TITLE:
        return <ScreenTitle onConnect={handleConnect} />;
      case ScreenState.IDENTITY:
        return <ScreenIdentity onInitialize={handleInitialize} />;
      case ScreenState.MAP:
        return <ScreenMap setScreen={setCurrentScreen} />;
      case ScreenState.INVENTORY:
        return <ScreenInventory user={user} setScreen={setCurrentScreen} />;
      case ScreenState.LOOM:
        return <ScreenLoom />;
      case ScreenState.WEAVING:
        return <ScreenWeaving user={user} setScreen={setCurrentScreen} setLastSoul={setLastGeneratedSoul} />;
      case ScreenState.DIAGNOSIS:
        return <ScreenDiagnosis soul={lastGeneratedSoul} setScreen={setCurrentScreen} />;
      case ScreenState.OBSERVATORY:
        return <ScreenObservatory />;
      case ScreenState.MARKET:
        return <ScreenMarket />;
      default:
        return <ScreenMap setScreen={setCurrentScreen} />;
    }
  };

  return (
    <Layout user={user} setScreen={setCurrentScreen} currentScreen={currentScreen}>
      {renderScreen()}
    </Layout>
  );
}
