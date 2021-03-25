<script>
import { mapActions, mapState } from 'vuex';
import filter from 'lodash/filter';
import { CheckboxGroup, Checkbox, Input, Modal, Select } from '@/components/common';
import settingsData from '@/data/gameSettings.json';

const initialState = () => ({
   name: '',
   universeType: 'planet',
   template: '',
   settings: {
      simulation: {
         bgsType: 'moderate',
         fgsType: 'moderate',
      },
      market: {
         timelineEffects: true,
         priceFluctuation: true,
         itemVariance: true,
      },
   },
   generateUniverse: false,
});

export default {
   name: 'create-game',

   components: { CheckboxGroup, Checkbox, Input, Modal, Select },

   data: () => initialState(),

   computed: {
      ...mapState('game', ['creatingGame', 'creatingGameError']),

      canSave() {
         const requiredValues = ['name', 'universeType'];
         const requiredFields = filter(this.$data, (_, key) => requiredValues.includes(key));
         return Object.values(requiredFields).every(field => !!field);
      },

      universeTypeDetails() {
         return this.universeType === 'galaxy'
            && 'Creating a universe this large is resource intensive. You may experience slow-downs while generating timeline updates.';
      },
   },

   methods: {
      ...mapActions('game', ['createGame']),

      onClose() {
         Object.assign(this.$data, initialState());
      },

      getSettingDesc(type, setting) {
         return settingsData[type][setting].short;
      },

      getSimDesc(type) {
         const simType = this[type];
         return simType === 'aggressive' ? 'Large events happen frequently. Large fluctuations.'
            : simType === 'moderate' ? 'Large events happen occasionally. Moderate fluctuations.'
               : simType === 'passive' ? 'Large events happen rarely. Small fluctuations.'
                  : '';
      },

      async onCreate() {
         console.log(this.$data);
         const createdId = await this.createGame({ gameData: this.$data });
         if (createdId) this.$router.push(`/dashboard/gm/${createdId}`);
      },
   },
};
</script>

<template>
   <Modal
      lg
      title="Create Game"
      :loading="creatingGame"
      :hasError="!!creatingGameError || !canSave"
      primaryLabel="Create Game"
      @primary="onCreate"
      @close="onClose"
   >
      <template #default="{ handleOpen }">
         <slot :handleOpen="handleOpen" />
      </template>
      <template #body>
         <div class="create-game-body">
            <section class="container">
               <Input v-model="name" label="Game Name" required />
               <Select
                  v-model="universeType"
                  label="Universe Type"
                  :details="universeTypeDetails"
                  noDefault
                  required
               >
                  <option value="planet">Planet</option>
                  <option value="system">Solar System</option>
                  <option value="galaxy">Galaxy</option>
               </Select>
               <Select v-model="settings.simulation.bgsType" label="Background Simulation Type" :details="getSimDesc('bgsType')" noDefault required>
                  <option value="passive">Passive</option>
                  <option value="moderate">Moderate</option>
                  <option value="aggressive">Aggressive</option>
               </Select>
               <Select v-model="settings.simulation.fgsType" label="Foreground Simulation Type" :details="getSimDesc('fgsType')" noDefault required>
                  <option value="passive">Passive</option>
                  <option value="moderate">Moderate</option>
                  <option value="aggressive">Aggressive</option>
               </Select>
               <Select v-model="template" label="Template (can be changed later)">
                  <option value="dnd5e">D&#38;D 5e</option>
                  <option value="Genesys">Genesys</option>
               </Select>
            </section>

            <section class="container">
               <Checkbox v-model="generateUniverse" label="Generate Universe" />
               <CheckboxGroup label="Market Settings">
                  <Checkbox v-model="settings.market.timelineEffects" label="Timeline Effects" :details="getSettingDesc('market', 'timelineEffects')" />
                  <Checkbox v-model="settings.market.priceFluctuation" label="Price Fluctuation" :details="getSettingDesc('market', 'priceFluctuation')" />
                  <Checkbox v-model="settings.market.itemVariance" label="Item Variance" :details="getSettingDesc('market', 'itemVariance')" />
               </CheckboxGroup>
            </section>

            <section class="container">
               <Input />
               <Input />
               <Input />
               <Input />
            </section>
         </div>
      </template>
   </Modal>
</template>

<style lang="scss" scoped>
.create-game-body {
   height: 100%;
   width: 100%;
   display: flex;

   .container {
      height: 100%;
      width: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 20px;
      &:not(:last-child) { border-right: 1px solid $light-grey; }
   }
}
</style>
