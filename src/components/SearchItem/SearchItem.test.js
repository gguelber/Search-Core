import React from 'react'
import Enzyme, { shallow, mount, render } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import SearchItem from './SearchItem'

Enzyme.configure({ adapter: new Adapter() })

describe('Number of tags inside the component', () => {
    it('should return the rendered components', () => {
        const propsUrl = 'https://google.com'
        const wrapper = shallow(<SearchItem urls={propsUrl} />).find('.searchItem').children().length
        expect(wrapper).toBe(12)
    })
})

describe('Check All Texts', () => {
    it('should check each tag text', () => {
        const propsUrl = 'https://google.com'
        const classArray = ['Title', 'Test Article', 'Authors', 'Gustavo', 'Type', 'Article', 'Description', 'Nice article from Brazil', `Url's`, propsUrl, '', ' Remove']
        const wrapperArray = []
        const wrapper = shallow(<SearchItem urls={propsUrl} 
            title='Test Article' 
            authors='Gustavo' 
            type='Article' 
            description='Nice article from Brazil' 
            id='1' 
            btnName='Remove'
            clickFav={() => {}}/>).find('.searchItem').children()
        wrapper.map(name => {
            wrapperArray.push(name.text())
        })
        expect(classArray).toStrictEqual(wrapperArray)
    })
})

describe('Test button onClick', () => {
    it('should return true if triggered', () => {
        let isTriggered = false
        const wrapper = shallow(<SearchItem clickFav={() => {isTriggered = true}} />)
        wrapper.find('button').simulate('click')
        expect(isTriggered).toBe(true)
    })
})
