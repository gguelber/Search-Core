import React from 'react'
import Enzyme, { shallow, mount, render } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import UserList from './UserList'

Enzyme.configure({ adapter: new Adapter() })

describe('Test .map() to render <li></li> tag', () => {
    it('should create 1 <li></li> tag', () => {
        const fakeArray = []
        const obj1 = {_id: 1, name: 'Gustavo'}
        fakeArray.push(obj1)
        const wrapper = shallow(<UserList users={fakeArray}/>).find('ul').childAt(0).text()
        expect(wrapper).toBe('Gustavo')
    })
})

describe('Check main div', () => {
    it('should return true if the correct class is assigned', () => {
        const fakeArray = []
        const obj1 = {_id: 1, name: 'Gustavo'}
        fakeArray.push(obj1)
        const wrapper = shallow(<UserList users={fakeArray}/>).find('div').hasClass('userList')
        expect(wrapper).toBe(true)
    })
})