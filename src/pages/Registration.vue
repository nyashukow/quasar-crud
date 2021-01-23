<template>
  <q-page
    class="row justify-center items-center"
    style="background: linear-gradient(#8274c5, #5a4a9f)"
  >
    <div class="column q-pa-lg">
      <div class="row">
        <q-card square class="shadow-24" style="width: 300px">
          <q-card-section class="bg-deep-purple-7">
            <h4 class="text-h5 text-white q-my-md">Registration</h4>
            <div
              class="absolute-bottom-right q-pr-md"
              style="transform: translateY(50%); z-index: 1"
            >
              <q-btn fab icon="close" color="purple-4" to="/login" />
            </div>
          </q-card-section>
          <q-card-section>
            <q-form class="q-px-sm q-pt-md q-pb-lg">
              <q-input
                square
                clearable
                v-model="username"
                type="username"
                label="Username"
              >
                <template v-slot:prepend>
                  <q-icon name="person" />
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
              <q-input
                square
                clearable
                v-model="verifyPassword"
                type="password"
                label="Verify password"
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
              label="Get Started"
              @click="register"
            />
          </q-card-actions>
          <q-card-section class="text-center q-pa-sm">
            <p class="text-grey-6">Return to login</p>
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
  name: 'RegistrationPage',

  setup (props, context) {
    const username = ref('')
    const password = ref('')
    const verifyPassword = ref('')

    const auth = useAuth(context.root.$store)

    const register = () => {
      auth.register({ username: username.value, password: password.value })
    }

    return {
      username,
      password,
      verifyPassword,

      register
    }
  }
})
</script>

<style lang="scss">
</style>
