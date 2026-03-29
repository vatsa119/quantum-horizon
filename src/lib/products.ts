import type { Product } from '@/types'

export const PRODUCTS: Product[] = [
  // ============================================
  // SECTOR 01: Mud Pumps & Handling Tools (7)
  // ============================================
  {
    id: 'high-chrome-liner', name: 'High Chrome Liner', model: 'HCL-API', sector: 'mud-pumps-handling',
    description: 'Bimetallic liner with high chrome iron sleeve. Exceptional wear resistance for high-pressure mud pumps.',
    specifications: { 'Hardness': 'HRC 62-65', 'Service Life': '> 800 Hours', 'Material': 'Forged Steel Shell' },
    images: [], stockStatus: 'in-stock', certifications: ['API 7K']
  },
  {
    id: 'zirconia-liner', name: 'Zirconia Liners', model: 'ZL-PRO', sector: 'mud-pumps-handling',
    description: 'Ceramic zirconia liners offering superior fracture toughness and chemical resistance.',
    specifications: { 'Material': 'ZRO2 Ceramic', 'Service Life': '> 4000 Hours', 'Compatability': 'All major OEM pumps' },
    images: [], stockStatus: 'in-stock', certifications: ['API 7K']
  },
  {
    id: 'pipe-jacks', name: 'Pipe Jacks & Rollers', model: 'PJR-Heavy', sector: 'mud-pumps-handling',
    description: 'Heavy-duty pipe handling systems for safe tubular movement on the rig floor.',
    specifications: { 'Capacity': 'Varies by model', 'Base': 'Standard / V-Head', 'Adjustment': 'Heavy duty screw' },
    images: [], stockStatus: 'in-stock', certifications: ['ISO 9001']
  },
  {
    id: 'mouse-hole-tool', name: 'Rotating Mouse-Hole Tool', model: 'RMT-100', sector: 'mud-pumps-handling',
    description: 'Improves rig efficiency by allowing stand makeup separate from the rotary table.',
    specifications: { 'Drive': 'Pneumatic / Hydraulic', 'Torque Capacity': 'Rig specific' },
    images: [], stockStatus: 'on-request', certifications: ['API 7K']
  },
  {
    id: 'safety-clamps', name: 'Safety Clamps', model: 'Type C / T / MP', sector: 'mud-pumps-handling',
    description: 'Essential handling tool for flush joint pipes and drill collars to prevent dropping.',
    specifications: { 'Grip Range': '1 1/8" to 36"', 'Links': 'Adjustable configurations' },
    images: [], stockStatus: 'in-stock', certifications: ['API 7K']
  },
  {
    id: 'slip-lifting', name: 'Slip Lifting Device', model: 'SLD-Air', sector: 'mud-pumps-handling',
    description: 'Pneumatically operated slip lifting mechanism to reduce crew fatigue and enhance safety.',
    specifications: { 'Actuation': 'Pneumatic', 'Control': 'Foot pedal or remote' },
    images: [], stockStatus: 'limited', certifications: ['API 7K']
  },
  {
    id: 'elevators', name: 'Elevators (Center Latch / Side Door)', model: 'ELEV-API', sector: 'mud-pumps-handling',
    description: 'Precision machined handling elevators for drill pipe, casing, and tubing.',
    specifications: { 'Capacity': 'up to 1,000 Tons', 'Size Range': '2 3/8" to 36"' },
    images: [], stockStatus: 'in-stock', certifications: ['API 8C']
  },

  // ============================================
  // SECTOR 02: Tubulars & Accessories (7)
  // ============================================
  {
    id: 'drill-pipes', name: 'Drill Pipes', model: 'DP-API5DP', sector: 'tubulars-accessories',
    description: 'High-strength steel and aluminum drill pipes manufactured to strict API 5DP tolerances.',
    specifications: { 'Grades': 'E-75 to S-135', 'Lengths': 'Range 2, 3', 'Connections': 'NC, FH, IF' },
    images: [], stockStatus: 'in-stock', certifications: ['API 5DP']
  },
  {
    id: 'hwdp', name: 'Heavy Weight Drill Pipes', model: 'HWDP-API', sector: 'tubulars-accessories',
    description: 'Thick-walled transition pipe maximizing weight on bit while reducing fatigue.',
    specifications: { 'Type': 'Standard / Spiral', 'Hardbanding': 'Optional', 'Connections': 'API Standard' },
    images: [], stockStatus: 'in-stock', certifications: ['API 7-1']
  },
  {
    id: 'mag-drill-collars', name: 'Magnetic Drill Collars', model: 'MDC-Slick', sector: 'tubulars-accessories',
    description: 'Conventional heavy steel drill collars available in slick or spiraled configurations.',
    specifications: { 'Material': 'AISI 4145H Modified', 'Profiles': 'Slick / Spiral' },
    images: [], stockStatus: 'in-stock', certifications: ['API 7-1']
  },
  {
    id: 'non-mag-collars', name: 'Non-Magnetic Drill Collars', model: 'NMDC-HD', sector: 'tubulars-accessories',
    description: 'Specialized non-mag alloys protecting sensitive MWD/LWD directional telemetry.',
    specifications: { 'Material': 'Chromium-Manganese', 'Permeability': '< 1.01', 'Galling Resistance': 'High' },
    images: [], stockStatus: 'limited', certifications: ['API 7-1']
  },
  {
    id: 'casing-api', name: 'API Casing', model: 'CAS-5CT', sector: 'tubulars-accessories',
    description: 'Structural and production casing string segments ensuring wellbore integrity.',
    specifications: { 'Grades': 'K55, L80, P110, Q125', 'Connections': 'BTC, Premium', 'Sizes': '4 1/2" to 20"' },
    images: [], stockStatus: 'on-request', certifications: ['API 5CT']
  },
  {
    id: 'tubing-api', name: 'API Tubing', model: 'TUB-5CT', sector: 'tubulars-accessories',
    description: 'Seamless production tubing designed to handle corrosive and high-pressure reservoir flow.',
    specifications: { 'Connections': 'NUE, EUE, Premium', 'Grades': 'J55 to P110' },
    images: [], stockStatus: 'in-stock', certifications: ['API 5CT']
  },
  {
    id: 'slips-bowls', name: 'Bowls & Slips', model: 'BS-API', sector: 'tubulars-accessories',
    description: 'Rotary slips and master casing bowls securing downhole strings in the rotary table.',
    specifications: { 'Slip Type': 'Rotary / Drill Collar / Casing', 'Grip': 'Replaceable inserts' },
    images: [], stockStatus: 'in-stock', certifications: ['API 7K']
  },

  // ============================================
  // SECTOR 03: Drilling & Downhole Tools (7)
  // ============================================
  {
    id: 'downhole-motor', name: 'Downhole Motor', model: 'PDM-Taurus', sector: 'downhole-tools',
    description: 'Positive Displacement Motors converting drilling fluid pressure into rotational mechanical power.',
    specifications: { 'Sections': 'Power, Transmission, Bearing', 'Bend Angle': 'Fixed / Adjustable' },
    images: [], stockStatus: 'limited', certifications: ['API 7']
  },
  {
    id: 'rotary-kelly', name: 'Rotary Kelly (Hex/Square)', model: 'RK-HEXSQ', sector: 'downhole-tools',
    description: 'Forged and heat-treated kelly bars transferring torque from the rotary table to the drill string.',
    specifications: { 'Drive Shape': 'Square / Hexagonal', 'Material': 'AISI 4145H Mod' },
    images: [], stockStatus: 'in-stock', certifications: ['API 7K']
  },
  {
    id: 'integral-stabilizer', name: 'Integral Blade Stabilizer', model: 'IBS-API', sector: 'downhole-tools',
    description: 'Solid single-piece stabilizer controlling BHA trajectory and minimizing vibration.',
    specifications: { 'Type': 'Near Bit / String', 'Hardfacing': 'HF1000 to HF5000' },
    images: [], stockStatus: 'in-stock', certifications: ['API 7-1']
  },
  {
    id: 'sleeve-stabilizer', name: 'Replaceable Sleeve Stabilizer', model: 'RSS-API', sector: 'downhole-tools',
    description: 'Two-piece stabilizer allowing rapid rig-floor sleeve replacement without breaking the BHA.',
    specifications: { 'Makeup': 'Mandrel + Sleeve', 'Application': 'Abrasive formations' },
    images: [], stockStatus: 'in-stock', certifications: ['API 7-1']
  },
  {
    id: 'nonrot-stabilizer', name: 'Non-Rotating Stabilizer', model: 'NRS-Rub', sector: 'downhole-tools',
    description: 'Rubber or urethane sleeve remaining stationary while the drill string rotates, preventing casing wear.',
    specifications: { 'Sleeve': 'Elastomeric / Metal', 'Application': 'Casing protection' },
    images: [], stockStatus: 'on-request', certifications: ['API 7-1']
  },
  {
    id: 'roller-reamer', name: 'Roller Reamers', model: 'RR-3P', sector: 'downhole-tools',
    description: 'Three-point or six-point roller reamers maintaining gauge hole in hard formations.',
    specifications: { 'Cutters': 'Milled Tooth / TCI', 'Bearing': 'Sealed' },
    images: [], stockStatus: 'in-stock', certifications: ['API 7-1']
  },
  {
    id: 'becket-bails', name: 'Becket & Bails', model: 'BB-Heavy', sector: 'downhole-tools',
    description: 'Heavy duty lifting connections linking the traveling block to the top drive or hook.',
    specifications: { 'Capacity': 'up to 1,000 Tons', 'Material': 'Forged Alloy Steel' },
    images: [], stockStatus: 'in-stock', certifications: ['API 8C']
  },

  // ============================================
  // SECTOR 04: Valves & BOP Components (7)
  // ============================================
  {
    id: 'dropin-check', name: 'Drop-In Check Valve', model: 'DICV-API', sector: 'valves-bop',
    description: 'Pump-down check valve deployed during kick control to prevent upward flow inside the string.',
    specifications: { 'Working Pressure': 'up to 15,000 PSI', 'Service': 'H2S NACE' },
    images: [], stockStatus: 'in-stock', certifications: ['API 7G']
  },
  {
    id: 'inside-bop', name: 'Inside BOP (IBOP)', model: 'IBOP-10K', sector: 'valves-bop',
    description: 'Heavy-duty dart check valve kept on the rig floor to secure the drill pipe during a blowout.',
    specifications: { 'Pressure': '10,000 PSI / 15,000 PSI', 'Type': 'Heavy Duty Dart' },
    images: [], stockStatus: 'in-stock', certifications: ['API 16A']
  },
  {
    id: 'arrow-bpv', name: 'Arrow Type Back Pressure Valve', model: 'BPV-Arrow', sector: 'valves-bop',
    description: 'Specialized check valve sealing against well pressure while allowing fluid pump-in.',
    specifications: { 'Configuration': 'Arrow Dart', 'Threads': 'API Standard' },
    images: [], stockStatus: 'limited', certifications: ['API 6A']
  },
  {
    id: 'float-valve', name: 'Float Valve Sub', model: 'FVS-API', sector: 'valves-bop',
    description: 'Contains a float valve assembly near the bit to prevent cuttings from plugging the bit jets.',
    specifications: { 'Type': 'Flapper (Model F) / Plunger (Model G)' },
    images: [], stockStatus: 'in-stock', certifications: ['API 7']
  },
  {
    id: 'bypass-valve', name: 'By-pass Valve', model: 'BPV-Sub', sector: 'valves-bop',
    description: 'Permits fluid bypass during tripping operations to eliminate swabbing and surging effects.',
    specifications: { 'Action': 'Mechanical / Hydraulic Activation' },
    images: [], stockStatus: 'on-request', certifications: ['API 7G']
  },
  {
    id: 'kelly-valves', name: 'Kelly Valves', model: 'U/LKV-10K', sector: 'valves-bop',
    description: 'Upper and lower kelly cocks providing crucial manual pressure control at the top of the string.',
    specifications: { 'Mechanism': 'Quarter-turn ball', 'Pressure Rating': 'up to 15,000 PSI' },
    images: [], stockStatus: 'in-stock', certifications: ['API 7']
  },
  {
    id: 'full-opening-sv', name: 'Full Opening Safety Valve', model: 'FOSV-10K', sector: 'valves-bop',
    description: 'Rig floor safety valve stabbed into the string during an influx. Permits tool passage.',
    specifications: { 'Bore': 'Full Opening ID', 'Working Pressure': '10,000 PSI' },
    images: [], stockStatus: 'in-stock', certifications: ['API 7']
  },

  // ============================================
  // SECTOR 05: Drilling Jars & Shock Absorbers (7)
  // ============================================
  {
    id: 'qy-high-temp-jar', name: 'QY Type High-Temperature Hydraulic Jar', model: 'QY-HT', sector: 'drilling-jars',
    description: 'Reliable hydraulic jarring impact tailored for high-temperature HPHT ultra-deep wells.',
    specifications: { 'Max Temp': '200°C', 'Impact': 'Upward & Downward' },
    images: [], stockStatus: 'limited', certifications: ['API 7-1']
  },
  {
    id: 'qy-hydraulic-jar', name: 'QY Type Hydraulic Drilling Jar', model: 'QY-STD', sector: 'drilling-jars',
    description: 'Standard bi-directional hydraulic jar releasing massive kinetic energy to free stuck pipe.',
    specifications: { 'Operation': 'Hydraulic fluid delay', 'Reset': 'Automatic' },
    images: [], stockStatus: 'in-stock', certifications: ['API 7-1']
  },
  {
    id: 'qysz-double-acting', name: 'QYSZ III Double Acting Hydraulic Jar', model: 'QYSZ-III', sector: 'drilling-jars',
    description: 'Advanced third generation design providing heavier jarring loads uniformly.',
    specifications: { 'Type': 'Double Acting Hydraulic', 'Service': 'Standard / Sour' },
    images: [], stockStatus: 'in-stock', certifications: ['API 7-1']
  },
  {
    id: 'jysz-hydromech', name: 'JYSZ Double Acting Hydro-Mechanical Jar', model: 'JYSZ', sector: 'drilling-jars',
    description: 'Combines the reliability of mechanical detents with hydraulic amplification.',
    specifications: { 'Mechanism': 'Hydraulic + Mechanical', 'Tonnage': 'Variable trigger' },
    images: [], stockStatus: 'on-request', certifications: ['API 7-1']
  },
  {
    id: 'qjz-mech-jar', name: 'QJZ Mechanical Drilling Jar', model: 'QJZ', sector: 'drilling-jars',
    description: 'Purely mechanical jarring relying on pre-set tripping loads. Requires no fluid delays.',
    specifications: { 'Operation': 'Friction/Spring detent', 'Load Setting': 'Surface adjustable' },
    images: [], stockStatus: 'in-stock', certifications: ['API 7-1']
  },
  {
    id: 'double-shock', name: 'Double-Way Shock Absorber', model: 'DSA', sector: 'drilling-jars',
    description: 'Absorbs both axial and torsional vibrations generated by the bit in hard rock.',
    specifications: { 'Spring Matrix': 'Belleville / Elastomer', 'Direction': 'Dual Axis' },
    images: [], stockStatus: 'in-stock', certifications: ['API 7-1']
  },
  {
    id: 'single-shock', name: 'One-Way Shock Absorber', model: 'OSA', sector: 'drilling-jars',
    description: 'Specialized isolator focusing entirely on damping destructive axial bounced impacts.',
    specifications: { 'Focus': 'Axial damping', 'Stiffness': 'Tunable' },
    images: [], stockStatus: 'limited', certifications: ['API 7-1']
  },

  // ============================================
  // SECTOR 06: Fishing Tools (7)
  // ============================================
  {
    id: 'csj-super-jar', name: 'CSJ Super Fishing Jar', model: 'CSJ-Super', sector: 'fishing-tools',
    description: 'Extra-heavy duty hydraulic jar delivering massive instantaneous impact for fishing operations.',
    specifications: { 'Stroke': 'Extended 24"', 'Impact Load': 'Extreme High Tonnage' },
    images: [], stockStatus: 'in-stock', certifications: ['API 7-1']
  },
  {
    id: 'csj-fishing-jar', name: 'CSJ Fishing Jar', model: 'CSJ-Standard', sector: 'fishing-tools',
    description: 'Standard reliable hydraulic fishing jar used globally to retrieve parted tubulars.',
    specifications: { 'OD Range': '3 1/8" to 7 3/4"', 'Delay Time': '30 - 120 secs' },
    images: [], stockStatus: 'in-stock', certifications: ['API 7-1']
  },
  {
    id: 'rel-rev-overshot', name: 'Releasable Reversing Overshot', model: 'RRO-Series', sector: 'fishing-tools',
    description: 'Engages the OD of a fish and permits left-hand torque to back off stuck strings.',
    specifications: { 'Engagement': 'External Grapple', 'Torque': 'High Left-Hand' },
    images: [], stockStatus: 'limited', certifications: ['ISO 9001']
  },
  {
    id: 'lifting-overshot', name: 'Lifting Lower & Releasing Overshot', model: 'LLR-O', sector: 'fishing-tools',
    description: 'Versatile overshot allowing pump-through capabilities, jarring, and clean release.',
    specifications: { 'Grapple': 'Spiral / Basket', 'Packoff': 'High Pressure Integral' },
    images: [], stockStatus: 'in-stock', certifications: ['ISO 9001']
  },
  {
    id: 'releasing-spear', name: 'Releasing Spear', model: 'RS-ITCO', sector: 'fishing-tools',
    description: 'Internal fishing tool designed to securely grip the ID of lost tubulars.',
    specifications: { 'Engagement': 'Internal', 'Release Mechanism': 'Right-hand rotation' },
    images: [], stockStatus: 'in-stock', certifications: ['ISO 9001']
  },
  {
    id: 'segment-spear', name: 'Segment-Type Spear Grapple', model: 'ST-Grapple', sector: 'fishing-tools',
    description: 'Provides 360-degree internal engagement area ensuring pipe is not distorted during retrieval.',
    specifications: { 'Type': 'Segmented Expanding', 'Wickers': 'Hardened' },
    images: [], stockStatus: 'in-stock', certifications: ['ISO 9001']
  },
  {
    id: 'reversing-sub', name: 'Reversing Sub', model: 'REV-SUB', sector: 'fishing-tools',
    description: 'Translates right-hand rig floor rotation into left-hand downhole rotation for backing off stuck fish.',
    specifications: { 'Mechanism': 'Planetary Gearing', 'Torque Capacity': 'Matched to drill string' },
    images: [], stockStatus: 'on-request', certifications: ['API 7G']
  }
]

export const SECTOR_LABELS: Record<string, string> = {
  'mud-pumps-handling':   'Sector 01 — Mud Pumps & Handling Tools',
  'tubulars-accessories': 'Sector 02 — Tubulars & Accessories',
  'downhole-tools':       'Sector 03 — Drilling & Downhole Tools',
  'valves-bop':           'Sector 04 — Valves & BOP Components',
  'drilling-jars':        'Sector 05 — Drilling Jars & Shock Absorbers',
  'fishing-tools':        'Sector 06 — Fishing Tools',
}
