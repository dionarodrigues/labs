(function () {

  function makeMarkup($parent) {    
    const buttonMarkup = `
      <div class="button-speed">
        <button type="button" class="button-speed__btn">
          <span>1x</span>
        </button>
        <ul class="button-speed__list">
          <li>
            <button type="button" data-speed="1" class="button-speed__btn-option active">Normal</button>
          </li>
          <li>
            <button type="button" data-speed="1.25" class="button-speed__btn-option">1.25x</button>
          </li>
          <li>
            <button type="button" data-speed="1.5" class="button-speed__btn-option">1.5x</button>
          </li>
          <li>
            <button type="button" data-speed="1.75" class="button-speed__btn-option">1.75x</button>
          </li>
          <li>
            <button type="button" data-speed="2" class="button-speed__btn-option">2x</button>
          </li>
        </ul>
      </div>
    `;

    $parent.insertAdjacentHTML("beforeend", buttonMarkup);

    const elements = {
      button: $parent.querySelector('.button-speed__btn'), 
      list: $parent.querySelector('.button-speed__list'), 
      speedOptions: $parent.querySelectorAll(".button-speed__btn-option"),
      buttonContainer: $parent.querySelector('.button-speed'),
    }    

    return {
      elements: elements,
    }
  }


  const interval = setInterval(() => {
    const $header = document.querySelector('#side > header');    

    if( $header ) {
      clearInterval(interval);
      const $side = document.querySelector('#side');

      const component = makeMarkup($header).elements;

      const $buttonContainer = component.buttonContainer;
      const $button = component.button; 
      const $list = component.list; 
      const $speedOptions = component.speedOptions;        

      $button.addEventListener("click", () => { 
        if(getComputedStyle($list, null).display == 'none') {
          $list.classList.add('show');
          $button.classList.add('active');
        } else {
          $list.classList.remove('show');
          $button.classList.remove('active');
        }
      });
      
      document.addEventListener('click', function(event) {
        var isClickInside = $buttonContainer.contains(event.target);      
        if (!isClickInside) {
          $list.classList.remove('show');
          $button.classList.remove('active');
        }
      });

      $speedOptions.forEach($btn => {
        const speed = $btn.dataset.speed;
        $btn.addEventListener("click", () => {
          const audios = document.querySelectorAll("audio");
          $button.querySelector('span').innerHTML = `${speed}x`;

          $speedOptions.forEach($btn => $btn.classList.remove('active'));
          $btn.classList.add('active');

          audios.forEach(audio => {
            audio.playbackRate = speed;
          });
        });
      }); 

      $side.addEventListener('click', function(event) {
        let speed;

        const audiosInterval = setInterval(() => {
          const audios = document.querySelectorAll("audio"); 
          if(audios) {
            clearInterval(audiosInterval);
            $speedOptions.forEach(el => {
              if(el.classList.contains('active')) {
                speed = el.dataset.speed;
                console.log(speed)
    
                audios.forEach(audio => {
                  audio.playbackRate = speed;
                });
              }          
            })
          } 
        }, 1000) 
      });

    }
  }, 1000); 

})();