// order bin inc dec button
function decrement(e) {
    const btn = e.target.parentNode.parentElement.querySelector(
      'button[data-action="decrement"]'
    );
    const target = btn.nextElementSibling;
    let value = Number(target.value);
    value--;
    target.value = value;
    
  }

  function increment(e) {
    const btn = e.target.parentNode.parentElement.querySelector(
      'button[data-action="decrement"]'
    );
    const target = btn.nextElementSibling;
    let value = Number(target.value);
    value++;
    target.value = value;
  }

  const decrementButtons = document.querySelectorAll(
    `button[data-action="decrement"]`
  );

  const incrementButtons = document.querySelectorAll(
    `button[data-action="increment"]`
  );

  decrementButtons.forEach(btn => {
    btn.addEventListener("click", decrement);
  });

  incrementButtons.forEach(btn => {
    btn.addEventListener("click", increment);
  });


// counter in rewards

      const counters = document.querySelectorAll('.counter');

      counters.forEach(counter => {
      function updateCount() {
         const target = +counter.getAttribute('data-count');
         const count = +counter.innerHTML;

         const inc = Math.floor((target - count) / 100);

         if (count < target && inc > 0) {
            counter.innerHTML = (count + inc);
            setTimeout(updateCount, 1);
         }
         else {
            counter.innerHTML = target;
         }
      }
      updateCount();
      });