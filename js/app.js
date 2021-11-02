const info = document.getElementById('info');
const labelInfo = document.getElementById('label-info');
const min = document.getElementById('min');
const max = document.getElementById('max');
const generateBtn = document.getElementById('generate');
const resetBtn = document.getElementById('reset');
const numbers = [];

// ======================= //
resetBtn.addEventListener('click', reset);
generateBtn.addEventListener('click', generate);

// ======================= //
function isValidRange(min, max) {
   switch (true) {
      case (typeof min !== 'number' || typeof max !== 'number'):
         return false;
      case (!isFinite(min) || !isFinite(max)):
         return false;
      case (min % 1 !== 0 || max % 1 !== 0):
         return false;
      case (max <= min):
         return false;
      case (min < -1000000000 || max > 1000000000):
         return false;
      default:
         return true;
   }
}

function generate(event) {
   event.preventDefault();
   const minValue = min.value.length === 0 ? '' : Number(min.value);
   const maxValue = max.value.length === 0 ? '' : Number(max.value);

   if (!isValidRange(minValue, maxValue)) {
      info.innerText = 'Error!';
      info.classList.add('over');
      labelInfo.classList.add('over');
      return;
   }

   const difference = maxValue - minValue + 1;
   while (true) {
      const randomNumber = getRandomNumberMinMax(minValue, maxValue);

      if (numbers.length === difference) {
         generateBtn.setAttribute('disabled', 'disabled');
         min.setAttribute('disabled', 'disabled');
         max.setAttribute('disabled', 'disabled');
         info.innerText = 'Elements are over!';
         info.classList.add('over');
         labelInfo.classList.add('over');
         break;
      }

      if (!numbers.includes(randomNumber)) {
         numbers.push(randomNumber);
         info.innerText = randomNumber;
         info.classList.remove('over');
         labelInfo.classList.remove('over');
         break;
      }
   }
}

function reset(event) {
   event.preventDefault();
   info.innerText = '';
   min.value = '';
   max.value = '';
   info.classList.remove('over');
   labelInfo.classList.remove('over');
   numbers.length = 0;
   generateBtn.removeAttribute('disabled');
   min.removeAttribute('disabled');
   max.removeAttribute('disabled');
}

function getRandomNumberMinMax(min, max) {
   return Math.floor(Math.random() * (max - min + 1)) + min;
}