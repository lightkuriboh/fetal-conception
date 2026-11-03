/**
 * THE GENESIS OF LIFE — Comprehensive Medical & Embryological Dataset
 * Contains clinical data, anatomical structures, timeline markers,
 * hormonal balances, camera presets, and interactive 3D hotspot coordinates.
 */

export const STAGES_DATA = [
  {
    id: 'ovulation',
    index: 0,
    branch: 'pregnancy',
    title: 'Ovarian Ovulation',
    subtitle: 'The Release of the Mature Oocyte',
    timelineLabel: 'Day 14',
    dayRange: 'Day 14 (Mid-Cycle)',
    scale: '~120 µm (Cellular)',
    durationMs: 8000,
    heartbeatBpm: 0,
    category: 'Gamete Genesis',
    summary: 'Under the peak surge of Luteinizing Hormone (LH), the dominant Graafian follicle ruptures through the ovarian cortex, ejecting a secondary oocyte surrounded by the radiating mantle of follicular cells.',
    narrative: `Every month, inside the ovary, several primordial follicles mature under the influence of Follicle-Stimulating Hormone (FSH). By Day 14 of a standard 28-day cycle, a single dominant <strong>Graafian follicle</strong> balloons to nearly 20 mm in diameter.
    
    A sudden surge in <strong>Luteinizing Hormone (LH)</strong> triggers the release of proteolytic enzymes that weaken the ovarian capsule. The follicle bursts, discharging the <strong>secondary oocyte</strong> suspended in fluid.
    
    Surrounding the egg is the gelatinous glycoprotein shell—the <strong>Zona Pellucida</strong>—and an outer corona of nutrient-supplying follicular cells called the <strong>Corona Radiata</strong>. Gently sweeping over the ovary are the ciliated finger-like <strong>fimbriae</strong> of the fallopian tube, creating a hydrodynamic vortex to draw the egg into the ampulla.`,
    stats: [
      { label: 'Egg Diameter', value: '120 µm', highlight: 'highlight-cyan' },
      { label: 'Viable Window', value: '12 – 24 Hrs', highlight: 'highlight-rose' },
      { label: 'Cellular Stage', value: 'Metaphase II', highlight: 'highlight-amber' },
      { label: 'LH Surge Peak', value: '~40 mIU/mL', highlight: 'highlight-emerald' }
    ],
    hormones: [
      { name: 'LH (Luteinizing Hormone)', level: '98%', color: '#ff2a70' },
      { name: 'FSH (Follicle-Stimulating)', level: '65%', color: '#a855f7' },
      { name: 'Estrogen (Estradiol)', level: '85%', color: '#00f0ff' },
      { name: 'Progesterone', level: '15%', color: '#ffaa00' }
    ],
    structures: [
      { name: 'Graafian Follicle', desc: 'Mature ovarian follicle ready to rupture' },
      { name: 'Secondary Oocyte', desc: 'The female gamete arrested in metaphase II' },
      { name: 'Zona Pellucida', desc: 'Protective thick glycoprotein coat' },
      { name: 'Corona Radiata', desc: 'Outer crown of nourishing granulosa cells' },
      { name: 'Fimbriae', desc: 'Ciliated fringes creating fluid currents' }
    ],
    clinicalFact: 'The human egg is one of the largest single cells in the human body—large enough to be barely visible to the naked eye, roughly the diameter of a period mark at the end of a sentence.',
    camera: {
      position: { x: 0, y: 3, z: 22 },
      target: { x: 0, y: 0, z: 0 },
      fov: 45
    },
    annotations: [
      { id: 'follicle', label: 'Rupturing Follicle', pos: [-4.2, 1.2, 0] },
      { id: 'oocyte', label: 'Secondary Oocyte (Egg)', pos: [0, 0.5, 0] },
      { id: 'fimbriae', label: 'Tubal Fimbriae', pos: [5.2, -1.0, 0] }
    ]
  },

  {
    id: 'menstruation',
    index: 1,
    branch: 'menstruation',
    title: 'The Menstrual Cycle',
    subtitle: 'Alternate Fate: No Fertilization Occurs',
    timelineLabel: 'Days 15–28',
    dayRange: 'Days 15 – 28 & Menses',
    scale: 'Organ Scale (~7 cm)',
    durationMs: 8000,
    heartbeatBpm: 0,
    category: 'Endometrial Reset',
    summary: 'When no viable sperm fertilizes the oocyte within 24 hours, the unfertilized egg naturally degenerates. The corpus luteum withers, progesterone drops abruptly, and the uterine lining is shed as menses.',
    narrative: `If fertilization does not take place within 12 to 24 hours after ovulation, the delicate oocyte autolyses and is quietly absorbed in the fallopian tube.
    
    Without an embryonic signal (hCG), the empty follicle that had formed the <strong>Corpus Luteum</strong> can no longer be sustained. It degenerates into a pale, fibrous scar tissue called the <strong>Corpus Albicans</strong>.
    
    This regression triggers a dramatic collapse in circulating <strong>Progesterone and Estrogen</strong>. Deprived of hormonal support, the coiled spiral arteries of the uterine endometrium undergo intense vasoconstrictive spasms.
    
    Ischemia follows: the functional layer (<strong>Stratum Functionale</strong>) necrosis and peels away from the deeper basal layer. Rhythmic uterine contractions flush out the tissue fragments and blood in the process known as <strong>Menstruation (Menses)</strong>, resetting the reproductive system for another monthly cycle.`,
    stats: [
      { label: 'Egg Lifespan', value: '< 24 Hours', highlight: 'highlight-rose' },
      { label: 'Endometrial Loss', value: '30 – 50 mL', highlight: 'highlight-amber' },
      { label: 'Luteal Degeneration', value: 'Corpus Albicans', highlight: 'highlight-cyan' },
      { label: 'Progesterone Drop', value: '-85% Fall', highlight: 'highlight-rose' }
    ],
    hormones: [
      { name: 'Progesterone', level: '8%', color: '#ff2a70' },
      { name: 'Estrogen', level: '12%', color: '#00f0ff' },
      { name: 'LH / FSH', level: '10%', color: '#a855f7' },
      { name: 'hCG Signal', level: '0% (Absent)', color: '#64748b' }
    ],
    structures: [
      { name: 'Corpus Albicans', desc: 'Fibrous scar of the regressed corpus luteum' },
      { name: 'Stratum Functionale', desc: 'Shedding superficial layer of the endometrium' },
      { name: 'Spiral Arteries', desc: 'Coiled vessels undergoing vasospasm and menses' },
      { name: 'Cervical Canal', desc: 'Exit pathway for menstrual flow' }
    ],
    clinicalFact: 'Menstrual blood does not clot like normal blood because the uterine lining releases a high concentration of plasmin, an enzyme that dissolves fibrin meshes.',
    camera: {
      position: { x: 0, y: 4, z: 26 },
      target: { x: 0, y: -1, z: 0 },
      fov: 45
    },
    annotations: [
      { id: 'corpus_albicans', label: 'Corpus Albicans (Scar)', pos: [-5.0, 1.5, 0] },
      { id: 'shedding_wall', label: 'Endometrial Shedding', pos: [0, 0.5, 0] },
      { id: 'cervix_exit', label: 'Menses Flow (Cervix)', pos: [0, -4.2, 0] }
    ]
  },

  {
    id: 'intercourse',
    index: 2,
    branch: 'pregnancy',
    title: 'Coitus, Ejaculation & Sperm Entry',
    subtitle: 'Body Parts Interaction & The Ejaculatory Jet',
    timelineLabel: 'Day 14 / Coitus',
    dayRange: 'Day 14 (Hour 0)',
    scale: 'Pelvic Anatomy (~15 cm)',
    durationMs: 8500,
    heartbeatBpm: 0,
    category: 'Coitus & Insemination',
    summary: 'During sexual intercourse, the erect penis engages the vaginal canal. At climax, coordinated muscular spasms propel sperm from the testes through the vas deferens and urethra, shooting high-velocity semen jets into the posterior fornix where sperm immediately penetrate the external cervical os to enter the female reproductive system.',
    narrative: `<strong>1. Anatomical Engagement & Intromission:</strong>
    During coitus, the erect penis enters the elastic muscular vaginal canal, which expands and secretes lubricating transudate. The glans penis aligns directly opposite the cervix and posterior fornix at the vaginal vault.
    
    <strong>2. The Emission Phase (How Sperm Move):</strong>
    Upon reaching climax, sympathetic nerve signals trigger intense rhythmic peristaltic contractions of the smooth muscle walls of the <strong>epididymis and Vas Deferens</strong>. Millions of mature sperm are swept rapidly from the testes, looping over the bladder into the ampulla.
    
    Simultaneously, the <strong>seminal vesicles</strong> contract (adding 65% of semen volume: fructose energy and alkaline buffers) and the <strong>prostate gland</strong> adds 30% of semen volume (enzymes and zinc) to form semen.
    
    <strong>3. The Expulsion Phase (How Sperm Get Out):</strong>
    The internal urethral sphincter clamps shut to prevent retro-urination. Somatic nerve impulses command powerful rhythmic spasms of the <strong>bulbospongiosus and ischiocavernosus muscles</strong>, pulsating at 0.8-second intervals.
    
    These explosive contractions propel the semen down the <strong>penile urethra</strong>, shooting out of the external urethral meatus at velocities reaching up to <strong>45 km/h (28 mph)</strong> in distinct pulsatile jets!
    
    <strong>4. Entering the Female Reproductive System:</strong>
    The semen jet deposits directly against the <strong>posterior fornix</strong>, forming a warm, alkaline pool right beneath the <strong>external cervical os</strong>.
    
    Within 90 seconds, thousands of the most vigorous, hyper-motile sperm swim out of the coagulated seminal pool, penetrate the microscopic channels of the cervical mucus (spinnbarkeit), cross the cervical canal, and stream into the <strong>uterine cavity</strong>, beginning their epic migration toward the fallopian tubes!`,
    stats: [
      { label: 'Ejaculate Velocity', value: '~45 km/h (28 mph)', highlight: 'highlight-rose' },
      { label: 'Sperm Ejaculated', value: '200 – 300 Million', highlight: 'highlight-cyan' },
      { label: 'Cervical Entry Time', value: '< 90 Seconds', highlight: 'highlight-emerald' },
      { label: 'Insemination Site', value: 'Posterior Fornix', highlight: 'highlight-amber' }
    ],
    hormones: [
      { name: 'Sympathetic Emission Reflex', level: '100%', color: '#ff2a70' },
      { name: 'Somatic Expulsion Reflex', level: '100%', color: '#00f0ff' },
      { name: 'Oxytocin & Prostaglandins', level: '90%', color: '#ffaa00' }
    ],
    structures: [
      { name: 'Vulva & Labia', desc: 'External genitalia: Mons Pubis, Labia Majora & Minora' },
      { name: 'Clitoris & Prepuce', desc: 'Sensitive erectile glans anterior to urethral opening' },
      { name: 'Vaginal Introitus', desc: 'External opening where the penis enters vaginal canal' },
      { name: 'Paired Testes (L & R)', desc: 'Both testicles in scrotum producing millions of sperm' },
      { name: 'Penis Shaft & Glans', desc: 'Corpora cavernosa, corpus spongiosum, and coronal ridge' },
      { name: 'Pulsatile Semen Jet', desc: 'High-speed expulsion depositing into posterior fornix' },
      { name: 'External Cervical Os', desc: 'Doorway where sperm enter the female reproductive tract' },
      { name: 'Uterine Cavity', desc: 'Internal receiving chamber guiding sperm toward the tubes' }
    ],
    clinicalFact: 'The initial jets of ejaculate carry over 70% of the entire sperm count and highest concentration of motile sperm, ensuring maximum fertility potential at the doorstep of the cervix.',
    camera: {
      position: { x: 0.5, y: 0.5, z: 23 },
      target: { x: 0.5, y: -0.2, z: 0 },
      fov: 46
    },
    annotations: [
      { id: 'paired_testes', label: 'Paired Testicles & Epididymides', pos: [-7.5, -4.5, 0] },
      { id: 'vulva_introitus', label: 'Vulva & Vaginal Introitus (Opening)', pos: [-4.2, -2.5, 0] },
      { id: 'clitoris_node', label: 'Clitoris & Prepuce', pos: [-3.8, -1.3, 0] },
      { id: 'penis_shaft', label: 'Penis Shaft & Glans', pos: [-0.8, -0.6, 0] },
      { id: 'ejaculation_jet', label: 'Pulsatile Ejaculation Jet', pos: [2.2, 0.45, 0] },
      { id: 'cervical_os', label: 'External Cervical Os (Entry Gate)', pos: [3.2, 0.45, 0] },
      { id: 'uterine_ingress', label: 'Uterine Cavity (Upward Migration)', pos: [5.8, 2.2, 0] }
    ]
  },

  {
    id: 'odyssey',
    index: 3,
    branch: 'pregnancy',
    title: 'The Sperm Odyssey',
    subtitle: 'Navigating the Cervix, Uterus & Tube',
    timelineLabel: 'Hours 1–24',
    dayRange: 'Day 14 – 15',
    scale: '~50 µm (Sperm Head ~5 µm)',
    durationMs: 8000,
    heartbeatBpm: 0,
    category: 'Cellular Migration',
    summary: 'Millions of sperm face an epic gauntlet: cervical crypts, resident immune leukocytes, and a long swim across the uterine cavity. Only a few hundred survive to reach the fallopian tube.',
    narrative: `The sperm swim upwards using their helical flagellar motor, but they are also propelled by rhythmic <strong>uterine contractions</strong> stimulated by seminal prostaglandins and maternal oxytocin.
    
    During their 15 to 20 cm passage, the sperm undergo <strong>Capacitation</strong>: a biochemical maturation where maternal uterine secretions strip away protective cholesterol and glycoprotein coatings from the sperm's acrosomal cap.
    
    Capacitation triggers a rush of calcium ions into the sperm, causing <strong>Hyperactivation</strong>: flagellar movement switches from smooth symmetry into violent, high-amplitude whip-like lashing.
    
    Guidance is governed by both <strong>Thermotaxis</strong> (the fertilization ampulla is ~1.5°C warmer than the tube entrance) and <strong>Chemotaxis</strong> (sperm sense picomolar gradients of progesterone released by the egg). Out of hundreds of millions, fewer than <strong>200 to 500 sperm</strong> reach the ampulla!`,
    stats: [
      { label: 'Starting Swarm', value: '300,000,000', highlight: 'highlight-rose' },
      { label: 'Surviving at Ampulla', value: '~200 – 500', highlight: 'highlight-emerald' },
      { label: 'Swimming Speed', value: '2 – 3 mm/min', highlight: 'highlight-cyan' },
      { label: 'Capacitation Time', value: '5 – 7 Hours', highlight: 'highlight-amber' }
    ],
    hormones: [
      { name: 'Progesterone (Chemotaxis)', level: '45%', color: '#ffaa00' },
      { name: 'Estrogen', level: '70%', color: '#ff2a70' },
      { name: 'Uterine Cilia Activity', level: '90%', color: '#00f0ff' }
    ],
    structures: [
      { name: 'Sperm Head & Acrosome', desc: 'Packs 23 paternal chromosomes capped with digestive enzymes' },
      { name: 'Mitochondrial Sheath', desc: 'Spiraled ATP powerhouses fueling flagellar strokes' },
      { name: 'Flagellum (Tail)', desc: '9+2 microtubule axoneme generating propulsion' },
      { name: 'Fallopian Isthmus', desc: 'Narrow sphincter acting as a sperm reservoir' }
    ],
    clinicalFact: 'Capacitation is essential: an uncapacitated sperm cannot penetrate the egg even if placed directly onto its surface, acting as a natural safety lock against premature enzyme release.',
    camera: {
      position: { x: 0, y: 1.5, z: 20 },
      target: { x: 0, y: 0, z: 0 },
      fov: 45
    },
    annotations: [
      { id: 'capacitated_sperm', label: 'Capacitated Hyperactive Sperm', pos: [-2.0, 1.0, 0] },
      { id: 'tubal_cilia', label: 'Ciliated Epithelium', pos: [3.5, -1.5, 0] }
    ]
  },

  {
    id: 'fertilization',
    index: 4,
    branch: 'pregnancy',
    title: 'Meeting & Fertilization',
    subtitle: 'Acrosome Reaction, Calcium Wave & Zygote',
    timelineLabel: 'Day 0 / Fertilization',
    dayRange: 'Day 0 (Conception)',
    scale: '~120 µm (Cellular)',
    durationMs: 9000,
    heartbeatBpm: 0,
    category: 'Syngamy & Syngamy',
    summary: 'The sperm binds to ZP3 receptors, triggering the acrosome reaction. Upon membrane fusion, a radiant calcium wave sweeps the oocyte, permanently blocking polyspermy and creating the diploid Zygote.',
    narrative: `Surrounding the egg, surviving sperm dig through the corona radiata. When the first sperm touches the <strong>Zona Pellucida</strong>, its membrane binds specifically to <strong>ZP3 glycoproteins</strong>.
    
    This activates the <strong>Acrosome Reaction</strong>: the tip of the sperm bursts open, releasing hyaluronidase and acrosin to melt a microscopic tunnel through the glassy zona.
    
    The sperm's plasma membrane fuses with the egg's <strong>Oolemma</strong>. The moment fusion occurs, an explosive wave of intracellular <strong>free calcium ions (Ca²⁺)</strong> spreads across the egg within seconds!
    
    This triggers the <strong>Cortical Reaction</strong>: thousands of cortical granules beneath the egg surface fuse with the plasma membrane, releasing enzymes into the perivitelline space that chemically crosslink the zona pellucida—the <strong>permanent block to polyspermy</strong>.
    
    The egg completes its second meiotic division, casting off the second polar body. The paternal and maternal pronuclei unite (<strong>Syngamy</strong>) to create a unique 46-chromosome diploid <strong>Zygote</strong>!`,
    stats: [
      { label: 'Winning Sperm', value: '1 of 300,000,000', highlight: 'highlight-emerald' },
      { label: 'Polyspermy Block', value: 'Cortical Hardening', highlight: 'highlight-cyan' },
      { label: 'Chromosome Count', value: '46 (23 + 23)', highlight: 'highlight-amber' },
      { label: 'Genome Status', value: 'Unique Individual', highlight: 'highlight-rose' }
    ],
    hormones: [
      { name: 'Intracellular Ca²⁺ Surge', level: '100%', color: '#00f0ff' },
      { name: 'Oocyte Metabolism Activation', level: '95%', color: '#ffaa00' },
      { name: 'Meiosis II Completion', level: '100%', color: '#00f59b' }
    ],
    structures: [
      { name: 'Acrosomal Cap', desc: 'Enzymatic drill digesting the zona pellucida' },
      { name: 'Cortical Granules', desc: 'Vesicles discharging enzymes to block other sperm' },
      { name: 'Male & Female Pronuclei', desc: 'Haploid sets of 23 chromosomes uniting' },
      { name: 'Second Polar Body', desc: 'Extruded excess maternal haploid DNA' }
    ],
    clinicalFact: 'The calcium wave triggered at fertilization is so intense that in laboratory fluorescence microscopy it produces a luminous flash called the "zinc spark" as billions of zinc atoms are expelled.',
    camera: {
      position: { x: 0, y: 1, z: 18 },
      target: { x: 0, y: 0, z: 0 },
      fov: 42
    },
    annotations: [
      { id: 'fusion_point', label: 'Membrane Fusion Point', pos: [1.8, 1.2, 0] },
      { id: 'calcium_wave', label: 'Radiant Calcium Wave', pos: [0, 0, 0] },
      { id: 'polar_body', label: 'Extruded Polar Body', pos: [-2.2, -1.8, 0] }
    ]
  },

  {
    id: 'cleavage',
    index: 5,
    branch: 'pregnancy',
    title: 'Cleavage & The Morula',
    subtitle: 'Mitotic Divisions Inside the Shell',
    timelineLabel: 'Days 1–4',
    dayRange: 'Days 1 – 4 Post-Fertilization',
    scale: '~120 µm (Cellular)',
    durationMs: 8000,
    heartbeatBpm: 0,
    category: 'Embryonic Mitosis',
    summary: 'The single-cell zygote undergoes rapid mitotic divisions (cleavage) within the rigid zona pellucida without increasing in total volume, creating 2, 4, 8 cells and ultimately the compacted mulberry-like Morula.',
    narrative: `Roughly 30 hours after fertilization, the zygote completes its first mitotic division, splitting into two equal daughter cells called <strong>Blastomeres</strong>.
    
    Subsequent divisions occur rapidly:
    • <strong>Day 1 (~30h):</strong> 2-Cell Stage
    • <strong>Day 2 (~40-50h):</strong> 4-Cell Stage
    • <strong>Day 3 (~72h):</strong> 8-Cell Stage
    
    Crucially, because the embryo remains encased within the inextensible glycoprotein cage of the <strong>Zona Pellucida</strong>, the overall diameter does not grow. With each division, individual cells become progressively smaller.
    
    At the 8-cell stage, the blastomeres undergo <strong>Compaction</strong>: their loose spherical shapes flatten against one another, forming tight intercellular junctions.
    
    By Day 4, the embryo consists of 16 to 32 compacted cells and resembles a solid mulberry fruit—the <strong>Morula</strong>—as gentle ciliary currents and tubal muscular peristalsis propel it into the uterine horn.`,
    stats: [
      { label: 'Cell Count', value: '16 – 32 Cells', highlight: 'highlight-cyan' },
      { label: 'Total Diameter', value: '120 µm (Constant)', highlight: 'highlight-amber' },
      { label: 'Cell Pluripotency', value: 'Totipotent', highlight: 'highlight-emerald' },
      { label: 'Tubal Transit', value: 'Journey to Uterus', highlight: 'highlight-rose' }
    ],
    hormones: [
      { name: 'Progesterone (Tube Relaxation)', level: '60%', color: '#ffaa00' },
      { name: 'Embryonic Genome Activation', level: '75%', color: '#00f0ff' }
    ],
    structures: [
      { name: 'Blastomeres', desc: 'Rapidly dividing totipotent embryonic cells' },
      { name: 'Compacted Morula', desc: 'Solid sphere of 16-32 tightly glued cells' },
      { name: 'Intact Zona Pellucida', desc: 'Prevents ectopic tubal adhesion before the uterus' }
    ],
    clinicalFact: 'Until the 8-cell stage, every single blastomere is totipotent—meaning any isolated cell could theoretically form a complete human being, the biological origin of identical (monozygotic) twins!',
    camera: {
      position: { x: 0, y: 1.5, z: 20 },
      target: { x: 0, y: 0, z: 0 },
      fov: 42
    },
    annotations: [
      { id: 'morula_sphere', label: 'Compacted Morula (16-32 cells)', pos: [0, 0, 0] },
      { id: 'zona_shell', label: 'Rigid Zona Pellucida Shell', pos: [2.5, 1.8, 0] }
    ]
  },

  {
    id: 'blastocyst',
    index: 6,
    branch: 'pregnancy',
    title: 'Blastocyst & Hatching',
    subtitle: 'Cavitation & Breaking Free from the Shell',
    timelineLabel: 'Days 5–6',
    dayRange: 'Days 5 – 6 Post-Fertilization',
    scale: '~150 µm (Cellular)',
    durationMs: 8000,
    heartbeatBpm: 0,
    category: 'Lineage Differentiation',
    summary: 'Fluid accumulates inside the morula to create the blastocoel cavity. Cells differentiate into the outer trophoblast and the inner cell mass, and the blastocyst hatches out of the zona pellucida.',
    narrative: `Around Day 5, sodium-potassium ATPase pumps in the outer cells pump sodium and water into the center of the morula, forming a fluid-filled cavity: the <strong>Blastocoel</strong>.
    
    This transformation turns the solid morula into a hollow sphere called the <strong>Blastocyst</strong>. For the first time, human cells segregate into two distinct lineages:
    1. <strong>Trophoblast (Trophectoderm):</strong> A single outer epithelial layer that will develop into the placenta and protective extraembryonic membranes.
    2. <strong>Inner Cell Mass (ICM / Embryoblast):</strong> An eccentric cluster of pluripotent stem cells that will build the actual human embryo.
    
    On Day 6, the expanding blastocyst and rhythmic contractions cause the thinning zona pellucida to crack open. The blastocyst squeezes out in a process called <strong>Zona Hatching</strong>, freeing itself to interact directly with the uterine endometrium.`,
    stats: [
      { label: 'Cell Count', value: '~120 – 150 Cells', highlight: 'highlight-cyan' },
      { label: 'Inner Cell Mass', value: 'Pluripotent Stem Cells', highlight: 'highlight-emerald' },
      { label: 'Trophoblast', value: 'Future Placenta', highlight: 'highlight-amber' },
      { label: 'Hatching Status', value: 'Freed from Shell', highlight: 'highlight-rose' }
    ],
    hormones: [
      { name: 'Uterine Receptivity Factors', level: '90%', color: '#00f0ff' },
      { name: 'Endometrial Glycodelin', level: '70%', color: '#a855f7' }
    ],
    structures: [
      { name: 'Inner Cell Mass (ICM)', desc: 'Pluripotent source of all embryonic tissues' },
      { name: 'Trophoblast Ring', desc: 'Outer cellular layer destined to build placenta' },
      { name: 'Blastocoel Cavity', desc: 'Central fluid-filled cavity' },
      { name: 'Ruptured Zona', desc: 'Empty glycoprotein husk left behind after hatching' }
    ],
    clinicalFact: 'Embryonic stem cells (ESCs) used in cutting-edge regenerative medicine are harvested from the Inner Cell Mass of Day-5 blastocysts, retaining the miraculous potential to differentiate into any of the 200+ cell types in the human body.',
    camera: {
      position: { x: 0, y: 1.5, z: 20 },
      target: { x: 0, y: 0, z: 0 },
      fov: 42
    },
    annotations: [
      { id: 'icm', label: 'Inner Cell Mass (Embryoblast)', pos: [-1.2, 1.2, 0] },
      { id: 'blastocoel', label: 'Fluid-Filled Blastocoel', pos: [1.0, -0.6, 0] },
      { id: 'hatching_zona', label: 'Zona Hatching Rupture', pos: [2.6, 1.5, 0] }
    ]
  },

  {
    id: 'implantation',
    index: 7,
    branch: 'pregnancy',
    title: 'Endometrial Implantation',
    subtitle: 'Nesting in the Uterine Wall & hCG Surge',
    timelineLabel: 'Days 6–9',
    dayRange: 'Days 6 – 9 Post-Fertilization',
    scale: '~250 µm (In Tissue Stroma)',
    durationMs: 8000,
    heartbeatBpm: 0,
    category: 'Maternal-Fetal Interface',
    summary: 'The hatched blastocyst attaches to the receptive uterine endometrium. The invasive syncytiotrophoblast digests into maternal tissue, forming blood lacunae and secreting human Chorionic Gonadotropin (hCG).',
    narrative: `Around Day 6 to 7, the blastocyst orients its embryonic pole toward the secretory endometrium of the posterior uterine wall.
    
    Upon contact, the trophoblast cells proliferate and differentiate into two distinct layers:
    1. An inner cellular <strong>Cytotrophoblast</strong>.
    2. An outer multinucleated amoeboid mass with no cell borders: the <strong>Syncytiotrophoblast</strong>.
    
    The syncytiotrophoblast sends invasive finger-like pseudopodia into the maternal stroma, releasing matrix metalloproteinases that gently digest extracellular matrix and erode maternal capillary walls.
    
    These maternal vessels open into irregular blood spaces called <strong>Trophoblastic Lacunae</strong>, initiating primitive uteroplacental perfusion.
    
    Crucially, the syncytiotrophoblast secretes copious amounts of <strong>human Chorionic Gonadotropin (hCG)</strong> into the maternal bloodstream. This molecular message tells the ovary not to menstruate, ensuring the corpus luteum keeps pumping out life-sustaining progesterone!`,
    stats: [
      { label: 'Uterine Depth', value: 'Completely Interstitial', highlight: 'highlight-amber' },
      { label: 'hCG Secretion', value: 'Pregnancy Signal', highlight: 'highlight-cyan' },
      { label: 'Invasive Layer', value: 'Syncytiotrophoblast', highlight: 'highlight-rose' },
      { label: 'Lacunar Blood Flow', value: 'Dawn of Placenta', highlight: 'highlight-emerald' }
    ],
    hormones: [
      { name: 'hCG (Human Chorionic Gonadotropin)', level: '85%', color: '#00f0ff' },
      { name: 'Maternal Progesterone', level: '95%', color: '#ffaa00' },
      { name: 'Endometrial Decidualization', level: '90%', color: '#ff2a70' }
    ],
    structures: [
      { name: 'Syncytiotrophoblast', desc: 'Invasive tissue burrowing into maternal stroma' },
      { name: 'Trophoblastic Lacunae', desc: 'Maternal blood pools bathing the early placenta' },
      { name: 'Decidua Basalis', desc: 'Maternally transformed uterine wall tissue' },
      { name: 'Bilaminar Disc', desc: 'Epiblast and hypoblast forming within the blastocyst' }
    ],
    clinicalFact: 'hCG is the exact hormone detected by commercial urine home pregnancy tests. It is biologically vital: if hCG were not released, the uterine lining would shed within days, terminating the pregnancy.',
    camera: {
      position: { x: 0, y: 2, z: 22 },
      target: { x: 0, y: -0.5, z: 0 },
      fov: 44
    },
    annotations: [
      { id: 'syncytio', label: 'Invasive Syncytiotrophoblast', pos: [2.0, 1.5, 0] },
      { id: 'lacunae', label: 'Maternal Blood Lacunae', pos: [3.5, 0, 0] },
      { id: 'hcg_glow', label: 'hCG Hormonal Surge', pos: [-1.5, 0.5, 0] }
    ]
  },

  {
    id: 'week3_gastrulation',
    index: 8,
    branch: 'pregnancy',
    title: 'Week 3: Gastrulation',
    subtitle: 'The 3 Primary Germ Layers & Notochord',
    timelineLabel: 'Week 3 (Days 15–21)',
    dayRange: 'Week 3 (Days 15 – 21)',
    scale: '~1.5 mm (Embryonic Disc)',
    durationMs: 8000,
    heartbeatBpm: 0,
    category: 'Morphogenesis',
    summary: 'The flat embryonic disc undergoes gastrulation: cells migrate inward along the primitive streak to establish the three primary germ layers (Ectoderm, Mesoderm, Endoderm) and the primordial notochord.',
    narrative: `Week 3 represents one of the most critical events in all of human embryology: <strong>Gastrulation</strong>.
    
    A linear groove called the <strong>Primitive Streak</strong> appears on the dorsal surface of the epiblast disc. Epiblast cells migrate toward the streak, change shape, and invaginate inward between the cellular sheets.
    
    This establishes the <strong>Trilaminar Embryonic Disc</strong> composed of three primary germ layers:
    1. <strong>Ectoderm:</strong> Gives rise to the central and peripheral nervous systems, sensory organs, epidermis, hair, and nails.
    2. <strong>Mesoderm:</strong> Gives rise to the heart, blood vessels, skeleton, muscles, kidneys, and reproductive system.
    3. <strong>Endoderm:</strong> Gives rise to the epithelial lining of the gastrointestinal tract, liver, pancreas, and respiratory tree.
    
    Along the midline, invaginating cells form a solid cellular rod: the <strong>Notochord</strong>. The notochord acts as the primary embryonic organizer, sending chemical signals that induce the overlying ectoderm to thicken into the <strong>Neural Plate</strong>.`,
    stats: [
      { label: 'Embryo Length', value: '1.5 – 2.0 mm', highlight: 'highlight-cyan' },
      { label: 'Germ Layers', value: 'Trilaminar (3 Layers)', highlight: 'highlight-emerald' },
      { label: 'Primary Axis', value: 'Notochord Induction', highlight: 'highlight-amber' },
      { label: 'Neural Induction', value: 'Neural Plate Forms', highlight: 'highlight-rose' }
    ],
    hormones: [
      { name: 'Morphogen Gradients (BMP/FGF/Wnt)', level: '95%', color: '#a855f7' },
      { name: 'hCG Escalation', level: '90%', color: '#00f0ff' }
    ],
    structures: [
      { name: 'Primitive Streak', desc: 'The site where epiblast cells migrate inward' },
      { name: 'Notochordal Rod', desc: 'Midline organizer directing neural tube formation' },
      { name: 'Ectoderm (Outer)', desc: 'Future brain, spinal cord, and skin' },
      { name: 'Mesoderm (Middle)', desc: 'Future heart, blood, bones, and muscles' },
      { name: 'Endoderm (Inner)', desc: 'Future digestive tract and lungs' }
    ],
    clinicalFact: 'Famed embryologist Lewis Wolpert famously wrote: "It is not birth, marriage, or death, but gastrulation which is truly the most important time in your life."',
    camera: {
      position: { x: 0, y: 3, z: 22 },
      target: { x: 0, y: 0, z: 0 },
      fov: 44
    },
    annotations: [
      { id: 'primitive_streak', label: 'Primitive Streak & Node', pos: [0, -2.0, 0] },
      { id: 'neural_plate', label: 'Induced Neural Plate', pos: [0, 2.0, 0] },
      { id: 'mesoderm_layer', label: 'Migrating Mesoderm', pos: [2.5, 0, 0] }
    ]
  },

  {
    id: 'week4_heartbeat',
    index: 9,
    branch: 'pregnancy',
    title: 'Week 4: The First Heartbeat',
    subtitle: 'Neural Tube Closes & Heart Begins Pumping',
    timelineLabel: 'Week 4 (Days 22–28)',
    dayRange: 'Week 4 (Days 22 – 28)',
    scale: '~3 – 4 mm (C-Shaped Embryo)',
    durationMs: 9000,
    heartbeatBpm: 105,
    category: 'Organogenesis Onset',
    summary: 'The embryo folds into a 3D C-shape. The neural tube seals shut, and around Day 21-22, the primitive tubular heart begins its very first rhythmic, autonomous contractions pumping red embryonic blood.',
    narrative: `During Week 4, rapid expansion causes the flat disc to undergo 3D cephalocaudal (head-to-tail) and lateral folding, curving into a distinct <strong>C-shaped cylindrical embryo</strong>.
    
    The neural folds elevate, converge in the midline, and fuse into the closed <strong>Neural Tube</strong>—the future brain and spinal cord. Flanking the dorsal axis are bilateral cube-shaped blocks of paraxial mesoderm called <strong>Somites</strong> (destined to become vertebrae, ribs, and back muscles).
    
    Most miraculously, paired angiogenic cell clusters fuse in the pericardial cavity to form a single, contractile <strong>Primitive Tubular Heart</strong>.
    
    On <strong>Day 21 to 22</strong>, rhythmic peristaltic waves of excitation spontaneously sweep through myocardial cells. <strong>The human heart begins to beat</strong> at approximately 100 to 110 beats per minute! It is the very first organ in the body to function, circulating early embryonic blood to sustain breakneck growth.`,
    stats: [
      { label: 'Embryo Length (CRL)', value: '3.5 – 4.5 mm', highlight: 'highlight-cyan' },
      { label: 'Heartbeat Frequency', value: '~105 BPM (Active)', highlight: 'highlight-rose' },
      { label: 'First Functioning Organ', value: 'Tubular Heart', highlight: 'highlight-rose' },
      { label: 'Neural Tube Status', value: 'Anterior / Posterior Pore Closure', highlight: 'highlight-emerald' }
    ],
    hormones: [
      { name: 'Cardiac Pacemaker Potential', level: '100%', color: '#ff2a70' },
      { name: 'Angiogenic Factors (VEGF)', level: '90%', color: '#00f0ff' }
    ],
    structures: [
      { name: 'Contractile Heart Tube', desc: 'First functioning organ visibly pumping embryonic blood' },
      { name: 'Closed Neural Tube', desc: 'Cranial brain vesicles and caudal spinal cord' },
      { name: 'Paired Somites', desc: 'Segmented building blocks of vertebrae and back muscles' },
      { name: 'Yolk Sac Lifeline', desc: 'Early nutrient source attached via vitelline duct' }
    ],
    clinicalFact: 'Folic acid (Vitamin B9) taken before conception reduces neural tube defects (such as spina bifida and anencephaly) by up to 70% because the human neural tube closes during this exact 4th week, often before a person even misses a period!',
    camera: {
      position: { x: 0, y: 1.5, z: 20 },
      target: { x: 0, y: 0, z: 0 },
      fov: 42
    },
    annotations: [
      { id: 'beating_heart', label: 'Contracting Heart Tube (~105 BPM)', pos: [-1.2, 0.4, 0] },
      { id: 'neural_ridge', label: 'Closed Neural Tube & Somites', pos: [1.8, 1.2, 0] },
      { id: 'c_curve', label: 'C-Shaped Embryonic Curvature', pos: [0, -2.0, 0] }
    ]
  },

  {
    id: 'week5_limb_buds',
    index: 10,
    branch: 'pregnancy',
    title: 'Week 5: Brain & Limb Buds',
    subtitle: 'Cerebral Vesicles & Paddle Sprouts',
    timelineLabel: 'Week 5 (Days 29–35)',
    dayRange: 'Week 5 (Days 29 – 35)',
    scale: '~6 – 8 mm (Crown-Rump Length)',
    durationMs: 8000,
    heartbeatBpm: 125,
    category: 'Appendicular Genesis',
    summary: 'The head enlarges rapidly as 5 secondary brain vesicles inflate. Paddle-shaped upper and lower limb buds sprout like tiny fins. Pharyngeal branchial arches frame the developing jaw and neck.',
    narrative: `In Week 5, the embryo grows to roughly 7 mm in Crown-Rump Length (CRL). Growth is dominated by spectacular cephalic expansion: the head balloons as the brain develops five secondary brain vesicles:
    • Telencephalon & Diencephalon (Forebrain)
    • Mesencephalon (Midbrain)
    • Metencephalon & Myelencephalon (Hindbrain)
    
    Along the lateral body wall, localized interactions between somatic mesoderm and the apical ectodermal ridge (AER) trigger the emergence of <strong>Limb Buds</strong>.
    
    The <strong>upper limb buds</strong> sprout first around Day 28-30, resembling tiny paddle-shaped flippers. Days later, the <strong>lower limb buds</strong> emerge.
    
    Along the future neck and jaw, four pairs of <strong>Pharyngeal Arches</strong> become prominent ridges. Though resembling fish gills, in humans they architect the lower and upper jaw, middle ear ossicles (malleus and incus), hyoid bone, and facial nerve pathways.
    
    The primitive heart has now looped into an S-shape and divided into primitive chambers, accelerating to ~125 beats per minute.`,
    stats: [
      { label: 'Crown-Rump Length', value: '6.0 – 8.0 mm', highlight: 'highlight-cyan' },
      { label: 'Heartbeat Frequency', value: '~125 BPM', highlight: 'highlight-rose' },
      { label: 'Limb Buds', value: 'Paddle Sprouts', highlight: 'highlight-amber' },
      { label: 'Brain Vesicles', value: '5 Secondary Chambers', highlight: 'highlight-emerald' }
    ],
    hormones: [
      { name: 'Apical Ectodermal Ridge (FGFs)', level: '95%', color: '#00f0ff' },
      { name: 'Sonic Hedgehog (Limb Polarity)', level: '90%', color: '#a855f7' }
    ],
    structures: [
      { name: 'Encephalic Brain Bulges', desc: 'Rapidly ballooning forebrain, midbrain, and hindbrain' },
      { name: 'Upper Limb Paddle Bud', desc: 'Sprouting bud that will form shoulder, arm, and hand' },
      { name: 'Lower Limb Bud', desc: 'Emerging sprout for hip, leg, and foot' },
      { name: 'Pharyngeal Arches', desc: 'Neck ridges building jaw, inner ear, and throat' }
    ],
    clinicalFact: 'The upper limbs always develop slightly ahead of the lower limbs—a developmental gradient that continues even after birth, which is why infants gain control of their hands and arms months before walking on their legs.',
    camera: {
      position: { x: 0, y: 1.5, z: 20 },
      target: { x: 0, y: 0, z: 0 },
      fov: 42
    },
    annotations: [
      { id: 'brain_vesicles', label: 'Encephalic Brain Vesicles', pos: [1.8, 2.2, 0] },
      { id: 'arm_bud', label: 'Paddle Upper Limb Bud', pos: [1.6, -0.4, 0] },
      { id: 'pharyngeal_arch', label: 'Pharyngeal (Jaw) Arches', pos: [0.2, 1.2, 0] }
    ]
  },

  {
    id: 'week6_differentiation',
    index: 11,
    branch: 'pregnancy',
    title: 'Week 6: Retinal Pigment',
    subtitle: 'Digital Rays, Ear Hillocks & Rapid Growth',
    timelineLabel: 'Week 6 (Days 36–42)',
    dayRange: 'Week 6 (Days 36 – 42)',
    scale: '~8 – 11 mm (Crown-Rump Length)',
    durationMs: 8000,
    heartbeatBpm: 145,
    category: 'Facial & Digital Formation',
    summary: 'Dark retinal eye pigment shines through translucent skin. Flattened hand paddles develop digital rays. The midgut loop undergoes normal physiological herniation into the umbilical cord.',
    narrative: `By Week 6, the embryo has reached 8 to 11 mm CRL. The facial landscape undergoes remarkable structural definition.
    
    Inside the optic cups, dark melanin produces the <strong>Retinal Pigment</strong>, visible through the tissue as dark, striking circular dots that give the embryo its first distinct gaze.
    
    Around the first pharyngeal groove, small tissue nodules called <strong>Auricular Hillocks</strong> coalesce to sculpt the external ear (pinna).
    
    The upper limb paddles have broadened into flat hand plates with faint grooves called <strong>Digital Rays</strong>—the earliest skeletal precursors of the fingers.
    
    Because the embryonic abdominal cavity is temporarily too small to contain the rapidly growing intestines and expanding liver, the midgut loop herniates through the umbilical ring into the extraembryonic coelom of the umbilical cord—a completely normal process known as <strong>Physiological Umbilical Herniation</strong>.
    
    The heart has partitioned into four functional chambers and beats energetically at ~145 beats per minute!`,
    stats: [
      { label: 'Crown-Rump Length', value: '8.0 – 11.0 mm', highlight: 'highlight-cyan' },
      { label: 'Heartbeat Frequency', value: '~145 BPM', highlight: 'highlight-rose' },
      { label: 'Eye Development', value: 'Retinal Pigment Dot', highlight: 'highlight-amber' },
      { label: 'Hand Plates', value: 'Digital Rays Grooves', highlight: 'highlight-emerald' }
    ],
    hormones: [
      { name: 'Cardiac Output', level: '100%', color: '#ff2a70' },
      { name: 'Hepatic Hematopoiesis (Liver Blood)', level: '80%', color: '#ffaa00' }
    ],
    structures: [
      { name: 'Pigmented Optic Cup', desc: 'Dark circular eye with retinal melanin' },
      { name: 'Hand Plate Digital Rays', desc: 'Grooves marking where fingers are condensing' },
      { name: 'Auricular Hillocks', desc: 'Nodules coalescing into the external ear' },
      { name: 'Physiological Gut Hernia', desc: 'Intestines temporarily residing in the umbilical cord' }
    ],
    clinicalFact: 'A routine transvaginal obstetric ultrasound at Week 6 can clearly visualize the flickering cardiac motion of the embryonic heart—often the deeply emotional moment when parents first "see" their baby\'s heartbeat.',
    camera: {
      position: { x: 0, y: 1.5, z: 20 },
      target: { x: 0, y: 0, z: 0 },
      fov: 42
    },
    annotations: [
      { id: 'retinal_pigment', label: 'Dark Retinal Eye Pigment', pos: [1.6, 1.8, 0] },
      { id: 'digital_rays', label: 'Hand Plate Digital Rays', pos: [1.8, -0.6, 0] },
      { id: 'herniation', label: 'Physiological Gut Herniation', pos: [-0.6, -1.2, 0] }
    ]
  },

  {
    id: 'week7_blueberry',
    index: 12,
    branch: 'pregnancy',
    title: 'Week 7: The Little Human',
    subtitle: 'Separate Fingers, Facial Features & Weightless Wonder',
    timelineLabel: 'Week 7 (Days 43–49)',
    dayRange: 'Week 7 (Days 43 – 49)',
    scale: '~10 – 13 mm (Size of a Blueberry)',
    durationMs: 10000,
    heartbeatBpm: 155,
    category: 'Embryonic Climax',
    summary: 'At ~12 mm, the embryo resembles a tiny human. Programmed cell apoptosis frees individual fingers, eyelids and facial features emerge, and the embryo floats weightlessly in the crystal-clear amniotic fluid.',
    narrative: `At Week 7, the embryo reaches roughly <strong>10 to 13 mm in Crown-Rump Length</strong>—almost exactly the size of a fresh blueberry!
    
    The transformation of the hands is breathtaking: programmed cellular suicide (<strong>Apoptosis</strong>) selectively dissolves the tissue web between the digital rays, carving out <strong>distinct, separate fingers</strong>. The upper limbs bend sharply at the elbows, holding the tiny hands gently over the precordial heart bulge.
    
    The face is undeniably human: delicate eyelid folds form over the dark pigmented eyes, tiny nostrils appear on the elevated nose tip, and the upper lip fuses seamlessly.
    
    The embryo floats weightlessly inside the transparent, shimmering <strong>Amniotic Sac</strong>, surrounded by warm amniotic fluid that cushions delicate tissues and permits free movement.
    
    Spontaneous neuromuscular twitches begin: the embryo can subtly flex its trunk and flutter its tiny arms!
    
    Anchored by the spiraling <strong>Umbilical Cord</strong> containing two umbilical arteries and one vein, maternal nutrients and oxygen flow across the lush <strong>Chorionic Villi</strong> of the developing placenta, powering the unstoppable genesis of new life.`,
    stats: [
      { label: 'Crown-Rump Length', value: '11.0 – 13.5 mm', highlight: 'highlight-cyan' },
      { label: 'Real-World Size', value: 'Size of a Blueberry', highlight: 'highlight-amber' },
      { label: 'Heartbeat Frequency', value: '~155 BPM (Vigorous)', highlight: 'highlight-rose' },
      { label: 'Digital Webbing', value: 'Apoptosis Frees Fingers', highlight: 'highlight-emerald' }
    ],
    hormones: [
      { name: 'Maternal-Placental Exchange', level: '95%', color: '#00f0ff' },
      { name: 'Peak hCG Levels', level: '98%', color: '#ff2a70' },
      { name: 'Progesterone Sustained', level: '100%', color: '#ffaa00' }
    ],
    structures: [
      { name: 'Freed Fingers & Bent Elbows', desc: 'Individual digits separated by cellular apoptosis' },
      { name: 'Amniotic Sac & Fluid', desc: 'Crystal-clear protective bubble in which the embryo floats' },
      { name: 'Spiral Umbilical Cord', desc: 'Vascular lifeline connecting abdomen to placenta' },
      { name: 'Facial Features & Eyelids', desc: 'Distinct nostrils, upper lip, and delicate eye folds' },
      { name: 'Precordial Heart Bulge', desc: 'Powerful 4-chambered heart beating at 155 BPM' }
    ],
    clinicalFact: 'Week 7 is when hCG levels reach their peak in maternal circulation, which is why "morning sickness" (nausea and fatigue) typically reaches its absolute height around weeks 7 to 9.',
    camera: {
      position: { x: 0, y: 1.5, z: 20 },
      target: { x: 0, y: 0, z: 0 },
      fov: 40
    },
    annotations: [
      { id: 'freed_fingers', label: 'Distinct Separate Fingers', pos: [1.8, -0.2, 0] },
      { id: 'eyelids_face', label: 'Eyelids & Facial Profile', pos: [1.6, 1.8, 0] },
      { id: 'amniotic_bubble', label: 'Transparent Amniotic Sac', pos: [-2.2, 1.0, 0] },
      { id: 'umbilical_spiral', label: 'Spiraling Umbilical Lifeline', pos: [-1.2, -1.8, 0] }
    ]
  }
];
