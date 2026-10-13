export interface LabExperiment {
  id: string;
  title: string;
  category: 'Research' | 'Hardware' | 'Benchmarking';
  status: 'Testing' | 'Concluded' | 'Archived';
  verified: boolean;
  startDate: string;
  summary: string;
  hypothesis: string;
  failureNote: string;
  finding: string;
  technologies: string[];
  metrics: {
    label: string;
    value: string;
    comparison?: string;
  }[];
}

export interface LabAutomation {
  id: string;
  title: string;
  domain: 'Hospitality & Dining' | 'Healthcare' | 'Document Workflows';
  verified: boolean;
  status: 'Running in Production' | 'Staged';
  before: string;
  after: string;
  throughput: string;
  technologies: string[];
  steps: {
    number: number;
    title: string;
    description: string;
    timeMs: number;
    engine: string;
  }[];
}

export interface LabProduct {
  id: string;
  title: string;
  type: 'Product' | 'Tool';
  verified: boolean;
  status: 'Launched' | 'Active Testing';
  oneLiner: string;
  problem: string;
  solution: string;
  technologies: string[];
  interactiveType?: 'prompt-diff' | 'schema-check';
}

export interface LabNote {
  id: string;
  title: string;
  date: string;
  readTime: string;
  verified: boolean;
  category: 'Field Findings' | 'Postmortem' | 'Architecture';
  summary: string;
  takeaway: string;
  content: string[];
}

export const LAB_FACTS = {
  name: 'Superiors Studio',
  legalName: 'Superiors Technology',
  location: 'Global studio · Founded August 2019',
  founder: 'Krushna Borase',
  coreFocus: 'Applied AI research, workflow automation, and custom software engineering',
  availability: 'Booking new client builds and automation sprints for Q2 2026',
  technologies: [
    'Next.js & React',
    'Flutter mobile & tablet',
    'Node.js & Django',
    'n8n workflow automation',
    'Local language models (Ollama / vLLM / AWQ)',
    'Modern LLM integration',
    'PostgreSQL databases',
  ],
};

export const LAB_EXPERIMENTS: LabExperiment[] = [
  {
    id: 'exp-ocr-marathi',
    title: 'Complex Script & Receipt OCR vs Multimodal Vision Models',
    category: 'Research',
    status: 'Concluded',
    verified: true,
    startDate: 'Nov 2025',
    summary:
      'Stress testing traditional open-source OCR engines against multimodal vision models on 420 scanned trade records, complex scripts, and degraded paper receipts.',
    hypothesis:
      'Standard open-source OCR engines struggle with low-resolution mobile scans and skewed handwriting; multimodal models with structured schemas produce verified results.',
    failureNote:
      'We spent three weeks fine-tuning traditional OCR on non-Latin fonts. It still misread 41% of numeric tax columns on faded thermal slips. Multimodal vision with strict schema validation was 4x more reliable.',
    finding:
      'Multimodal models with structured output reached 94.6% field accuracy on noisy thermal receipts, but cost $0.008 per page vs $0.0001 for local OCR. A hybrid workflow (initial confidence check with vision fallback) provided the optimal cost and reliability curve.',
    technologies: ['PaddleOCR', 'Claude 3.5 Sonnet', 'Gemini 1.5 Flash', 'FastAPI'],
    metrics: [
      { label: 'Field Accuracy', value: '94.6%', comparison: 'vs 53.2% raw OCR' },
      { label: 'Speed per scan', value: '1.4s', comparison: 'Vision workflow' },
      { label: 'Real receipts tested', value: '420', comparison: 'Active venues' },
    ],
  },
  {
    id: 'exp-edge-mac-mini',
    title: 'On-Premise 7B Model Quantization for Private Clinics',
    category: 'Hardware',
    status: 'Testing',
    verified: true,
    startDate: 'Jan 2026',
    summary:
      'Running 4-bit quantized 7B language models on dedicated on-premise hardware inside a clinic network to organize patient visit summaries with zero external data transmission.',
    hypothesis:
      'A dedicated 16GB compact workstation can maintain steady local processing speed while satisfying strict patient confidentiality constraints.',
    failureNote:
      'The initial 8-bit setup overheated and slowed down during peak walk-in hours. Memory limits caused delays whenever patient visit history exceeded 5,500 tokens.',
    finding:
      'Switching to modern 4-bit AWQ quantization reduced the memory footprint to 4.8GB, delivering steady 18.4 tokens per second with no thermal slowdown across 9 continuous clinic operating hours.',
    technologies: ['MLX', 'Qwen 2.5 7B', 'GGUF / AWQ', 'Apple Silicon', 'FastAPI'],
    metrics: [
      { label: 'Local Speed', value: '18.4 t/s', comparison: '100% on-premise' },
      { label: 'Memory Footprint', value: '4.8 GB', comparison: 'Fits 16GB memory' },
      { label: 'External Data Egress', value: '0 bytes', comparison: 'Private local LAN' },
    ],
  },
  {
    id: 'exp-voice-latency',
    title: 'Voice Agent Response Cadence across Mobile Networks',
    category: 'Benchmarking',
    status: 'Concluded',
    verified: true,
    startDate: 'Feb 2026',
    summary:
      'Measuring real conversational delays across variable 4G and 5G connections to discover where voice agents feel natural rather than awkward.',
    hypothesis:
      'A conversational cadence (under 800ms to first spoken sound) is achievable over real-world mobile networks.',
    failureNote:
      'A standard step-by-step approach (record, upload, transcribe, process, generate audio, play back) clocked 2,450ms. Callers repeatedly talked over the system because of the two-second silence.',
    finding:
      'Natural dialogue cadence was achieved by streaming audio in real-time sentences rather than waiting for whole paragraphs. Response time dropped to 740ms, making conversations feel fluid.',
    technologies: ['WebSockets', 'Deepgram Nova-2', 'Claude 3.5 Haiku', 'Cartesia Streaming'],
    metrics: [
      { label: 'First Spoken Audio', value: '740ms', comparison: 'Streaming workflow' },
      { label: 'Standard Web Delay', value: '2,450ms', comparison: 'Too slow for dialogue' },
      { label: 'Interruption Rate', value: '12%', comparison: 'Down from 48%' },
    ],
  },
];

export const LAB_AUTOMATIONS: LabAutomation[] = [
  {
    id: 'auto-hospitality-whatsapp',
    title: 'Automated Guest Reservations & Kitchen Allocation',
    domain: 'Hospitality & Dining',
    verified: true,
    status: 'Running in Production',
    before:
      'Front-desk staff constantly distracted by incoming chat messages while seating guests; 20% to 30% of reservation requests went unanswered during peak evening rush.',
    after:
      'An automated booking assistant confirms dates, party sizes, and dietary notes, checks real-time seating availability in the database, and notifies floor staff in under 4 seconds.',
    throughput: '340+ reservations handled weekly during peak shifts',
    technologies: ['Messaging API', 'Workflow Engine', 'Node.js', 'PostgreSQL Database', 'Claude 3.5 Haiku'],
    steps: [
      {
        number: 1,
        title: 'Guest Inquiry Arrives',
        description: 'Guest sends a message requesting a table for tomorrow evening.',
        timeMs: 400,
        engine: 'Instant Webhook',
      },
      {
        number: 2,
        title: 'Details Understood',
        description: 'System automatically confirms date, time, party size, and seating preference.',
        timeMs: 650,
        engine: 'Intelligent Parser',
      },
      {
        number: 3,
        title: 'Live Table Checked',
        description: 'Database checks real seating capacity for the requested time slot.',
        timeMs: 80,
        engine: 'Database Verification',
      },
      {
        number: 4,
        title: 'Confirmed & Floor Notified',
        description: 'Guest receives confirmation details; floor staff screen is updated immediately.',
        timeMs: 950,
        engine: 'Automated Workflow',
      },
    ],
  },
  {
    id: 'auto-clinic-triage',
    title: 'Outpatient Triage & Patient Complaint Summary',
    domain: 'Healthcare',
    verified: true,
    status: 'Running in Production',
    before:
      'Patients arriving at clinic reception explaining multi-symptom histories; nurses typing rushed notes leading to delays in doctor consultations.',
    after:
      'Intake tablet captures patient description, structures symptoms into clear clinical summaries, and presents them cleanly to the doctor before the patient walks in.',
    throughput: '90 to 120 patient visits organized daily per clinic branch',
    technologies: ['Tablet Application', 'Multilingual Speech Model', 'Django', 'PostgreSQL'],
    steps: [
      {
        number: 1,
        title: 'Patient Describes Symptoms',
        description: 'Patient speaks comfortably in their preferred language for 30 seconds.',
        timeMs: 500,
        engine: 'Audio Capture',
      },
      {
        number: 2,
        title: 'Speech Transcribed',
        description: 'Spoken dialect is converted into clean readable text on-premise.',
        timeMs: 1200,
        engine: 'On-Device Speech Model',
      },
      {
        number: 3,
        title: 'Key Details Highlighted',
        description: 'Onset duration, pain severity, and current medications are neatly organized.',
        timeMs: 700,
        engine: 'Local AI Model',
      },
      {
        number: 4,
        title: 'Doctor Screen Prepared',
        description: 'Doctor sees a clean one-page summary before consultation begins.',
        timeMs: 150,
        engine: 'Real-Time Sync',
      },
    ],
  },
];

export const LAB_PRODUCTS: LabProduct[] = [
  {
    id: 'prod-menumatrix',
    title: 'MenuMatrix',
    type: 'Product',
    verified: true,
    status: 'Launched',
    oneLiner: 'Contactless ordering, instant inventory sync, and live kitchen display.',
    problem:
      'High-traffic dining venues lose revenue when waitstaff are overwhelmed, while static menus disappoint guests by displaying sold-out items.',
    solution:
      'Smooth mobile ordering directly connected to kitchen display tablets with real-time inventory cutoff and instant payment verification.',
    technologies: ['Next.js', 'Node.js', 'Tablet App', 'PostgreSQL Database', 'Real-Time WebSockets'],
  },
  {
    id: 'prod-clinicflow',
    title: 'ClinicFlow',
    type: 'Product',
    verified: true,
    status: 'Launched',
    oneLiner: 'Fast outpatient queue management and patient intake for polyclinics.',
    problem:
      'Chaotic waiting rooms and lost paper tokens in clinics with multiple consulting specialists.',
    solution:
      'Live queue screens, SMS token updates, and pre-consultation visit summaries organized on intake tablets.',
    technologies: ['Django', 'React', 'PostgreSQL', 'Tailwind CSS'],
  },
  {
    id: 'tool-promptdiff',
    title: 'PromptDiff',
    type: 'Tool',
    verified: true,
    status: 'Launched',
    oneLiner: 'Visual prompt safety tester that prevents unexpected regressions.',
    problem:
      'Teams update instructions to fix one edge case, unintentionally breaking four others.',
    solution:
      'Tests new instructions across cached real scenarios to guarantee quality before customers ever see them.',
    technologies: ['Next.js', 'TypeScript', 'Web Workers'],
    interactiveType: 'prompt-diff',
  },
  {
    id: 'tool-schema-enforcer',
    title: 'Format Guard',
    type: 'Tool',
    verified: true,
    status: 'Launched',
    oneLiner: 'Guarantees that AI responses never break downstream software.',
    problem:
      'Language models occasionally add extra punctuation or formatting marks that crash apps.',
    solution:
      'Catches and automatically repairs formatting quirks so automated workflows run without interruption.',
    technologies: ['TypeScript', 'Validation Schema'],
    interactiveType: 'schema-check',
  },
];

export const LAB_NOTES: LabNote[] = [
  {
    id: 'note-01-marathi-rag',
    title: 'Why standard document chunking broke on 200-page scanned legal records',
    date: '2025-10-18',
    readTime: '4 min',
    verified: true,
    category: 'Postmortem',
    summary:
      'Standard character-based chunking split complex script conjuncts mid-word. Here is what we had to rebuild.',
    takeaway:
      'Never divide text by arbitrary character counts on non-Latin scripts where sentence boundary markers and character combinations get split mid-token.',
    content: [
      'We assumed standard text splitting tools with 500-token blocks would work reliably for complex scanned legal deeds.',
      'We were wrong. Character counts do not equal token counts in non-Latin scripts. Critical vowel markers and conjuncts were getting split across adjacent blocks, causing document searches to return corrupted gibberish.',
      'What solved it: Writing a custom semantic splitter that honors native sentence boundary punctuation and preserves header blocks intact.',
    ],
  },
  {
    id: 'note-02-800ms-voice',
    title: 'The 800ms threshold: why conversational voice agents feel awkward',
    date: '2026-01-22',
    readTime: '3 min',
    verified: true,
    category: 'Field Findings',
    summary:
      'Conversational human cadence tolerates at most 600 to 800 milliseconds of pause before people assume the call disconnected.',
    takeaway:
      'Streaming audio speech sentence-by-sentence matters much more than using the largest reasoning model.',
    content: [
      'In office demos on high-speed internet, a 1.2-second delay looks fine. Over real mobile network connections with latency, that turns into an uncomfortable 2-second silence.',
      'Our field testing showed callers start interrupting ("Hello? Are you there?") if speech playback has not begun within 850 milliseconds.',
      'We shifted from a 70B parameter model to an agile 8B model with real-time audio packet streaming. Response time dropped to 740ms, and conversation completion jumped by 62%.',
    ],
  },
  {
    id: 'note-03-n8n-vs-agents',
    title: 'Why simple workflows beat complex multi-agent swarms in real business operations',
    date: '2026-02-14',
    readTime: '5 min',
    verified: true,
    category: 'Architecture',
    summary:
      'Autonomous multi-agent swarms look exciting in demo videos. In real businesses, owners need reliable audit trails and instant error tracking.',
    takeaway:
      'Confine AI models strictly to understanding messy human input. Let reliable workflows and databases handle the business operations.',
    content: [
      'Three clients came to us asking for autonomous agents to run operations. In two of those cases, we simplified the setup into structured AI understanding feeding directly into clean, deterministic workflows.',
      'Why? Because when an order drops or a balance is calculated, a business owner cannot debug an autonomous agent hallucinating during its thoughts. They need clear logs and a one-click retry.',
      'Our principle at Superiors: Use AI for what it does best (understanding messy human speech or messy documents). Once the data is organized, use dependable, predictable code.',
    ],
  },
];
