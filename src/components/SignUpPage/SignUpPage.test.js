import React from 'react'
import Enzyme, { shallow, mount, render } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import SignUpPage from './SignUpPage'

Enzyme.configure({ adapter: new Adapter() })

describe('SignUpPage', () => {
    it('should show components as text', () => {
      const wrapper = shallow(<SignUpPage signUp={() => {}} />)
      const component = wrapper.find('.loginBox').children('button')
      expect(component.text()).toBe('Register')
    })
  })
describe('SignUpPage 2', () => {
    it('should show how many input tags are there', () => {
      const wrapper = shallow(<SignUpPage signUp={() => {}} />)
      const component = wrapper.find('.loginBox').children('input')
      expect(component.length).toBe(3)
    })
  })
describe('SignUpPage 3', () => {
    it('should show the total tags that are rendered', () => {
      const wrapper = shallow(<SignUpPage signUp={() => {}} />)
      const component = wrapper.find('div').children()
      expect(component.length).toBe(7)
    })
  })
describe('SignUpPage 4', () => {
    it('should test button onClick function', () => {
      let hasBeenClicked = false  
      const wrapper = shallow(<SignUpPage signUp={() => {hasBeenClicked = true}} />)
      const component = wrapper.find('button')
      component.simulate('click')
      expect(hasBeenClicked).toBe(true)
    })
  })