export type Product = {
    slug: string;
    name: string;
    tagline: string;
    category: string;
    description: string;
    longDescription: string;
    color: string;
    gradient: string;
    glowColor: string;
    emoji: string;
    specs: { label: string; value: string }[];
    features: { title: string; description: string }[];
    useCases: string[];
    status: 'Available' | 'Coming Soon' | 'In Development';
};

export const products: Product[] = [
    {
        slug: 'kd-sentinel',
        name: 'KD Sentinel',
        tagline: 'Sophisticated AI Drone Detection Model',
        category: 'Surveillance & Detection',
        description:
            'A highly accurate, next-generation AI-powered drone detection system capable of identifying and classifying UAV threats in real time across wide operational areas with industry-leading precision.',
        longDescription:
            'KD Sentinel is our flagship drone detection platform, engineered with a multi-layer sensor fusion architecture that combines passive RF spectrum analysis, acoustic detection, and computer vision. Powered by our proprietary NexaCore AI, it achieves class-leading detection accuracy with near-zero false positives — detecting threats in as little as 30 ms. The system operates fully air-gapped — all AI inference runs on an onboard hardened NPU — making it ideal for classified military installations, airports, and critical national infrastructure. Our AI model is trained on a dataset of over 50 lakh (5 million) images across 5,000+ UAV and drone models, providing unmatched classification depth.',
        color: '#C8A84B',
        gradient: 'linear-gradient(135deg, rgba(200,168,75,0.14), rgba(200,168,75,0.02))',
        glowColor: 'rgba(200, 168, 75, 0.35)',
        emoji: '🛡️',
        specs: [
            { label: 'Detection Range', value: 'Up to 5 km' },
            { label: 'Detection Latency', value: '30 ms' },
            { label: 'Classification Accuracy', value: '99.4%' },
            { label: 'UAV Database', value: '5,000+ models' },
            { label: 'Operating Temperature', value: '-30°C to +60°C' },
            { label: 'Power', value: 'AC / Solar / Battery' },
        ],
        features: [
            { title: 'Multi-Sensor Fusion', description: 'Combines passive RF spectrum analysis, acoustic sensors, and EO/IR camera feeds into a unified AI threat picture for unmatched detection reliability.' },
            { title: 'Passive RF Analysis', description: 'Continuously monitors drone control links and telemetry signals across 433 MHz, 900 MHz, 2.4 GHz, and 5.8 GHz without emitting any detectable signal.' },
            { title: 'AI-Based Classification', description: 'Onboard transformer model classifies detected objects by make, model, and threat level with 99.4% accuracy across a continuously updated 5,000+ UAV database — trained on 50 lakh+ images.' },
            { title: 'Automated Alerts & C2 Integration', description: 'Instantly pushes SMS, email, or API alerts to operators and integrates natively with existing C2, SCADA, and video management systems.' },
        ],
        useCases: [
            'Military Bases & Forward Operating Bases',
            'Airports & Controlled Airspace',
            'Critical Infrastructure (Refineries, Power Plants)',
            'Prisons & High-Security Facilities',
            'Border Surveillance & Coastal Monitoring',
        ],
        status: 'Available',
    },
    {
        slug: 'kd-eagle-eye',
        name: 'KD Eagle Eye',
        tagline: 'Semi-Autonomous AI-Powered Military Turret System',
        category: 'Counter-Drone & Elimination',
        description:
            'A semi-autonomous AI-powered turret system built exclusively for military use — autonomously detecting, tracking, and engaging aerial threats up to 5 km with a full engagement cycle under 3 seconds. Human authorisation required only for the final firing trigger.',
        longDescription:
            'KD Eagle Eye is a military-grade ground-based turret platform that redefines the speed of air defence. Its onboard AI autonomously handles every phase of the engagement — detection in 30 ms, target lock in 100 ms, and threat elimination in approximately 3 seconds — leaving only the final firing decision to a human operator. With a 5 km detection and firing range, it accepts exclusively KD-manufactured smart ammunition, ensuring optimal ballistic and guidance compatibility. Running on AC, DC, or solar power, Eagle Eye is designed for fixed military installations and forward operating bases with no dependence on external power infrastructure.',
        color: '#EF4444',
        gradient: 'linear-gradient(135deg, rgba(239,68,68,0.14), rgba(239,68,68,0.02))',
        glowColor: 'rgba(239, 68, 68, 0.35)',
        emoji: '🎯',
        specs: [
            { label: 'Detection Range', value: 'Up to 5 km' },
            { label: 'Firing Range', value: 'Up to 5 km' },
            { label: 'Detection Time', value: '30 ms' },
            { label: 'Target Lock Time', value: '100 ms' },
            { label: 'Target Elimination', value: '≈ 3 seconds' },
            { label: 'Ammunition', value: 'KD Smart Rounds only' },
            { label: 'Engagement Mode', value: 'Autonomous (Human fires)' },
            { label: 'Power', value: 'AC / DC / Solar' },
        ],
        features: [
            { title: '30 ms Autonomous Detection', description: 'Onboard AI detects and classifies incoming aerial threats in just 30 milliseconds — faster than any human reaction — using multi-sensor fusion across RF, EO/IR, and radar channels.' },
            { title: '100 ms Target Lock', description: 'After detection, the fire control system locks onto the target and computes a full firing solution in 100 ms, accounting for target velocity, wind, and ballistic drop.' },
            { title: 'Human-Authorised Firing', description: 'The entire engagement pipeline — detection, classification, tracking, and aim — is fully autonomous. A human operator retains sole authority over the final firing trigger, ensuring ROE compliance.' },
            { title: 'KD Proprietary Ammunition', description: 'Eagle Eye is engineered to fire exclusively KD smart rounds (KD Prox-50 and KD Viper), ensuring full ballistic, guidance, and fuze compatibility for every engagement.' },
        ],
        useCases: [
            'Military Base & Forward Operating Base Air Defence',
            'Military Convoy & VIP Protection',
            'Military Airfield Perimeter Security',
            'Military Naval Vessel Anti-Drone Defence',
            'Special Forces Hardened Position Defence',
        ],
        status: 'Available',
    },
    {
        slug: 'kd-prox50',
        name: 'KD Prox-50',
        tagline: '.50 Cal Proximity-Fuzed Military Anti-Drone Ammunition',
        category: 'Smart Ammunition',
        description:
            'A military-exclusive .50 calibre smart round with an integrated proximity sensor fuze — purpose-engineered for use with the KD Eagle Eye turret to defeat drones and UAVs via precision airburst detonation without requiring a direct hit.',
        longDescription:
            'The KD Prox-50 is a self-powered .50 BMG (12.7×99mm) proximity-fuzed smart round developed exclusively for military deployment in the KD Eagle Eye turret system. Its onboard MEMS proximity sensor autonomously detects the target UAV within a programmable lethal radius and triggers airburst fragmentation — eliminating fast-moving and evasive drones that standard ball ammunition cannot reliably hit. Self-contained and self-powered, the round requires no external guidance or weapon modification. It is engineered exclusively for KD systems, ensuring optimal fuze timing, fragmentation pattern, and ballistic compatibility.',
        color: '#F59E0B',
        gradient: 'linear-gradient(135deg, rgba(245,158,11,0.14), rgba(245,158,11,0.02))',
        glowColor: 'rgba(245, 158, 11, 0.35)',
        emoji: '💥',
        specs: [
            { label: 'Calibre', value: '.50 BMG (12.7×99mm)' },
            { label: 'Platform', value: 'KD Eagle Eye (exclusive)' },
            { label: 'Fuze Type', value: 'MEMS Active Proximity' },
            { label: 'Lethal Radius', value: 'Programmable (1–5 m)' },
            { label: 'Power', value: 'Self-Powered (onboard cell)' },
            { label: 'Target Class', value: 'Military — Group 1–3 UAVs' },
        ],
        features: [
            { title: 'Active Proximity Airburst', description: 'MEMS proximity sensor triggers precision airburst detonation within the programmable lethal radius — no direct hit required, maximising lethality against fast and evasive UAVs.' },
            { title: 'Self-Powered Round', description: 'The onboard power cell independently drives all fuze electronics from storage through flight — no external power, laser, or RF link required for operation.' },
            { title: 'KD Eagle Eye Exclusive', description: 'Engineered to load and fire exclusively from the KD Eagle Eye turret, with ballistic, fuze timing, and fragmentation parameters tuned to the system\'s fire control solution.' },
            { title: 'Anti-Swarm Capability', description: 'Airburst fragmentation pattern creates a lethal cone effective against drone swarms where direct-fire rounds would be insufficient.' },
        ],
        useCases: [
            'Military Base & FOB Anti-Drone Defence',
            'Military Airfield Perimeter Security',
            'Military Naval Vessel Close-In Defence',
            'Forward Military Position Air Defence',
            'Drone Swarm Suppression — Military Only',
        ],
        status: 'Available',
    },
    {
        slug: 'kd-viper',
        name: 'KD Viper',
        tagline: 'Dual Laser-Guided Mid-Flight Trajectory Military Ammunition',
        category: 'Smart Ammunition',
        description:
            'A military-exclusive 170×67mm self-powered smart munition that changes trajectory mid-flight using dual laser guidance — laser homing and laser beam riding — achieving sub-metre precision against moving aerial and ground targets.',
        longDescription:
            'KD Viper is a military-grade 170×67mm self-powered guided munition that brings aircraft-class precision to ground-level launchers. It employs a dual laser guidance architecture: a semi-active laser homing seeker that locks onto the laser spot on target, combined with laser beam riding that keeps the round flying precisely along the designator beam — providing redundant guidance for maximum hit probability even against fast-moving or aggressively manoeuvring UAVs. Self-powered from launch through impact, it requires no external power link from the firing platform. Like the KD Prox-50, the Viper is engineered exclusively for the KD Eagle Eye turret system, ensuring full ballistic and guidance integration. Built for military use only.',
        color: '#10B981',
        gradient: 'linear-gradient(135deg, rgba(16,185,129,0.14), rgba(16,185,129,0.02))',
        glowColor: 'rgba(16, 185, 129, 0.35)',
        emoji: '🚀',
        specs: [
            { label: 'Form Factor', value: '170 × 67 mm' },
            { label: 'Guidance', value: 'Laser Homing + Laser Beam Riding' },
            { label: 'Mid-Flight Correction', value: 'Micro-Canard Actuators' },
            { label: 'CEP (Accuracy)', value: '< 0.5 m' },
            { label: 'Platform', value: 'KD Eagle Eye (exclusive)' },
            { label: 'Power', value: 'Self-Powered (onboard cell)' },
            { label: 'Market', value: 'Military Only' },
        ],
        features: [
            { title: 'Dual Laser Guidance', description: 'Combines semi-active laser homing — tracking the laser spot on target — with laser beam riding, which keeps the round aligned to the designator beam, providing two independent guidance channels for maximum lethality.' },
            { title: 'Mid-Flight Trajectory Control', description: 'Micro-actuated canards physically steer the munition in flight, correcting for wind, target manoeuvring, and initial aim error in real time throughout the entire flight path.' },
            { title: 'Self-Powered Munition', description: 'An onboard power cell independently drives all guidance electronics and canard actuators from launch through terminal approach — no power link from the launcher required.' },
            { title: 'KD Eagle Eye Exclusive', description: 'Designed to interface exclusively with the KD Eagle Eye turret\'s fire control and laser designation system, ensuring full ballistic, timing, and guidance parameter integration.' },
        ],
        useCases: [
            'Military Anti-Drone Precision Strike',
            'Fast-Moving UAV Interception — Military',
            'Military Urban Warfare Precision Fire',
            'Forward Military Position — Hard Kill Layer',
            'Special Forces Precision Aerial Threat Defeat',
        ],
        status: 'In Development',
    },
];

export function getProductBySlug(slug: string): Product | undefined {
    return products.find(p => p.slug === slug);
}

export const categoryColors: Record<string, string> = {
    'Surveillance & Detection': '#C8A84B',
    'Counter-Drone & Elimination': '#EF4444',
    'Smart Ammunition': '#F59E0B',
};
