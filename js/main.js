document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. AUDIO DESBLOQUEO (Hover Sound)
  // ==========================================
  const sound = document.getElementById('hoverSound');
  if (sound) {
    sound.volume = 0.4;
    let unlocked = false;
    const unlockAudio = () => {
      sound.play().then(() => {
        sound.pause();
        sound.currentTime = 0;
        unlocked = true;
      }).catch(() => {});
    };
    document.addEventListener('click', unlockAudio, { once: true });
    document.querySelectorAll('.glass-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        if (unlocked) {
          sound.currentTime = 0;
          sound.play().catch(() => {});
        }
      });
    });
  }

  // ==========================================
  // 2. HERO PARALLAX SUAVE
  // ==========================================
  const hero = document.getElementById('heroParallax');
  if (hero) {
    window.addEventListener('scroll', () => {
      hero.style.transform = `translateY(${window.scrollY * 0.15}px)`;
    });
  }

  // ==========================================
  // 3. REVEAL ON SCROLL
  // ==========================================
  const reveals = document.querySelectorAll('.reveal, .portal');
  if (reveals.length > 0) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.15 });
    reveals.forEach(el => observer.observe(el));
  }

  // ==========================================
  // 4. AURA FOLLOW MOUSE
  // ==========================================
  document.querySelectorAll('.glass-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--x', `${e.clientX - rect.left}px`);
      card.style.setProperty('--y', `${e.clientY - rect.top}px`);
    });
  });

  // ==========================================
  // 5. CTA SONIDO ETÉREO
  // ==========================================
  const cta = document.querySelector('.book-cta');
  const ctaSound = document.getElementById('ctaSound');
  if (cta && ctaSound) {
    ctaSound.volume = 0.25;
    cta.addEventListener('mouseenter', () => {
      ctaSound.currentTime = 0;
      ctaSound.play().catch(() => {});
    });
  }

  // ==========================================
  // 6. LIBRO RESPIRACIÓN
  // ==========================================
  const book = document.querySelector('.book-cover img');
  if (book) {
    let scaleUp = true;
    setInterval(() => {
      book.style.transform = scaleUp ? 'scale(1.015)' : 'scale(1)';
      scaleUp = !scaleUp;
    }, 4000);
  }

  // ==========================================
  // 7. SONIDO AMBIENTE
  // ==========================================
  const ambient = document.getElementById('ambientSound');
  if (ambient) {
    ambient.volume = 0.15;
    let ambientUnlocked = false;
    const unlockAmbient = () => {
      if (ambientUnlocked) return;
      ambient.play().then(() => { ambientUnlocked = true; }).catch(() => {});
    };
    document.addEventListener('click', unlockAmbient, { once: true });
    document.addEventListener('wheel', unlockAmbient, { once: true });
    document.addEventListener('touchstart', unlockAmbient, { once: true });
  }

  // ==========================================
  // 8. CIERRE DE TOMO AL FINAL
  // ==========================================
  const tome = document.getElementById('tomeClose');
  if (tome) {
    window.addEventListener('scroll', () => {
      const scrollBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
      tome.classList.toggle('active', scrollBottom);
    });
  }

  // ==========================================
  // 9. MODO RITUAL (Consolidado y Seguro)
  // ==========================================
  const ritualBtn = document.getElementById('ritualBtn');
  const closeRitualBtn = document.getElementById('closeRitualBtn');
  const ritualSound = document.getElementById('ritualSound');
  
  if (ritualBtn && ritualSound) {
    ritualSound.volume = 0.6;
    let ritualDone = false;

    ritualBtn.addEventListener('mouseenter', () => {
      ritualSound.currentTime = 0;
      ritualSound.play().catch(() => {});
    });

    ritualBtn.addEventListener('click', () => {
      if (ritualDone) return;
      ritualDone = true;
      ritualSound.currentTime = 0;
      ritualSound.play().catch(() => {});
      document.body.classList.add('ritual-active');
      ritualBtn.classList.add('activated');
      ritualBtn.textContent = 'EL TOMO ESTÁ ABIERTO';
      if (closeRitualBtn) closeRitualBtn.classList.add('visible');
    });

    if (closeRitualBtn) {
      closeRitualBtn.addEventListener('click', () => {
        document.body.classList.remove('ritual-active');
        ritualBtn.classList.remove('activated');
        ritualBtn.textContent = 'Ritual';
        closeRitualBtn.classList.remove('visible');
        ritualDone = false;
      });
    }
  }

  // ==========================================
  // 10. DROPDOWN DE MELODÍAS
  // ==========================================
  const musicBtn = document.getElementById('musicBtn');
  const dropdownMenu = document.getElementById('dropdownMenu');
  const melodyPlayer = document.getElementById('melodyPlayer');
  
  if (musicBtn && dropdownMenu && melodyPlayer) {
    musicBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdownMenu.classList.toggle('show');
    });

    document.addEventListener('click', (e) => {
      if (!musicBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
        dropdownMenu.classList.remove('show');
      }
    });

    document.querySelectorAll('.dropdown-item[data-melody]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const src = btn.dataset.melody;
        if (melodyPlayer.src !== src) {
          melodyPlayer.src = src;
          melodyPlayer.currentTime = 0;
        }
        melodyPlayer.play().catch(() => {});
        dropdownMenu.classList.remove('show');
      });
    });

    const stopBtn = document.getElementById('stopMelody');
    if (stopBtn) {
      stopBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        melodyPlayer.pause();
        melodyPlayer.currentTime = 0;
        dropdownMenu.classList.remove('show');
      });
    }
  }

  // ==========================================
  // 11. REPRODUCTOR GLOBAL (SEGURO)
  // ==========================================
  const globalPlayer = document.getElementById('globalPlayer');
  const tracks = document.querySelectorAll('.track-list li');
  
  // SOLO se ejecuta si el reproductor y las pistas existen en la página
  if (globalPlayer && tracks.length > 0) {
    tracks.forEach(track => {
      track.addEventListener('click', () => {
        tracks.forEach(t => t.classList.remove('active'));
        track.classList.add('active');
        globalPlayer.src = track.getAttribute('data-src');
        globalPlayer.play().catch(() => {});
      });
    });

    globalPlayer.addEventListener('ended', () => {
      let current = Array.from(tracks).findIndex(t => t.classList.contains('active'));
      if (current === -1) return;
      let next = (current + 1) % tracks.length;
      tracks[next].click();
    });
  }

  // ==========================================
  // 12. PARTÍCULAS (SEGURO)
  // ==========================================
  if (typeof particlesJS !== 'undefined') {
    particlesJS('particles', {
      particles: {
        number: { value: 60 },
        color: { value: '#64ffda' },
        shape: { type: 'circle' },
        opacity: { value: 0.8, random: true },
        size: { value: 12, random: true },
        line_linked: { enable: false },
        move: {
          enable: true, speed: 2, direction: 'bottom', random: true,
          straight: false, out_mode: 'out', bounce: false
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: { onhover: { enable: true, mode: 'bubble' }, onclick: { enable: true, mode: 'push' }, resize: true },
        modes: { bubble: { distance: 200, size: 20, duration: 2, opacity: 0.8, speed: 3 }, push: { particles_nb: 4 } }
      },
      retina_detect: true
    });
  }

  // ==========================================
  // 13. MENÚ HAMBURGUESA (MÓVIL / TABLET)
  // ==========================================
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navLinks.classList.toggle('active');
      menuToggle.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.textContent = '☰';
      });
    });

    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        navLinks.classList.remove('active');
        menuToggle.textContent = '☰';
      }
    });
  }
});