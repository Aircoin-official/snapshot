<script>
import getProvider from '@snapshot-labs/snapshot.js/src/utils/provider';
import Plugin from '@/../snapshot-plugins/src/plugins/quorum';
import { shorten, n } from '@/helpers/utils';

export default {
  setup() {
    return { shorten, n };
  },
  props: ['space', 'proposal', 'results', 'loaded', 'strategies'],
  data() {
    return {
      loading: false,
      plugin: new Plugin(),
      totalVotingPower: 0
    };
  },
  computed: {
    totalScore() {
      return this.results.resultsByVoteBalance.reduce((a, b) => a + b, 0);
    },
    quorum() {
      return this.totalVotingPower === 0
        ? 0
        : this.totalScore / this.totalVotingPower;
    }
  },

  async created() {
    this.loading = true;

    this.totalVotingPower = await this.plugin.getTotalVotingPower(
      getProvider(this.space.network),
      this.space.plugins.quorum,
      this.proposal.snapshot
    );

    this.loading = false;
  }
};
</script>

<template>
  <Block title="Quorum" :loading="!loaded">
    <div class="link-color mb-1">
      <span class="mr-1">
        {{ n(totalScore) }} / {{ n(totalVotingPower) }}
        {{ shorten(space.symbol, 'symbol') }}
      </span>
      <span class="float-right" v-text="n(quorum, '0.[00]%')" />
    </div>
    <UiProgress :value="quorum" :max="1" class="mb-3" />
  </Block>
</template>
