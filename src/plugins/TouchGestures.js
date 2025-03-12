// src/plugins/TouchGestures.js
/**
 * Plugin TouchGestures para Vue 3
 *
 * Adiciona suporte a gestos de toque através da diretiva v-touch
 * Suporta: swipe, tap, doubletap, press, pinch
 *
 * Uso:
 * v-touch:swipe.left="handleLeftSwipe"
 * v-touch:tap="handleTap"
 * v-touch:pinch.in="handlePinchIn"
 * v-touch:press="handleLongPress"
 */

export default {
  install(app) {
    // Registrar a diretiva v-touch
    app.directive('touch', {
      mounted(el, binding) {
        // Extrair informações da diretiva
        const touchType = binding.arg || 'tap'; // 'swipe', 'tap', 'pinch', 'press'
        const handler = binding.value; // Função de callback

        // Obter direção do modificador (se houver)
        const modifiers = Object.keys(binding.modifiers || {});
        const direction = modifiers[0]; // 'left', 'right', 'up', 'down', 'in', 'out', 'double'

        // Verificar se o handler é uma função
        if (typeof handler !== 'function') {
          console.error(`v-touch:${touchType} requer uma função como valor`);
          return;
        }

        // Configurações de toque
        const state = {
          touchStartX: 0,
          touchStartY: 0,
          startTime: 0,
          touchStartDistance: 0,
          hasMoved: false,
          lastTapTime: 0
        };

        // Constantes para definição dos gestos
        const config = {
          swipeThreshold: 50,      // Distância mínima para considerar um swipe
          swipeTimeout: 300,       // Tempo máximo para um swipe (ms)
          tapThreshold: 200,       // Tempo máximo para um tap (ms)
          tapMoveThreshold: 10,    // Tolerância de movimento para um tap (pixels)
          doubleTapDelay: 300,     // Tempo entre taps para considerar double tap (ms)
          pressDelay: 600,         // Tempo mínimo para um long press (ms)
          pressThreshold: 8,       // Tolerância de movimento para press (pixels)
          pinchThresholdRatio: 0.1 // Mudança mínima de escala para detectar pinch
        };

        // Cria timer para long press
        let pressTimer = null;

        /**
         * Manipulador para inicio de toque
         */
        function touchStart(event) {
          // Armazenar as posições iniciais
          if (event.touches.length === 1) {
            const touch = event.touches[0];
            state.touchStartX = touch.clientX;
            state.touchStartY = touch.clientY;
            state.startTime = Date.now();
            state.hasMoved = false;

            // Iniciar timer para long press
            if (touchType === 'press') {
              clearTimeout(pressTimer);
              pressTimer = setTimeout(() => {
                if (!state.hasMoved) {
                  handler(event);
                }
              }, config.pressDelay);
            }
          }
          // Armazenar distância inicial para gestos de pinch
          else if (event.touches.length === 2 && touchType === 'pinch') {
            state.touchStartDistance = getTouchDistance(event.touches[0], event.touches[1]);
          }

          // Chamada para o manipulador personalizado 'touchstart', se existir
          if (touchType === 'touchstart') {
            handler(event);
          }
        }

        /**
         * Manipulador para movimento de toque
         */
        function touchMove(event) {
          // Não processar se não há toques
          if (!event.touches.length) return;

          const touch = event.touches[0];

          // Calcular diferença de movimento
          if (event.touches.length === 1) {
            const diffX = Math.abs(touch.clientX - state.touchStartX);
            const diffY = Math.abs(touch.clientY - state.touchStartY);

            // Detectar movimento significativo
            if (diffX > config.tapMoveThreshold || diffY > config.tapMoveThreshold) {
              state.hasMoved = true;

              // Cancelar timer de press se houver movimento significativo
              if (touchType === 'press' && diffX > config.pressThreshold || diffY > config.pressThreshold) {
                clearTimeout(pressTimer);
              }
            }

            // Prevenir comportamento padrão apenas para swipes horizontais quando solicitado
            if (touchType === 'swipe' && (direction === 'left' || direction === 'right')) {
              // Permitir scroll normal se o movimento for mais vertical do que horizontal
              if (diffY > diffX) {
                return;
              }

              // Prevenir comportamento padrão apenas para swipes horizontais significativos
              if (diffX > 10) {
                event.preventDefault();
              }
            }
          }
          // Processar movimento de pinch
          else if (event.touches.length === 2 && touchType === 'pinch') {
            // Prevenir zoom padrão do navegador
            event.preventDefault();

            // Calcular escala atual
            const currentDistance = getTouchDistance(event.touches[0], event.touches[1]);
            const scaleFactor = currentDistance / state.touchStartDistance;

            // Chamada para o manipulador personalizado 'pinchmove', se existir
            if (touchType === 'pinchmove') {
              handler(event, scaleFactor);
            }
          }

          // Chamada para o manipulador personalizado 'touchmove', se existir
          if (touchType === 'touchmove') {
            handler(event);
          }
        }

        /**
         * Manipulador para fim de toque
         */
        function touchEnd(event) {
          // Limpar timer de press
          clearTimeout(pressTimer);

          // Calcular duração do toque
          const touchDuration = Date.now() - state.startTime;

          // Se não há toques registrados, saímos
          if (!event.changedTouches || !event.changedTouches.length) return;

          const touch = event.changedTouches[0];
          const touchEndX = touch.clientX;
          const touchEndY = touch.clientY;

          // Calcular diferenças de movimento
          const diffX = touchEndX - state.touchStartX;
          const diffY = touchEndY - state.touchStartY;
          const absDiffX = Math.abs(diffX);
          const absDiffY = Math.abs(diffY);

          // Processar diferentes tipos de gestos
          switch (touchType) {
            // Gestos de swipe
            case 'swipe': {
              // Verificar se é um swipe válido: movimento suficiente e tempo adequado
              if ((absDiffX > config.swipeThreshold || absDiffY > config.swipeThreshold) &&
                  touchDuration < config.swipeTimeout) {

                // Determinar direção do swipe (horizontal ou vertical)
                const isHorizontal = absDiffX > absDiffY;
                let swipeDirection;

                if (isHorizontal) {
                  swipeDirection = diffX > 0 ? 'right' : 'left';
                } else {
                  swipeDirection = diffY > 0 ? 'down' : 'up';
                }

                // Executar callback se a direção coincidir ou se não foi especificada
                if (!direction || swipeDirection === direction) {
                  handler(event, { direction: swipeDirection, distance: isHorizontal ? absDiffX : absDiffY });
                }
              }
              break;
            }

            // Gestos de tap
            case 'tap': {
              // Verificar se foi um tap válido (movimento mínimo e duração curta)
              const minMovement = absDiffX < config.tapMoveThreshold &&
                                 absDiffY < config.tapMoveThreshold;

              if (minMovement && touchDuration < config.tapThreshold && !state.hasMoved) {
                // Verificar se é um double tap
                const currentTime = Date.now();
                const timeSinceLastTap = currentTime - state.lastTapTime;
                const isDoubleTap = timeSinceLastTap < config.doubleTapDelay;

                // Atualizar tempo do último tap
                state.lastTapTime = currentTime;

                // Executar callback se o tipo de tap coincidir
                if ((direction === 'double' && isDoubleTap) ||
                    (direction !== 'double' && !direction)) {
                  handler(event, { isDoubleTap });
                }
              }
              break;
            }

            // Gestos de pinch
            case 'pinch': {
              // Verificar se é fim de um pinch (dois dedos sendo removidos)
              if (event.touches.length === 0 && event.changedTouches.length === 2) {
                const touchEndDistance = getTouchDistance(
                  event.changedTouches[0],
                  event.changedTouches[1]
                );

                // Calcular escala final
                const scale = touchEndDistance / state.touchStartDistance;
                const scaleDiff = Math.abs(scale - 1);

                // Verificar se a mudança de escala é significativa
                if (scaleDiff > config.pinchThresholdRatio) {
                  const pinchType = scale < 1 ? 'in' : 'out';

                  // Executar callback se a direção coincidir ou se não foi especificada
                  if (!direction || pinchType === direction) {
                    handler(event, { scale, type: pinchType });
                  }
                }
              }
              break;
            }

            // Manipulador genérico para touchend
            default: {
              if (touchType === 'touchend') {
                handler(event);
              }
              break;
            }
          }
        }

        /**
         * Manipulador para cancelamento de toque
         */
        function touchCancel(event) {
          // Limpar timer de press
          clearTimeout(pressTimer);

          // Chamada para o manipulador 'touchcancel', se existir
          if (touchType === 'touchcancel') {
            handler(event);
          }
        }

        /**
         * Calcula a distância entre dois pontos de toque
         */
        function getTouchDistance(touch1, touch2) {
          return Math.hypot(
            touch1.clientX - touch2.clientX,
            touch1.clientY - touch2.clientY
          );
        }

        // Registrar os event listeners
        el.addEventListener('touchstart', touchStart, { passive: false });
        el.addEventListener('touchmove', touchMove, { passive: false });
        el.addEventListener('touchend', touchEnd, { passive: false });
        el.addEventListener('touchcancel', touchCancel, { passive: false });

        // Armazenar os handlers para remoção
        el._touchHandlers = {
          touchStart,
          touchMove,
          touchEnd,
          touchCancel
        };
      },

      // Remover event listeners quando o componente for desmontado
      unmounted(el) {
        if (el._touchHandlers) {
          el.removeEventListener('touchstart', el._touchHandlers.touchStart);
          el.removeEventListener('touchmove', el._touchHandlers.touchMove);
          el.removeEventListener('touchend', el._touchHandlers.touchEnd);
          el.removeEventListener('touchcancel', el._touchHandlers.touchCancel);
          delete el._touchHandlers;
        }
      },

      // Suporte à atualização da diretiva
      updated(el, binding) {
        // Se o handler ou argumento mudaram, remonta a diretiva
        if (binding.value !== binding.oldValue || binding.arg !== binding.oldArg) {
          // Desmonta
          if (el._touchHandlers) {
            el.removeEventListener('touchstart', el._touchHandlers.touchStart);
            el.removeEventListener('touchmove', el._touchHandlers.touchMove);
            el.removeEventListener('touchend', el._touchHandlers.touchEnd);
            el.removeEventListener('touchcancel', el._touchHandlers.touchCancel);
            delete el._touchHandlers;
          }

          // Remonta
          const mountedHook = app.directive('touch').mounted;
          if (mountedHook) {
            mountedHook(el, binding);
          }
        }
      }
    });

    // Métodos utilitários globais
    app.config.globalProperties.$touch = {
      /**
       * Verifica se o dispositivo é móvel
       * @returns {boolean}
       */
      isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      },

      /**
       * Verifica se o dispositivo suporta toque
       * @returns {boolean}
       */
      hasTouch() {
        return 'ontouchstart' in window ||
               navigator.maxTouchPoints > 0 ||
               navigator.msMaxTouchPoints > 0;
      },

      /**
       * Verifica se o dispositivo tem tela pequena (< 768px)
       * @returns {boolean}
       */
      isSmallScreen() {
        return window.innerWidth < 768;
      },

      /**
       * Detecta a orientação do dispositivo
       * @returns {string} 'portrait' ou 'landscape'
       */
      getOrientation() {
        return window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
      }
    };
  }
};
