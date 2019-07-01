import React from 'react'
import Enzyme, { shallow, mount, render } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import SearchBox from './SearchBox'

Enzyme.configure({ adapter: new Adapter() })

describe('Number of tags inside the component', () => {
    it('should return the rendered components', () => {
        const wrapper = shallow(<SearchBox />).find('.searchBox').children().length
        expect(wrapper).toBe(6)
    })
})


describe('Test button searchBtn', () => {
    it('should return true if triggered', () => {
        let isTriggered = false
        const wrapper = shallow(<SearchBox showFav={() => {isTriggered = true}} click={() => {isTriggered = true}} />)
        wrapper.find('#searchBtn').simulate('click')
        expect(isTriggered).toBe(true)
    })
})

describe('Test button showFavBtn', () => {
    it('should return true if triggered', () => {
        let isTriggered = false
        const wrapper = shallow(<SearchBox showFav={() => {isTriggered = true}} click={() => {isTriggered = true}} />)
        wrapper.find('#showFavBtn').simulate('click')
        expect(isTriggered).toBe(true)
    })
})

describe('Test input searchInput', () => {
    it('should return true if triggered', () => {
        let isTriggered = false
        const wrapper = shallow(<SearchBox change={() => {isTriggered = true}} changeIndex={() => {isTriggered = true}} />)
        wrapper.find('#searchInput').simulate('change')
        expect(isTriggered).toBe(true)
    })
})

describe('Test button showFavBtn', () => {
    it('should return true if triggered', () => {
        let isTriggered = false
        const wrapper = shallow(<SearchBox change={() => {isTriggered = true}} changeIndex={() => {isTriggered = true}} />)
        wrapper.find('#searchIndexInput').simulate('change')
        expect(isTriggered).toBe(true)
    })
})