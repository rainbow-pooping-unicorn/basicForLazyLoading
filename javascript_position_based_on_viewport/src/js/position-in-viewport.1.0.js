/*!
 * PositionInViewport plugin
 * Author: Berit Haak
 * Version: 1.0
 */

(function() {

   function positionInViewport(elementId) {

      // setting variable for getting the element by the given ID
      var myElement = document.getElementById(elementId);
      // setting variable for getting the actual scroll position
      var lastScrollPosition = window.scrollY;
      // setting variable for defining a default scroll direction
      var scrollDirection = 'down';

      // setting variables for firing events only one time per scroll direction
      var firedOnTopEventDownscrolling = false;
      var firedonTopEventUpscrolling = false;
      var firedonCenterEventDownscrolling = false;
      var firedonCenterEventUpscrolling = false;
      var firedonBottomEventDownscrolling = false;
      var firedonBottomEventUpscrolling = false;

      window.addEventListener('scroll', function (e) {

         //setting variables for current ScrollPosition && direction change
         var currentScrollPosition = window.scrollY;
         var scrollDirectionChange = false;

         // setting variables for getting the position && dimensions of the Element
         var r = myElement.getBoundingClientRect();
         var center = r.top + r.height / 2;
         //console.log(center);

         // setting variables for getting viewportHeights
         var viewportHeight = window.innerHeight;
         var halfViewportHeight = window.innerHeight/2;
         //console.log(halfViewportHeight);
         //console.log(viewportHeight);

         if (currentScrollPosition == lastScrollPosition) {

            if (scrollDirection == 'down') {
               scrollDirectionChange = false;

               if (firedOnTopEventDownscrolling === false && r.top < viewportHeight) {
                  firedOnTopEventDownscrolling = true;
               }
               if (firedonCenterEventDownscrolling === false && center < viewportHeight/2) {
                  firedonCenterEventDownscrolling = true;
               }
               if (firedonBottomEventDownscrolling === false && r.bottom < 0) {
                  firedonBottomEventDownscrolling = true;
               }
            }

         } if (currentScrollPosition < lastScrollPosition) {

            if (scrollDirection == 'down') {
               scrollDirectionChange = false;

               if (firedOnTopEventDownscrolling === false && r.top < viewportHeight) {
                  firedOnTopEventDownscrolling = true;
               }
               if (firedonCenterEventDownscrolling === false && center < viewportHeight/2) {
                   firedonCenterEventDownscrolling = true;
               }
               if (firedonBottomEventDownscrolling === false && r.bottom < 0) {
                   firedonBottomEventDownscrolling = true;
               }
            }
            if (scrollDirection == 'down') {
               scrollDirectionChange = true;

               if (r.top < viewportHeight) {
                  firedonTopEventUpscrolling = false;
               }
               if (center < viewportHeight/2) {
                  firedonCenterEventUpscrolling = false;
               }
               if (r.bottom < 0) {
                  firedonBottomEventUpscrolling = false;
               }
               if (firedonTopEventUpscrolling === false && r.top > viewportHeight) {
                  firedonTopEventUpscrolling = true;
               }
               if (firedonCenterEventUpscrolling === false && center > viewportHeight/2) {
                  firedonCenterEventUpscrolling = true;
               }
               if (firedonBottomEventUpscrolling === false && r.bottom > 0) {
                  firedonBottomEventUpscrolling = true;
               }
            }
            scrollDirection = 'up';

         } else {

            if (scrollDirection == 'up') {
               scrollDirectionChange = true;

               if (r.top > viewportHeight) {
                  firedOnTopEventDownscrolling = false;
               }
               if (center > viewportHeight/2) {
                  firedonCenterEventDownscrolling = false;
               }
               if (r.bottom > 0) {
                  firedonBottomEventDownscrolling = false;
               }
            }
            scrollDirection = 'down';

         }

         // difining new Events
         var onTopEvent = new Event('onTopEvent');
         var onCenterEvent = new Event('onCenterEvent');
         var onBottomEvent = new Event('onBottomEvent');

         // firing every Event in every direction only once
         // Top Event if top of the div will enter or disappear from the viewport(BOTTOM)
         if (r.top <= viewportHeight && scrollDirection == 'down' && firedOnTopEventDownscrolling === false) {
            // Dispatch/Trigger/Fire the event
            onTopEvent.scrollDirection = 'down';
            myElement.dispatchEvent(onTopEvent);
            console.log('top');
            firedOnTopEventDownscrolling = true;
         }
         if else (r.top >= viewportHeight && scrollDirection == 'up' && firedonTopEventUpscrolling === false) {
            // Dispatch/Trigger/Fire the event
            onTopEvent.scrollDirection = 'up';
            myElement.dispatchEvent(onTopEvent);
            console.log('top');
            firedonTopEventUpscrolling = true;
         }
         // Center Event if center of the div will enter or disappear in the center of the viewport
         if else (center <= viewportHeight/2 && scrollDirection == 'down' && firedonCenterEventDownscrolling === false) {
            // Dispatch/Trigger/Fire the event
            onCenterEvent.scrollDirection = 'down';
            myElement.dispatchEvent(onCenterEvent);
            console.log('center');
            firedonCenterEventDownscrolling = true;
         }
         if else (center >= viewportHeight/2 && scrollDirection == 'up' && firedonCenterEventUpscrolling === false) {
            // Dispatch/Trigger/Fire the event
            onCenterEvent.scrollDirection = 'down';
            myElement.dispatchEvent(onCenterEvent);
            console.log('center');
            firedonCenterEventUpscrolling = true;
         }
         // Bottom Event if bottom of the div will enter or disappear from the viewport(TOP)
         if else (r.bottom <= 0 && scrollDirection == 'down' && firedonBottomEventDownscrolling === false) {
            // Dispatch/Trigger/Fire the event
            onBottomEvent.scrollDirection = 'down';
            myElement.dispatchEvent(onBottomEvent);
            console.log('bottom');
            firedonBottomEventDownscrolling = true;
         }
         if else (r.bottom >= 0 && scrollDirection == 'up' && firedonBottomEventUpscrolling === false) {
            // Dispatch/Trigger/Fire the event
            onBottomEvent.scrollDirection = 'down';
            myElement.dispatchEvent(onBottomEvent);
            console.log('bottom');
            firedonBottomEventUpscrolling = true;
         }

         // setting the lastScrollPosition back to the currentScrollPosition
         lastScrollPosition = currentScrollPosition;

      });
   }

   positionInViewport('foo');

})();
