<template>
  <q-page
    class="row justify-center items-center"
    style="background: linear-gradient(#8274c5, #5a4a9f)"
  >
    <div class="column q-pa-lg">
      <div class="row">
        <q-card square class="shadow-24" style="width: 300px">
          <q-card-section class="bg-deep-purple-7">
            <h4 class="text-h5 text-white q-my-md">Company &amp; Co</h4>
            <div
              class="absolute-bottom-right q-pr-md"
              style="transform: translateY(50%); z-index: 1"
            >
              <q-btn fab icon="add" color="purple-4" to="/registration" />
            </div>
          </q-card-section>
          <q-card-section>
            <q-form class="q-px-sm q-pt-md">
              <q-input
                square
                clearable
                v-model="username"
                type="text"
                label="Login"
              >
                <template v-slot:prepend>
                  <q-icon name="email" />
                </template>
              </q-input>
              <q-input
                square
                clearable
                v-model="password"
                type="password"
                label="Password"
              >
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
              </q-input>
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-lg">
            <q-btn
              unelevated
              size="lg"
              color="purple-4"
              class="full-width text-white"
              label="Sign In"
              @click="login"
            />
          </q-card-actions>
          <q-card-section class="text-center q-pa-sm">
            <p class="text-grey-6">Forgot your password?</p>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import useAuth from 'src/hooks/useAuth'

export default defineComponent({
  name: 'IndexPage',

  setup (props, context) {
    const username = ref('')
    const password = ref('')

    const auth = useAuth(context.root.$store)

    const login = () => {
      auth.login({ username: username.value, password: password.value, rememberMe: false })
        .then(() => context.root.$router.push('/'))
    }

    return {
      username,
      password,

      login
    }
  }
})
</script>

<style lang="scss">
</style>
