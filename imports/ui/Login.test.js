import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect, { createSpy, spyOn, isSpy } from 'expect';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// import { MemoryRouter } from 'react-router-dom';

Enzyme.configure({ adapter: new Adapter() });

import { Login } from './Login';

if(Meteor.isClient) {
	describe('Login', function() {
		it('should show error message', function() {
			const error = 'This aint working';
			// const wrapper = mount(
   //      <MemoryRouter initialEntries={['/']} initialIndex={0}>
   //          <Login loginWithPassword={() => { }} />
   //      </MemoryRouter>
   //  	);
			const wrapper = shallow( <Login loginWithPassword={() => {}} /> );

			wrapper.setState({ error });
			const text = wrapper.find('p').text();

			expect(text).toBe(error)

			wrapper.setState({ error: ''})
			expect(wrapper.find('p').length).toBe(0)
		})

		it('should call loginWithPassword with the form data', function() {
			const email = 'bel@example.com';
			const password = 'passwords';
			const spy = expect.createSpy();
			const wrapper = shallow( <Login loginWithPassword={ spy } /> )
		
	    // wrapper.find('input[name="email"]').value = email;
	    // wrapper.find('input[name="password"]').value = password;
	    const emailInput = wrapper.find('input[name="email"]');
	    emailInput.value = email;

	    const passwordInput = wrapper.find('input[name="password"]');
	    passwordInput.value = password;
	    // debugger
	    wrapper.find('form').simulate('submit', { preventDefault () {} });
			console.log('hello')
			console.log(spy.calls)
			expect(spy.calls[0].arguments[0]).toEqual({email});
			expect(spy.calls[0].arguments[1]).toBe(password);
		})

		it('should set loginWithPassword callback errors', function() {
			const spy = expect.createSpy();
			const wrapper = shallow( <Login loginWithPassword={ spy } /> )

			wrapper.find('form').simulate('submit', { preventDefault () {} })

			spy.calls[0].arguments[2]({})
			expect(wrapper.state('error')).toNotBe('')

			spy.calls[0].arguments[2]()
			expect(wrapper.state('error')).toBe(0)

		})

	})
}