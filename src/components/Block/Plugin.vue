<script setup>
import { n } from '@/helpers/utils';

defineProps(['plugin']);

function getLogoUrl(key) {
  return `https://raw.githubusercontent.com/snapshot-labs/snapshot-plugins/master/src/plugins/${key}/logo.png`;
}
</script>

<template>
  <Block class="hover-border">
    <div class="flex items-center mb-1">
      <a
        :href="`https://github.com/snapshot-labs/snapshot-plugins/tree/master/src/plugins/${plugin.key}`"
        target="_blank"
        class="flex items-center"
      >
        <UiAvatar
          class="mr-2 mb-2"
          :imgsrc="getLogoUrl(plugin.key)"
          :seed="plugin.name.charCodeAt()"
          size="28"
        />
        <h3 v-text="plugin.name" />
      </a>
      <div class="ml-1">v{{ plugin.version }}</div>
    </div>
    <div class="text-color">
      <div>
        <a
          :href="`https://github.com/${plugin.author}`"
          target="_blank"
          class="text-color"
        >
          <Icon name="github" class="mr-1" />
          {{ plugin.author }}
        </a>
      </div>
      {{ $tc('inSpaces', [n(plugin.spaces)]) }}
    </div>
  </Block>
</template>
