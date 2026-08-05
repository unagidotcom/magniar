import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ContactCard from './components/ContactCard';
import { 
  Printer, 
  Wifi, 
  Search, 
  Settings, 
  HelpCircle, 
  BookOpen, 
  FileText, 
  Sliders, 
  Layers, 
  ChevronDown, 
  ChevronUp, 
  Check, 
  FileCode, 
  CheckCircle2, 
  FileSpreadsheet,
  AlertTriangle,
  RotateCcw,
  Zap,
  Info
} from 'lucide-react';

export default function App() {
  // Accordion state for FAQs
  const [openFaq, setOpenFaq] = useState(null);
  
  // Active main section state (for navigation and filtering)
  const [selectedTopic, setSelectedTopic] = useState('All');

  // Search query state for search bar in popular topics
  const [searchQuery, setSearchQuery] = useState('');

  const toggleFaq = (index) => {
    if (openFaq === index) {
      setOpenFaq(null);
    } else {
      setOpenFaq(index);
    }
  };

  const topics = [
    { name: 'Printer Setup', id: 'setup' },
    { name: 'Wireless Printing', id: 'wireless' },
    { name: 'Printing', id: 'printing' },
    { name: 'Scanning', id: 'scanning' },
    { name: 'Ink', id: 'ink' },
    { name: 'Paper Jam', id: 'paper' },
    { name: 'Drivers', id: 'setup' },
    { name: 'Firmware', id: 'maintenance' },
    { name: 'Maintenance', id: 'maintenance' },
    { name: 'Wi-Fi', id: 'wireless' },
    { name: 'USB', id: 'setup' },
    { name: 'Mobile Printing', id: 'wireless' }
  ];

  const contentSections = [
    {
      id: 'setup',
      title: 'Printer Setup & Installation',
      description: 'Your step-by-step roadmap to configuring and connecting your HP printing hardware for the first time.',
      icon: <Settings className="w-6 h-6 text-blue-600" />,
      steps: [
        { title: 'First-time setup', text: 'Unpack the printer, remove all protective tapes, inserts, and packaging materials from both external and internal chambers. Connect the power cable and turn on the device.' },
        { title: 'Device installation', text: 'Install the included setup ink cartridges into the printhead assembly. Allow the printer to initialize, perform its calibration process, and print an alignment page.' },
        { title: 'Connecting cables', text: 'For wired configurations, connect a high-speed USB 2.0 cable from the printer to your computer, or attach an Ethernet cable to your local router port.' },
        { title: 'Wireless configuration', text: 'Navigate to the Network or Wireless Settings menu on the printer control panel, run the Wireless Setup Wizard, select your SSID (network name), and input the Wi-Fi security password.' },
        { title: 'Initial printing test', text: 'Load standard plain paper into the input tray. Access your computer system settings, add the printer, and print a test page to verify connectivity.' },
        { title: 'Mobile setup link', text: 'Ensure your smartphone or tablet is connected to the same local network. Download your device printing service plugin to detect and verify hardware.' }
      ]
    },
    {
      id: 'wireless',
      title: 'Wireless & Network Printing',
      description: 'Configure stable network links, troubleshoot dropping connections, and establish cloud printing hubs.',
      icon: <Wifi className="w-6 h-6 text-sky-500" />,
      steps: [
        { title: 'Wi-Fi connections', text: 'Establish connection using WPS push-button methods or manual security key entries. Ensure the network operates on the correct frequency (usually 2.4GHz for older models).' },
        { title: 'Wi-Fi Direct setup', text: 'Enable Wi-Fi Direct on the printer panel to establish a secure peer-to-peer wireless link directly with your device, bypassing the local router network.' },
        { title: 'Apple AirPrint integration', text: 'Print instantly from Apple iPad, iPhone, or Mac devices without downloading custom drivers. Simply select your printer in the AirPrint sharing hub.' },
        { title: 'Mopria Print service', text: 'Use the Mopria-certified print capabilities standard on Android 8.0+ devices to print documents, photographs, and webpages seamlessly.' },
        { title: 'Mobile printing setups', text: 'Utilize mobile plug-ins or built-in OS printing frameworks to send files directly from your phone to the print queue.' },
        { title: 'Cloud printing configuration', text: 'Connect your printer to a registered email address or cloud accounts to dispatch documents remotely over external internet lines.' }
      ]
    },
    {
      id: 'printing',
      title: 'Printing Quality & Operations',
      description: 'Optimize print quality outputs, configure cost-saving modes, and understand duplex setups.',
      icon: <Printer className="w-6 h-6 text-indigo-500" />,
      steps: [
        { title: 'Optimizing print quality', text: 'Match the print settings in your software dialog with the actual paper type loaded. Adjust resolution targets for high-density document rendering.' },
        { title: 'Draft mode configuration', text: 'Enable Draft or Fast mode in print preferences to reduce ink consumption by up to 50% and accelerate output times for internal documents.' },
        { title: 'Color printing options', text: 'Manage color profiles, select black-and-white rendering, or configure high-fidelity photo color maps through active driver settings.' },
        { title: 'Duplex (two-sided) printing', text: 'Configure automatic double-sided printing for compatible models, or use manual duplexing prompts to flip sheets without alignment errors.' },
        { title: 'Premium photo printing', text: 'Utilize dedicated gloss or matte photo paper in the photo tray, configure borderless settings, and select maximum DPI resolutions.' }
      ]
    },
    {
      id: 'scanning',
      title: 'Scanning & Document Digitization',
      description: 'Guides on scanning high-quality photos, multi-page PDFs, and extracting text via OCR.',
      icon: <FileText className="w-6 h-6 text-emerald-500" />,
      steps: [
        { title: 'Flatbed scanning operation', text: 'Place original documents face-down on the glass bed alignment corner. Clean glass with microfiber cloths to prevent scan line distortions.' },
        { title: 'Document feeder scanning', text: 'Load multi-page documents face-up into the Automatic Document Feeder (ADF) tray for consecutive, automated multi-sheet scanning.' },
        { title: 'PDF output configurations', text: 'Configure scanner outputs directly to PDF files, join multiple scan files into single multi-page PDF documents, and set encryption layers.' },
        { title: 'Direct email scanning', text: 'Configure SMTP server details to email scanned PDFs or JPGs directly from the printer console to select recipient addresses.' },
        { title: 'OCR overview & text extraction', text: 'Utilize Optical Character Recognition (OCR) software to convert scanned documents into searchable, editable text files.' }
      ]
    },
    {
      id: 'ink',
      title: 'Ink, Cartridges & Maintenance',
      description: 'Replace depleted cartridges safely, store spares correctly, and clean printheads to eliminate banding.',
      icon: <Sliders className="w-6 h-6 text-violet-500" />,
      steps: [
        { title: 'Ink cartridge replacement', text: 'Open the access door, wait for the silent carriage to slide to the center, release the latch, replace with new ink, and lock secure.' },
        { title: 'Cartridge storage care', text: 'Store spare cartridges in their sealed packaging at stable room temperature. Never expose nozzles to direct open air before installation.' },
        { title: 'Active ink level monitoring', text: 'Check ink levels regularly on the printer screen or setup utilities to avoid printing with dry nozzles, which can damage hardware.' },
        { title: 'Printhead cleaning process', text: 'Run the automated printhead cleaning tool from settings if print outputs show horizontal lines, missing text blocks, or faded colors.' }
      ]
    },
    {
      id: 'paper',
      title: 'Paper Handling & Jam Resolution',
      description: 'Understand correct paper loading, standard sizes, and step-by-step paper jam removal.',
      icon: <Layers className="w-6 h-6 text-amber-500" />,
      steps: [
        { title: 'Correct paper loading', text: 'Align the paper stack, tap against a flat surface, slide into input tray, and adjust the width guides flush against the edges.' },
        { title: 'Handling different paper sizes', text: 'Adjust tray sliders to fit legal, A4, envelopes, or cardstock. Change setting dialogs to reflect loaded paper size specifications.' },
        { title: 'Envelope & label configuration', text: 'Load envelopes with flap facing up and to the left. Ensure label sheets are free of peeling parts that could get stuck inside rollers.' },
        { title: 'Resolving paper jams step-by-step', text: 'Turn off the printer. Gently pull jammed paper from the rear access door or input tray in the direction of natural feed. Never pull hard or use sharp tools.' }
      ]
    },
    {
      id: 'maintenance',
      title: 'System Maintenance & Calibration',
      description: 'Align print cartridges, update software/firmware nodes, and perform preventive calibration.',
      icon: <BookOpen className="w-6 h-6 text-rose-500" />,
      steps: [
        { title: 'Regular printer cleaning', text: 'Wipe exterior surfaces with a damp lint-free cloth. Clean feed rollers with distilled water to remove paper dust and prevent slippage.' },
        { title: 'Printhead alignment utility', text: 'Perform printhead alignment after installing new ink or when text overlaps. Scan the alignment sheet to calibrate sensor tracks.' },
        { title: 'Firmware updates', text: 'Download latest firmware files directly from official resource platforms, and flash using computer connection or network downloads.' },
        { title: 'Printer calibration', text: 'Run density calibrations to correct color hues and adjust paper thickness margins for specialty media layouts.' }
      ]
    }
  ];

  const featuredGuides = [
    { title: 'Getting Started Guide', desc: 'Step-by-step tutorial on unboxing, powering up, and executing initial calibration tests.', targetId: 'setup' },
    { title: 'Connect to Wi-Fi Network', desc: 'Clear guidelines on running wireless setups and troubleshooting connection errors.', targetId: 'wireless' },
    { title: 'Replace Ink Cartridges', desc: 'Detailed look at changing empty ink tanks and clean care guidelines for print nozzles.', targetId: 'ink' },
    { title: 'Improve Faded Print Quality', desc: 'Identify nozzle blocks and perform settings adjustments to fix horizontal bands.', targetId: 'printing' },
    { title: 'Clean Printhead Assembly', desc: 'Run internal cleaning cycles and solve persistent alignment issues easily.', targetId: 'ink' },
    { title: 'Wireless Printing Explained', desc: 'Establish peer-to-peer print direct channels or set up mobile sharing options.', targetId: 'wireless' },
    { title: 'Scan Documents to PDF', desc: 'How to use the glass flatbed or ADF tray to export secure multi-page PDF documents.', targetId: 'scanning' },
    { title: 'Preventive Printer Maintenance', desc: 'Checklist of weekly cleaning, updates, and calibration schedules.', targetId: 'maintenance' },
    { title: 'Mobile Printing Setup', desc: 'Print documents instantly from iPhone or Android platforms with standard drivers.', targetId: 'wireless' },
    { title: 'Update Printer Firmware', desc: 'Keep your printer software secure and stable with official updates.', targetId: 'maintenance' }
  ];

  const faqs = [
    { 
      q: 'How do I connect my printer to Wi-Fi?', 
      a: 'To connect your printing device to a Wi-Fi network, navigate to the Setup, Network, or Wireless settings menu on the printer control panel. Select the "Wireless Setup Wizard." The wizard will scan for available Wi-Fi networks in range. Select your network SSID name, enter your WEP/WPA password using the panel keyboard, and wait for the wireless light to become solid blue, indicating a successful network connection.' 
    },
    { 
      q: 'How do I replace ink cartridges?', 
      a: 'Make sure the printer is turned on. Open the ink cartridge access door or lid. The cartridge carriage will automatically slide to the middle of the access area. Wait until the carriage becomes idle and silent. Press down gently on the empty cartridge tab to release it, then pull it out of its slot. Unpack the new cartridge, remove the plastic tape protective tab (do not touch the copper electrical contacts or ink nozzles), insert it into the correct color slot at a slight upward angle, and push up until it clicks into place. Close the access door.' 
    },
    { 
      q: 'Why are my prints faded or showing bands?', 
      a: 'Faded outputs, missing text, or horizontal bands are usually caused by clogged printhead nozzles or low ink levels. Check the ink levels on the printer status utility. If ink levels are normal, run the built-in "Printhead Cleaning" or "Clean Cartridges" utility from your printer setting panel or computer configuration app. This will flush the nozzles with fresh ink. You may need to run this cleaning cycle 2-3 times for severe clogs.' 
    },
    { 
      q: 'How do I scan documents to my computer?', 
      a: 'Place your physical document face-down on the flatbed scanner glass, aligning it with the marked corner guide, or place it face-up in the automatic document feeder (ADF). Open your scanner software on your computer, select the document type (e.g. PDF or JPG), set target scan resolution (300 DPI is standard for text, 600+ DPI for photos), click "Scan", and save the resulting file. You can also scan directly from the printer screen using the "Scan to Computer" or "Scan to Email" features if configured.' 
    },
    { 
      q: 'How do I clean the printhead?', 
      a: 'You can clean the printhead through the printer software utility. On Windows, open "Devices and Printers," right-click your printer, choose "Printing Preferences," open the "Maintenance" or "Services" tab, and select "Clean Printheads." On the printer control panel, go to Setup -> Tools or Maintenance -> Clean Printheads. If the nozzles remain clogged after software cleaning, manually clean by removing cartridges and wiping ink contacts with a lint-free cloth lightly dampened with distilled water.' 
    },
    { 
      q: 'How do I improve print quality?', 
      a: 'To improve print quality, ensure you are using original high-quality ink and correct paper types. Open the print properties dialog before sending a job, select the correct media type (e.g. glossy photo paper, cardstock, plain paper), and adjust the print quality slider from "Draft" or "Normal" to "Best" or "Max DPI". Also, perform a alignment calibration from the maintenance menu to synchronize cartridge firing.' 
    },
    { 
      q: 'How often should I maintain my printer?', 
      a: 'We recommend printing at least once every week or two to prevent ink from drying inside the printhead and clogging the micro-nozzles. Wipe external surfaces with a dry microfiber cloth monthly, clear paper dust from the rollers, and check for software updates or driver patches quarterly to maintain security and system stability.' 
    },
    { 
      q: 'How do I print from my phone?', 
      a: 'Make sure your phone and printer are connected to the exact same Wi-Fi network. On iPhone/iPad, open the document or image, tap the share icon, select "Print," choose your printer from the detected AirPrint list, and tap print. On Android, download the appropriate printing service plugin from the Google Play Store, go to settings -> connection -> printing, enable the service, then select print in any file-sharing app.' 
    }
  ];

  const articles = [
    { title: 'Choosing the Right Paper', desc: 'Understanding paper weight, opacity, and finishes (glossy vs matte) to optimize printing outcomes.', readTime: '5 min read', category: 'Best Practices' },
    { title: 'Wireless Printing Explained', desc: 'A deep dive into Wi-Fi network routing, Wi-Fi Direct, and troubleshooting local network disconnects.', readTime: '7 min read', category: 'Guides' },
    { title: 'Printer Maintenance Checklist', desc: 'A quarterly prevention guide to cleaning rollers, updating drivers, and maintaining nozzle health.', readTime: '4 min read', category: 'Maintenance' },
    { title: 'Reducing Ink Usage', desc: 'Simple tips to configure draft modes, manage color layers, and reduce overall ink consumption costs.', readTime: '6 min read', category: 'Cost Saving' },
    { title: 'Printing Best Practices', desc: 'Simple habits to improve page yields, minimize paper jams, and extend the lifespan of your device.', readTime: '5 min read', category: 'Best Practices' },
    { title: 'How to Improve Print Quality', desc: 'Advanced steps to align printheads, adjust color spaces, and clean nozzle blocks.', readTime: '8 min read', category: 'Troubleshooting' },
    { title: 'Scanning Tips for Best Output', desc: 'How to configure resolution DPI, extract text using OCR, and compress document scans.', readTime: '6 min read', category: 'Scanning' },
    { title: 'Home Office Printing Configs', desc: 'How to optimize network security sharing and establish high-yield printer stations.', readTime: '5 min read', category: 'Office Setup' }
  ];

  const whyChooseUs = [
    { title: 'Easy-to-follow guides', desc: 'Complex steps broken down into simple, manageable pieces.', icon: <CheckCircle2 className="w-5 h-5 text-blue-600" /> },
    { title: 'Practical resources', desc: 'Get direct advice, firmware instructions, and connection steps.', icon: <CheckCircle2 className="w-5 h-5 text-blue-600" /> },
    { title: 'Step-by-step learning', desc: 'Visual progressions showing exactly what buttons to push.', icon: <CheckCircle2 className="w-5 h-5 text-blue-600" /> },
    { title: 'Regularly updated info', desc: 'Guides reviewed and updated to cover latest systems.', icon: <CheckCircle2 className="w-5 h-5 text-blue-600" /> },
    { title: 'Designed for everyday users', desc: 'No jargon or overly technical developer speak.', icon: <CheckCircle2 className="w-5 h-5 text-blue-600" /> },
    { title: 'Mobile-friendly layout', desc: 'Read guides on your mobile phone as you configure your device.', icon: <CheckCircle2 className="w-5 h-5 text-blue-600" /> }
  ];

  const handleScrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90; // offset for sticky navbar
      const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Filter content sections based on search or active chips
  const filteredContentSections = contentSections.filter(section => {
    if (selectedTopic === 'All') {
      if (searchQuery.trim() === '') return true;
      return section.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
             section.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
             section.steps.some(step => step.title.toLowerCase().includes(searchQuery.toLowerCase()) || step.text.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    return section.id === selectedTopic;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-blue-500/20 selection:text-blue-900">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-36 pb-24 md:pt-48 md:pb-36 overflow-hidden">
        {/* Background Image with Dark Blue Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/workspace_printer.png" 
            alt="Modern Workspace Printer" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/80 to-blue-900/40"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl text-left space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-blue-400 uppercase">
              <Printer className="w-3.5 h-3.5" />
              <span>HP Printing Devices</span>
            </div>

            {/* Heading */}
            <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Everything you need to know about HP printing devices.
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl font-normal">
              Discover setup guides, wireless printing, scanning tips, maintenance advice, printing best practices, software information, and practical resources to help you get the most from your printing devices.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <button 
                onClick={() => handleScrollToSection('guides')}
                className="rounded-xl bg-blue-600 hover:bg-blue-700 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                Browse Guides
              </button>
              <button 
                onClick={() => handleScrollToSection('topics')}
                className="rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 px-6 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                Explore Topics
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Info Warning Independent Agency Note */}
      <section className="bg-blue-50 border-y border-blue-100 py-4 relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-start sm:items-center gap-3">
          <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5 sm:mt-0" />
          <p className="text-xs sm:text-sm text-blue-800 leading-relaxed font-medium">
            <strong>Notice:</strong> This is an independent educational knowledge base and help desk. We are not affiliated with, endorsed by, or sponsored by HP Inc. Call number directs to our independent assistance service team.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        
        {/* Contact Assistance Section */}
        <section id="contact" className="scroll-mt-24">
          <ContactCard />
        </section>

        {/* Popular Topics Section */}
        <section id="topics" className="scroll-mt-24 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 font-mono">Resource Map</span>
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 mt-1">Popular Topics</h2>
            </div>
            
            {/* Search Input */}
            <div className="relative max-w-xs w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSelectedTopic('All'); // Reset selected chip to show filtered list
                }}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-colors shadow-xs"
              />
            </div>
          </div>

          {/* Chips grid */}
          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={() => {
                setSelectedTopic('All');
                setSearchQuery('');
              }}
              className={`px-4.5 py-2.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                selectedTopic === 'All' && searchQuery === ''
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/10'
                  : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-800'
              }`}
            >
              All Topics
            </button>
            {topics.map((t, idx) => {
              const isActive = selectedTopic === t.id;
              return (
                <button
                  key={`${t.name}-${idx}`}
                  onClick={() => {
                    setSelectedTopic(t.id);
                    setSearchQuery('');
                    handleScrollToSection('main-content');
                  }}
                  className={`px-4.5 py-2.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/10'
                      : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-800'
                  }`}
                >
                  {t.name}
                </button>
              );
            })}
          </div>
        </section>

        {/* Main Content Sections */}
        <section id="main-content" className="scroll-mt-24 space-y-16">
          {filteredContentSections.length === 0 ? (
            <div className="text-center py-16 bg-white border border-slate-200 rounded-3xl space-y-4">
              <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto" />
              <h3 className="text-lg font-bold text-slate-900">No guides found</h3>
              <p className="text-slate-500 text-sm max-w-sm mx-auto">We couldn't find any guides matching "{searchQuery}". Try searching for another topic or clear the search filter.</p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedTopic('All');
                }}
                className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:underline mt-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            </div>
          ) : (
            filteredContentSections.map((section) => (
              <div 
                key={section.id} 
                id={section.id}
                className="scroll-mt-28 bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-10 shadow-xs hover:shadow-md transition-shadow duration-300 space-y-8"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-100 shrink-0">
                    {section.icon}
                  </div>
                  <div>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                      {section.title}
                    </h3>
                    <p className="text-slate-500 text-sm mt-1 sm:max-w-xl">
                      {section.description}
                    </p>
                  </div>
                </div>

                {/* Steps Details */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 pt-4 border-t border-slate-100">
                  {section.steps.map((step, idx) => (
                    <div key={idx} className="space-y-2 group p-4 rounded-2xl hover:bg-slate-50 transition-colors duration-200">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                          0{idx + 1}
                        </span>
                        <h4 className="font-sans text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {step.title}
                        </h4>
                      </div>
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed pl-1">
                        {step.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </section>

        {/* Featured Guides Section */}
        <section id="guides" className="scroll-mt-24 space-y-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 font-mono">Curated Collections</span>
            <h2 class="font-display text-3xl font-extrabold tracking-tight text-slate-900 mt-1">Featured Guides</h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredGuides.map((guide, idx) => (
              <div 
                key={idx}
                onClick={() => handleScrollToSection(guide.targetId)}
                className="glass-card hover-lift rounded-3xl p-6 border border-slate-200 bg-white flex flex-col justify-between cursor-pointer group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-mono tracking-wider font-semibold text-blue-600 px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-100">
                      Tutorial
                    </span>
                    <span className="text-slate-300 group-hover:text-blue-500 transition-colors">
                      <Printer className="w-4 h-4" />
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {guide.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {guide.desc}
                  </p>
                </div>
                <div className="flex items-center justify-between border-t border-slate-100 mt-6 pt-4 font-mono text-[10px] text-slate-400 group-hover:text-blue-600 transition-colors">
                  <span>View Details</span>
                  <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 overflow-hidden relative">
          <div className="absolute top-0 right-0 h-[300px] w-[300px] bg-gradient-to-bl from-blue-500/10 to-transparent pointer-events-none rounded-bl-full"></div>
          <div className="relative z-10 space-y-10">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400 font-mono">Resource Value</span>
              <h2 className="font-display text-3xl font-extrabold tracking-tight">Why Choose Our Guides</h2>
              <p className="text-slate-400 text-sm">We structure printing tutorials that offer clean configurations and save hours of research.</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {whyChooseUs.map((w, idx) => (
                <div key={idx} className="p-6 bg-slate-950/40 border border-slate-800 rounded-2xl flex items-start gap-4">
                  <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 shrink-0 text-blue-400">
                    {w.icon}
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-sans text-sm font-semibold text-white">{w.title}</h4>
                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{w.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Frequently Asked Questions */}
        <section id="faq" className="scroll-mt-24 space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 font-mono">Got Questions?</span>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-900">Frequently Asked Questions</h2>
            <p className="text-slate-500 text-sm">Find answers to the most common configuration and printer setup questions.</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx} 
                  className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between p-5 text-left font-sans font-semibold text-slate-900 hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    <span className="text-sm sm:text-base pr-4">{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-blue-600 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                    )}
                  </button>
                  
                  <div 
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isOpen ? 'max-h-[300px] border-t border-slate-100' : 'max-h-0'
                    }`}
                  >
                    <p className="p-5 text-slate-600 text-xs sm:text-sm leading-relaxed bg-slate-50/50">
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Articles Section */}
        <section id="articles" className="scroll-mt-24 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 font-mono">Knowledge Base</span>
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 mt-1">Articles &amp; Printing Insights</h2>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {articles.map((art, idx) => (
              <div 
                key={idx}
                className="bg-white border border-slate-200/60 hover:border-blue-500/20 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] uppercase tracking-wider font-bold text-slate-500 font-mono">{art.category}</span>
                    <span className="text-[10px] text-slate-400 font-medium">{art.readTime}</span>
                  </div>
                  <h3 className="font-sans text-sm sm:text-base font-bold text-slate-900">
                    {art.title}
                  </h3>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    {art.desc}
                  </p>
                </div>
                <div className="border-t border-slate-100 pt-3.5 mt-5">
                  <button 
                    onClick={() => handleScrollToSection('setup')}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
                  >
                    <span>Read Article</span>
                    <span className="text-sm">→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

      <Footer />
    </div>
  );
}
