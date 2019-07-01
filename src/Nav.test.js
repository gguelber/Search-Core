import React from 'react'
import Enzyme, { shallow, mount, render } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Nav from './Nav'

Enzyme.configure({ adapter: new Adapter() })

describe('Nav', () => {
  it('should show components as text', () => {
    const wrapper = shallow(<Nav />)
    const component = wrapper.find('nav')
    expect(component.text()).toBe('<Link /><Link /><Link /><Link />')
  })
})

describe('Test search link click', () => {
    it('should return true if triggered', () => {
        let isTriggered = false
        const wrapper = shallow(<Nav search={() => isTriggered = true} />)
        wrapper.find('ul').childAt(0).simulate('click')
        expect(isTriggered).toBe(true)
    })
})

describe('Test login link click', () => {
    it('should return true if triggered', () => {
        let isTriggered = false
        const wrapper = shallow(<Nav login={() => {isTriggered = true}} />)
        wrapper.find('ul').childAt(1).simulate('click')
        expect(isTriggered).toBe(true)
    })
})

describe('Test register link click', () => {
    it('should return true if triggered', () => {
        let isTriggered = false
        const wrapper = shallow(<Nav register={() => {isTriggered = true}} />)
        wrapper.find('ul').childAt(2).simulate('click')
        expect(isTriggered).toBe(true)
    })
})

describe('Test logout link click', () => {
    it('should return true if triggered', () => {
        let isTriggered = false
        const wrapper = shallow(<Nav logout={() => {isTriggered = true}} />)
        wrapper.find('ul').childAt(3).simulate('click')
        expect(isTriggered).toBe(true)
    })
})