import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect, { createSpy, spyOn, isSpy } from 'expect';
import Enzyme, { mount, simulate } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import { PrivateHeader } from './PrivateHeader';

if(Meteor.isClient) {
	describe('PrivateHeader', function() {
		it('should set button text to LOGOUT', function() {
			const wrapper = mount( <PrivateHeader title='Testing' handleLogout={() => {}} /> );
			const buttonText = wrapper.find('.button').text();

			expect(buttonText).toBe('LOGOUT')
		});

		it('should display title prop as h1', function() {
			const title = 'Testing Title';
			const wrapper = mount( <PrivateHeader title={title} handleLogout={() => {}} /> );
			const h1 = wrapper.find('h1').text()

			expect(h1).toBe(title)
		});

		// it('should call the logout function', function() {
		// 	const spy = expect.createSpy();
		// 	spy();
		// 	expect(spy).toHaveBeenCalled();
		// });

		it('should handle logout on click', function() {
			const spy = expect.createSpy();
			const wrapper = mount( <PrivateHeader title='Testing' handleLogout={spy} /> );

			wrapper.find('button').simulate('click');

			expect(spy).toHaveBeenCalled();
		})
	})
}