// ─────────────────────────────────────────────────────────────
// SHU CAMPUS NAVIGATION — app.js
// Three.js r128 · GitHub Pages ready · No external dependencies
// ─────────────────────────────────────────────────────────────

// ── CONSTANTS ────────────────────────────────────────────────
const FLOOR_NAMES = ['Ground Floor','First Floor','Second Floor','Third Floor','Fourth Floor'];
const FLOOR_Y     = [0, 5, 10, 15, 20];   // Y position per floor in 3D space
const FLOOR_COLORS = [0x141418, 0x141418, 0x141418, 0x141418, 0x141418];
const FLOOR_BORDER = 0xC0392B;

// Node type → hex color
const TC = {
  room:      0x4FC3F7,
  lab:       0x26C6DA,
  office:    0x80CBC4,
  connector: 0x81C784,
  entry:     0xFFB74D,
};

// ── NODE DATA ────────────────────────────────────────────────
// x,y are 0-100 percentage coords (same as Final.html)
// We map them to 3D: x→x, y→z, floor→Y
const NODES = [
// GROUND FLOOR — positions measured from 4K floor plan image
// GROUND FLOOR — pixel-precise from Blender top-view image
{id:'G_SQTR1', name:'Staff Quarters 1',           f:0, x:13.4, y:26.8, t:'room'},
{id:'G_CAFE',  name:'Cafeteria',                  f:0, x:45.1, y:26.8, t:'room'},
{id:'G_ADMIN', name:'Administration Block',        f:0, x:72.0, y:26.6, t:'office'},
{id:'G_VC',    name:'VC-House',                   f:0, x:84.5, y:11.2, t:'office'},
{id:'G_SQTR2', name:'Staff Quarters 2',           f:0, x:13.4, y:63.9, t:'room'},
{id:'G_LIB',   name:'Library (Ground)',           f:0, x:58, y:65.6, t:'room'},
{id:'G_WAIT',  name:'Waiting Area',               f:0, x:85, y:39.0, t:'room'},
{id:'G_CL1',   name:'Lab 1',                      f:0, x:28.9, y:46.3, t:'lab'},
{id:'G_CL2',   name:'Lab 2',                      f:0, x:34.7, y:46.5, t:'lab'},
{id:'G_LIFT',  name:'Lift (Ground)',              f:0, x:42.0, y:44.1, t:'connector'},
{id:'G_EMXIT', name:'Emergency Exit',             f:0, x:40, y:48, t:'entry'},
{id:'G_LIFT2', name:'Lift-2 (Ground)',            f:0, x:38.0, y:44.1, t:'connector'},
{id:'G_PHARMI',name:'Pharmacy Instruments Lab',   f:0, x:45, y:48, t:'lab'},
{id:'G_DEAN',  name:'Dean Office',               f:0, x:50.8, y:48, t:'office'},
{id:'G_FINUP', name:'Finance Dept',              f:0, x:55, y:48, t:'office'},
{id:'G_ADMIS', name:'Admission Office',          f:0, x:73, y:45, t:'office'},
{id:'G_GATE1', name:'Main Gate',                 f:0, x:93, y:48.5, t:'entry'},
{id:'G_PL1',   name:'Pharm Lab 1',               f:0, x:26.2, y:62.8, t:'lab'},
{id:'G_ITC',   name:'ITC Dept',                  f:0, x:36.7, y:61.4, t:'office'},
{id:'G_SEM1',  name:'Seminar 01',                f:0, x:81, y:55, t:'room'},
{id:'G_MGROOM',name:'MG Room',                   f:0, x:91.5, y:62.0, t:'room'},
{id:'G_MB',    name:'Meezan Bank',               f:0, x:91.5, y:66.0, t:'room'},
{id:'G_PL2',   name:'Pharm Lab 2',               f:0, x:26.2, y:77.5, t:'lab'},
{id:'G_STAIR', name:'Stairs (Ground)',           f:0, x:59, y:48, t:'connector'},
{id:'G_VAC',   name:'Vacant Room',               f:0, x:65, y:48, t:'office'},
{id:'G_SEM2',  name:'Seminar 02',                f:0, x:81, y:70.4, t:'room'},
{id:'G_SPORT', name:'Sports Complex',            f:0, x:13.4, y:88.8, t:'room'},
{id:'G_CL3',   name:'Lab 3',                     f:0, x:36.6, y:78.7, t:'lab'},
{id:'G_INDLAB',name:'Lab 1 (Lower)',             f:0, x:26.6, y:85, t:'lab'},
{id:'G_CL4',   name:'Lab 2 (Lower)',             f:0, x:33.7, y:85, t:'lab'},
{id:'G_WM',    name:'Wash Room',                 f:0, x:39.2, y:85.0, t:'room'},
{id:'G_STER',  name:'Sterile Manufacturing Area',f:0, x:48.0, y:85, t:'lab'},
{id:'G_EXAM',  name:'Examination Office',        f:0, x:54.3, y:85, t:'office'},
{id:'G_MKT',   name:'Marketing Office',          f:0, x:63.0, y:85, t:'office'},
{id:'G_FIN',   name:'Finance & Audit Office',    f:0, x:71.5, y:85, t:'office'},
{id:'G_WF',    name:'Wash Room (Right)',         f:0, x:79.0, y:85, t:'room'},
// FIRST FLOOR
{id:'F_B01',   name:'B-01 Lecture Room',            f:1, x:15, y:20, t:'room'},
{id:'F_B02',   name:'B-02 Lecture Room',            f:1, x:28, y:20, t:'room'},
{id:'F_B03',   name:'B-03 Lecture Room',            f:1, x:40, y:20, t:'room'},
{id:'F_B04',   name:'B-04 Lecture Room',            f:1, x:52, y:20, t:'room'},
{id:'F_B05',   name:'B-05 Lecture Room',            f:1, x:63, y:20, t:'room'},
{id:'F_B06',   name:'B-06 Lecture Room',            f:1, x:75, y:20, t:'room'},
{id:'F_B07',   name:'B-07 Lecture Room',            f:1, x:15, y:50, t:'room'},
{id:'F_B08',   name:'B-08 Lecture Room',            f:1, x:15, y:65, t:'room'},
{id:'F_B09',   name:'B-09 Lecture Room',            f:1, x:28, y:76, t:'room'},
{id:'F_GPROG', name:'General Programming Lab',      f:1, x:85, y:20, t:'lab'},
{id:'F_PREP',  name:'Preparation Lab',              f:1, x:80, y:45, t:'lab'},
{id:'F_MB1',   name:'Microbiology & Biotech Lab-1', f:1, x:85, y:56, t:'lab'},
{id:'F_MB2',   name:'Microbiology & Biotech Lab-2', f:1, x:85, y:67, t:'lab'},
{id:'F_BMET',  name:'Biomedical Engineering Lab',   f:1, x:74, y:56, t:'lab'},
{id:'F_IMMU',  name:'Immunology & Tissue Lab',      f:1, x:85, y:78, t:'lab'},
{id:'F_FAC',   name:'Faculty Office',               f:1, x:60, y:76, t:'office'},
{id:'F_DEAN',  name:'Dean Office',                  f:1, x:45, y:32, t:'office'},
{id:'F_LOUN',  name:'Lounge',                       f:1, x:15, y:78, t:'room'},
{id:'F_MOSQ',  name:'Mosque',                       f:1, x:90, y:12, t:'room'},
{id:'F_AUD',   name:'Auditorium',                   f:1, x:50, y:90, t:'room'},
{id:'F_LIB',   name:'Library (First Floor)',        f:1, x:50, y:52, t:'room'},
{id:'F_WM',    name:'Male Washroom',                f:1, x:33, y:32, t:'room'},
{id:'F_WF',    name:'Female Washroom',              f:1, x:20, y:32, t:'room'},
{id:'F_LIFT',  name:'Lift (First)',                 f:1, x:55, y:43, t:'connector'},
{id:'F_STAIR', name:'Stairs (First)',               f:1, x:60, y:52, t:'connector'},
// SECOND FLOOR
{id:'S_C01',   name:'C-01 Lecture Room',            f:2, x:15, y:20, t:'room'},
{id:'S_C02',   name:'C-02 Lecture Room',            f:2, x:28, y:20, t:'room'},
{id:'S_C03',   name:'C-03 Lecture Room',            f:2, x:40, y:20, t:'room'},
{id:'S_C04',   name:'C-04 Lecture Room',            f:2, x:15, y:50, t:'room'},
{id:'S_C05',   name:'C-05 Lecture Room',            f:2, x:15, y:65, t:'room'},
{id:'S_C06',   name:'C-06 Lecture Room',            f:2, x:28, y:76, t:'room'},
{id:'S_FAC1',  name:'Faculty Office',               f:2, x:52, y:20, t:'office'},
{id:'S_FAC2',  name:'Faculty Office-2',             f:2, x:63, y:20, t:'office'},
{id:'S_DEAN',  name:'Dean Office',                  f:2, x:35, y:20, t:'office'},
{id:'S_DIR',   name:'Director Office',              f:2, x:60, y:78, t:'office'},
{id:'S_BIOI',  name:'Biomedical Instrumentation Lab',f:2,x:76, y:20, t:'lab'},
{id:'S_BIOE',  name:'Biomedical Electronics Lab',   f:2, x:87, y:20, t:'lab'},
{id:'S_HIST',  name:'Histology & Pathology Lab',    f:2, x:80, y:45, t:'lab'},
{id:'S_CHPH',  name:'Chemistry & Pharmacology Lab', f:2, x:85, y:57, t:'lab'},
{id:'S_ANAT',  name:'Anatomy Museum',               f:2, x:85, y:68, t:'room'},
{id:'S_BIOC',  name:'Bio Chemistry & Molecular Lab',f:2, x:88, y:78, t:'lab'},
{id:'S_MPHL',  name:'MPhil & PhD Research Lab',     f:2, x:78, y:85, t:'lab'},
{id:'S_ENVI',  name:'Environmental Science',        f:2, x:67, y:85, t:'lab'},
{id:'S_BCOM',  name:'Biomedical Computing Lab',     f:2, x:50, y:85, t:'lab'},
{id:'S_HALL',  name:'Hall',                         f:2, x:15, y:78, t:'room'},
{id:'S_MOSQ',  name:'Mosque',                       f:2, x:90, y:12, t:'room'},
{id:'S_LIB',   name:'Library (Second Floor)',       f:2, x:50, y:52, t:'room'},
{id:'S_WM',    name:'Male Washroom',                f:2, x:33, y:32, t:'room'},
{id:'S_WF',    name:'Female Washroom',              f:2, x:20, y:32, t:'room'},
{id:'S_LIFT',  name:'Lift (Second)',                f:2, x:55, y:43, t:'connector'},
{id:'S_STAIR', name:'Stairs (Second)',              f:2, x:60, y:52, t:'connector'},
// THIRD FLOOR
{id:'T_D01',   name:'D-01 Lecture Room',            f:3, x:15, y:20, t:'room'},
{id:'T_D02',   name:'D-02 Lecture Room',            f:3, x:28, y:20, t:'room'},
{id:'T_D03',   name:'D-03 Lecture Room',            f:3, x:28, y:55, t:'room'},
{id:'T_D04',   name:'D-04 Lecture Room',            f:3, x:28, y:67, t:'room'},
{id:'T_D05',   name:'D-05 Lecture Room',            f:3, x:28, y:78, t:'room'},
{id:'T_D06',   name:'D-06 Lecture Room',            f:3, x:72, y:50, t:'room'},
{id:'T_D07',   name:'D-07 Lecture Room',            f:3, x:72, y:62, t:'room'},
{id:'T_D08',   name:'D-08 Lecture Room',            f:3, x:60, y:78, t:'room'},
{id:'T_FAC',   name:'Faculty Office',               f:3, x:15, y:50, t:'office'},
{id:'T_DEAN',  name:'Dean Office',                  f:3, x:40, y:20, t:'office'},
{id:'T_QDIR',  name:'QEC Director Office',          f:3, x:58, y:20, t:'office'},
{id:'T_QEC',   name:'QEC Office',                   f:3, x:70, y:20, t:'office'},
{id:'T_AUD1',  name:'Auditorium-1',                 f:3, x:85, y:20, t:'room'},
{id:'T_AUD2',  name:'Auditorium-2',                 f:3, x:90, y:50, t:'room'},
{id:'T_AUD3',  name:'Auditorium-3',                 f:3, x:85, y:78, t:'room'},
{id:'T_IQCL',  name:'Instrument & Quality Control Lab',f:3,x:15,y:78,t:'lab'},
{id:'T_LIB',   name:'Library (Third Floor)',        f:3, x:50, y:52, t:'room'},
{id:'T_WM',    name:'Male Washroom',                f:3, x:48, y:32, t:'room'},
{id:'T_WF',    name:'Female Washroom',              f:3, x:20, y:32, t:'room'},
{id:'T_LIFT',  name:'Lift (Third)',                 f:3, x:55, y:43, t:'connector'},
{id:'T_STAIR', name:'Stairs (Third)',               f:3, x:60, y:52, t:'connector'},
// FOURTH FLOOR
{id:'E_PHTL',  name:'Pharmaceutics Lab',            f:4, x:38, y:18, t:'lab'},
{id:'E_PHOG',  name:'Pharmacognosy Lab',            f:4, x:58, y:18, t:'lab'},
{id:'E_SIML',  name:'Simulation Lab',               f:4, x:15, y:42, t:'lab'},
{id:'E_ANAT',  name:'Anatomy Museum',               f:4, x:15, y:55, t:'room'},
{id:'E_BMED',  name:'Basic Medical Science Lab',    f:4, x:15, y:68, t:'lab'},
{id:'E_PHMP',  name:'Pharmaceutical Microbiology Lab',f:4,x:38,y:78, t:'lab'},
{id:'E_PHCM',  name:'Pharmaceutical Chemistry Lab', f:4, x:58, y:78, t:'lab'},
{id:'E_MPHL',  name:'MPhil & PhD Programs Room',    f:4, x:78, y:42, t:'room'},
{id:'E_OSCE',  name:'OSCE-OSPE Lab',                f:4, x:78, y:57, t:'lab'},
{id:'E_AUD1',  name:'Auditorium-1',                 f:4, x:88, y:28, t:'room'},
{id:'E_AUD2',  name:'Auditorium-2',                 f:4, x:88, y:72, t:'room'},
{id:'E_LIB',   name:'Library (Fourth Floor)',       f:4, x:50, y:52, t:'room'},
{id:'E_WM',    name:'Male Washroom',                f:4, x:45, y:32, t:'room'},
{id:'E_WF',    name:'Female Washroom',              f:4, x:28, y:32, t:'room'},
{id:'E_LIFT',  name:'Lift (Fourth)',                f:4, x:55, y:43, t:'connector'},
{id:'E_STAIR', name:'Stairs (Fourth)',              f:4, x:60, y:52, t:'connector'},
];

// ── NODE MAP ─────────────────────────────────────────────────
const NM = {};
NODES.forEach(n => NM[n.id] = n);

// ── GRAPH + A* ───────────────────────────────────────────────
function buildGraph() {
  const g = {};
  NODES.forEach(n => g[n.id] = []);
  const T = 28; // proximity threshold

  for (let i = 0; i < NODES.length; i++) {
    for (let j = i + 1; j < NODES.length; j++) {
      const a = NODES[i], b = NODES[j];
      if (a.f === b.f) {
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d <= T) {
          g[a.id].push({ id: b.id, c: d });
          g[b.id].push({ id: a.id, c: d });
        }
      }
    }
  }
  // Vertical connections via lifts & stairs
  const lifts  = NODES.filter(n => n.name.startsWith('Lift')).sort((a,b)=>a.f-b.f);
  const stairs = NODES.filter(n => n.name.startsWith('Stairs')).sort((a,b)=>a.f-b.f);
  for (let i = 0; i < lifts.length-1; i++) {
    g[lifts[i].id].push({ id:lifts[i+1].id, c:9  });
    g[lifts[i+1].id].push({ id:lifts[i].id, c:9  });
  }
  for (let i = 0; i < stairs.length-1; i++) {
    g[stairs[i].id].push({ id:stairs[i+1].id, c:11 });
    g[stairs[i+1].id].push({ id:stairs[i].id, c:11 });
  }
  return g;
}
const G = buildGraph();

function astar(s, e) {
  if (s === e) return [s];
  const h = id => {
    const n = NM[id], en = NM[e];
    return Math.hypot(n.x - en.x, n.y - en.y) + Math.abs(n.f - en.f) * 20;
  };
  const open = new Map([[s, h(s)]]);
  const came = {}, g = { [s]: 0 };
  while (open.size) {
    let cur = [...open].reduce((a,b) => a[1] < b[1] ? a : b)[0];
    if (cur === e) {
      const p = [];
      while (cur) { p.unshift(cur); cur = came[cur]; }
      return p;
    }
    open.delete(cur);
    for (const { id, c } of (G[cur] || [])) {
      const ng = (g[cur] || 0) + c;
      if (ng < (g[id] ?? 1e9)) {
        came[id] = cur; g[id] = ng;
        open.set(id, ng + h(id));
      }
    }
  }
  return null;
}

// ── 3D COORDINATE HELPER ─────────────────────────────────────
// Model is auto-fitted to 46 units wide (150.221m blender).
// Height = 46 × (101.788/150.221) = 31.18 units.
// Building roof = 7.43781m × (46/150.221) ≈ 2.28 units above floor base.
const MODEL_MIN_X = -23.000;
const MODEL_MAX_X =  23.000;
const MODEL_MIN_Z = -15.585;
const MODEL_MAX_Z =  15.585;
const ROOF_Y      =  2.6;
function to3D(nx, ny, floor) {
  return new THREE.Vector3(
    MODEL_MIN_X + (nx / 100) * (MODEL_MAX_X - MODEL_MIN_X),
    FLOOR_Y[floor] + ROOF_Y,
    MODEL_MIN_Z + (ny / 100) * (MODEL_MAX_Z - MODEL_MIN_Z)
  );
}

// ── THREE.JS SCENE SETUP ─────────────────────────────────────
const canvas   = document.getElementById('three-canvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x080808);
renderer.shadowMap.enabled = true;

const scene  = new THREE.Scene();
scene.fog    = new THREE.FogExp2(0x080808, 0.012);

const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 500);

// Lights
scene.add(new THREE.AmbientLight(0xffffff, 0.5));
const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
dirLight.position.set(30, 50, 20);
dirLight.castShadow = true;
scene.add(dirLight);
const rimLight = new THREE.DirectionalLight(0xC0392B, 0.3);
rimLight.position.set(-20, 10, -20);
scene.add(rimLight);

// ── FLOOR MODEL LOADER ────────────────────────────────────────
// Model analysis (SHU_FBS.glb):
//   Raw local size:  X=1.58, Z=0.97  (very small, Blender units)
//   Node scale:     -85.23 (negative = mirrored in Blender export)
//   Node translation: [233.56, 90.65, 440.15]
//   World size after transform: ~134 × 82 units (too large for scene)
//   We auto-fit to 46 units wide via bounding box → scaleFactor below

const floorMeshes = [];   // one entry per floor (Group or fallback)
const GLTFLoaderClass = THREE.GLTFLoader || (window.THREE && window.THREE.GLTFLoader);
const gltfLoader = GLTFLoaderClass ? new GLTFLoaderClass() : null;

function buildFallbackSlab(f) {
  // Used if GLB fails to load (e.g. file not found)
  const group = new THREE.Group();
  const slab  = new THREE.Mesh(
    new THREE.BoxGeometry(50, 0.25, 50),
    new THREE.MeshStandardMaterial({ color: 0x1a1a1e, roughness: 0.9 })
  );
  slab.position.set(0, FLOOR_Y[f], 0);
  group.add(slab);
  const edges = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.BoxGeometry(50.1, 0.28, 50.1)),
    new THREE.LineBasicMaterial({ color: 0xC0392B })
  );
  edges.position.set(0, FLOOR_Y[f], 0);
  group.add(edges);
  group.visible = (f === activeFloor);
  scene.add(group);
  floorMeshes[f] = group;
}






// ── NODE MESHES ───────────────────────────────────────────────
const nodeMeshes  = {};   // id → THREE.Mesh
const labelSprites = {};  // id → THREE.Sprite
const NODE_GEO = new THREE.CylinderGeometry(0.25, 0.25, 0.12, 32);

// Build a canvas-texture sprite for a label
function makeLabel(text, hexColor) {
  const canvas2d = document.createElement('canvas');
  canvas2d.width  = 256;
  canvas2d.height = 64;
  const c = canvas2d.getContext('2d');

  // Truncate long names
  const label = text.length > 22 ? text.slice(0, 21) + '…' : text;

  // Background pill
  const col = '#' + hexColor.toString(16).padStart(6, '0');
  c.clearRect(0, 0, 256, 64);
  c.fillStyle = 'rgba(8,8,8,0.75)';
  c.beginPath();
  c.roundRect(4, 14, 248, 36, 8);
  c.fill();

  // Text
  c.font = 'bold 20px "DM Sans", "Segoe UI", sans-serif';
  c.fillStyle = col;
  c.textAlign = 'center';
  c.textBaseline = 'middle';
  c.fillText(label, 128, 33);

  const tex = new THREE.CanvasTexture(canvas2d);
  const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false });
  const sprite = new THREE.Sprite(mat);
  sprite.scale.set(2.5, 0.6, 1);
  return sprite;
}

function buildNodes() {
  NODES.forEach(node => {
    const col  = TC[node.t] || 0x4FC3F7;
    const mat  = new THREE.MeshStandardMaterial({
      color: col,
      roughness: 0.4,
      metalness: 0.3,
      emissive: col,
      emissiveIntensity: 0.15,
    });
    const mesh = new THREE.Mesh(NODE_GEO, mat);
    const pos  = to3D(node.x, node.y, node.f);
    mesh.position.copy(pos);
    mesh.castShadow = true;
    mesh.userData   = { nodeId: node.id };
    scene.add(mesh);
    nodeMeshes[node.id] = mesh;

    // Label sprite — floats 1.2 units above the node
    const sprite = makeLabel(node.name, col);
    sprite.position.set(pos.x, pos.y + 1.2, pos.z);
    sprite.userData = { nodeId: node.id };
    scene.add(sprite);
    labelSprites[node.id] = sprite;
  });
}
buildNodes();

// ── PATH TUBE ─────────────────────────────────────────────────
let pathTube = null, pathDot = null, pathCurve = null;

function clearPathMesh() {
  if (pathTube) { scene.remove(pathTube); pathTube.geometry.dispose(); pathTube = null; }
  if (pathDot)  { scene.remove(pathDot);  pathDot.geometry.dispose();  pathDot  = null; }
  pathCurve = null;
}

function buildPathMesh(pathArr) {
  clearPathMesh();
  const pts = pathArr.map(id => {
    const n = NM[id];
    return to3D(n.x, n.y, n.f);
  });
  if (pts.length < 2) return;

  pathCurve = new THREE.CatmullRomCurve3(pts);
  const tubeGeo = new THREE.TubeGeometry(pathCurve, pts.length * 6, 0.1, 6, false);
  const tubeMat = new THREE.MeshBasicMaterial({ color: 0xF9A825 });
  pathTube = new THREE.Mesh(tubeGeo, tubeMat);
  scene.add(pathTube);

  // Animated dot
  const dotGeo = new THREE.SphereGeometry(0.22, 12, 12);
  const dotMat = new THREE.MeshBasicMaterial({ color: 0xFF5722 });
  pathDot = new THREE.Mesh(dotGeo, dotMat);
  scene.add(pathDot);
  dotT = 0;
}

// ── SELECTION STATE ───────────────────────────────────────────
let activeFloor = 0;
let fromId = null, toId = null;
let pathIds = [];
let dotT = 0;
let animId = null;

// Pre-fill with null so applyFloorVisibility doesn't crash before loads finish
for (let i = 0; i < 5; i++) floorMeshes.push(null);

// Ground floor: 3D model. Floors 1-4: flat slabs
new THREE.GLTFLoader().load(
  'models/SHU_FBS.glb',
  function (gltf) {
    const model = gltf.scene.clone(true);
    const box  = new THREE.Box3().setFromObject(model);
    const size = new THREE.Vector3();
    box.getSize(size);
    const scaleFactor = 46 / Math.max(size.x, size.z);
    model.scale.multiplyScalar(Math.abs(scaleFactor));
    const box2 = new THREE.Box3().setFromObject(model);
    const center = new THREE.Vector3();
    box2.getCenter(center);
    model.position.x -= center.x;
    model.position.z -= center.z;
    const box3 = new THREE.Box3().setFromObject(model);
    model.position.y = FLOOR_Y[0] - box3.min.y;
    model.traverse(child => {
      if (!child.isMesh) return;
      child.receiveShadow = true;
      child.castShadow    = true;
      if (Array.isArray(child.material)) {
        child.material = child.material.map(m => m.clone());
        child.material.forEach(m => { m.side = THREE.FrontSide; });
      } else {
        child.material = child.material.clone();
        child.material.side = THREE.FrontSide;
      }
    });
    model.visible = (activeFloor === 0);
    scene.add(model);
    floorMeshes[0] = model;
    applyFloorVisibility();
  },
  undefined,
  function () { buildFallbackSlab(0); }
);
for (let i = 1; i < 5; i++) buildFallbackSlab(i);

function getOriginalColor(node) {
  return TC[node.t] || 0x4FC3F7;
}

function resetNodeColors() {
  NODES.forEach(n => {
    const m = nodeMeshes[n.id];
    if (!m) return;
    const col = getOriginalColor(n);
    m.material.color.setHex(col);
    m.material.emissive.setHex(col);
    m.material.emissiveIntensity = 0.15;
    m.scale.set(1, 1, 1);
    // Refresh label to original color
    const s = labelSprites[n.id];
    if (s) {
      s.material.map.dispose();
      s.material.map = makeLabel(n.name, col).material.map;
      s.material.map.needsUpdate = true;
    }
  });
}

function highlightNode(id, hexColor, scaleUp) {
  const m = nodeMeshes[id];
  if (!m) return;
  m.material.color.setHex(hexColor);
  m.material.emissive.setHex(hexColor);
  m.material.emissiveIntensity = 0.6;
  if (scaleUp) m.scale.set(1.5, 2, 1.5);
}

function applyFloorVisibility() {
  NODES.forEach(n => {
    const vis = (n.f === activeFloor);
    const m = nodeMeshes[n.id];
    const s = labelSprites[n.id];
    if (m) m.visible = vis;
    if (s) s.visible = vis;
  });
  floorMeshes.forEach((grp, i) => {
    if (grp) grp.visible = (i === activeFloor);
  });
  if (pathTube) pathTube.visible = true;
}

function showPath(path) {
  pathIds = path;
  resetNodeColors();
  buildPathMesh(path);

  path.forEach((id, i) => {
    if (i === 0)              highlightNode(id, 0xE74C3C, true);
    else if (i === path.length - 1) highlightNode(id, 0x2ECC71, true);
    else                      highlightNode(id, 0xF9A825, false);
  });

  // Switch to floor of start node
  const startFloor = NM[path[0]].f;
  setFloor(startFloor);

  // Info bar
  const sn = NM[path[0]], en = NM[path[path.length - 1]];
  const floors = [...new Set(path.map(id => NM[id].f))];
  const bar = document.getElementById('info-bar');
  bar.style.display = 'block';
  bar.innerHTML = `<strong>${sn.name}</strong> &rarr; <strong>${en.name}</strong>
    &nbsp;|&nbsp; ${path.length} stops
    &nbsp;|&nbsp; ${floors.map(f => FLOOR_NAMES[f]).join(' → ')}`;
  document.getElementById('clear-btn').style.display = 'block';

  // Animate
  if (animId) cancelAnimationFrame(animId);
  dotT = 0;
  (function loop() {
    dotT = (dotT + 0.004) % 1;
    if (pathDot && pathCurve) {
      const p = pathCurve.getPoint(dotT);
      pathDot.position.copy(p);
      pathDot.position.y += Math.sin(Date.now() * 0.004) * 0.08;
    }
    animId = requestAnimationFrame(loop);
  })();
}

function clearAll() {
  fromId = null; toId = null; pathIds = [];
  resetNodeColors();
  clearPathMesh();
  if (animId) { cancelAnimationFrame(animId); animId = null; }
  document.getElementById('info-bar').style.display = 'none';
  document.getElementById('clear-btn').style.display = 'none';
  document.getElementById('from-inp').value = '';
  document.getElementById('to-inp').value   = '';
  updateHint();
}

function updateHint() {
  const hint = document.getElementById('sel-hint');
  if (!fromId) {
    hint.textContent = 'Click a node to set START';
    hint.className = '';
  } else if (!toId) {
    hint.textContent = `START: ${NM[fromId].name} — now click END node`;
    hint.className = 'from-picked';
  } else {
    hint.textContent = 'Path found! Use search or click nodes to change.';
    hint.className = '';
  }
}

// ── FLOOR SWITCHING ───────────────────────────────────────────
function setFloor(f) {
  activeFloor = f;
  document.querySelectorAll('.ftab').forEach(b =>
    b.classList.toggle('active', parseInt(b.dataset.f) === f)
  );
  applyFloorVisibility();
}

document.querySelectorAll('.ftab').forEach(btn => {
  btn.addEventListener('click', () => setFloor(parseInt(btn.dataset.f)));
});

// ── ORBIT CAMERA CONTROLS ─────────────────────────────────────
// Left-drag  → orbit around camTarget
// Right-drag → pan camTarget in screen space (camera-relative)
// Scroll     → dolly (zoom toward cursor point on floor plane)
let camTheta  = Math.PI / 5;
let camPhi    = Math.PI / 3.5;
let camRadius = 55;
let camTarget = new THREE.Vector3(0, FLOOR_Y[0] + 2, 0);

// Reusable vectors for pan calc — avoids GC pressure
const _right = new THREE.Vector3();
const _up    = new THREE.Vector3();
const _dir   = new THREE.Vector3();

function updateCamera() {
  camera.position.set(
    camTarget.x + camRadius * Math.sin(camPhi) * Math.sin(camTheta),
    camTarget.y + camRadius * Math.cos(camPhi),
    camTarget.z + camRadius * Math.sin(camPhi) * Math.cos(camTheta)
  );
  camera.lookAt(camTarget);
}
updateCamera();

function panCamera(dx, dy) {
  const speed = camRadius * 0.0015;
  camera.getWorldDirection(_dir);
  _right.crossVectors(_dir, camera.up).normalize();
  _up.crossVectors(_right, _dir).normalize();
  camTarget.addScaledVector(_right, -dx * speed);
  camTarget.addScaledVector(_up,     dy * speed);
}

let isDragging  = false;
let isRightDrag = false;
let lastMouse   = { x: 0, y: 0 };

canvas.addEventListener('mousedown', e => {
  isDragging  = true;
  isRightDrag = (e.button === 2) || (e.button === 1);
  lastMouse   = { x: e.clientX, y: e.clientY };
  e.preventDefault();
});
canvas.addEventListener('contextmenu', e => e.preventDefault());

window.addEventListener('mousemove', e => {
  if (!isDragging) return;
  const dx = e.clientX - lastMouse.x;
  const dy = e.clientY - lastMouse.y;
  lastMouse = { x: e.clientX, y: e.clientY };
  if (isRightDrag) {
    panCamera(dx, dy);
  } else {
    camTheta -= dx * 0.008;
    camPhi    = Math.max(0.1, Math.min(Math.PI / 2.2, camPhi + dy * 0.008));
  }
  updateCamera();
});

window.addEventListener('mouseup', () => isDragging = false);

canvas.addEventListener('wheel', e => {
  e.preventDefault();
  // Zoom toward the point under the cursor by shifting camTarget slightly
  const zoomFactor = e.deltaY > 0 ? 1.08 : 0.92;
  const oldRadius  = camRadius;
  camRadius = Math.max(5, Math.min(120, camRadius * zoomFactor));

  // Shift target toward/away from cursor for "zoom to point" feel
  const rect = canvas.getBoundingClientRect();
  const mx =  ((e.clientX - rect.left) / rect.width)  * 2 - 1;
  const my = -((e.clientY - rect.top)  / rect.height) * 2 + 1;
  const shift = (oldRadius - camRadius) * 0.15;
  camTarget.x += mx * shift * Math.sin(camTheta);
  camTarget.z += my * shift * Math.cos(camTheta);

  updateCamera();
}, { passive: false });

// Touch — one finger orbit, two finger pinch-zoom + two-finger pan
let lastPinchDist   = 0;
let lastPinchMid    = { x: 0, y: 0 };
let touchOrbitStart = { x: 0, y: 0 };

canvas.addEventListener('touchstart', e => {
  if (e.touches.length === 1) {
    isDragging       = true;
    isRightDrag      = false;
    lastMouse        = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    touchOrbitStart  = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }
  if (e.touches.length === 2) {
    isDragging    = false;
    lastPinchDist = Math.hypot(
      e.touches[0].clientX - e.touches[1].clientX,
      e.touches[0].clientY - e.touches[1].clientY
    );
    lastPinchMid = {
      x: (e.touches[0].clientX + e.touches[1].clientX) / 2,
      y: (e.touches[0].clientY + e.touches[1].clientY) / 2,
    };
  }
}, { passive: true });

canvas.addEventListener('touchmove', e => {
  if (e.touches.length === 1 && isDragging) {
    const dx = e.touches[0].clientX - lastMouse.x;
    const dy = e.touches[0].clientY - lastMouse.y;
    lastMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    camTheta -= dx * 0.008;
    camPhi    = Math.max(0.1, Math.min(Math.PI / 2.2, camPhi + dy * 0.008));
    updateCamera();
  }
  if (e.touches.length === 2) {
    const d = Math.hypot(
      e.touches[0].clientX - e.touches[1].clientX,
      e.touches[0].clientY - e.touches[1].clientY
    );
    // Pinch zoom
    camRadius = Math.max(5, Math.min(120, camRadius * (lastPinchDist / d)));
    lastPinchDist = d;

    // Two-finger pan
    const mid = {
      x: (e.touches[0].clientX + e.touches[1].clientX) / 2,
      y: (e.touches[0].clientY + e.touches[1].clientY) / 2,
    };
    panCamera(mid.x - lastPinchMid.x, mid.y - lastPinchMid.y);
    lastPinchMid = mid;

    updateCamera();
  }
}, { passive: true });

canvas.addEventListener('touchend', () => isDragging = false);

// Zoom buttons
document.getElementById('zin').onclick    = () => { camRadius = Math.max(5,   camRadius * 0.8);  updateCamera(); };
document.getElementById('zout').onclick   = () => { camRadius = Math.min(120, camRadius * 1.25); updateCamera(); };
document.getElementById('zreset').onclick = () => {
  camTheta = Math.PI / 5; camPhi = Math.PI / 3.5; camRadius = 55;
  camTarget.set(0, FLOOR_Y[activeFloor] + 2, 0);
  updateCamera();
};

// ── RAYCASTING — click/tap to select nodes ────────────────────
const raycaster  = new THREE.Raycaster();
const mouseVec   = new THREE.Vector2();
const tooltip    = document.getElementById('tooltip');
const ttFloor    = document.getElementById('tt-floor');
const ttName     = document.getElementById('tt-name');

function getNodeMeshList() {
  return NODES.filter(n => n.f === activeFloor).map(n => nodeMeshes[n.id]).filter(Boolean);
}

// Hover
canvas.addEventListener('mousemove', e => {
  if (isDragging) { tooltip.style.display = 'none'; return; }
  const rect = canvas.getBoundingClientRect();
  mouseVec.x =  ((e.clientX - rect.left)  / rect.width)  * 2 - 1;
  mouseVec.y = -((e.clientY - rect.top)   / rect.height) * 2 + 1;
  raycaster.setFromCamera(mouseVec, camera);
  const hits = raycaster.intersectObjects(getNodeMeshList());
  if (hits.length > 0) {
    const node = NM[hits[0].object.userData.nodeId];
    ttFloor.textContent = FLOOR_NAMES[node.f];
    ttName.textContent  = node.name;
    tooltip.style.display = 'block';
    tooltip.style.left = (e.clientX + 12) + 'px';
    tooltip.style.top  = (e.clientY - 10) + 'px';
    canvas.style.cursor = 'pointer';
  } else {
    tooltip.style.display = 'none';
    canvas.style.cursor = isDragging ? 'grabbing' : 'grab';
  }
});
canvas.addEventListener('mouseleave', () => { tooltip.style.display = 'none'; });

// Click — select from/to
let clickMoved = false;
canvas.addEventListener('mousedown', () => { clickMoved = false; });
canvas.addEventListener('mousemove', () => { clickMoved = true;  });
canvas.addEventListener('mouseup', e => {
  if (clickMoved || e.button !== 0) return;
  const rect = canvas.getBoundingClientRect();
  mouseVec.x =  ((e.clientX - rect.left)  / rect.width)  * 2 - 1;
  mouseVec.y = -((e.clientY - rect.top)   / rect.height) * 2 + 1;
  raycaster.setFromCamera(mouseVec, camera);
  const hits = raycaster.intersectObjects(getNodeMeshList());
  if (!hits.length) return;
  handleNodeClick(hits[0].object.userData.nodeId);
});

// Touch tap
let touchMoved = false, touchStartPos = { x: 0, y: 0 };
canvas.addEventListener('touchstart', e => {
  touchMoved = false;
  touchStartPos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
}, { passive: true });
canvas.addEventListener('touchmove', e => {
  const dx = e.touches[0].clientX - touchStartPos.x;
  const dy = e.touches[0].clientY - touchStartPos.y;
  if (Math.hypot(dx, dy) > 8) touchMoved = true;
}, { passive: true });
canvas.addEventListener('touchend', e => {
  if (touchMoved || e.changedTouches.length === 0) return;
  const t = e.changedTouches[0];
  const rect = canvas.getBoundingClientRect();
  mouseVec.x =  ((t.clientX - rect.left)  / rect.width)  * 2 - 1;
  mouseVec.y = -((t.clientY - rect.top)   / rect.height) * 2 + 1;
  raycaster.setFromCamera(mouseVec, camera);
  const hits = raycaster.intersectObjects(getNodeMeshList());
  if (!hits.length) return;
  handleNodeClick(hits[0].object.userData.nodeId);
}, { passive: true });

function handleNodeClick(nodeId) {
  if (!fromId) {
    // Set FROM
    fromId = nodeId;
    document.getElementById('from-inp').value = NM[nodeId].name;
    resetNodeColors();
    highlightNode(nodeId, 0xE74C3C, true);
    updateHint();
  } else if (!toId) {
    if (nodeId === fromId) return; // ignore same node
    // Set TO and find path
    toId = nodeId;
    document.getElementById('to-inp').value = NM[nodeId].name;
    const path = astar(fromId, toId);
    if (!path) {
      alert('No path found between these locations.');
      toId = null;
      updateHint();
      return;
    }
    showPath(path);
    updateHint();
  } else {
    // Both set — reset and start over with this as new FROM
    clearAll();
    fromId = nodeId;
    document.getElementById('from-inp').value = NM[nodeId].name;
    highlightNode(nodeId, 0xE74C3C, true);
    updateHint();
  }
}

// ── SEARCH AUTOCOMPLETE ───────────────────────────────────────
function setupAC(inpId, dropId, onPick) {
  const inp  = document.getElementById(inpId);
  const drop = document.getElementById(dropId);
  let si = -1;

  inp.addEventListener('input', () => {
    const q = inp.value.trim().toLowerCase();
    drop.innerHTML = ''; si = -1;
    if (!q) { drop.style.display = 'none'; return; }
    const res = NODES.filter(n => n.name.toLowerCase().includes(q)).slice(0, 8);
    if (!res.length) { drop.style.display = 'none'; return; }
    res.forEach(r => {
      const d = document.createElement('div');
      d.className = 'drop-item';
      d.innerHTML = `${r.name}<span class="drop-floor">${FLOOR_NAMES[r.f]}</span>`;
      d.addEventListener('mousedown', ev => {
        ev.preventDefault();
        inp.value = r.name;
        drop.style.display = 'none';
        onPick(r);
      });
      drop.appendChild(d);
    });
    drop.style.display = 'block';
  });

  inp.addEventListener('keydown', e => {
    const items = drop.querySelectorAll('.drop-item');
    if (e.key === 'ArrowDown') si = Math.min(si + 1, items.length - 1);
    else if (e.key === 'ArrowUp') si = Math.max(si - 1, 0);
    else if (e.key === 'Enter' && si >= 0) { items[si].dispatchEvent(new Event('mousedown')); return; }
    items.forEach((it, i) => it.classList.toggle('sel', i === si));
  });

  inp.addEventListener('blur', () => setTimeout(() => drop.style.display = 'none', 150));
}

setupAC('from-inp', 'from-drop', r => {
  fromId = r.id;
  setFloor(r.f);
  resetNodeColors();
  highlightNode(r.id, 0xE74C3C, true);
  if (toId) {
    const path = astar(fromId, toId);
    if (path) showPath(path);
  }
  updateHint();
});

setupAC('to-inp', 'to-drop', r => {
  toId = r.id;
  if (fromId) {
    const path = astar(fromId, toId);
    if (path) showPath(path);
    else alert('No path found between these locations.');
  } else {
    setFloor(r.f);
    highlightNode(r.id, 0x2ECC71, true);
  }
  updateHint();
});

document.getElementById('find-btn').addEventListener('click', () => {
  if (!fromId || !toId) { alert('Please select both From and To locations.'); return; }
  if (fromId === toId)  { alert('Start and destination are the same.'); return; }
  const path = astar(fromId, toId);
  if (!path) { alert('No path found between these locations.'); return; }
  showPath(path);
});

document.getElementById('clear-btn').addEventListener('click', clearAll);

// ── RESIZE ────────────────────────────────────────────────────
function resize() {
  const vp = document.getElementById('viewport');
  const W  = vp.clientWidth;
  const H  = vp.clientHeight;
  renderer.setSize(W, H);
  camera.aspect = W / H;
  camera.updateProjectionMatrix();
}
window.addEventListener('resize', resize);
resize();

// ── RENDER LOOP ───────────────────────────────────────────────
function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

// ── INIT ──────────────────────────────────────────────────────
setFloor(0);
updateHint();
render();
