import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import PrivateHeader from './PrivateHeader';

if(Meteor.isClient) {
	describe('PrivateHeader', function() {
		it('should set button text to LOGOUT', function() {
			const wrapper = mount( <PrivateHeader title='Testing' /> );
			const buttonText = wrapper.find('.button').text();

			expect(buttonText).toBe('LOGOUT')
		})

		it('should display title prop as h1', function() {
			const title = 'Testing Title';
			const wrapper = mount( <PrivateHeader title={title} /> );
			const h1 = wrapper.find('h1').text()

			expect(h1).toBe(title)
		})
	})
}