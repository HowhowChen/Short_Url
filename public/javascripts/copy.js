const copyBtn = document.querySelector('#copy-btn')
const shortUrl = document.querySelector('#short-url')

copyBtn.addEventListener('click', function onShortBtnClicked(event) {
  navigator.clipboard.writeText(shortUrl.textContent)
})
