import React from 'react'
import Enzyme, { shallow, mount, render } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import ResultsBox from './ResultsBox'

Enzyme.configure({ adapter: new Adapter() })

describe('Test .map() to render <SearchItem />', () => {
    it('should create 1 <SearchItem /> component', () => {
        const fakeArray = []
        const obj1 = {id: 1, title: 1, authors: 1, types: 1, description: 1, urls: 1}
        fakeArray.push(obj1)
        const wrapper = shallow(<ResultsBox items={fakeArray}/>).find('.resultsBox').childAt(1).text()
        expect(wrapper).toBe('<SearchItem />')
    })
})


describe('Test button previousBtn', () => {
    it('should return true if triggered', () => {
        const fakeArray = []
        const obj1 = {id: 1, title: 1, authors: 1, types: 1, description: 1, urls: 1}
        fakeArray.push(obj1)
        let isTriggered = false
        const wrapper = shallow(<ResultsBox items={fakeArray} previousPage={() => {isTriggered = true}} />)
        wrapper.find('#previousBtn').simulate('click')
        expect(isTriggered).toBe(true)
    })
})

describe('Test button nextBtn', () => {
    it('should return true if triggered', () => {
        const fakeArray = []
        const obj1 = {id: 1, title: 1, authors: 1, types: 1, description: 1, urls: 1}
        fakeArray.push(obj1)
        let isTriggered = false
        const wrapper = shallow(<ResultsBox items={fakeArray} nextPage={() => {isTriggered = true}} />)
        wrapper.find('#nextBtn').simulate('click')
        expect(isTriggered).toBe(true)
    })
})
