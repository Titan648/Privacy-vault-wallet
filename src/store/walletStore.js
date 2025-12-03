import { create } from 'zustand';

export const useWalletStore = create((set) => ({
  user: null,
  selectedWallet: null,
  hiddenAssets: [],
  privacyMode: false,
  selectedChain: 'eth-mainnet',
  
  setUser: (user) => set({ user }),
  
  setSelectedWallet: (wallet) => set({ selectedWallet: wallet }),
  
  togglePrivacyMode: () => set((state) => ({ privacyMode: !state.privacyMode })),
  
  hideAsset: (assetId) => set((state) => ({
    hiddenAssets: [...state.hiddenAssets, assetId]
  })),
  
  unhideAsset: (assetId) => set((state) => ({
    hiddenAssets: state.hiddenAssets.filter(id => id !== assetId)
  })),
  
  setSelectedChain: (chain) => set({ selectedChain: chain }),
}));
