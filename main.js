// Initialize Lucide Icons
document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }
  
  // Set current year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Render client portfolio
  renderPortfolio('all');
});

// Clients Array
const clients = [
  {
    id: 'global-konnexon',
    name: 'Global Konnexon',
    serviceType: 'Google Marketing',
    focus: 'Lead Generation',
    spend: 4200,
    spendLabel: '$4,200 Spend Managed',
    description: 'Configured automated lead ingestion with high-intent Search channels to attract qualified enterprise connections.',
    category: 'lead-generation'
  },
  {
    id: 'ticketsaway',
    name: 'Ticketsaway',
    serviceType: 'Google Marketing',
    focus: 'Lead Generation',
    spend: 6800,
    spendLabel: '$6,800 Spend Managed',
    description: 'Designed hyper-targeted lead loops around secondary entertainment events, scaling reliable conversion clicks.',
    category: 'lead-generation'
  },
  {
    id: 'techsanswers',
    name: 'Techsanswers',
    serviceType: 'Google Marketing',
    focus: 'Lead Generation',
    spend: 5120,
    spendLabel: '$5,120 Spend Managed',
    description: 'Constructed direct support inquiry tunnels and tracked deep customer validation metrics with server-side conversion tags.',
    category: 'lead-generation'
  },
  {
    id: 'earlytrips',
    name: 'Earlytrips',
    serviceType: 'Google Marketing',
    focus: 'Lead Generation',
    spend: 3950,
    spendLabel: '$3,950 Spend Managed',
    description: 'Designed visual lead attraction campaigns for specialized travel packages, increasing inquiry velocity.',
    category: 'lead-generation'
  },
  {
    id: 'flysair',
    name: 'FlysAir',
    serviceType: 'Google Marketing',
    focus: 'Lead Generation',
    spend: 7400,
    spendLabel: '$7,400 Spend Managed',
    description: 'Deployed specialized Google Search lead forms for group travel charters, minimizing mobile landing drop-off rates.',
    category: 'lead-generation'
  },
  {
    id: 'house-of-hestia',
    name: 'House of Hestia',
    serviceType: 'Google Marketing',
    focus: 'Lead Generation',
    spend: 65000,
    spendLabel: '₹65,000+ Spend Managed (and running)',
    description: 'Established clean ad triggers for premium staging packages, capturing premium decor and development bookings.',
    category: 'lead-generation'
  },
  {
    id: 'kozzah',
    name: 'Kozzah',
    serviceType: 'Shopify & Marketplace Setup',
    focus: 'E-commerce Scale',
    spend: 65000,
    spendLabel: '₹65,000+ Setup Budget (and running)',
    description: 'Formated elite Shopify checkout flows, synchronization scripts, and customized marketplace integrations to drive sales.',
    category: 'e-commerce'
  }
];

// Portfolio Rendering Engine
function renderPortfolio(filter = 'all') {
  const container = document.getElementById('portfolio-grid');
  if (!container) return;

  // Clear previous content
  container.innerHTML = '';

  // Filter clients
  const filteredClients = clients.filter(c => {
    if (filter === 'all') return true;
    if (filter === 'lead-generation') return c.category === 'lead-generation';
    if (filter === 'e-commerce') return c.category === 'e-commerce';
    return true;
  });

  // Render cards
  filteredClients.forEach(c => {
    const isRupee = c.spendLabel.includes('₹');
    const isAndRunning = c.spendLabel.includes('(and running)');
    
    const cardHtml = `
      <div class="glass-panel p-6 rounded-3xl flex flex-col justify-between border border-white/5 bg-neutral-900/40 min-h-[250px] relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1">
        <div class="absolute top-0 right-0 h-16 w-16 bg-gradient-to-tr from-transparent ${c.category === 'e-commerce' ? 'to-pink-500/10' : 'to-blue-500/10'} pointer-events-none"></div>
        <div>
          <div class="flex items-center justify-between mb-4">
            <span class="font-mono text-[9px] uppercase tracking-wider text-neutral-500">${c.serviceType}</span>
            <span class="font-mono text-[9px] px-2 py-0.5 rounded-full ${
              c.category === 'e-commerce' 
                ? 'bg-pink-500/10 text-pink-400 border border-pink-500/20' 
                : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
            }">${c.focus}</span>
          </div>
          <h3 class="font-display text-lg font-bold text-white mb-2">${c.name}</h3>
          <p class="text-xs text-neutral-400 leading-relaxed mb-6">${c.description}</p>
        </div>
        <div class="flex items-center justify-between border-t border-white/5 pt-4">
          <span class="font-mono text-[10px] uppercase text-neutral-500">Node Cap</span>
          <span class="font-mono text-xs font-bold ${isRupee ? 'text-emerald-400' : 'text-blue-400'}">
            ${c.spendLabel}
          </span>
        </div>
      </div>
    `;
    container.insertAdjacentHTML('beforeend', cardHtml);
  });

  // Re-run Lucide in case any icons are inside cards (not currently but safe practice)
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// Portfolio Filter Event Listeners
const filterAll = document.getElementById('filter-all');
const filterLead = document.getElementById('filter-lead');
const filterEcom = document.getElementById('filter-ecom');

function setActiveFilterButton(activeBtn) {
  [filterAll, filterLead, filterEcom].forEach(btn => {
    if (btn) {
      btn.classList.remove('bg-blue-600', 'text-white', 'shadow-md');
      btn.classList.add('text-neutral-400', 'hover:text-white');
    }
  });
  if (activeBtn) {
    activeBtn.classList.remove('text-neutral-400', 'hover:text-white');
    activeBtn.classList.add('bg-blue-600', 'text-white', 'shadow-md');
  }
}

if (filterAll) {
  filterAll.addEventListener('click', () => {
    renderPortfolio('all');
    setActiveFilterButton(filterAll);
  });
}
if (filterLead) {
  filterLead.addEventListener('click', () => {
    renderPortfolio('lead-generation');
    setActiveFilterButton(filterLead);
  });
}
if (filterEcom) {
  filterEcom.addEventListener('click', () => {
    renderPortfolio('e-commerce');
    setActiveFilterButton(filterEcom);
  });
}

// Booking Time Slot Selection
let selectedSlot = '';
const slotBtns = document.querySelectorAll('.slot-btn');
slotBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    slotBtns.forEach(b => {
      b.classList.remove('bg-blue-600', 'text-white', 'border-blue-500/30');
      b.classList.add('text-neutral-400', 'border-white/5', 'bg-neutral-900/50');
    });
    btn.classList.remove('text-neutral-400', 'border-white/5', 'bg-neutral-900/50');
    btn.classList.add('bg-blue-600', 'text-white', 'border-blue-500/30');
    selectedSlot = btn.textContent;
    document.getElementById('form-error').classList.add('hidden');
  });
});

// Form Submission & Google Calendar Mock
const form = document.getElementById('diagnostics-form');
const successOverlay = document.getElementById('booking-success');
const resetBtn = document.getElementById('book-reset-btn');
const formError = document.getElementById('form-error');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (!selectedSlot) {
      formError.classList.remove('hidden');
      document.getElementById('error-message').textContent = 'Please select an interactive diagnostics time slot.';
      return;
    }

    // Success response
    successOverlay.classList.remove('hidden');
  });
}

if (resetBtn) {
  resetBtn.addEventListener('click', () => {
    form.reset();
    selectedSlot = '';
    slotBtns.forEach(b => {
      b.classList.remove('bg-blue-600', 'text-white', 'border-blue-500/30');
      b.classList.add('text-neutral-400', 'border-white/5', 'bg-neutral-900/50');
    });
    successOverlay.classList.add('hidden');
    formError.classList.add('hidden');
  });
}

// Modals Handle (Terms & Privacy)
const modalTriggers = document.querySelectorAll('.modal-trigger');
const modalCloses = document.querySelectorAll('.modal-close');
const modals = document.querySelectorAll('.modal');

modalTriggers.forEach(trigger => {
  trigger.addEventListener('click', (e) => {
    e.preventDefault();
    const modalId = `${trigger.getAttribute('data-modal')}-modal`;
    const targetModal = document.getElementById(modalId);
    if (targetModal) {
      targetModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }
  });
});

modalCloses.forEach(close => {
  close.addEventListener('click', () => {
    modals.forEach(m => m.classList.add('hidden'));
    document.body.style.overflow = '';
  });
});

// Close modal clicking outside content
modals.forEach(modal => {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }
  });
});
