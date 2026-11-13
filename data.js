/* ============================================================
   AXIVRA - Study data (subjects, notes, practice questions)
   Naya subject / topic / question add karna ho toh bas yahan
   same format mein add kar do. UI apne aap update ho jayega.
   ============================================================ */

const SUBJECTS = [

/* ====================== MATHEMATICS ====================== */
{
  id: 'maths',
  name: 'Engineering Mathematics',
  short: 'Mathematics',
  icon: '∑',
  color: '#00e5ff',
  tagline: 'Calculus, Matrices, Series & more',
  topics: [
    {
      id: 'limits',
      title: 'Limits, Continuity & Differentiation',
      content: `
<p>Limit batata hai ki jab <b>x</b> kisi value <b>a</b> ke paas jaata hai, toh <b>f(x)</b> kis value ke paas jaata hai. Calculus ki poori building isi par khadi hai.</p>

<h3>Standard Limits (zaroor yaad karo)</h3>
<ul>
  <li>lim<sub>x→0</sub> (sin x) / x = 1</li>
  <li>lim<sub>x→0</sub> (1 − cos x) / x² = 1/2</li>
  <li>lim<sub>x→0</sub> (eˣ − 1) / x = 1</li>
  <li>lim<sub>x→0</sub> ln(1 + x) / x = 1</li>
  <li>lim<sub>x→∞</sub> (1 + 1/x)ˣ = e</li>
</ul>

<h3>L'Hôpital's Rule</h3>
<div class="formula">Agar f(x)/g(x) se 0/0 ya ∞/∞ form aaye, toh<br>lim f(x)/g(x) = lim f′(x)/g′(x)</div>
<div class="example"><b>Example:</b> lim<sub>x→0</sub> (eˣ − 1 − x)/x². Pehli baar derivative: (eˣ − 1)/(2x) → phir 0/0. Dobara derivative: eˣ/2 → x=0 par <b>1/2</b>.</div>

<h3>Continuity</h3>
<p>f(x) point <b>a</b> par continuous hai agar:</p>
<div class="formula">LHL = RHL = f(a)</div>

<h3>Basic Derivatives</h3>
<table>
  <tr><th>f(x)</th><th>f′(x)</th></tr>
  <tr><td>xⁿ</td><td>n·xⁿ⁻¹</td></tr>
  <tr><td>sin x</td><td>cos x</td></tr>
  <tr><td>cos x</td><td>− sin x</td></tr>
  <tr><td>eˣ</td><td>eˣ</td></tr>
  <tr><td>ln x</td><td>1/x</td></tr>
  <tr><td>tan x</td><td>sec² x</td></tr>
</table>
<h3>Rules</h3>
<ul>
  <li><b>Product rule:</b> (uv)′ = u′v + uv′</li>
  <li><b>Quotient rule:</b> (u/v)′ = (u′v − uv′) / v²</li>
  <li><b>Chain rule:</b> d/dx [f(g(x))] = f′(g(x)) · g′(x)</li>
</ul>
<div class="tip"><b>💡 Yaad rakho:</b> Limit mein pehle seedha value daal ke dekho. Agar 0/0 aaye tabhi L'Hôpital ya factorization use karo.</div>`
    },
    {
      id: 'partial',
      title: 'Partial Differentiation & Maxima-Minima',
      content: `
<p>Jab function <b>ek se zyada variables</b> par depend karta hai (jaise f(x, y)), toh hum ek variable ke respect mein derivative lete hain aur baaki ko <b>constant</b> maante hain.</p>

<h3>Partial Derivatives</h3>
<div class="example"><b>Example:</b> f(x, y) = x²y + y³<br>∂f/∂x = 2xy (y ko constant maana)<br>∂f/∂y = x² + 3y² (x ko constant maana)</div>

<h3>Total Differential</h3>
<div class="formula">df = (∂f/∂x) dx + (∂f/∂y) dy</div>

<h3>Euler's Theorem on Homogeneous Functions</h3>
<p>Agar f(x, y) degree <b>n</b> ka homogeneous function hai, toh:</p>
<div class="formula">x·(∂f/∂x) + y·(∂f/∂y) = n·f</div>

<h3>Maxima & Minima (2 variables)</h3>
<ol>
  <li>∂f/∂x = 0 aur ∂f/∂y = 0 solve karke <b>critical points</b> nikalo.</li>
  <li>r = f<sub>xx</sub>, s = f<sub>xy</sub>, t = f<sub>yy</sub> nikalo.</li>
  <li>Har critical point par <b>rt − s²</b> check karo.</li>
</ol>
<table>
  <tr><th>Condition</th><th>Result</th></tr>
  <tr><td>rt − s² &gt; 0 aur r &lt; 0</td><td>Maximum</td></tr>
  <tr><td>rt − s² &gt; 0 aur r &gt; 0</td><td>Minimum</td></tr>
  <tr><td>rt − s² &lt; 0</td><td>Saddle point (na max, na min)</td></tr>
  <tr><td>rt − s² = 0</td><td>Test inconclusive</td></tr>
</table>
<div class="tip"><b>💡 Yaad rakho:</b> Exam mein most common question: "Find the extreme values of f(x, y)". Steps ko order mein likho, full marks milenge.</div>`
    },
    {
      id: 'matrices',
      title: 'Matrices & Linear Algebra',
      content: `
<p>Matrix numbers ka rectangular arrangement hai. Linear equations solve karne aur engineering systems model karne mein bahut kaam aata hai.</p>

<h3>Important Concepts</h3>
<ul>
  <li><b>Determinant:</b> sirf square matrix ka hota hai. |A| = 0 ka matlab matrix <b>singular</b> hai (inverse nahi hota).</li>
  <li><b>Inverse:</b> A⁻¹ = adj(A) / |A|</li>
  <li><b>Rank:</b> matrix ke maximum linearly independent rows (ya columns) ki ginti. Echelon form banake non-zero rows count karo.</li>
</ul>

<h3>Consistency of AX = B</h3>
<p>n = number of unknowns. Augmented matrix [A | B] banao.</p>
<table>
  <tr><th>Condition</th><th>Solution</th></tr>
  <tr><td>Rank(A) = Rank([A|B]) = n</td><td>Unique solution</td></tr>
  <tr><td>Rank(A) = Rank([A|B]) &lt; n</td><td>Infinite solutions</td></tr>
  <tr><td>Rank(A) ≠ Rank([A|B])</td><td>No solution (inconsistent)</td></tr>
</table>

<h3>Eigenvalues & Eigenvectors</h3>
<div class="formula">AX = λX &nbsp;⇒&nbsp; |A − λI| = 0 (characteristic equation)</div>
<ul>
  <li>Eigenvalues ka <b>sum = trace</b> of A (diagonal ka sum)</li>
  <li>Eigenvalues ka <b>product = |A|</b></li>
  <li>Triangular matrix ke eigenvalues = uske diagonal elements</li>
</ul>
<div class="example"><b>Example:</b> A = [[2, 0], [0, 3]] ke eigenvalues seedha <b>2 aur 3</b> hain (diagonal matrix).</div>

<h3>Cayley–Hamilton Theorem</h3>
<div class="formula">Har square matrix apni characteristic equation ko satisfy karta hai.<br>Agar λ² − 5λ + 6 = 0 hai, toh A² − 5A + 6I = 0</div>
<div class="tip"><b>💡 Yaad rakho:</b> Cayley–Hamilton se A⁻¹ aur A ki higher powers bina multiply kiye nikaal sakte ho. Exam favourite!</div>`
    },
    {
      id: 'integral',
      title: 'Integral Calculus, Gamma-Beta & Series',
      content: `
<h3>Properties of Definite Integrals</h3>
<ul>
  <li>∫<sub>a</sub><sup>b</sup> f(x) dx = ∫<sub>a</sub><sup>b</sup> f(a + b − x) dx</li>
  <li>∫<sub>0</sub><sup>a</sup> f(x) dx = ∫<sub>0</sub><sup>a</sup> f(a − x) dx</li>
  <li>f(x) <b>even</b> ho toh ∫<sub>−a</sub><sup>a</sup> f dx = 2∫<sub>0</sub><sup>a</sup> f dx</li>
  <li>f(x) <b>odd</b> ho toh ∫<sub>−a</sub><sup>a</sup> f dx = 0</li>
</ul>
<div class="example"><b>Example:</b> ∫<sub>0</sub><sup>π</sup> sin x dx = [−cos x]<sub>0</sub><sup>π</sup> = 1 + 1 = <b>2</b></div>

<h3>Gamma & Beta Functions</h3>
<div class="formula">Γ(n) = ∫<sub>0</sub><sup>∞</sup> e<sup>−x</sup> x<sup>n−1</sup> dx<br>Γ(n + 1) = n·Γ(n)<br>Γ(n + 1) = n! &nbsp; (n positive integer)<br>Γ(1/2) = √π<br>β(m, n) = Γ(m)·Γ(n) / Γ(m + n)</div>
<div class="example"><b>Example:</b> Γ(5) = 4! = <b>24</b></div>

<h3>Maclaurin's Series (Taylor at a = 0)</h3>
<div class="formula">f(x) = f(0) + x·f′(0) + (x²/2!)·f″(0) + (x³/3!)·f‴(0) + …</div>
<ul>
  <li>eˣ = 1 + x + x²/2! + x³/3! + …</li>
  <li>sin x = x − x³/3! + x⁵/5! − …</li>
  <li>cos x = 1 − x²/2! + x⁴/4! − …</li>
  <li>ln(1 + x) = x − x²/2 + x³/3 − …</li>
</ul>
<div class="tip"><b>💡 Yaad rakho:</b> Limits mein indeterminate form ko series expand karke bhi solve kar sakte ho, kabhi kabhi L'Hôpital se zyada fast hota hai.</div>`
    }
  ],
  questions: [
    { q: 'What is the value of lim (x→0) sin(x) / x ?', options: ['0', '1', '∞', 'Does not exist'], a: 1, exp: 'This is a standard limit and its value is 1.' },
    { q: 'The derivative of e^(2x) with respect to x is:', options: ['e^(2x)', '2e^(2x)', 'e^(x)', '2x·e^(2x)'], a: 1, exp: 'Chain rule: d/dx e^(2x) = e^(2x) · 2 = 2e^(2x).' },
    { q: 'The rank of a 3×3 identity matrix is:', options: ['1', '2', '3', '0'], a: 2, exp: 'All 3 rows are linearly independent, so rank = 3.' },
    { q: 'A 2×2 matrix has trace 5 and determinant 6. Its eigenvalues are:', options: ['1 and 6', '2 and 3', '−2 and −3', '5 and 1'], a: 1, exp: 'Sum of eigenvalues = trace = 5 and product = determinant = 6. Only 2 and 3 satisfy both.' },
    { q: 'The value of ∫ from 0 to π of sin(x) dx is:', options: ['0', '1', '2', 'π'], a: 2, exp: 'The antiderivative is −cos x. Evaluating: (−cos π) − (−cos 0) = 1 + 1 = 2.' },
    { q: 'The value of Γ(5) is:', options: ['4', '24', '120', '5'], a: 1, exp: 'Γ(n+1) = n!, so Γ(5) = 4! = 24.' },
    { q: 'If f(x, y) = x²y, then ∂f/∂x equals:', options: ['x²', '2xy', '2x', 'x²y'], a: 1, exp: 'Treat y as constant: d/dx (x²y) = 2xy.' },
    { q: 'What is the coefficient of x² in the Maclaurin series of e^x?', options: ['1', '2', '1/2', '1/6'], a: 2, exp: 'e^x = 1 + x + x²/2! + …, so the coefficient of x² is 1/2.' }
  ]
},

/* ========================= PHYSICS ======================== */
{
  id: 'physics',
  name: 'Engineering Physics',
  short: 'Physics',
  icon: '⚛',
  color: '#8b5cf6',
  tagline: 'Optics, Laser, Quantum & Maxwell',
  topics: [
    {
      id: 'optics',
      title: 'Interference, Diffraction & Polarization',
      content: `
<h3>Interference of Light</h3>
<p>Do <b>coherent</b> light waves jab milti hain toh intensity ka redistribution hota hai. Isi ko interference kehte hain.</p>
<table>
  <tr><th>Type</th><th>Path difference (Δ)</th></tr>
  <tr><td>Constructive (bright fringe)</td><td>nλ</td></tr>
  <tr><td>Destructive (dark fringe)</td><td>(2n + 1)λ/2</td></tr>
</table>

<h3>Young's Double Slit Experiment (YDSE)</h3>
<div class="formula">Fringe width: β = λD / d<br>D = slits se screen ki doori, d = slits ke beech ka gap</div>
<ul>
  <li>Fringe width λ ke <b>directly proportional</b> hai aur d ke <b>inversely proportional</b>.</li>
  <li>Sabhi fringes ki width barabar hoti hai.</li>
</ul>

<h3>Diffraction</h3>
<p>Obstacle ya slit ke kinare se light ka mudna (bending) diffraction hai.</p>
<ul>
  <li><b>Single slit minima:</b> a sin θ = nλ</li>
  <li><b>Diffraction grating:</b> (a + b) sin θ = nλ, jahan (a + b) grating element hai.</li>
</ul>

<h3>Polarization</h3>
<div class="formula">Malus' Law: I = I₀ cos²θ<br>Brewster's Law: tan θ<sub>p</sub> = μ</div>
<div class="tip"><b>💡 Yaad rakho:</b> Interference mein <b>do coherent sources</b> chahiye, diffraction mein <b>ek hi wavefront</b> ke alag hisson ka milan hota hai.</div>`
    },
    {
      id: 'laser',
      title: 'LASER & Optical Fibre Basics',
      content: `
<p><b>LASER</b> = <b>L</b>ight <b>A</b>mplification by <b>S</b>timulated <b>E</b>mission of <b>R</b>adiation.</p>

<h3>Three Processes</h3>
<ul>
  <li><b>Absorption:</b> atom photon absorb karke lower se higher energy level par jaata hai.</li>
  <li><b>Spontaneous emission:</b> atom apne aap higher se lower level par aata hai aur random photon nikalta hai.</li>
  <li><b>Stimulated emission:</b> ek incoming photon excited atom ko ek <b>identical photon</b> chodne par majboor karta hai. Laser ki jaan yahi hai.</li>
</ul>

<h3>Einstein's Coefficients</h3>
<div class="formula">A₂₁ → spontaneous emission<br>B₁₂ → absorption &nbsp;|&nbsp; B₂₁ → stimulated emission<br>B₁₂ = B₂₁</div>

<h3>Requirements for Laser Action</h3>
<ol>
  <li><b>Population inversion:</b> higher level mein atoms zyada (N₂ &gt; N₁).</li>
  <li><b>Pumping:</b> atoms ko excite karne ka process.</li>
  <li><b>Metastable state:</b> aisa level jahan atom thoda zyada time ruk sake.</li>
  <li><b>Optical resonator:</b> do mirrors jo light ko bar bar aage peeche bhejte hain.</li>
</ol>

<h3>Types of Laser</h3>
<table>
  <tr><th>Laser</th><th>Details</th></tr>
  <tr><td>Ruby laser</td><td>3-level system, pulsed, 694.3 nm (red)</td></tr>
  <tr><td>He-Ne laser</td><td>4-level system, continuous, 632.8 nm (red)</td></tr>
  <tr><td>Semiconductor laser</td><td>Compact, used in CD/DVD and fibre communication</td></tr>
</table>

<h3>Properties & Applications</h3>
<ul>
  <li><b>Properties:</b> monochromatic, coherent, highly directional, high intensity</li>
  <li><b>Uses:</b> eye surgery, cutting and welding, barcode scanner, optical communication</li>
</ul>
<div class="tip"><b>💡 Yaad rakho:</b> Normal light mein N₁ &gt; N₂ hota hai. Laser ke liye ise ulta karna padta hai, isi ko population inversion kehte hain.</div>`
    },
    {
      id: 'quantum',
      title: 'Quantum Mechanics Basics',
      content: `
<h3>Planck & Photoelectric Effect</h3>
<div class="formula">E = hν = hc/λ<br>Einstein: hν = φ + KE<sub>max</sub></div>
<p>φ = work function (metal se electron nikalne ke liye minimum energy). h = 6.626 × 10⁻³⁴ J·s.</p>

<h3>de Broglie Hypothesis</h3>
<p>Har moving particle ke saath ek <b>wave</b> juda hota hai (matter wave).</p>
<div class="formula">λ = h / p = h / mv<br>V volt se accelerated electron: λ = 12.27 / √V Å</div>

<h3>Heisenberg's Uncertainty Principle</h3>
<div class="formula">Δx · Δp ≥ ħ/2 &nbsp;&nbsp;(ħ = h/2π)</div>
<p>Kisi particle ki position aur momentum dono ek saath perfectly nahi naap sakte.</p>

<h3>Schrödinger Equation (time-independent, 1D)</h3>
<div class="formula">−(ħ²/2m) d²ψ/dx² + V·ψ = E·ψ</div>
<ul>
  <li>ψ = wave function, |ψ|² = probability density</li>
  <li>Normalization: ∫|ψ|² dx = 1 (particle kahin na kahin toh milega hi)</li>
</ul>

<h3>Particle in a 1D Box</h3>
<div class="formula">E<sub>n</sub> = n²h² / (8mL²) &nbsp;&nbsp; n = 1, 2, 3, …</div>
<p>Energy <b>quantized</b> hoti hai, aur lowest energy (n = 1) kabhi zero nahi hoti.</p>
<div class="tip"><b>💡 Yaad rakho:</b> Quantum mein numericals zyada nahi hote, concepts aur formulas pe focus karo. de Broglie wavelength ka numerical exam mein pakka aata hai.</div>`
    },
    {
      id: 'maxwell',
      title: "Maxwell's Equations & EM Waves",
      content: `
<h3>Maxwell's Four Equations (Differential Form)</h3>
<table>
  <tr><th>Equation</th><th>Meaning</th></tr>
  <tr><td>∇·E = ρ/ε₀</td><td>Gauss's law (electric): charge field ka source hai</td></tr>
  <tr><td>∇·B = 0</td><td>Gauss's law (magnetic): magnetic monopole exist nahi karta</td></tr>
  <tr><td>∇×E = −∂B/∂t</td><td>Faraday's law: badalta B-field E-field banata hai</td></tr>
  <tr><td>∇×B = μ₀J + μ₀ε₀ ∂E/∂t</td><td>Ampère-Maxwell law: current aur badalta E-field B-field banate hain</td></tr>
</table>

<h3>Displacement Current</h3>
<p>Maxwell ne Ampère's law mein ek extra term <b>μ₀ε₀ ∂E/∂t</b> jodi. Ye badalte electric field ki wajah se banne wala current hai, jisse capacitor ke beech bhi circuit "complete" hota hai.</p>

<h3>Electromagnetic Waves</h3>
<div class="formula">Speed in vacuum: c = 1 / √(μ₀ε₀) ≈ 3 × 10⁸ m/s<br>E / B = c<br>Poynting vector: S = E × H (energy flow ki direction aur rate)</div>
<ul>
  <li>EM waves <b>transverse</b> hoti hain: E aur B ek dusre ke perpendicular aur propagation direction ke bhi perpendicular.</li>
  <li>Inhe medium ki zarurat nahi, vacuum mein bhi chalti hain.</li>
</ul>
<div class="tip"><b>💡 Yaad rakho:</b> Chaaron equations ke naam aur physical meaning short mein likhna exam mein 5 marks ka standard answer hai.</div>`
    }
  ],
  questions: [
    { q: 'In Young\'s double slit experiment, the fringe width is given by:', options: ['λd / D', 'λD / d', 'dD / λ', 'λ / dD'], a: 1, exp: 'β = λD/d, where D is the slit-to-screen distance and d is the slit separation.' },
    { q: 'LASER stands for:', options: ['Light Amplification by Stimulated Emission of Radiation', 'Light Absorption by Stimulated Emission of Rays', 'Linear Amplification of Stimulated Energy Radiation', 'Light Amplification by Spontaneous Emission of Radiation'], a: 0, exp: 'LASER = Light Amplification by Stimulated Emission of Radiation.' },
    { q: 'Population inversion means:', options: ['N₁ > N₂', 'N₁ = N₂', 'N₂ > N₁', 'No atoms are excited'], a: 2, exp: 'More atoms are in the higher energy level (N₂) than in the lower level (N₁).' },
    { q: 'The de Broglie wavelength of a particle with momentum p is:', options: ['p/h', 'h/p', 'hp', 'h/p²'], a: 1, exp: 'λ = h/p.' },
    { q: 'The Heisenberg uncertainty principle states that:', options: ['Δx·Δp ≥ ħ/2', 'Δx·Δp = 0', 'Δx + Δp = ħ', 'Δx/Δp ≥ ħ'], a: 0, exp: 'Position and momentum cannot be measured simultaneously with arbitrary precision: Δx·Δp ≥ ħ/2.' },
    { q: 'The speed of electromagnetic waves in vacuum is approximately:', options: ['3 × 10⁶ m/s', '3 × 10⁸ m/s', '3 × 10¹⁰ m/s', '3 × 10⁵ m/s'], a: 1, exp: 'c = 1/√(μ₀ε₀) ≈ 3 × 10⁸ m/s.' },
    { q: 'The condition for constructive interference is a path difference of:', options: ['(2n+1)λ/2', 'nλ', 'λ/4', 'nλ/2 for odd n only'], a: 1, exp: 'Bright fringes form when the path difference is an integer multiple of λ.' },
    { q: 'Which Maxwell equation states that magnetic monopoles do not exist?', options: ['∇·E = ρ/ε₀', '∇×E = −∂B/∂t', '∇·B = 0', '∇×B = μ₀J'], a: 2, exp: '∇·B = 0 means magnetic field lines are closed loops, so there are no isolated magnetic charges.' }
  ]
},

/* ==================== PROGRAMMING IN C ==================== */
{
  id: 'cprog',
  name: 'Programming in C',
  short: 'C Programming',
  icon: '</>',
  color: '#00ffa3',
  tagline: 'From first program to pointers',
  topics: [
    {
      id: 'basics',
      title: 'C Basics: Data Types, Operators & I/O',
      content: `
<p>C ek <b>procedural</b> programming language hai jise Dennis Ritchie ne 1972 mein banaya. Ye fast, powerful hai aur har engineering student ki pehli language hoti hai.</p>

<h3>Structure of a C Program</h3>
<pre><code>#include &lt;stdio.h&gt;

int main() {
    printf("Hello, Axivra!\\n");
    return 0;
}</code></pre>

<h3>Basic Data Types</h3>
<table>
  <tr><th>Type</th><th>Size (typical)</th><th>Format</th></tr>
  <tr><td>int</td><td>4 bytes</td><td>%d</td></tr>
  <tr><td>float</td><td>4 bytes</td><td>%f</td></tr>
  <tr><td>double</td><td>8 bytes</td><td>%lf</td></tr>
  <tr><td>char</td><td>1 byte</td><td>%c</td></tr>
</table>

<h3>Operators</h3>
<ul>
  <li><b>Arithmetic:</b> + − * / %</li>
  <li><b>Relational:</b> &lt; &gt; &lt;= &gt;= == !=</li>
  <li><b>Logical:</b> &amp;&amp; (AND), || (OR), ! (NOT)</li>
  <li><b>Increment/Decrement:</b> ++ and −− (prefix pehle badhata hai, postfix baad mein)</li>
</ul>
<div class="example"><b>Dhyan do:</b> Integer division mein decimal part cut jaata hai. <code>5 / 2</code> ka answer <b>2</b> hai, 2.5 nahi.</div>

<h3>Input / Output</h3>
<pre><code>int a;
scanf("%d", &amp;a);      // input (address ke liye &amp; zaroori)
printf("Value = %d", a); // output</code></pre>
<div class="tip"><b>💡 Yaad rakho:</b> <code>scanf</code> mein variable ke aage <b>&amp;</b> lagana mat bhoolna (string ko chhodkar). Ye sabse common mistake hai.</div>`
    },
    {
      id: 'control',
      title: 'Control Statements & Loops',
      content: `
<h3>Decision Making</h3>
<pre><code>if (marks &gt;= 90) {
    printf("Grade A");
} else if (marks &gt;= 60) {
    printf("Grade B");
} else {
    printf("Grade C");
}</code></pre>

<h3>switch Statement</h3>
<pre><code>switch (choice) {
    case 1: printf("One"); break;
    case 2: printf("Two"); break;
    default: printf("Other");
}</code></pre>
<p><b>break</b> na likhne par next case bhi chal jaata hai (fall-through).</p>

<h3>Loops</h3>
<table>
  <tr><th>Loop</th><th>Kab use karein</th></tr>
  <tr><td>for</td><td>Jab iterations ki ginti pata ho</td></tr>
  <tr><td>while</td><td>Jab condition par depend kare (entry-controlled)</td></tr>
  <tr><td>do-while</td><td>Kam se kam <b>ek baar</b> chalna ho (exit-controlled)</td></tr>
</table>
<pre><code>for (int i = 1; i &lt;= 5; i++) {
    printf("%d ", i);   // Output: 1 2 3 4 5
}</code></pre>

<h3>break & continue</h3>
<ul>
  <li><b>break:</b> loop se turant bahar</li>
  <li><b>continue:</b> current iteration skip karke agle par jao</li>
</ul>
<div class="tip"><b>💡 Yaad rakho:</b> <code>=</code> assignment hai aur <code>==</code> comparison. <code>if (a = 5)</code> likhna ek classic bug hai.</div>`
    },
    {
      id: 'arrays',
      title: 'Arrays, Functions & Recursion',
      content: `
<h3>Arrays</h3>
<p>Same type ke elements ka collection, memory mein <b>continuous</b> rehte hain. Index <b>0</b> se shuru hota hai.</p>
<pre><code>int arr[5] = {10, 20, 30, 40, 50};
printf("%d", arr[2]);   // 30

int sum = 0;
for (int i = 0; i &lt; 5; i++) sum += arr[i];</code></pre>
<div class="example">Array ka size n hai toh valid index <b>0 se n−1</b> tak hote hain. Bahar jaana undefined behaviour hai.</div>

<h3>Functions</h3>
<pre><code>int add(int a, int b) {     // definition
    return a + b;
}

int main() {
    int r = add(3, 4);      // call
    printf("%d", r);        // 7
    return 0;
}</code></pre>
<ul>
  <li><b>Call by value:</b> copy jaati hai, original change nahi hota (C ka default).</li>
  <li><b>Call by reference:</b> address (pointer) bhejte hain, original change ho sakta hai.</li>
</ul>

<h3>Recursion</h3>
<p>Function khud ko call kare. Hamesha ek <b>base case</b> zaroori hai warna infinite loop.</p>
<pre><code>int factorial(int n) {
    if (n == 0 || n == 1) return 1;   // base case
    return n * factorial(n - 1);
}
// factorial(5) = 120</code></pre>
<div class="tip"><b>💡 Yaad rakho:</b> Recursion mein har call stack memory leti hai. Bahut deep recursion se stack overflow ho sakta hai.</div>`
    },
    {
      id: 'pointers',
      title: 'Pointers, Strings & Structures',
      content: `
<h3>Pointers</h3>
<p>Pointer aisa variable hai jo kisi dusre variable ka <b>address</b> store karta hai.</p>
<ul>
  <li><b>&amp;</b> (address-of): variable ka address deta hai</li>
  <li><b>*</b> (dereference): address par rakhi value deta hai</li>
</ul>
<pre><code>int a = 5;
int *p = &amp;a;
printf("%d", *p);   // 5
*p = 10;            // ab a bhi 10 ho gaya</code></pre>

<h3>Swap using Pointers</h3>
<pre><code>void swap(int *x, int *y) {
    int t = *x;
    *x = *y;
    *y = t;
}
// call: swap(&amp;a, &amp;b);</code></pre>

<h3>Strings</h3>
<p>C mein string ek <b>char array</b> hai jo null character <code>'\\0'</code> par khatam hoti hai.</p>
<pre><code>char name[] = "Axivra";
printf("%lu", strlen(name));   // 6  (#include &lt;string.h&gt;)</code></pre>
<p>Useful functions: <code>strlen</code>, <code>strcpy</code>, <code>strcat</code>, <code>strcmp</code>.</p>

<h3>Structures</h3>
<p>Alag alag type ke data ko ek naam ke neeche group karne ke liye.</p>
<pre><code>struct Student {
    char name[30];
    int roll;
    float cgpa;
};

struct Student s1 = {"Rahul", 101, 8.5};
printf("%s %d", s1.name, s1.roll);</code></pre>
<div class="tip"><b>💡 Yaad rakho:</b> Pointer ko use karne se pehle hamesha initialize karo. Uninitialized pointer (wild pointer) program crash kara sakta hai.</div>`
    }
  ],
  questions: [
    { q: 'Which format specifier is used to print an integer in C?', options: ['%f', '%c', '%d', '%s'], a: 2, exp: '%d is used for int values. %f is float, %c is char and %s is a string.' },
    { q: 'What is the output of printf("%d", 5/2); ?', options: ['2.5', '2', '3', '2.0'], a: 1, exp: 'Both operands are integers, so integer division gives 2 and the decimal part is dropped.' },
    { q: 'What is the typical size of an int on a modern 32/64-bit compiler?', options: ['1 byte', '2 bytes', '4 bytes', '8 bytes'], a: 2, exp: 'Most modern compilers use 4 bytes for int.' },
    { q: 'In C, array indexing starts from:', options: ['1', '0', '−1', 'Any number you choose'], a: 1, exp: 'The first element is at index 0, so an array of size n has indices 0 to n−1.' },
    { q: 'Which operator is used to get the value stored at an address held by a pointer?', options: ['&', '*', '->', '#'], a: 1, exp: '* is the dereference operator. & gives the address of a variable.' },
    { q: 'Which loop is guaranteed to execute at least once?', options: ['for', 'while', 'do-while', 'None of these'], a: 2, exp: 'do-while checks the condition after executing the body, so the body always runs at least once.' },
    { q: 'Which header file is required for printf() and scanf()?', options: ['stdlib.h', 'string.h', 'stdio.h', 'math.h'], a: 2, exp: 'printf and scanf are declared in stdio.h (standard input/output).' },
    { q: 'What will be printed?  int a = 5; int *p = &a; printf("%d", *p);', options: ['The address of a', '5', '0', 'Garbage value'], a: 1, exp: 'p holds the address of a, and *p reads the value stored there, which is 5.' }
  ]
},

/* ================= BASIC ELECTRICAL ENGG ================== */
{
  id: 'bee',
  name: 'Basic Electrical Engineering',
  short: 'Electrical',
  icon: '⚡',
  color: '#ffb800',
  tagline: 'Circuits, AC, Transformers',
  topics: [
    {
      id: 'dc',
      title: 'DC Circuits & Network Theorems',
      content: `
<h3>Basic Laws</h3>
<div class="formula">Ohm's Law: V = I × R<br>Power: P = V·I = I²R = V²/R</div>

<h3>Kirchhoff's Laws</h3>
<ul>
  <li><b>KCL (Current Law):</b> kisi node par aane wale currents ka sum = jaane wale currents ka sum. Yaani node par net current = 0.</li>
  <li><b>KVL (Voltage Law):</b> kisi closed loop mein sab voltage drops aur rises ka algebraic sum = 0.</li>
</ul>

<h3>Series & Parallel Resistors</h3>
<div class="formula">Series: R<sub>eq</sub> = R₁ + R₂ + R₃<br>Parallel: 1/R<sub>eq</sub> = 1/R₁ + 1/R₂ + 1/R₃</div>
<div class="example"><b>Example:</b> 2 Ω, 3 Ω aur 6 Ω parallel mein: 1/R = 1/2 + 1/3 + 1/6 = 1 ⇒ R<sub>eq</sub> = <b>1 Ω</b></div>

<h3>Network Theorems</h3>
<ul>
  <li><b>Superposition:</b> multiple sources ho toh ek ek source ka effect alag nikalo (baaki voltage sources short, current sources open), phir jod do. Sirf linear circuits ke liye.</li>
  <li><b>Thevenin:</b> koi bhi complex network = ek V<sub>th</sub> source + ek R<sub>th</sub> series mein.</li>
  <li><b>Maximum Power Transfer:</b> load ko max power tab milti hai jab R<sub>L</sub> = R<sub>th</sub>.</li>
</ul>
<div class="tip"><b>💡 Yaad rakho:</b> Voltage divider (series): bada resistor zyada voltage leta hai. Current divider (parallel): chhota resistor zyada current leta hai.</div>`
    },
    {
      id: 'ac',
      title: 'AC Fundamentals & Single-Phase Circuits',
      content: `
<h3>Sinusoidal AC</h3>
<div class="formula">v(t) = V<sub>m</sub> sin(ωt + φ)<br>ω = 2πf</div>
<ul>
  <li><b>Peak value:</b> V<sub>m</sub></li>
  <li><b>RMS value:</b> V<sub>rms</sub> = V<sub>m</sub> / √2 ≈ 0.707 V<sub>m</sub></li>
  <li><b>Average value (half cycle):</b> V<sub>avg</sub> = 2V<sub>m</sub> / π ≈ 0.637 V<sub>m</sub></li>
  <li><b>Form factor</b> = RMS / Average = 1.11 (sine wave ke liye)</li>
</ul>
<div class="example">India mein ghar ki supply <b>230 V RMS, 50 Hz</b> hai. Iska peak value 230 × √2 ≈ 325 V hota hai.</div>

<h3>Reactance & Impedance</h3>
<div class="formula">X<sub>L</sub> = ωL = 2πfL &nbsp;|&nbsp; X<sub>C</sub> = 1/(ωC)<br>Series RLC: Z = √( R² + (X<sub>L</sub> − X<sub>C</sub>)² )</div>
<ul>
  <li>Pure R: voltage aur current <b>in phase</b></li>
  <li>Pure L: current voltage se <b>90° peeche</b> (lagging)</li>
  <li>Pure C: current voltage se <b>90° aage</b> (leading)</li>
</ul>

<h3>Power in AC</h3>
<div class="formula">Active power P = V·I·cos φ (Watt)<br>Reactive power Q = V·I·sin φ (VAR)<br>Apparent power S = V·I (VA)<br>Power factor = cos φ</div>
<p>Pure resistor ka power factor <b>1</b> hota hai.</p>

<h3>Resonance (Series RLC)</h3>
<div class="formula">X<sub>L</sub> = X<sub>C</sub> &nbsp;⇒&nbsp; f₀ = 1 / (2π√(LC))</div>
<div class="tip"><b>💡 Yaad rakho:</b> <b>ELI the ICE man</b>: inductor (L) mein E aage I se, capacitor (C) mein I aage E se.</div>`
    },
    {
      id: 'transformer',
      title: 'Transformers',
      content: `
<p>Transformer ek <b>static</b> device hai jo AC voltage ko ek level se dusre level par badalta hai, <b>frequency same</b> rakhte hue. Ye <b>mutual induction</b> (Faraday's law) par kaam karta hai.</p>

<h3>Construction</h3>
<ul>
  <li><b>Core:</b> laminated silicon steel (eddy current loss kam karne ke liye)</li>
  <li><b>Primary winding</b> (supply se juda) aur <b>secondary winding</b> (load se juda)</li>
</ul>

<h3>EMF Equation</h3>
<div class="formula">E = 4.44 · f · N · Φ<sub>m</sub> (volt)</div>

<h3>Turns Ratio</h3>
<div class="formula">V₂/V₁ = N₂/N₁ = I₁/I₂ = K</div>
<ul>
  <li>K &gt; 1: <b>Step-up</b> transformer</li>
  <li>K &lt; 1: <b>Step-down</b> transformer</li>
</ul>
<div class="example"><b>Example:</b> Turns ratio 10:1 (N₁:N₂) aur primary voltage 220 V ho toh secondary voltage = 220 / 10 = <b>22 V</b>.</div>

<h3>Losses & Efficiency</h3>
<ul>
  <li><b>Core (iron) losses:</b> hysteresis + eddy current. Ye constant rehte hain.</li>
  <li><b>Copper losses:</b> I²R, load ke saath badhte hain.</li>
</ul>
<div class="formula">Efficiency η = Output power / Input power × 100%<br>Max efficiency tab: Copper loss = Iron loss</div>
<div class="tip"><b>💡 Yaad rakho:</b> Transformer DC par kaam nahi karta kyunki DC se changing flux nahi banta, aur bina changing flux ke EMF induce nahi hota.</div>`
    },
    {
      id: 'threephase',
      title: 'Three-Phase Systems & Motors',
      content: `
<h3>Three-Phase Supply</h3>
<p>Teen voltages, har ek ka phase difference <b>120°</b>. Power generation aur transmission mein yahi use hota hai kyunki ye zyada efficient hai aur power smooth deta hai.</p>

<h3>Star (Y) vs Delta (Δ)</h3>
<table>
  <tr><th>Quantity</th><th>Star connection</th><th>Delta connection</th></tr>
  <tr><td>Line voltage</td><td>V<sub>L</sub> = √3 · V<sub>ph</sub></td><td>V<sub>L</sub> = V<sub>ph</sub></td></tr>
  <tr><td>Line current</td><td>I<sub>L</sub> = I<sub>ph</sub></td><td>I<sub>L</sub> = √3 · I<sub>ph</sub></td></tr>
</table>
<div class="formula">Total 3-phase power: P = √3 · V<sub>L</sub> · I<sub>L</sub> · cos φ</div>

<h3>Induction Motor (basic idea)</h3>
<ul>
  <li>Stator mein <b>rotating magnetic field</b> banti hai, jiski speed <b>synchronous speed</b> N<sub>s</sub> = 120f / P (rpm).</li>
  <li>Rotor kabhi synchronous speed tak nahi pahunchta. Slip s = (N<sub>s</sub> − N) / N<sub>s</sub>.</li>
  <li>Sabse zyada use hone wala industrial motor (simple, sasta, rugged).</li>
</ul>

<h3>DC Motor</h3>
<p>Electrical energy ko mechanical energy mein badalta hai. Torque ka principle: current-carrying conductor magnetic field mein force mehsoos karta hai.</p>
<div class="tip"><b>💡 Yaad rakho:</b> Star mein <b>line voltage = √3 × phase voltage</b>. Ghar ki 230 V phase voltage hai aur industries mein 415 V line voltage milta hai (230 × √3 ≈ 400).</div>`
    }
  ],
  questions: [
    { q: 'According to Ohm\'s law, the current through a resistor is:', options: ['I = V × R', 'I = V / R', 'I = R / V', 'I = V + R'], a: 1, exp: 'V = IR, so I = V/R.' },
    { q: 'Kirchhoff\'s Current Law (KCL) states that:', options: ['Sum of voltages in a loop is zero', 'Sum of currents at a node is zero', 'Power is conserved in a circuit', 'Resistance is constant'], a: 1, exp: 'KCL: the algebraic sum of currents meeting at a node is zero.' },
    { q: 'The RMS value of a sinusoidal voltage with peak value Vm is:', options: ['Vm', 'Vm / 2', 'Vm / √2', '2Vm / π'], a: 2, exp: 'V_rms = Vm/√2 ≈ 0.707 Vm.' },
    { q: 'A transformer works on the principle of:', options: ['Self induction', 'Mutual induction', 'Electrostatic induction', 'Photoelectric effect'], a: 1, exp: 'Changing flux in the primary induces an EMF in the secondary by mutual induction.' },
    { q: 'The power factor of a purely resistive circuit is:', options: ['0', '0.5', '1', 'Infinite'], a: 2, exp: 'Voltage and current are in phase (φ = 0), so cos φ = 1.' },
    { q: 'Three resistors of 2 Ω, 3 Ω and 6 Ω are connected in parallel. The equivalent resistance is:', options: ['11 Ω', '2 Ω', '1 Ω', '0.5 Ω'], a: 2, exp: '1/R = 1/2 + 1/3 + 1/6 = 1, so R = 1 Ω.' },
    { q: 'A transformer has a turns ratio N1:N2 = 10:1 and a primary voltage of 220 V. The secondary voltage is:', options: ['2200 V', '220 V', '22 V', '2.2 V'], a: 2, exp: 'V2 = V1 × (N2/N1) = 220 × (1/10) = 22 V.' },
    { q: 'In a star-connected three-phase system, the relation between line and phase voltage is:', options: ['VL = Vph', 'VL = √3 · Vph', 'VL = Vph / √3', 'VL = 3 · Vph'], a: 1, exp: 'In a star connection, line voltage = √3 times the phase voltage.' }
  ]
},

/* ======================= CHEMISTRY ======================== */
{
  id: 'chem',
  name: 'Engineering Chemistry',
  short: 'Chemistry',
  icon: '⚗',
  color: '#ff3d81',
  tagline: 'Bonding, Energy, Cells & Water',
  topics: [
    {
      id: 'bonding',
      title: 'Chemical Bonding & Molecular Orbital Theory',
      content: `
<h3>Types of Bonds</h3>
<ul>
  <li><b>Ionic:</b> electrons ka transfer (metal + non-metal), jaise NaCl</li>
  <li><b>Covalent:</b> electrons ki sharing (non-metal + non-metal), jaise H₂O, CH₄</li>
  <li><b>Metallic:</b> positive ions aur "sea of electrons"</li>
</ul>

<h3>Molecular Orbital Theory (MOT)</h3>
<p>Do atomic orbitals milkar do molecular orbitals banate hain:</p>
<ul>
  <li><b>Bonding MO (σ, π):</b> kam energy, stability badhata hai</li>
  <li><b>Antibonding MO (σ*, π*):</b> zyada energy, stability ghatata hai</li>
</ul>
<div class="formula">Bond order = (N<sub>b</sub> − N<sub>a</sub>) / 2<br>N<sub>b</sub> = bonding electrons, N<sub>a</sub> = antibonding electrons</div>
<table>
  <tr><th>Molecule</th><th>Bond order</th><th>Magnetic property</th></tr>
  <tr><td>H₂</td><td>1</td><td>Diamagnetic</td></tr>
  <tr><td>N₂</td><td>3</td><td>Diamagnetic</td></tr>
  <tr><td>O₂</td><td>2</td><td><b>Paramagnetic</b> (2 unpaired electrons)</td></tr>
  <tr><td>He₂</td><td>0</td><td>Exist nahi karta</td></tr>
</table>
<div class="tip"><b>💡 Yaad rakho:</b> Bond order jitna zyada, bond utna <b>strong aur chhota</b>. Bond order 0 ka matlab molecule stable nahi banta. O₂ ka paramagnetic hona MOT ki sabse badi success hai (Lewis structure ise explain nahi kar paata).</div>`
    },
    {
      id: 'thermo',
      title: 'Chemical Thermodynamics',
      content: `
<h3>Basic Terms</h3>
<ul>
  <li><b>System:</b> jo hum study kar rahe hain. <b>Surroundings:</b> baaki sab.</li>
  <li><b>State functions:</b> sirf initial aur final state par depend karte hain (U, H, S, G). Heat (q) aur work (w) state functions nahi hain.</li>
</ul>

<h3>First Law (Energy Conservation)</h3>
<div class="formula">ΔU = q + w<br>Enthalpy: H = U + PV, &nbsp; ΔH = ΔU + Δn<sub>g</sub>RT</div>
<ul>
  <li>ΔH &lt; 0: <b>exothermic</b> (garmi nikalti hai)</li>
  <li>ΔH &gt; 0: <b>endothermic</b> (garmi leti hai)</li>
</ul>

<h3>Second Law & Entropy</h3>
<p>Isolated system mein spontaneous process mein <b>entropy (disorder) hamesha badhti hai</b> (ΔS<sub>universe</sub> &gt; 0).</p>

<h3>Gibbs Free Energy</h3>
<div class="formula">ΔG = ΔH − TΔS</div>
<table>
  <tr><th>ΔG</th><th>Process</th></tr>
  <tr><td>&lt; 0</td><td>Spontaneous</td></tr>
  <tr><td>= 0</td><td>Equilibrium</td></tr>
  <tr><td>&gt; 0</td><td>Non-spontaneous</td></tr>
</table>

<h3>Hess's Law</h3>
<p>Reaction ki total enthalpy change sirf initial aur final state par depend karti hai, raste par nahi. Isse unknown ΔH reactions ko jodkar nikaal sakte hain.</p>
<div class="tip"><b>💡 Yaad rakho:</b> ΔH negative aur ΔS positive ho toh reaction <b>hamesha spontaneous</b> hoti hai (kisi bhi temperature par).</div>`
    },
    {
      id: 'electro',
      title: 'Electrochemistry & Batteries',
      content: `
<h3>Electrochemical Cell</h3>
<p>Chemical energy ko electrical energy mein badalne wala device (Galvanic/Voltaic cell).</p>
<ul>
  <li><b>Anode:</b> jahan <b>oxidation</b> hota hai (electrons nikalte hain). Galvanic cell mein negative.</li>
  <li><b>Cathode:</b> jahan <b>reduction</b> hota hai (electrons milte hain). Galvanic cell mein positive.</li>
</ul>
<div class="tip"><b>💡 Yaad rakho: OIL RIG</b> = Oxidation Is Loss, Reduction Is Gain (of electrons). Aur <b>AN OX, RED CAT</b>: Anode-Oxidation, Reduction-Cathode.</div>

<h3>EMF of a Cell</h3>
<div class="formula">E°<sub>cell</sub> = E°<sub>cathode</sub> − E°<sub>anode</sub></div>
<p>Standard Hydrogen Electrode (SHE) ka potential <b>0 V</b> maana gaya hai (reference).</p>

<h3>Nernst Equation</h3>
<div class="formula">E = E° − (0.0591 / n) · log Q &nbsp;&nbsp;(25 °C par)</div>
<p>Ye batata hai ki electrode/cell potential concentration (aur temperature) ke saath kaise badalta hai.</p>

<h3>Batteries</h3>
<ul>
  <li><b>Primary:</b> ek baar use hoti hain (dry cell)</li>
  <li><b>Secondary:</b> recharge ho sakti hain (lead-acid, Li-ion)</li>
  <li><b>Fuel cell:</b> fuel (H₂) aur oxidant (O₂) continuously supply hote hain</li>
</ul>`
    },
    {
      id: 'water',
      title: 'Water Chemistry & Hardness',
      content: `
<h3>Hardness of Water</h3>
<p>Paani mein <b>Ca²⁺ aur Mg²⁺</b> ke salts (bicarbonate, chloride, sulphate) ki wajah se hardness aati hai. Hard water mein sabun jhaag nahi banata aur boilers mein scale jam jaata hai.</p>

<table>
  <tr><th>Type</th><th>Cause</th><th>Removal</th></tr>
  <tr><td>Temporary hardness</td><td>Ca/Mg ke <b>bicarbonates</b></td><td>Boiling se hat jaati hai</td></tr>
  <tr><td>Permanent hardness</td><td>Ca/Mg ke <b>chloride & sulphate</b></td><td>Chemical treatment chahiye</td></tr>
</table>
<p>Hardness ko <b>ppm of CaCO₃</b> equivalent mein express karte hain.</p>

<h3>Water Softening Methods</h3>
<ul>
  <li><b>Lime-Soda process:</b> lime Ca(OH)₂ aur soda Na₂CO₃ milake Ca/Mg ko precipitate karte hain.</li>
  <li><b>Zeolite (Permutit) process:</b> sodium zeolite Ca²⁺/Mg²⁺ ko Na⁺ se exchange karta hai.</li>
  <li><b>Ion-exchange process:</b> cation aur anion resins se demineralized (DM) water milta hai.</li>
</ul>

<h3>Boiler Problems</h3>
<ul>
  <li><b>Scale & sludge:</b> heat transfer ghatata hai, fuel waste hota hai</li>
  <li><b>Caustic embrittlement:</b> boiler plates mein cracks</li>
  <li><b>Priming & foaming:</b> boiler se wet steam nikalna</li>
</ul>
<div class="tip"><b>💡 Yaad rakho:</b> Temporary hardness = boiling se door. Permanent hardness ke liye lime-soda ya zeolite chahiye.</div>`
    }
  ],
  questions: [
    { q: 'The bond order of the O₂ molecule (by MO theory) is:', options: ['1', '2', '3', '2.5'], a: 1, exp: 'O₂ has 10 bonding and 6 antibonding electrons, so bond order = (10 − 6)/2 = 2.' },
    { q: 'The first law of thermodynamics is expressed as:', options: ['ΔU = q + w', 'ΔG = ΔH − TΔS', 'ΔS = q/T', 'PV = nRT'], a: 0, exp: 'Change in internal energy equals heat absorbed plus work done on the system.' },
    { q: 'The Gibbs free energy change is given by:', options: ['ΔG = ΔH + TΔS', 'ΔG = ΔH − TΔS', 'ΔG = TΔS − ΔU', 'ΔG = ΔH × ΔS'], a: 1, exp: 'ΔG = ΔH − TΔS. A negative ΔG means the process is spontaneous.' },
    { q: 'The standard electrode potential of the Standard Hydrogen Electrode (SHE) is:', options: ['1.00 V', '−1.00 V', '0.00 V', '0.76 V'], a: 2, exp: 'SHE is the reference electrode and its potential is defined as 0.00 V.' },
    { q: 'Hardness of water is mainly caused by the salts of:', options: ['Na⁺ and K⁺', 'Ca²⁺ and Mg²⁺', 'Fe²⁺ and Zn²⁺', 'Cl⁻ and Br⁻'], a: 1, exp: 'Dissolved calcium and magnesium salts cause water hardness.' },
    { q: 'The Nernst equation relates the electrode potential to:', options: ['Pressure only', 'Concentration of ions', 'Colour of the solution', 'Size of the electrode'], a: 1, exp: 'It shows how cell potential changes with the concentration (reaction quotient) of species.' },
    { q: 'Hardness of water is commonly expressed in terms of:', options: ['ppm of CaCO₃', 'ppm of NaCl', 'Percent of Mg', 'Molarity of H⁺'], a: 0, exp: 'All hardness-causing salts are converted into equivalent CaCO₃ and expressed in ppm.' },
    { q: 'In an electrochemical (galvanic) cell, oxidation takes place at the:', options: ['Cathode', 'Anode', 'Salt bridge', 'Electrolyte'], a: 1, exp: 'Oxidation always occurs at the anode (AN OX) and reduction at the cathode (RED CAT).' }
  ]
}

];