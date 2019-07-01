import React from 'react'
import Enzyme, { shallow, mount, render } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import LoginBox from './LoginBox'

Enzyme.configure({ adapter: new Adapter() })

describe('Test login button', () => {
    it('should return true if triggered', () => {
        let isTriggered = false
        const wrapper = shallow(<LoginBox click={() => {isTriggered = true}} />)
        wrapper.find('button').simulate('click')
        expect(isTriggered).toBe(true)
    })
})

describe('Check if Form has 2 inputs', () => {
    it('should return 2', () => {
        const wrapper = shallow(<LoginBox />).find('input').length
        expect(wrapper).toBe(2)
    })
})

