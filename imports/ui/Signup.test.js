import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect, { createSpy, spyOn, isSpy } from 'expect';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// import { MemoryRouter } from 'react-router-dom';

Enzyme.configure({ adapter: new Adapter() });

import { Signup } from './Signup';

if(Meteor.isClient) {
	describe('Signup', function() {
		it('should show error message', function() {
			const error = 'This aint working';
			// const wrapper = mount(
   //      <MemoryRouter initialEntries={['/']} initialIndex={0}>
   //          <Signup createUser={() => { }} />
   //      </MemoryRouter>
   //  	);
			const wrapper = shallow( <Signup createUser={() => {}} /> );

			wrapper.setState({ error });
			const text = wrapper.find('p').text();

			expect(text).toBe(error)

			wrapper.setState({ error: ''})
			expect(wrapper.find('p').length).toBe(0)
		})

		it('should call createUser with the form data', function() {
			const email = 'bel@example.com';
			const password = 'passwords';
			const spy = expect.createSpy();
			const wrapper = shallow( <Signup createUser={ spy } /> )

	    wrapper.find('input[name="email"]').value = email;
	    wrapper.find('input[name="password"]').value = password;

			wrapper.find('form').simulate('submit');
			expect(spy.calls[0].arguments[0]).toEqual({email, password});
		})

		it('should set error if short password', function() {
			const email = 'bel@example.com';
			const password = 'passwor';
			const spy = expect.createSpy();
			const wrapper = shallow( <Signup createUser={ spy } /> )

	    const emailInput = wrapper.find('input[name="email"]');
	    emailInput.value = email;

	    const passwordInput = wrapper.find('input[name="password"]');
	    passwordInput.value = password;

			wrapper.find('form').simulate('submit');

			expect(spy.calls[0].arguments[2]).toHaveLengthGreaterThan(0);
		})

		it('should set createUser callback errors', function() {
			const spy = expect.createSpy();
			const wrapper = shallow( <Signup createUser={ spy } /> )
		// const wrapper = mount(
   //      <MemoryRouter initialEntries={['/']} initialIndex={0}>
   //          <Signup createUser={() => { }} />
   //      </MemoryRouter>
   //  	);

			wrapper.find('form').simulate('submit')

			spy.calls[0].arguments[2]({})
			expect(wrapper.state('error')).toNotBe('')

			spy.calls[0].arguments[2]()
			expect(wrapper.state('error')).toBe(0)

		})

	})
}