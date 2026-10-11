/**
 * GreenTech Power - Lucknow, Uttar Pradesh
 * Interactive JavaScript Engine
 * Complete Button, Filter, Form, Video & Modal Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Preloader Fade Out
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    const hidePreloader = () => {
      preloader.classList.add('fade-out');
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 300);
    };
    if (document.readyState === 'complete') {
      hidePreloader();
    } else {
      window.addEventListener('load', hidePreloader);
      setTimeout(hidePreloader, 600);
    }
  }

  // 2. Sticky Navbar with elevation
  const header = document.querySelector('.site-header');
  const backToTopBtn = document.querySelector('.back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    if (window.scrollY > 400) {
      backToTopBtn?.classList.add('visible');
    } else {
      backToTopBtn?.classList.remove('visible');
    }
  });

  backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // 3. Mobile Navigation Menu Drawer
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        if (navMenu.classList.contains('open')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-times');
        } else {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      }
    });

    document.querySelectorAll('.nav-menu .nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      });
    });
  }

  // 4. Toast Notification Utility
  function showToast(message, title = 'Request Received!') {
    // Remove existing toasts
    document.querySelectorAll('.toast-notice').forEach(t => t.remove());

    const toast = document.createElement('div');
    toast.className = 'toast-notice show';
    toast.innerHTML = `
      <i class="fas fa-check-circle" style="color: #4AAB3D; font-size: 24px; flex-shrink: 0;"></i>
      <div>
        <strong style="display:block; font-size: 15px; margin-bottom: 2px; color: #001A29;">${title}</strong>
        <span style="font-size: 13.5px; color: #5A6D7C;">${message}</span>
      </div>
    `;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 4500);
  }

  // 5. Universal Modal Management (Consultation & Subsidy Claim)
  const allModalOpenBtns = document.querySelectorAll('.open-modal-btn');
  const modalOverlays = document.querySelectorAll('.modal-overlay');

  function openActiveModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
      modal.classList.add('active');
    }
  }

  function closeAllModals() {
    modalOverlays.forEach(m => m.classList.remove('active'));
  }

  allModalOpenBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openActiveModal();
    });
  });

  document.querySelectorAll('.modal-close, #closeModalBtn').forEach(closeBtn => {
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeAllModals();
    });
  });

  modalOverlays.forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeAllModals();
      }
    });
  });

  // 6. Form Submission Handlers
  // A. Lead Forms (index.html)
  document.querySelectorAll('form.solar-lead-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = form.querySelector('input[type="text"]');
      const phoneInput = form.querySelector('input[type="tel"]');
      const name = nameInput ? nameInput.value : 'Customer';
      const phone = phoneInput ? phoneInput.value : '';
      closeAllModals();
      showToast(`Thank you, ${name}! Our Lucknow solar engineer will contact you at ${phone} to schedule your free 3D site audit.`, 'Free Audit Scheduled!');
      form.reset();
    });
  });

  // B. Modal Form (about, services, calculator, projects, contact)
  document.querySelectorAll('form.modal-form, #quoteModalForm').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = form.querySelector('input[type="text"]');
      const phoneInput = form.querySelector('input[type="tel"]');
      const name = nameInput ? nameInput.value : 'Customer';
      const phone = phoneInput ? phoneInput.value : '';
      closeAllModals();
      showToast(`Thank you, ${name}! Your ₹1,08,000 subsidy eligibility inquiry has been submitted. We will call you at ${phone}.`, 'Subsidy Claim Submitted!');
      form.reset();
    });
  });

  // C. Dedicated Contact Form (contact.html)
  const contactForm = document.getElementById('contactForm');
  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = contactForm.querySelector('input[type="text"]');
    const phoneInput = contactForm.querySelector('input[type="tel"]');
    const name = nameInput ? nameInput.value : 'Customer';
    const phone = phoneInput ? phoneInput.value : '';
    showToast(`Thank you, ${name}! Your message has been received. Our Gomti Nagar, Lucknow team will contact you at ${phone} today.`, 'Inquiry Received!');
    contactForm.reset();
  });

  // D. Newsletter Form
  document.querySelectorAll('.footer-newsletter-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('You are now subscribed to PM Surya Ghar & UP Solar Subsidy policy updates.', 'Subscribed Successfully!');
      form.reset();
    });
  });

  // 7. Interactive Solar Subsidy & Savings Calculator (Home Page Preview)
  const billSlider = document.getElementById('billSlider');
  const billDisplay = document.getElementById('billDisplay');
  const calcCapacity = document.getElementById('calcCapacity');
  const calcMonthlyUnits = document.getElementById('calcMonthlyUnits');
  const calcCentralSubsidy = document.getElementById('calcCentralSubsidy');
  const calcStateSubsidy = document.getElementById('calcStateSubsidy');
  const calcTotalSubsidy = document.getElementById('calcTotalSubsidy');
  const calcGrossCost = document.getElementById('calcGrossCost');
  const calcNetCost = document.getElementById('calcNetCost');
  const calcAnnualSavings = document.getElementById('calcAnnualSavings');
  const calcRoofArea = document.getElementById('calcRoofArea');
  const roofButtons = document.querySelectorAll('.roof-btn');

  function updateHomeCalculator() {
    if (!billSlider) return;
    const monthlyBill = parseInt(billSlider.value, 10);
    billDisplay.textContent = `₹${monthlyBill.toLocaleString('en-IN')}`;

    let capacity = 1;
    let units = 120;
    let central = 30000;
    let state = 15000;
    let gross = 65000;
    let area = 100;

    if (monthlyBill <= 1800) {
      capacity = 1; units = 120; central = 30000; state = 15000; gross = 65000; area = 100;
    } else if (monthlyBill <= 3200) {
      capacity = 2; units = 240; central = 60000; state = 30000; gross = 130000; area = 190;
    } else if (monthlyBill <= 5000) {
      capacity = 3; units = 360; central = 78000; state = 30000; gross = 186000; area = 285;
    } else if (monthlyBill <= 7500) {
      capacity = 5; units = 600; central = 78000; state = 30000; gross = 295000; area = 475;
    } else if (monthlyBill <= 12000) {
      capacity = 8; units = 960; central = 78000; state = 30000; gross = 450000; area = 760;
    } else {
      capacity = 10; units = 1200; central = 78000; state = 30000; gross = 560000; area = 950;
    }

    const totalSub = central + state;
    const net = gross - totalSub;
    const annualSavings = Math.round(units * 12 * 7.5 * 0.95);

    if (calcCapacity) calcCapacity.textContent = `${capacity} kW System`;
    if (calcMonthlyUnits) calcMonthlyUnits.textContent = `~${units} kWh / month`;
    if (calcCentralSubsidy) calcCentralSubsidy.textContent = `₹${central.toLocaleString('en-IN')}`;
    if (calcStateSubsidy) calcStateSubsidy.textContent = `₹${state.toLocaleString('en-IN')}`;
    if (calcTotalSubsidy) calcTotalSubsidy.textContent = `₹${totalSub.toLocaleString('en-IN')}`;
    if (calcGrossCost) calcGrossCost.textContent = `₹${gross.toLocaleString('en-IN')}`;
    if (calcNetCost) calcNetCost.textContent = `₹${net.toLocaleString('en-IN')}`;
    if (calcAnnualSavings) calcAnnualSavings.textContent = `₹${annualSavings.toLocaleString('en-IN')} / yr`;
    if (calcRoofArea) calcRoofArea.textContent = `~${area} sq.ft`;
  }

  if (billSlider) {
    billSlider.addEventListener('input', updateHomeCalculator);
    updateHomeCalculator();
  }

  roofButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      roofButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // 8. Dedicated Subsidy Calculator Page Engine (calculator.html)
  const kwSlider = document.getElementById('kwSlider');
  const kwDisplay = document.getElementById('kwDisplay');
  const calcBtns = document.querySelectorAll('.calc-btn');
  const roofAreaEl = document.getElementById('roofArea');
  const monthlyGenEl = document.getElementById('monthlyGen');
  const grossCostEl = document.getElementById('grossCost');
  const centralSubEl = document.getElementById('centralSub');
  const stateSubEl = document.getElementById('stateSub');
  const totalSubEl = document.getElementById('totalSub');
  const netCostEl = document.getElementById('netCost');
  const annualSaveEl = document.getElementById('annualSave');

  const subsidyData = {
    1: { roof: '100 sq. ft.', gen: '~120 kWh Units', gross: '₹65,000', central: '₹30,000', state: '₹15,000', total: '₹45,000', net: '₹20,000', save: '₹10,800 / Year' },
    2: { roof: '200 sq. ft.', gen: '~240 kWh Units', gross: '₹1,30,000', central: '₹60,000', state: '₹30,000', total: '₹90,000', net: '₹40,000', save: '₹21,600 / Year' },
    3: { roof: '300 sq. ft.', gen: '~360 kWh Units', gross: '₹1,95,000', central: '₹78,000', state: '₹30,000', total: '₹1,08,000', net: '₹87,000', save: '₹34,560 / Year' },
    4: { roof: '400 sq. ft.', gen: '~480 kWh Units', gross: '₹2,50,000', central: '₹78,000', state: '₹30,000', total: '₹1,08,000', net: '₹1,42,000', save: '₹46,080 / Year' },
    5: { roof: '500 sq. ft.', gen: '~600 kWh Units', gross: '₹3,10,000', central: '₹78,000', state: '₹30,000', total: '₹1,08,000', net: '₹2,02,000', save: '₹57,600 / Year' },
    6: { roof: '600 sq. ft.', gen: '~720 kWh Units', gross: '₹3,65,000', central: '₹78,000', state: '₹30,000', total: '₹1,08,000', net: '₹2,57,000', save: '₹69,120 / Year' },
    7: { roof: '700 sq. ft.', gen: '~840 kWh Units', gross: '₹4,20,000', central: '₹78,000', state: '₹30,000', total: '₹1,08,000', net: '₹3,12,000', save: '₹80,640 / Year' },
    8: { roof: '800 sq. ft.', gen: '~960 kWh Units', gross: '₹4,75,000', central: '₹78,000', state: '₹30,000', total: '₹1,08,000', net: '₹3,67,000', save: '₹92,160 / Year' },
    9: { roof: '900 sq. ft.', gen: '~1,080 kWh Units', gross: '₹5,30,000', central: '₹78,000', state: '₹30,000', total: '₹1,08,000', net: '₹4,22,000', save: '₹1,03,680 / Year' },
    10: { roof: '1,000 sq. ft.', gen: '~1,200 kWh Units', gross: '₹5,85,000', central: '₹78,000', state: '₹30,000', total: '₹1,08,000', net: '₹4,77,000', save: '₹1,15,200 / Year' }
  };

  function updatePageCalculator(kw) {
    if (!subsidyData[kw]) return;
    const d = subsidyData[kw];
    if (kwDisplay) kwDisplay.textContent = `${kw} kW`;
    if (roofAreaEl) roofAreaEl.textContent = d.roof;
    if (monthlyGenEl) monthlyGenEl.textContent = d.gen;
    if (grossCostEl) grossCostEl.textContent = d.gross;
    if (centralSubEl) centralSubEl.textContent = `- ${d.central}`;
    if (stateSubEl) stateSubEl.textContent = `- ${d.state}`;
    if (totalSubEl) totalSubEl.textContent = d.total;
    if (netCostEl) netCostEl.textContent = d.net;
    if (annualSaveEl) annualSaveEl.textContent = d.save;

    calcBtns.forEach(b => {
      if (parseInt(b.getAttribute('data-kw'), 10) === kw) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });

    if (kwSlider) kwSlider.value = kw;
  }

  calcBtns.forEach(b => {
    b.addEventListener('click', () => {
      const kw = parseInt(b.getAttribute('data-kw'), 10);
      updatePageCalculator(kw);
    });
  });

  if (kwSlider) {
    kwSlider.addEventListener('input', () => {
      const kw = parseInt(kwSlider.value, 10);
      updatePageCalculator(kw);
    });
    updatePageCalculator(3);
  }

  // 9. Portfolio Filter Tabs (Works on both index.html and projects.html)
  const allFilterButtons = document.querySelectorAll('.filter-btn, .filter-tab-btn');
  allFilterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');
      const section = btn.closest('section') || document;
      
      section.querySelectorAll('.filter-btn, .filter-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const projectCards = section.querySelectorAll('.project-card');
      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  });

  // 10. FAQ Accordions
  const accordionItems = document.querySelectorAll('.accordion-item');
  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    header?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      accordionItems.forEach(i => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // 11. Solar Installation Video Player Controller
  const videoElem = document.getElementById('solarInstallVideo');
  const playBtn = document.getElementById('playVideoBtn');
  const videoOverlay = document.getElementById('videoOverlay');

  function togglePlayVideo() {
    if (!videoElem) return;
    if (videoElem.paused) {
      videoElem.play();
      videoOverlay?.classList.add('hidden');
    } else {
      videoElem.pause();
      videoOverlay?.classList.remove('hidden');
    }
  }

  playBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    togglePlayVideo();
  });

  videoOverlay?.addEventListener('click', () => {
    togglePlayVideo();
  });

  if (videoElem) {
    videoElem.addEventListener('play', () => {
      videoOverlay?.classList.add('hidden');
    });
    videoElem.addEventListener('pause', () => {
      videoOverlay?.classList.remove('hidden');
    });
    videoElem.addEventListener('ended', () => {
      videoOverlay?.classList.remove('hidden');
    });
  }

  // 12. Animated Statistics Counter on Viewport Entry
  const counterElements = document.querySelectorAll('.counter-number[data-target]');
  let countersAnimated = false;

  const animateCounters = () => {
    if (countersAnimated) return;
    const triggerBottom = window.innerHeight * 0.85;

    counterElements.forEach(counter => {
      const top = counter.getBoundingClientRect().top;
      if (top < triggerBottom) {
        const target = parseInt(counter.getAttribute('data-target'), 10);
        let count = 0;
        const duration = 1800;
        const increment = Math.ceil(target / (duration / 25));

        const timer = setInterval(() => {
          count += increment;
          if (count >= target) {
            counter.textContent = `${target}+`;
            clearInterval(timer);
          } else {
            counter.textContent = `${count}+`;
          }
        }, 25);
        countersAnimated = true;
      }
    });
  };

  window.addEventListener('scroll', animateCounters);
  animateCounters();
});
