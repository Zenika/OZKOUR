import { shallowMount } from '@vue/test-utils'
import AuthenticationDefault from '@/components/AuthenticationDefault.vue'
import '@testing-library/jest-dom/extend-expect'
import { ref } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'

jest.mock('@auth0/auth0-vue')

const mockedUseAuth0 = jest.mocked(useAuth0, true)

const user = {
  email: 'user@test.com',
  email_verified: true,
  name: 'John Doe'
}

describe('AuthenticationDefault', () => {
  /** @type{ import('@vue/test-utils').VueWrapper } */
  let wrapper
  beforeEach(() => {
    resetAuth()
    resetWrapper()
  })
  it('should mount component', () => {
    expect(wrapper.exists()).toBe(true)
  })

  describe('when the user is authenticated', () => {
    beforeEach(() => {
      mockedUseAuth0.mockReturnValue({
        isAuthenticated: ref(true),
        user: ref(user),
        logout: jest.fn()
      })
      resetWrapper()
    })
    it('should display the username and the profile picture', () => {
      const userName = wrapper.find('span').text()
      expect(userName).toBe('John Doe')

      const profilePicture = wrapper.find('img[id="user-picture"]')
      expect(profilePicture.exists()).toBe(true)
    })
    it('should display logout button', () => {
      const logoutImg = wrapper.find('#imgLogout')
      const loginImg = wrapper.find('#imgLogin')

      expect(logoutImg.exists()).toBe(true)
      expect(loginImg.exists()).toBe(false)
    })
    describe('when the user click on the logout img', () => {
      beforeEach(async () => {
        await wrapper.find('#imgLogout').trigger('click')
      })
      it('should run the auth0 logout function', async () => {
        expect(useAuth0().logout).toHaveBeenCalled()
      })
    })
  })

  describe('when the user is unauthenticated', () => {
    beforeEach(() => {
      mockedUseAuth0.mockReturnValue({
        isAuthenticated: ref(false),
        loginWithRedirect: jest.fn()
      })
      resetWrapper()
    })
    it('should display login button ', () => {
      const logout = wrapper.find('#imgLogout')
      const login = wrapper.find('#imgLogin')

      expect(login.exists()).toBe(true)
      expect(logout.exists()).toBe(false)
    })
    describe('when the user click on the login img', () => {
      beforeEach(async () => {
        await wrapper.find('#imgLogin').trigger('click')
      })
      it('should run the auth0 login function', async () => {
        expect(useAuth0().loginWithRedirect).toHaveBeenCalled()
      })
    })
  })

  function resetAuth () {
    mockedUseAuth0.mockReturnValue({
      isAuthenticated: ref(false)
    })
  }

  function resetWrapper () {
    wrapper = shallowMount(AuthenticationDefault)
  }
})
