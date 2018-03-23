const tap = require('tap')
const Zuid = require('./zuid')

tap.test('generate', (t) => {
	t.test('zuid structure is valid', (t) => {
		const zuid = Zuid.generate(8)
		const parts = zuid.split('-')

		if (Number(parts[0])) {
				t.pass('Component 1 should be a number')
		}

		t.throws(() => {
			Zuid.generate(8, 5)
		}, 'Suffix length must be between 6 and 35')

		// Check component length
		if (parts[0].length > 5) {
			t.fail('Component 1 can not be more than 5 characters')
		} else {
			t.pass('Component 1 is 5 characters or less')
		}
		if (parts[1].length === 10) {
			t.pass('Component 2 is 10 characters')
		} else {
			t.fail('Component 2 must be 10 characters')
		}
		if (parts[2].length > 35) {
			t.fail('Component 3 can not be more than 35 characters')
		} else {
			t.pass('Component 3 is 35 characters or less')
		}

		t.ok(zuid)
		t.end()
	})

	t.test('zuids are unique', (t) => {
		zuid1 = Zuid.generate(8)
		zuid2 = Zuid.generate(8)

		t.notEqual(zuid1, zuid2)
		t.end()
	})

	t.test('zuid time portions are unique', (t) => {
		zuid1 = Zuid.generate(8)
		zuid2 = Zuid.generate(8)

		console.log(zuid1)
		console.log(zuid2)

		parts1 = zuid1.split('-')
		parts2 = zuid2.split('-')

		t.notEqual(parts1[1], parts2[1])
		t.end()
	})

	t.test('zuid is not longer than 50 characters', (t) => {
		const zuid = Zuid.generate(100, 35)
		if (zuid.length > 50) {
			t.fail('zuid is longer than 50 characters')
		}

		t.end()
	})

	t.end('end `generate` function tests')
})

tap.test('isValid', (t) => {
	const zuid1 = Zuid.generate(100, 35)
	const valid1 = Zuid.isValid(zuid1)
	if (valid1) {
		t.pass('zuid is valid')
	}

	const zuid2 = Zuid.generate(1000, 35)
	const valid2 = Zuid.isValid(zuid2)
	if (!valid2) {
		t.pass('expected to fail: invalid length')
	}

	const valid3 = Zuid.isValid(100000000)
	if (!valid3) {
		t.pass('expected to fail: invalid zuid')
	}

	t.end('end `isValid` function tests')
})

tap.test('matches', (t) => {
	const zuid = Zuid.generate(100, 35)
	if (Zuid.matches(zuid, 100)) {
		t.pass('Prefix matches created zuid')
	}

	t.end('end `matches` function tests')
})
