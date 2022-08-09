import { shallowMount } from "@vue/test-utils";
import AuthenticationDefault from "@/components/AuthenticationDefault.vue"
import '@testing-library/jest-dom/extend-expect';
import {ref} from 'vue'
import { useAuth0 } from '@auth0/auth0-vue';

jest.mock("@auth0/auth0-vue");

const mockedUseAuth0 = jest.mocked(useAuth0, true);

const user = {
  email: "user@test.com",
  email_verified: true,
  name: "John Doe"
};

describe("Authentication", () => {
  describe("Authentication Default Component", () => {
    it("should display the user name when the user is authenticated", () => {
      mockedUseAuth0.mockReturnValue({
        isAuthenticated: ref(true),
        user: ref(user),
      });
      const wrapper = shallowMount (AuthenticationDefault);
  
      const userName = wrapper.find('span').text()
              
      expect(userName).toBe("John Doe")
    })

    it("should display login button when the user isn't authenticated", () => {
        
      mockedUseAuth0.mockReturnValue({
        isAuthenticated: ref(false),
      });
      const wrapper = shallowMount (AuthenticationDefault);
      
      const logout = wrapper.find('#imgLogout')
      const login = wrapper.find('#imgLogin')
            
      expect(login.exists()).toBe(true)
      expect(logout.exists()).toBe(false)
    })

    it("should display logout button when the user is authenticated", () => {
      mockedUseAuth0.mockReturnValue({
        isAuthenticated: ref(true),
        user: ref(user),
      });
      const wrapper = shallowMount (AuthenticationDefault);
              
      const logout = wrapper.find('#imgLogout')
      const login = wrapper.find('#imgLogin')
            
      expect(logout.exists()).toBe(true)
      expect(login.exists()).toBe(false)
    })

    it("should run the auth0 login function", async () => {
      mockedUseAuth0.mockReturnValue({
        isAuthenticated: ref(false),
        loginWithRedirect: jest.fn(),
      });
      const wrapper = shallowMount (AuthenticationDefault);
              
      await wrapper.find('#imgLogin').trigger('click')

      expect(useAuth0().loginWithRedirect).toHaveBeenCalled();
    })
    
    it("should run the auth0 logout function", async () => {
      mockedUseAuth0.mockReturnValue({
        isAuthenticated: ref(true),
        user: ref(user),
        logout: jest.fn(),
      });
      const wrapper = shallowMount (AuthenticationDefault);
              
      await wrapper.find('#imgLogout').trigger('click')

      expect(useAuth0().logout).toHaveBeenCalled();
    })
  })
})