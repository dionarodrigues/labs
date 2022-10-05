'use strict';

const $billTotalInput = document.querySelector('[name="bill"]');
const $tipTotalInput = document.querySelector('[name="tip"]');
const $numberOfPeopleEl = document.querySelector('.peopleTotal');
const $result = document.querySelector('.result');

const $peopleDecreaseBtn = document.querySelector('.peopleDecreaseBtn');
const $peopleIncreaseBtn = document.querySelector('.peopleIncreaseBtn');

let peopleTotal = Number($numberOfPeopleEl.textContent);

const handleTotalPerPerson = (tipTotal, billTotal, peopleTotal) => {
	const tipPercentage = Number(tipTotal) / 100;
	const tipAmount = Number(billTotal) * tipPercentage;
	const total = (tipAmount + billTotal) / peopleTotal;

	return total;
};

const updateResultUI = result => ($result.innerHTML = result);

const calculateBill = () => {
	const billTotal = Number($billTotalInput.value);
	const tipTotal = Number($tipTotalInput.value);

	const total = handleTotalPerPerson(tipTotal, billTotal, peopleTotal);
	updateResultUI(total.toFixed(2));
};

const increasePeople = () => {
	peopleTotal += 1;
	$numberOfPeopleEl.textContent = peopleTotal;
	calculateBill();
};

const decreasePeople = () => {
	if (peopleTotal > 1) {
		peopleTotal -= 1;
		$numberOfPeopleEl.textContent = peopleTotal;
		calculateBill();
	}
};

const handleInputChange = () => {
	calculateBill();
};

$peopleIncreaseBtn.addEventListener('click', increasePeople);
$peopleDecreaseBtn.addEventListener('click', decreasePeople);
$billTotalInput.addEventListener('keyup', handleInputChange);
$tipTotalInput.addEventListener('keyup', handleInputChange);
