<script>
import { mapActions, mapState } from 'vuex';
import filter from 'lodash/filter';
import { CheckboxGroup, Checkbox, Input, Modal, Select } from '@/components/common';
import settingsData from '@/data/gameSettings.json';

const initialState = () => ({
   fields: {
      name: '',
      partnerIds: ['', ''],
      universeType: 'planet',
      bgsType: 'moderate',
      fgsType: 'moderate',
      template: '',
      market: {
         timelineEffects: true,
         priceFluctuation: true,
         itemVariance: true,
      },
   },
});

export default {
   name: 'create-game',

   components: { CheckboxGroup, Checkbox, Input, Modal, Select },

   data: () => initialState(),

   computed: {
      ...mapState('game', ['creatingGame', 'creatingGameError']),

      canSave() {
         const requiredValues = ['name', 'universeType'];
         const requiredFields = filter(this.fields, (_, key) => requiredValues.includes(key));
         return Object.values(requiredFields).every(field => !!field);
      },

      universeTypeDetails() {
         return this.fields.universeType === 'galaxy'
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
         const simType = this.fields[type];
         return simType === 'aggressive' ? 'Large events happen frequently. Large fluctuations.'
            : simType === 'moderate' ? 'Large events happen occasionally. Moderate fluctuations.'
               : simType === 'passive' ? 'Large events happen rarely. Small fluctuations.'
                  : '';
      },

      async onCreate() {
         const createdId = await this.createGame(this.fields);
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
      @primary="createGame(fields)"
      @close="onClose"
   >
      <template #default="{ handleOpen }">
         <slot :handleOpen="handleOpen" />
      </template>
      <template #body>
         <div class="create-game-body">
            <section class="container">
               <Input v-model="fields.name" label="Game Name" required />
               <Select
                  v-model="fields.universeType"
                  label="Universe Type"
                  :details="universeTypeDetails"
                  noDefault
                  required
               >
                  <option value="planet">Planet</option>
                  <option value="system">Solar System</option>
                  <option value="galaxy">Galaxy</option>
               </Select>
               <Select v-model="fields.bgsType" label="BGS Type" :details="getSimDesc('bgsType')" noDefault required>
                  <option value="moderate">Moderate</option>
                  <option value="passive">Passive</option>
                  <option value="aggressive">Aggressive</option>
               </Select>
               <Select v-model="fields.fgsType" label="FGS Type" :details="getSimDesc('fgsType')" noDefault required>
                  <option value="moderate">Moderate</option>
                  <option value="passive">Passive</option>
                  <option value="aggressive">Aggressive</option>
               </Select>
               <Select v-model="fields.template" label="Template (can be changed later)">
                  <option value="dnd5e">D&#38;D 5e</option>
                  <option value="Genesys">Genesys</option>
               </Select>
            </section>

            <section class="container">
               <CheckboxGroup label="Market Settings">
                  <Checkbox v-model="fields.market.timelineEffects" label="Timeline Effects" :details="getSettingDesc('market', 'timelineEffects')" />
                  <Checkbox v-model="fields.market.priceFluctuation" label="Price Fluctuation" :details="getSettingDesc('market', 'priceFluctuation')" />
                  <Checkbox v-model="fields.market.itemVariance" label="Item Variance" :details="getSettingDesc('market', 'itemVariance')" />
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
