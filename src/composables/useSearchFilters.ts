import skins from '@/helpers/skins';
import strategies from '@/helpers/strategies';
import networks from '@snapshot-labs/snapshot.js/src/networks.json';
import snapshot from '@snapshot-labs/snapshot.js';

import { getStrategy } from '@/helpers/utils';

import { computed } from 'vue';

export function useSkinsFilter(spaces) {
  const minifiedSkinsArray = computed(() => {
    return skins.map(skin => ({
      key: skin,
      spaces: Object.entries(spaces)
        .filter((space: any) => space[1].skin === skin)
        .map(space => space[0])
    }));
  });

  const filteredSkins = q => {
    return minifiedSkinsArray.value
      .filter(skin => skin.key.toLowerCase().includes(q.toLowerCase()))
      .sort((a, b) => b.spaces.length - a.spaces.length);
  };

  return { filteredSkins, minifiedSkinsArray };
}

export function useStrategyFilter(spaces) {
  const minifiedStrategiesArray = computed(() => {
    return Object.values(strategies).map(strategy =>
      getStrategy(strategy, spaces)
    );
  });

  const filteredStrategies = q => {
    return minifiedStrategiesArray.value
      .filter(skin => skin.key.toLowerCase().includes(q.toLowerCase()))
      .sort((a, b) => b.spaces.length - a.spaces.length);
  };

  return { filteredStrategies, minifiedStrategiesArray };
}

export function useNetworkFilter(spaces) {
  const minifiedNetworksArray = computed(() => {
    return Object.entries(networks).map((network: any) => {
      network[1].key = network[0];
      network[1].spaces = Object.entries(spaces)
        .filter((space: any) => space[1].network === network[0])
        .map(space => space[0]);
      return network[1];
    });
  });

  const filteredNetworks = q => {
    return minifiedNetworksArray.value
      .filter(network =>
        JSON.stringify(network).toLowerCase().includes(q.toLowerCase())
      )
      .sort((a, b) => b.spaces.length - a.spaces.length);
  };

  return { filteredNetworks, minifiedNetworksArray };
}

export function usePluginFilter(spaces) {
  const minifiedPluginsArray = computed(() => {
    return Object.entries(snapshot.plugins).map(([key, pluginClass]: any) => {
      const plugin = new pluginClass();
      plugin.key = key;
      plugin.spaces = Object.entries(spaces)
        .filter(
          (space: any) =>
            space[1].plugins &&
            Object.keys(space[1].plugins).includes(plugin.key)
        )
        .map(space => space[0]);
      return plugin;
    });
  });

  const filteredPlugins = q => {
    return minifiedPluginsArray.value
      .filter(plugin =>
        JSON.stringify(plugin).toLowerCase().includes(q.toLowerCase())
      )
      .sort((a, b) => b.spaces.length - a.spaces.length);
  };

  return { filteredPlugins, minifiedPluginsArray };
}