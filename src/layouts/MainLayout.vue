<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat label="Главная" to="/" />
        <q-btn flat label="Карточки" to="/cards" />
        <q-space />
        <q-btn v-if="user" flat color="white" :label="user.username">
          <q-avatar>
            <q-icon name="person" />
          </q-avatar>
          <q-menu>
            <q-list>
              <q-item clickable @click="logout">
                <q-item-section>Выйти</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container class="window-height">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import useAuth from 'src/hooks/useAuth'

export default defineComponent({
  name: 'MainLayout',

  setup (props, context) {
    const auth = useAuth(context.root.$store)

    return {
      user: auth.user(),

      logout: () => auth.logout().then(() => context.root.$router.push('/login'))
    }
  }
})
</script>

<style lang="scss">
</style>
