'use strict';

const $urlInput = document.querySelector('[name="url"]');
const $sizeSelector = document.querySelector('[name="size"]');
const $colorPicker = document.querySelector('[name="color"]');
const $form = document.querySelector('form');
const $qrCodeContainer = document.querySelector('.qr-code-container');

const handleGenerator = e => {
	e.preventDefault();

	const url = $urlInput.value;
	const size = Number($sizeSelector.value);
	const color = $colorPicker.value;

	const isValidUrl = /^(ftp|http|https):\/\/[^ "]+$/.test(url);

	if (isValidUrl && size) {
		$qrCodeContainer.innerHTML = '';
		new QRCode($qrCodeContainer, {
			text: url,
			width: size,
			height: size,
			colorDark: color,
			colorLight: '#ffffff',
			correctLevel: QRCode.CorrectLevel.H,
		});
	}
};

$form.addEventListener('submit', handleGenerator, false);
