document.addEventListener('DOMContentLoaded', () => {
	new Clock({ selector: '#clock' });
})

class Clock {
	constructor({ selector, hasReverse = false }) {
		this.date = new Date();
		this.clockEl = document.querySelector(selector);
		this.hasReverse = hasReverse;

		this.init();
	}

	init() {
		const span = document.createElement('span');
		const div = document.createElement('div');
		const button = document.createElement('button');

		this.clockEl.classList.add('clock');

		this.clock_wrap = div.cloneNode();
		this.clock_wrap.classList.add('clock__digits');

		this.hours = span.cloneNode();
		this.hours.classList.add('clock__hours');
		this.mins = span.cloneNode();
		this.mins.classList.add('clock__mins');
		this.secs = span.cloneNode();
		this.secs.classList.add('clock__secs');
		this.msesc = span.cloneNode();
		this.msesc.classList.add('clock__msesc');
		this.clock_wrap.append(this.hours, this.mins, this.secs, this.msesc);

		this.clock_buttons_wrap = div.cloneNode();
		this.clock_buttons_wrap.classList.add('clock__buttons');
		this.button_start = button.cloneNode();
		this.button_start.classList.add('clock__button');
		this.button_start.textContent = 'Start';
		this.button_start.addEventListener('click', () => {
			this.start();
			this.clockEl.classList.remove('stopped');
		});
		this.clock_buttons_wrap.append(this.button_start);

		this.button_stop = button.cloneNode();
		this.button_stop.classList.add('clock__button');
		this.button_stop.textContent = 'Stop';
		this.button_stop.addEventListener('click', () => {
			this.stop();
			this.clockEl.classList.add('stopped');
		});
		this.clock_buttons_wrap.append(this.button_stop);

		if (this.hasReverse) {
			this.button_reverse = button.cloneNode();
			this.button_reverse.classList.add('clock__button');
			this.button_reverse.textContent = 'Reverse';
			this.button_reverse.addEventListener('click', () => {
				this.reverse();
				this.clockEl.classList.remove('stopped');
			});
			this.clock_buttons_wrap.append(this.button_reverse);
		}

		this.clockEl.append(this.clock_wrap, this.clock_buttons_wrap);

		this.timer = null;
		this.start();
	}

	start() {
		if (this.timer) {
			clearInterval(this.timer);
		}

		this.updateTime('up', true)
		this.timer = setInterval(() => this.updateTime('up', false), 5);
		this.button_start.disabled = true;
		this.button_stop.disabled = false;

		if (this.hasReverse) {
			this.button_reverse.disabled = false;
		}
	}

	stop() {
		clearInterval(this.timer);
		this.timer = null;
		this.button_start.disabled = false;
		this.button_stop.disabled = true;

		if (this.hasReverse) {
			this.button_reverse.disabled = false;
		}
	}

	reverse() {
		if (this.timer) {
			clearInterval(this.timer);
		}

		this.updateTime('down', true)
		this.timer = setInterval(() => this.updateTime('down', false), 5);
		this.button_start.disabled = false;
		this.button_stop.disabled = false;

		if (this.hasReverse) {
			this.button_reverse.disabled = true;
		}
	}

	updateTime(direction, first_start) {
		if (!first_start) {
			if (direction === 'up') {
				this.date.setTime(this.date.getTime()+5)
			} else if (direction === 'down') {
				this.date.setTime(this.date.getTime()-5)
			} else return;
		}

		this.hours.textContent = this.addZero(this.date.getHours(), 2) + ':';
		this.mins.textContent = this.addZero(this.date.getMinutes(), 2) + ':';
		this.secs.textContent = this.addZero(this.date.getSeconds(), 2) + ':';
		this.msesc.textContent = this.addZero(this.date.getMilliseconds(), 3);
	}

	addZero(value, digits) {
		if (digits === 2 || digits === 3) {
			switch (digits) {
				case 2:
					return value < 10 ? '0' + value : value;
				case 3:
					if (value < 10)
						return '00' + value
					else if (value >= 10 && value < 100)
						return '0' + value
					else
						return value
			}
		} else {
			return value;
		}
	}
}
