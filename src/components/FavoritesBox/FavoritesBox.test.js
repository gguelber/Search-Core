import React from 'react'
import Enzyme, { shallow, mount, render } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import FavoritesBox from './FavoritesBox'

Enzyme.configure({ adapter: new Adapter() })

describe('Test favItem.map() to render <SearchItem />', () => {
    it('should create 1 <SearchItem /> component', () => {
        const fakeArray = []
        const fakePaginationArray = []
        const obj1 = {id: 1, title: 1, authors: 1, types: 1, description: 1, urls: 1}
        fakeArray.push(obj1)
        fakePaginationArray.push(1)
        const wrapper = shallow(<FavoritesBox favItem={fakeArray} paginationArray={fakePaginationArray} />).find('div').childAt(3).text()
        expect(wrapper).toBe('<SearchItem />')
    })
})

describe('Test paginationArray.map() to render <li></li>', () => {
    it('should return true if the <li></li> tag was created with correct class', () => {
        const fakeArray = []
        const fakePaginationArray = []
        const obj1 = {id: 1, title: 1, authors: 1, types: 1, description: 1, urls: 1}
        fakeArray.push(obj1)
        fakePaginationArray.push(1)
        const wrapper = shallow(<FavoritesBox favItem={fakeArray} paginationArray={fakePaginationArray} />).find('ul').first().childAt(0).hasClass('paginationItem')
        expect(wrapper).toBe(true)
    })
})

describe('Test paginationArray.map() to render <button></button>', () => {
    it('should return true if the <button></button> tag was created with correct class', () => {
        const fakeArray = []
        const fakePaginationArray = []
        const obj1 = {id: 1, title: 1, authors: 1, types: 1, description: 1, urls: 1}
        fakeArray.push(obj1)
        fakePaginationArray.push(1)
        const wrapper = shallow(<FavoritesBox favItem={fakeArray} paginationArray={fakePaginationArray} />).find('ul').first().childAt(0).childAt(0).hasClass('paginationBtn')
        expect(wrapper).toBe(true)
    })
})


describe('Test button topBtn', () => {
    it('should return true if triggered', () => {
        const fakeArray = []
        const fakePaginationArray = []
        const obj1 = {id: 1, title: 1, authors: 1, types: 1, description: 1, urls: 1}
        fakeArray.push(obj1)
        fakePaginationArray.push(1)
        let isTriggered = false
        const wrapper = shallow(<FavoritesBox paginate={() => {isTriggered = true}} favItem={fakeArray} paginationArray={fakePaginationArray} />)
        wrapper.find('#topBtn').simulate('click')
        expect(isTriggered).toBe(true)
    })
})
describe('Test button bottomBtn', () => {
    it('should return true if triggered', () => {
        const fakeArray = []
        const fakePaginationArray = []
        const obj1 = {id: 1, title: 1, authors: 1, types: 1, description: 1, urls: 1}
        fakeArray.push(obj1)
        fakePaginationArray.push(1)
        let isTriggered = false
        const wrapper = shallow(<FavoritesBox paginate={() => {isTriggered = true}} favItem={fakeArray} paginationArray={fakePaginationArray} />)
        wrapper.find('#bottomBtn').simulate('click')
        expect(isTriggered).toBe(true)
    })
})
