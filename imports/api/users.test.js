import expect from 'expect';
import { Meteor } from 'meteor/meteor';

import { validateNewUser } from './users'

if (Meteor.isServer) {
	describe('users', function() {
		it('should allow valid email address', function() {
			const testUser = {
				emails: [
					{ address: 'test@example.com' }
				]
			};
			const res = validateNewUser(testUser)

			expect(res).toBe(true)
		});

		it('should reject invalid email', function() {
			const testUser = {
				emails: [
					{ address: 'testing' }
				]
			};
			
			expect( () => {
				validateNewUser(testUser)
			}).toThrow()
		})
	});
}



// const add = (a, b) => {
// 	if(typeof b !== 'number') {
// 		return a + a;
// 	}

// 	return a + b
// };

// const square = (n) => {
// 	return n * n;
// }

// describe('add', function() {
// 	it('should add two numbers', function() {
// 		const result = add(2, 3)

// 		expect(result).toBe(5)
// 	})

// 	it('should double a single number', function(){
// 		const result = add(2)

// 		expect(result).toBe(4)
// 	})
// })

// describe('square', function() {
// 	it('should square the number', function(){
// 		const result = square(10)

// 		expect(result).toBe(100)
// 	})
// })



