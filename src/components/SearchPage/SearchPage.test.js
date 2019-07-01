import React from 'react'
import Enzyme, { shallow, mount, render } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import SearchPage from './SearchPage'

Enzyme.configure({ adapter: new Adapter() })

describe('Default Return', () => {
    it('should return the rendered components', () => {
        const wrapper = shallow(<SearchPage />).find('div')
        expect(wrapper.text()).toBe('<SearchBox />')
    })
})

describe('Function Test', () => {
    it('should test fetchItems', async () => {
        const input = 'biotecnologia'
        const searchIndex = 1
        await fetch('http://localhost:3000/api/search', {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDE0YWIwYzI0NTFkNjMzZjQ0ZjdlM2EiLCJpYXQiOjE1NjE5Mjc1MDV9.rRKMiCgIeYhMe2mVfH3ktfeHvCCxaLzql8AL8WeVkwc'
            },
            body: JSON.stringify({
            searchInput: input,
            indexPage: searchIndex
            })
        }).then(res => {
            return res.json()
        }).then(response => {
            expect(response.data.length).toEqual(10)
        }).catch(err => {
            console.log(err)
        })
            
    }, 30000)
})

