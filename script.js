const initializePage = () => {
  const canUseSpotlight = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const spotlightSurfaces = document.querySelectorAll('.spotlight-surface');

  if (canUseSpotlight) {
    spotlightSurfaces.forEach((surface) => {
      const spotlightText = surface.matches('.spotlight-text')
        ? [surface]
        : surface.querySelectorAll('.spotlight-text');

      surface.addEventListener('pointermove', (event) => {
        const surfaceRect = surface.getBoundingClientRect();
        surface.style.setProperty('--spotlight-x', `${event.clientX - surfaceRect.left}px`);
        surface.style.setProperty('--spotlight-y', `${event.clientY - surfaceRect.top}px`);
        surface.classList.add('spotlight-active');

        spotlightText.forEach((text) => {
          const textRect = text.getBoundingClientRect();
          text.style.setProperty('--text-light-x', `${event.clientX - textRect.left}px`);
          text.style.setProperty('--text-light-y', `${event.clientY - textRect.top}px`);
        });
      });

      surface.addEventListener('pointerleave', () => {
        surface.classList.remove('spotlight-active');
        surface.style.removeProperty('--spotlight-x');
        surface.style.removeProperty('--spotlight-y');

        spotlightText.forEach((text) => {
          text.style.removeProperty('--text-light-x');
          text.style.removeProperty('--text-light-y');
        });
      });
    });
  }

  const contactWidget = document.querySelector('.contact-widget');
  const contactToggle = document.querySelector('.contact-toggle');
  const contactPanel = document.getElementById('contact-panel');

  if (contactWidget && contactToggle && contactPanel) {
    const setContactPanelOpen = (isOpen) => {
      contactPanel.hidden = !isOpen;
      contactToggle.setAttribute('aria-expanded', String(isOpen));
      contactToggle.setAttribute('aria-label', isOpen ? 'Close contact options' : 'Open contact options');
    };

    contactToggle.addEventListener('click', () => {
      setContactPanelOpen(contactPanel.hidden);
    });

    document.addEventListener('click', (event) => {
      if (!contactWidget.contains(event.target)) {
        setContactPanelOpen(false);
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !contactPanel.hidden) {
        setContactPanelOpen(false);
        contactToggle.focus();
      }
    });
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializePage, { once: true });
} else {
  initializePage();
}
