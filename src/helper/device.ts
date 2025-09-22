import { computed, ref, watch } from 'vue';

const MOBILE_BREAKPOINT = 768;
const MOBILE_DESIGN_WIDTH = 375;

export const domElm = document.documentElement;
export const clientWidth = ref(window.innerWidth);
export const isMobile = computed(() => clientWidth.value <= MOBILE_BREAKPOINT);
export const isDesktop = computed(() => clientWidth.value > MOBILE_BREAKPOINT);
export const scale = computed(() => {
  if (isDesktop.value) {
    return 1;
  }
  return clientWidth.value / MOBILE_DESIGN_WIDTH;
});

watch(
  isMobile,
  () => {
    domElm.classList.remove('is-mobile', 'is-desktop');
    domElm.classList.add(`is-${isMobile.value ? 'mobile' : 'desktop'}`);
  },
  { immediate: true }
);

watch(
  scale,
  () => {
    document.documentElement.style.fontSize = `${scale.value * 100}px`;
  },
  { immediate: true }
);

function onResize() {
  clientWidth.value = window.innerWidth;
}

window.addEventListener('resize', onResize);
window.addEventListener('orientationchange', onResize);
onResize();
