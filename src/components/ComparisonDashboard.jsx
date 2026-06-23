import React from 'react';
import { HelpCircle, CheckCircle, XCircle, Award, Cpu, Settings, Code, Layers } from 'lucide-react';

export const ComparisonDashboard = () => {
  return (
    <div className="comparison-dashboard">
      <div className="demo-header-info">
        <span className="badge badge-comparison">Technical Analysis</span>
        <h2>State Management comparison</h2>
        <p className="demo-description">
          A deep dive comparison of React state sharing methods. Analyze the architectural trade-offs, performance impacts, and best use cases for each.
        </p>
      </div>

      {/* Interactive Visual Diagram Section */}
      <div className="dashboard-section card-glass">
        <h3><Layers size={18} className="title-icon" /> Data Flow Visualizations</h3>
        <p className="section-desc">
          Hover over components to see how state updates propagate. Glowing paths represent the route taken by data changes.
        </p>

        <div className="diagram-grid">
          {/* Prop Drilling Diagram */}
          <div className="diagram-column">
            <h4>Prop Drilling</h4>
            <span className="diagram-subtitle">Linear Chain Propagation</span>
            <div className="flow-tree">
              <div className="flow-node root-node active-flow">Root State (Owner)</div>
              <div className="flow-arrow active-arrow">↓ props</div>
              <div className="flow-node intermediate-node active-flow">Parent (Level 1)</div>
              <div className="flow-arrow active-arrow">↓ props</div>
              <div className="flow-node intermediate-node active-flow">Child (Level 2)</div>
              <div className="flow-arrow active-arrow">↓ props</div>
              <div className="flow-node intermediate-node active-flow">Grandchild (Level 3)</div>
              <div className="flow-arrow active-arrow">↓ props</div>
              <div className="flow-node consumer-node active-flow">Deep Child (Consumer)</div>
            </div>
            <div className="diagram-caption text-red">
              ✗ Every single component in the chain must re-render to pass down state updates.
            </div>
          </div>

          {/* Context API Diagram */}
          <div className="diagram-column">
            <h4>Context API</h4>
            <span className="diagram-subtitle">Provider & Consumer Broadcast</span>
            <div className="flow-tree">
              <div className="flow-node provider-node active-flow">Context Provider</div>
              <div className="flow-arrow bypass-arrow">↓ (bypasses props)</div>
              <div className="flow-node intermediate-node bypassed-node">Parent (Level 1)</div>
              <div className="flow-arrow bypass-arrow">↓ (bypasses props)</div>
              <div className="flow-node intermediate-node bypassed-node">Child (Level 2)</div>
              <div className="flow-arrow bypass-arrow">↓ (bypasses props)</div>
              <div className="flow-node intermediate-node bypassed-node">Grandchild (Level 3)</div>
              <div className="flow-arrow bypass-arrow">↓ (bypasses props)</div>
              <div className="flow-node consumer-node active-flow">Deep Child (Consumer)</div>
              
              {/* Direct connection path */}
              <div className="glow-path context-path"></div>
            </div>
            <div className="diagram-caption text-green">
              ✓ Intermediate layers bypassed. They do not receive props or re-render (with proper provider layout).
            </div>
          </div>

          {/* Redux Toolkit Diagram */}
          <div className="diagram-column">
            <h4>Redux Toolkit</h4>
            <span className="diagram-subtitle">Central Store Subscriptions</span>
            <div className="flow-tree redux-tree-layout">
              {/* Floating Store */}
              <div className="store-container">
                <div className="flow-node store-node">Redux Global Store</div>
              </div>
              
              <div className="flow-node intermediate-node bypassed-node">Parent (Level 1)</div>
              <div className="flow-node intermediate-node bypassed-node">Child (Level 2)</div>
              <div className="flow-node intermediate-node bypassed-node">Grandchild (Level 3)</div>
              <div className="flow-node consumer-node active-flow">Deep Child (Subscriber)</div>

              <div className="glow-path redux-path-action"></div>
              <div className="glow-path redux-path-select"></div>
            </div>
            <div className="diagram-caption text-green">
              ✓ Bypasses react tree entirely. Selectors hook directly to the store; only subscribers re-render.
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Matrix Table */}
      <div className="dashboard-section card-glass">
        <h3><Cpu size={18} className="title-icon" /> Comparison Matrix</h3>
        <div className="table-responsive">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th>Prop Drilling</th>
                <th>React Context API</th>
                <th>Redux Toolkit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="feature-title">Setup Complexity</td>
                <td className="lvl-easy">Very Low (Zero setup)</td>
                <td className="lvl-medium">Medium (Provider/Hooks)</td>
                <td className="lvl-hard">High (Slices/Store/Provider)</td>
              </tr>
              <tr>
                <td className="feature-title">Code Boilerplate</td>
                <td className="lvl-hard">High (Drilled parameters)</td>
                <td className="lvl-easy">Low</td>
                <td className="lvl-medium">Medium</td>
              </tr>
              <tr>
                <td className="feature-title">Performance (Renders)</td>
                <td className="lvl-hard">Poor (Cascades down)</td>
                <td className="lvl-medium">Moderate (Re-renders consumers)</td>
                <td className="lvl-easy">Excellent (Precise updates)</td>
              </tr>
              <tr>
                <td className="feature-title">Scalability</td>
                <td className="lvl-hard">Unscalable</td>
                <td className="lvl-medium">Medium (Context-per-concern)</td>
                <td className="lvl-easy">Outstanding (Global state)</td>
              </tr>
              <tr>
                <td className="feature-title">Debugging & DevTools</td>
                <td className="lvl-medium">Basic console logs</td>
                <td className="lvl-medium">React DevTools context view</td>
                <td className="lvl-easy">Redux DevTools (Time Travel)</td>
              </tr>
              <tr>
                <td className="feature-title">Ideal for...</td>
                <td>Tiny apps or local siblings</td>
                <td>Low-frequency configurations</td>
                <td>Large, complex dynamic systems</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* The Selector & Rerender Deep Dive */}
      <div className="dashboard-section card-glass">
        <h3><HelpCircle size={18} className="title-icon" /> 🔬 The Selector Problem: Partial Subscriptions</h3>
        <p className="section-desc">
          While both Context (with children optimization) and Redux bypass intermediate nodes, they differ fundamentally when it comes to **partial state subscriptions**. Here is a comparison of what happens when a component only needs a single property (e.g. <code>theme</code>) and an unrelated property (e.g. <code>name</code>) changes.
        </p>

        <div className="selector-deep-dive">
          {/* Context Column */}
          <div className="deep-dive-card context-bg">
            <div className="card-header border-context">
              <h4>React Context Consumer</h4>
            </div>
            <div className="deep-dive-body">
              <pre className="code-box">
{`// Component reads only the theme property
const ThemeDisplay = () => {
  const { user } = useUserContext(); // Entire object consumed
  return <div className={user.theme}>Mode</div>;
};`}
              </pre>
              <div className="deep-dive-flow">
                <span className="flow-step">1. User updates <code>name</code> in editor</span>
                <span className="flow-step">2. <code>UserProvider</code> state object is updated</span>
                <span className="flow-step font-red">3. Context value object reference changes ⚠️</span>
                <span className="flow-step font-red">4. <code>ThemeDisplay</code> is forced to re-render, despite not using name! ✗</span>
              </div>
              <p className="deep-dive-explanation">
                <strong>Why?</strong> Context does not support selectors. Since the provider passes a combined state object, any change to <em>any</em> property creates a new object reference, triggering all consumers of that context.
              </p>
            </div>
          </div>

          {/* Redux Column */}
          <div className="deep-dive-card redux-bg">
            <div className="card-header border-redux">
              <h4>Redux Selector Subscriber</h4>
            </div>
            <div className="deep-dive-body">
              <pre className="code-box">
{`// Component selects ONLY the theme property
const ThemeDisplay = () => {
  const theme = useSelector((state) => state.user.theme);
  return <div className={theme}>Mode</div>;
};`}
              </pre>
              <div className="deep-dive-flow">
                <span className="flow-step">1. User updates <code>name</code> in editor</span>
                <span className="flow-step">2. Store dispatch triggers reducer updates</span>
                <span className="flow-step font-green">3. Redux runs selector and checks if theme changed 🔍</span>
                <span className="flow-step font-green">4. <code>ThemeDisplay</code> skips re-rendering! ✓</span>
              </div>
              <p className="deep-dive-explanation">
                <strong>Why?</strong> The <code>useSelector</code> hook runs a strict equality check (<code>===</code>) on the returned value. Since <code>theme</code> did not change, Redux intercepts the update and prevents the component from rendering.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Analysis Cards */}
      <div className="comparison-grid">
        {/* Prop Drilling Card */}
        <div className="card-glass analysis-card">
          <div className="card-header border-drilling">
            <h4>Traditional Prop Drilling</h4>
          </div>
          <div className="analysis-body">
            <div className="analysis-section">
              <h5><CheckCircle size={14} className="icon-green" /> Advantages</h5>
              <ul>
                <li>No external libraries or additional React files.</li>
                <li>Data flow is explicit and traceable through codebase imports/calls.</li>
                <li>Perfect for passing data down a single level.</li>
              </ul>
            </div>
            <div className="analysis-section">
              <h5><XCircle size={14} className="icon-red" /> Disadvantages</h5>
              <ul>
                <li>Bloats intermediate components with irrelevant code and props.</li>
                <li>Refactoring component hierarchies becomes extremely tedious.</li>
                <li>Triggers component re-renders down the entire path, degrading performance.</li>
              </ul>
            </div>
            <div className="use-case-box">
              <strong>Real-World Example:</strong> Passing an <code>onClose</code> function or a local active state from a Modal container to its Header component.
            </div>
          </div>
        </div>

        {/* Context API Card */}
        <div className="card-glass analysis-card">
          <div className="card-header border-context">
            <h4>React Context API</h4>
          </div>
          <div className="analysis-body">
            <div className="analysis-section">
              <h5><CheckCircle size={14} className="icon-green" /> Advantages</h5>
              <ul>
                <li>Native to React (no npm install needed).</li>
                <li>Cleans up components by eliminating passthrough props.</li>
                <li>Simple design pattern for configuration/theming.</li>
              </ul>
            </div>
            <div className="analysis-section">
              <h5><XCircle size={14} className="icon-red" /> Disadvantages</h5>
              <ul>
                <li>When the context value object changes, **all** consumer components re-render.</li>
                <li>Not optimized for high-frequency state changes (e.g. keypresses, mouse drags).</li>
                <li>Combining multiple contexts can lead to "provider hell" nesting.</li>
              </ul>
            </div>
            <div className="use-case-box">
              <strong>Real-World Example:</strong> Sharing Theme mode (light/dark), User Locale (Language), or Authenticated user profile data.
            </div>
          </div>
        </div>

        {/* Redux Toolkit Card */}
        <div className="card-glass analysis-card">
          <div className="card-header border-redux">
            <h4>Redux Toolkit</h4>
          </div>
          <div className="analysis-body">
            <div className="analysis-section">
              <h5><CheckCircle size={14} className="icon-green" /> Advantages</h5>
              <ul>
                <li>Highly optimized - components only re-render if their selected state changes.</li>
                <li>Redux DevTools offer outstanding state inspection and action history.</li>
                <li>Decoupled business logic inside slices makes code testable and organized.</li>
              </ul>
            </div>
            <div className="analysis-section">
              <h5><XCircle size={14} className="icon-red" /> Disadvantages</h5>
              <ul>
                <li>Requires importing external packages and adding setup code.</li>
                <li>Higher learning curve to understand Actions, Reducers, and Store concepts.</li>
                <li>Overkill for simple projects with low global state complexity.</li>
              </ul>
            </div>
            <div className="use-case-box">
              <strong>Real-World Example:</strong> E-commerce shopping cart, application notifications system, or multi-step form wizard data.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonDashboard;
