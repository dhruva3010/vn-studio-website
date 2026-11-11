import type { ReactNode } from "react";
import { PROJECT_URL } from "../data/content";
import { Callout, CodeBlock, DocFigure, DocSteps, DocTable } from "./components";

export type DocumentationGroup = "Getting started" | "Authoring" | "Production" | "Publishing & reference";

export type DocumentationSection = {
  id: string;
  group: DocumentationGroup;
  title: string;
  summary: string;
  keywords: string;
  content: ReactNode;
};

const section = (
  id: string,
  group: DocumentationGroup,
  title: string,
  summary: string,
  keywords: string,
  children: ReactNode
): DocumentationSection => ({
  id,
  group,
  title,
  summary,
  keywords,
  content: children
});

export const documentationGroups: DocumentationGroup[] = ["Getting started", "Authoring", "Production", "Publishing & reference"];

export const documentationSections: DocumentationSection[] = [
  section(
    "overview",
    "Getting started",
    "Welcome to VN Studio",
    "A native Godot workspace for visually authoring and publishing 2D visual novels, from the first scene to a playable Windows or browser game.",
    "introduction features godot local first no code visual novel requirements",
    <>
      <p>VN Studio brings scene composition, dialogue, branching choices, story variables, character animation, audio, encounters, previewing, and publishing into one visual application. You do not need to write scripts to build a story, and you do not need an account or cloud service to author one.</p>
      <div className="doc-feature-grid">
        <article><strong>Visual authoring</strong><p>Build scenes, routes, rules, and animation with inspectors, cards, and timelines.</p></article>
        <article><strong>Local-first</strong><p>Keep editable projects and player saves on your machine. No telemetry is required.</p></article>
        <article><strong>Shared player</strong><p>Preview with the same runtime used by your published game, not a separate approximation.</p></article>
        <article><strong>Two export targets</strong><p>Create standalone Windows games or browser-ready Web exports.</p></article>
      </div>
      <h3>What you need</h3>
      <ul>
        <li>A Windows authoring machine.</li>
        <li>Godot 4.7.2 Standard, either installed by VN Studio's setup script or available in your own Godot installation.</li>
        <li>Your artwork, audio, and story ideas. Original sample projects are included so you can explore before importing anything.</li>
      </ul>
      <Callout title="Start with The Last Light" tone="tip">
        <p>The bundled sample is the quickest way to learn the workspace. It includes scenes, characters, dialogue, choices, audio, and a complete playable route. Later samples explore variables, animation, encounters, and RPG systems.</p>
      </Callout>
      <h3>What VN Studio is—and is not</h3>
      <p>VN Studio is an actively developed personal game framework focused on 2D narrative games. It supports connected story-flow graphs, layered 2D characters, native cutout rigs, visual combat, and verified exports. Collaboration and an asset marketplace are outside its current scope. General-purpose drag-and-drop UI composition, tactical grids, third-party rig formats, and 3D stage placement remain limitations or future work.</p>
    </>
  ),
  section(
    "installation",
    "Getting started",
    "Install and launch",
    "Set up the pinned Godot toolchain, open the studio, and choose between the normal application and Godot's development editor.",
    "download setup godot run windows install launch setup-godot powershell",
    <>
      <h3>1. Set up Godot on a fresh checkout</h3>
      <p>Open PowerShell in the VN Studio source folder and run the setup script. It installs the portable Godot 4.7.2 Standard engine into the project's ignored <code>.tools/godot</code> directory.</p>
      <CodeBlock code=".\scripts\setup-godot.ps1" />
      <p>If you already have Godot 4.7.2, you can instead open <code>project.godot</code> in your installation. Open <code>main.tscn</code> and press <kbd>F6</kbd> to run the main scene.</p>
      <h3>2. Launch VN Studio</h3>
      <p>Double-click <strong>Launch VN Studio.cmd</strong> in Explorer, or start the application from PowerShell:</p>
      <CodeBlock code=".\scripts\run.ps1" />
      <p>To open the source project in Godot's development editor rather than the normal authoring application, use:</p>
      <CodeBlock code=".\scripts\run.ps1 -Editor" />
      <Callout title="No application runtime dependencies">
        <p>The finished application does not require Python or Node.js to run. Those tools are only used by selected development and verification workflows. The portable toolchain, Godot import cache, and development application data stay in ignored <code>.tools</code> and <code>.godot</code> folders.</p>
      </Callout>
      <h3>3. Choose a starting project</h3>
      <p>Use <strong>Project → New project</strong> for a blank story, or explore one of the bundled samples from the Project menu. <strong>The Last Light</strong> is the recommended first project. Other samples cover story state, discoveries, animation, combat, and persistent RPG progression.</p>
      <DocTable
        headers={["Action", "Command or location"]}
        rows={[
          ["Set up portable Godot", <code>.\scripts\setup-godot.ps1</code>],
          ["Run the studio", <code>.\scripts\run.ps1</code>],
          ["Open the development editor", <code>.\scripts\run.ps1 -Editor</code>],
          ["Prepare Windows export", <code>.\scripts\setup-export.ps1</code>],
          ["Prepare Web export", <code>.\scripts\setup-export.ps1 -Target Web</code>]
        ]}
      />
    </>
  ),
  section(
    "first-story",
    "Getting started",
    "Create your first story",
    "Follow the complete authoring loop: create scenes, add characters and dialogue, connect choices, preview, save, and publish.",
    "beginner tutorial first project scene dialogue choices save play publish",
    <>
      <DocSteps items={[
        { title: "Create or open a project", text: <>Explore <strong>The Last Light</strong>, or choose <strong>Project → New project</strong>. Keep each project in its own folder.</> },
        { title: "Add a scene", text: <>Use <strong>＋</strong> in the scene sidebar. Under <strong>Scene settings</strong>, give the scene a clear title and import a background.</> },
        { title: "Import a character", text: <>Choose <strong>Import character</strong>. PNG, WebP, JPG, and SVG artwork are supported. Transparent PNG or WebP is usually best for character sprites.</> },
        { title: "Place and direct the actor", text: <>Drag the character tile onto the canvas or choose <strong>Place in this scene</strong>. Drag the actor into position, then adjust scale, expression, orientation, and draw order.</> },
        { title: "Write dialogue", text: <>Open the <strong>Dialogue</strong> tab and add lines. Select a line to set its speaker, expression, and text. Enter inserts a newline in the multiline editor.</> },
        { title: "Add meaningful choices", text: <>Open <strong>Choices</strong>, add player options, and select a destination scene for each. Without choices, the Scene tab's continuation determines what happens next.</> },
        { title: "Play the story", text: <>Choose <strong>Play story</strong> to start at the designated starting scene, or <strong>Preview scene</strong> to test only the current scene. Space or Enter reveals and then advances dialogue.</> },
        { title: "Save the project", text: <>Press <kbd>Ctrl</kbd> + <kbd>S</kbd> and save a <code>.vn.json</code> file. Keep its adjacent assets folder with it. Save As copies imported artwork into the new destination.</> },
        { title: "Publish when ready", text: <>Choose <strong>Publish</strong> and select Windows or Web. Share the entire generated output, not just the executable or HTML file.</> }
      ]} />
      <Callout title="Fields commit before you play or save" tone="tip">
        <p>Inspector fields commit when you leave them, press Enter in a single-line field, save, or start preview. This makes the preview and saved document consistent. Text controls keep their native text undo; toolbar Undo and Redo operate on committed project edits.</p>
      </Callout>
      <DocFigure src="./images/editor.png" alt="VN Studio scene editor with a character, dialogue lines, scene list, and inspector" caption="The scene editor brings writing, staging, and contextual settings into one workspace." />
    </>
  ),
  section(
    "workspace",
    "Authoring",
    "Workspace and scenes",
    "Understand the authoring shell, scene settings, continuation rules, dialogue design, and the way edits are committed.",
    "interface editor sidebar canvas inspector scene settings continuation undo redo",
    <>
      <h3>The authoring shell</h3>
      <DocTable
        headers={["Area", "What you use it for"]}
        rows={[
          ["Scene sidebar", "Create, search, duplicate, delete, and navigate scenes. Identify the starting scene and chapter membership."],
          ["Character library", "Import characters, edit expressions and appearances, and drag character tiles onto the stage."],
          ["Scene canvas", "Position actors, inspect the composed scene, and preview dialogue and choices in context."],
          ["Dialogue, Choices, Scene tabs", "Write the scene, author routes, and configure continuation, presentation, audio, and animation."],
          ["Inspector", "Edit the selected line, actor, choice, or setting with controls appropriate to that object."],
          ["Top toolbar", "Save, undo, redo, preview, play, and publish the current project."]
        ]}
      />
      <h3>Scene flow</h3>
      <p>One scene is designated as the story's starting point. A scene can end in player choices, a direct continuation, a substory call, an encounter, or an ending. If every choice is hidden by conditions, the scene needs an unconditional choice or a fallback continuation. Missing required destinations are reported before preview or publishing.</p>
      <h3>Design the dialogue presentation</h3>
      <p>Open <strong>Project → Design dialogue UI…</strong> to choose Classic, Paper, or Midnight, reposition and resize the dialogue panel, adjust typography and colors, and test long text. Scene-specific designs override the project design until you choose <strong>Use project design</strong>. A theme library stores up to 32 independent designs.</p>
      <p><strong>Project → Choice layout…</strong> controls docking, responsive columns, button spacing, typography, colors, padding, and focus presentation. Preview buttons only sample the design; the player still presents eligible choices in story order.</p>
      <Callout title="Design changes and save compatibility">
        <p>Dialogue design changes can change the content revision and invalidate older player saves. Choice-layout and unused theme-library edits are authoring-only and preserve existing playthrough saves. Keep a separate project copy before major presentation revisions if players already have saves.</p>
      </Callout>
      <h3>Undo boundaries</h3>
      <p>Complex editors use copied drafts. Nested actions such as <strong>Use changes</strong> return a draft to the parent editor; the outer <strong>Apply</strong> commits the complete change as one Undo step. Cancel discards only the current level's uncommitted edits.</p>
    </>
  ),
  section(
    "characters",
    "Authoring",
    "Characters and staging",
    "Compose expressive 2D actors with layers, outfits, masks, pivots, portrait crops, scene tints, props, and reusable stage compositions.",
    "characters artwork layers expressions outfits props stage composition png webp svg mask",
    <>
      <h3>Build a character from layers</h3>
      <p>Select a character and open <strong>Edit appearance layers…</strong>. The base expression sits beneath transparent overlays for clothing, facial details, or accessories. Layers are ordered frontmost first and can be shown, hidden, reordered, or removed. Expression-specific images override the default layer only for that expression.</p>
      <ul>
        <li>Prepare every overlay on the same transparent canvas as the base expression, with matching dimensions and alignment.</li>
        <li>A character supports up to 16 overlays on canvases up to 4096 × 4096 pixels.</li>
        <li>Layer transforms support offsets, scaling, flipping, and alpha masks. Masked canvases are limited to 1,048,576 pixels.</li>
        <li>Save As, recovery, preview, and publishing include the layers required by the project.</li>
      </ul>
      <h3>Scene appearance and reusable outfits</h3>
      <p><strong>Scene appearance…</strong> lets an actor inherit library visibility, explicitly show a layer, or hide it in one scene. Scene tint and opacity affect the composed actor without changing the source artwork. Outfit presets capture visibility choices for reuse; applying a preset copies its settings, so later preset edits do not alter existing actors.</p>
      <h3>Framing and placement</h3>
      <p>Actor pivots anchor placement and animation. Portrait crops change library thumbnails and combat portraits without cropping full-body stage artwork. On the canvas, set position, size, expression, flip, and draw order. <strong>Arrange characters…</strong> adds alignment, distribution, grid snapping, and non-nested actor groups.</p>
      <h3>Props and reusable stages</h3>
      <p>Import static image props through <strong>Scene settings → Props & compositions…</strong>. Props can sit behind or in front of characters, with independent position, height, pivot, flip, tint, opacity, and ordering. A scene supports up to 64 props.</p>
      <p>The scene composition library stores a background, actors, props, and camera movement as an independent template. <strong>Use copy · replace stage</strong> deliberately replaces the current stage while preserving dialogue, routes, variables, and combat. Existing copies never change when you later edit the template.</p>
      <Callout title="SVG artwork is rasterized" tone="warning">
        <p>Publishing converts artwork to PNG. SVG assets use their imported raster resolution, so prepare them at a size that will remain sharp in the finished game.</p>
      </Callout>
    </>
  ),
  section(
    "dialogue",
    "Authoring",
    "Dialogue, choices, and localization",
    "Write static or dynamic dialogue, compose conditional choice labels, translate content, and connect every option to the correct destination.",
    "dialogue choices dynamic text composer translation language conditional labels variables",
    <>
      <h3>Write and arrange dialogue</h3>
      <p>Each line has a speaker, expression, and multiline text. Add, duplicate, reorder, or delete lines in the Dialogue tab. Long passages scroll inside the player's dialogue panel rather than being silently truncated. Dialogue sound cues, voice-over, visual timelines, and animation cues attach to the selected line.</p>
      <h3>Compose dynamic text</h3>
      <p>Choose <strong>Compose dialogue…</strong> to combine literal text with story-variable inserts and conditional text. Place the cursor where a value belongs, select the variable, and insert it. The live preview can use temporary test values without changing the story's defaults.</p>
      <p>Values support prefixes, suffixes, digit padding, locale-aware grouping, and custom labels for flags. Conditional parts can include RPG values and visible fallbacks. The composer supports up to 64 parts and 50,000 characters per line.</p>
      <h3>Build choices</h3>
      <p>Every choice has a label, destination, optional visibility conditions, and optional ordered effects. <strong>Compose choice…</strong> supports the same dynamic inserts as dialogue. Keep a visible fallback label when a composed label could become blank. Validation rejects blank labels, missing destinations, missing variables, and incompatible types.</p>
      <DocTable
        headers={["Rule hook", "When it runs"]}
        rows={[
          ["Show when…", "Evaluated with current story and RPG values to decide whether the player sees the choice."],
          ["When selected…", "Runs once after selection and before entering the destination scene."],
          ["Scene On enter…", "Runs after incoming choice or combat effects and before destination dialogue, choices, or combat."],
          ["Encounter outcome changes", "Runs once for the completed outcome before entering its destination."]
        ]}
      />
      <h3>Translate a project</h3>
      <p>Open <strong>Project → Translation catalog…</strong> to add languages and translate literal dialogue and choices beside the source text. Blank fields inherit the original. Export a versioned JSON file for translators, then import it after checking the project, source text, and stable row IDs.</p>
      <ul>
        <li>Projects support up to 16 languages and a 4 MiB catalog.</li>
        <li>Import files are limited to 2 MiB and 4,096 rows.</li>
        <li>Dynamic text still evaluates its authored parts and formatting.</li>
        <li>Players choose a language through Playback; that preference is local to the story.</li>
      </ul>
    </>
  ),
  section(
    "story-logic",
    "Authoring",
    "Variables and story logic",
    "Track numbers, flags, and text with scoped variables, nested conditions, ordered actions, scene-entry effects, and testable checkpoints.",
    "variables flags numbers text conditions nested rules actions trust entry effects checkpoints inspector",
    <>
      <h3>Create story variables</h3>
      <p>Open <strong>Project → Story variables…</strong> to define Number, Flag, or Text values. Renaming preserves their connections. A referenced variable cannot be deleted until its rules and text inserts are removed.</p>
      <DocTable
        headers={["Scope", "Lifetime and visibility"]}
        rows={[
          ["Project", "Available throughout the story and preserved across chapters and substory calls."],
          ["Chapter", "Visible in scenes assigned to that chapter and retained when the player leaves and returns."],
          ["Main story local", "Available for the current main playthrough; substories receive separate local state."],
          ["Substory local", "Starts fresh for each Call and disappears when that invocation Returns."]
        ]}
      />
      <h3>Conditions and ordered actions</h3>
      <p>Simple rules use fixed typed comparisons rather than executable formulas. Advanced condition editors group <strong>All</strong>, <strong>Any</strong>, and <strong>Not</strong> around variable and RPG-value comparisons. Ordered action lists support Set, Add, Append, rewards, and nested If actions. An If can read changes made earlier in the same sequence; a failed action rolls back the entire sequence.</p>
      <Callout title="Always author a reachable fallback" tone="tip">
        <p>Conditions observe current values, not starting defaults. Test routes where every guarded choice is hidden. Add an unconditional choice or a scene fallback so the story cannot strand the player.</p>
      </Callout>
      <h3>Scene-entry changes and once-only rewards</h3>
      <p>Scene <strong>On enter</strong> actions can update values whenever a scene begins. Conditions and repeat behavior can limit them to specific routes or a single award. Reusing a flag across scenes shares that reward gate. Back, save/load, and rollback restore the marker together with the awarded values so rewards are not replayed accidentally.</p>
      <h3>Inspect and test a playthrough</h3>
      <p>During preview, the Inspector shows current values, every choice's eligibility, and the retained navigation trace. Test checkpoints capture up to 12 named positions. You can edit story values in a checkpoint draft and restore it without changing the authored defaults or overwriting the live checkpoint. Preview-only checkpoints disappear when the preview closes and never enter published games.</p>
    </>
  ),
  section(
    "story-flow",
    "Authoring",
    "Story flow, chapters, and substories",
    "Navigate the complete narrative graph, organize large projects, and reuse bounded substories with independent local state.",
    "story graph chapters substories call return routes visual flow connections nodes",
    <>
      <DocFigure src="./images/story-graph.png" alt="VN Studio story-flow graph with branching scene cards and connected routes" caption="Story flow shows every authored route, including conditional choices and fallbacks." />
      <h3>Work on the graph</h3>
      <p>Open <strong>Story flow ↗</strong> or <strong>Project → Story flow…</strong>. Each scene card exposes incoming and outgoing ports. Drag cards to arrange the map, box-select cards to move them together, or drag a route's right-hand port to another scene's left-hand port to replace its destination.</p>
      <ul>
        <li>Amber routes represent choices, mint routes represent continuations, and violet routes represent combat outcomes.</li>
        <li>A diamond marks a conditional choice. Hover a route for condition counts and the full label.</li>
        <li>Auto arrange organizes the visible graph from the starting scene. Fit story, Focus start, zoom, and the optional minimap help with larger maps.</li>
        <li>Moving cards does not change execution or invalidate saves. Reconnecting a route changes story content.</li>
      </ul>
      <h3>Organize with chapters</h3>
      <p><strong>Project → Chapters…</strong> creates and orders chapters and assigns scenes in one draft. Filter the sidebar or graph by chapter, search titles and dialogue, and keep chapter-scoped variables close to the content that uses them. Connections outside the current filter remain visible as route markers.</p>
      <h3>Reuse substories</h3>
      <p>A substory begins at an entry scene and ends through a Return route. A caller scene chooses <strong>Call substory</strong>, selects the target, and chooses where the main story resumes after Return. Substories can call other substories, but validation reports recursion, invalid owners, and definite silent loops.</p>
      <p>The Return uses the active caller, so it has no fixed destination edge. Project values, chapter values, and RPG inventory persist across the call; the substory's local values belong only to that invocation. Back and save/load restore active call frames, including inside encounters.</p>
      <Callout title="The graph is an editing map, not a proof of reachability">
        <p>Story flow displays all authored routes, even choices hidden by current values. Use preview and the Inspector to test actual playthrough reachability and conditional behavior.</p>
      </Callout>
    </>
  ),
  section(
    "motion",
    "Production",
    "Animation and audio",
    "Direct entrances, exits, character and camera tracks, sprite clips, native rigs, facial animation, dialogue cues, music, ambience, and voice-over.",
    "animation keyframes camera sprites cutout rig blink mouth audio music ambience voice crossfade motion",
    <>
      <h3>Scene and character transitions</h3>
      <p>Scene timing supports cuts and configurable fades. Character entrances and exits use visual timing strips with delay, duration, easing, displacement, and opacity. Entrances settle at the placed pose; exits finish before the destination appears. Reduced motion, skip, instant text, Back, and loading settle presentation without replaying story effects or sounds.</p>
      <h3>Character and camera keyframes</h3>
      <p>Select an actor's <strong>Keyframe animation…</strong> to pose position, size, and opacity over time. <strong>Scene settings → Animate camera…</strong> adds pan and zoom while dialogue stays fixed. Tracks support 2–8 keyframes over 0.1–10 seconds, per-interval easing, Hold steps, and optional loops. The animation library stores up to 32 reusable character and camera templates.</p>
      <h3>Sprite clips and native cutout rigs</h3>
      <p>Import naturally ordered image sequences or slice equal-cell sprite sheets into clips. Each character supports 16 clips with up to 128 frames. Layer visibility, tint, flips, and actor movement continue to compose over the selected clip.</p>
      <p>The native cutout rig editor binds artwork layers to a bone hierarchy and animates translation, rotation, and scale. Its data-only format supports 24 bones, eight hierarchy levels, 16 clips, and 2–16 frames per clip. Spine, Live2D, weighted meshes, and inverse kinematics are not supported.</p>
      <h3>Dialogue-timed motion and facial animation</h3>
      <p>Animation cues can keep, restart, or stop each actor and camera track when a line appears. Visual timelines add expression changes, sprite or rig playback, and sound events at exact times. Separate eye and mouth layers provide deterministic blinking and text-driven speaking mouths; this is not phoneme lip-sync or speech recognition.</p>
      <DocFigure src="./images/motion-cue-editor.png" alt="Dialogue animation cue editor with character and camera tracks" caption="Dialogue cues coordinate existing actor and camera tracks without scripts." />
      <h3>Music, ambience, sound effects, and voice</h3>
      <p>Scene music and ambience accept WAV, Ogg Vorbis, and MP3 files up to 32 MB per import. Tracks loop, continue across matching scenes, and crossfade independently. Line sound cues and voice-over start with dialogue; Auto can wait for both reading time and audible voice. The audio timeline combines scene beds, voice, and timed effects in one editable mix.</p>
      <Callout title="Presentation time is not story state" tone="tip">
        <p>Animation clocks and audio fade progress are not saved as narrative progress. Saves reconstruct the scene, while Back, loading, panels, and reduced motion settle visuals without replaying one-shot sounds or changing variables.</p>
      </Callout>
    </>
  ),
  section(
    "preview",
    "Production",
    "Preview, saves, and accessibility",
    "Test with the real player, explore alternate routes, preserve progress safely, and configure readable, remappable, reduced-motion playback.",
    "preview player saves rollback history controls keyboard controller reduced motion playback accessibility",
    <>
      <DocFigure src="./images/play-preview.png" alt="The Last Light playable preview with character artwork and two choices" caption="The preview uses the same player as published games." />
      <h3>Embedded or separate preview</h3>
      <p><strong>Play story</strong> starts from the beginning; <strong>Preview scene</strong> starts at the current scene. <strong>Project → Separate preview…</strong> launches a second player window so you can keep editing in Studio. Restart that window to pick up newer edits. Escape returns from embedded preview to authoring.</p>
      <h3>Player controls and history</h3>
      <p>The toolbar provides Back, History, Save, Load, Auto, Skip read, and Instant text. Auto and Skip stop at choices and combat; Skip only advances through lines already read in the current playthrough. Back restores story values and presentation state at earlier checkpoints rather than replaying rewards.</p>
      <h3>How saves are protected</h3>
      <ul>
        <li>Slots record stable scene and line IDs, choice/combat/end boundaries, active combat state, read-line state, and navigation history.</li>
        <li>History retains up to 200 checkpoints within 4 MiB, evicting the oldest first.</li>
        <li>Save payloads over 8 MiB are rejected before the previous slot is replaced.</li>
        <li>Writes use atomic replacement and retain a previous <code>.bak</code> revision. Staged temporary files are ignored.</li>
        <li>A save must match the project identity and exact content fingerprint. Changed content is rejected with an explanation instead of guessing a continuation.</li>
      </ul>
      <h3>Playback and accessibility preferences</h3>
      <p>The Playback panel adjusts reveal speed, Auto timing, instant text, master and channel volumes, mute, language, and reduced motion. Preferences save automatically per story on that computer. Preview and published-game preferences remain separate, and story progress is not stored in the preferences file.</p>
      <p>Keyboard controls can be remapped without modifier combinations. Controllers support focus navigation, Accept, Cancel, Playback, and panel scrolling. Long choices use bounded scrolling, focus remains visible, modal panels contain Tab navigation, and reduced motion restores base character and camera poses.</p>
      <DocTable
        headers={["Context", "Save location"]}
        rows={[
          ["Published Windows game", <code>%APPDATA%/VN Studio Games/&lt;project-id-hash&gt;/</code>],
          ["Editor preview", <code>user://player_saves/</code>],
          ["Development launcher", <code>.tools/userdata</code>]
        ]}
      />
    </>
  ),
  section(
    "encounters",
    "Production",
    "Encounters and RPG systems",
    "Add deterministic one-on-one duels or party encounters, then connect outcomes to story routes, variables, inventory, equipment, and progression.",
    "combat encounters party rpg inventory equipment xp skills statuses resources battle",
    <>
      <h3>One-on-one encounters</h3>
      <p>Configure a scene encounter with player and opponent characters, expressions, HP, attack, defense, healing, and victory and defeat destinations. Built-in Strike, Guard, and Heal actions are deterministic: there are no random rolls. Encounter-local skills add damage, healing, or protection with uses and cooldowns, and a reusable skill library stores up to 32 templates.</p>
      <h3>Party encounters</h3>
      <p>Party battles add initiative, legal target selection, ordered enemy decisions, HP/MP costs, status effects, escape routes, and configurable presentation. Project rules define damage, Guard, initiative, built-in actions, AI fallback, and motion defaults. An encounter can override only the sections it needs while inheriting the rest.</p>
      <p>Custom status catalogs control stacking, duration, tick priority, and ordered effects. Custom stat and resource catalogs support up to 16 stats and eight resources, including vital resources, cost floors, persistence policies, and battle bindings. Battle stages and choreography add actor placement, expressions, sprite or rig clips, and camera cues.</p>
      <h3>Persistent RPG progression</h3>
      <p>The RPG catalog defines persistent units, skills, consumables, equipment, key items, cumulative XP thresholds, starting inventory, equipment slots, and level-up recovery policies. Equipment modifies derived stats without silently healing a unit. Bag and party controls enforce ownership, equipped-copy reservations, legal targets, and ineffective-use protection.</p>
      <h3>Connect results back to the story</h3>
      <p>Victory, defeat, and escape routes lead to ordinary scenes. Outcome actions update variables, items, and XP once before the destination's entry effects. Back from an outcome restores the encounter's entry inventory, vitals, equipment, XP, and variables, then restarts the battle. Repeated clicks or loading cannot duplicate rewards.</p>
      <Callout title="Choose the encounter model deliberately" tone="warning">
        <p>Original one-on-one duels are not silently converted to party encounters. Party combat has a responsive built-in HUD rather than a freely composed battle-layout editor. Review the current scope before designing around a planned extension.</p>
      </Callout>
    </>
  ),
  section(
    "assets",
    "Publishing & reference",
    "Assets, project files, and recovery",
    "Keep projects portable, inspect referenced files, restore previous revisions, and understand where authoring and player data live.",
    "assets manifest vn.json backup recovery project files sha256 local privacy portable",
    <>
      <h3>Keep the project together</h3>
      <p>An authoring project is a <code>.vn.json</code> document plus its adjacent asset files. Save As copies imported artwork into the destination's asset folder so the project can move to another machine. Do not independently rename or delete that asset folder while the project still references it.</p>
      <DocTable
        headers={["File or folder", "Purpose"]}
        rows={[
          [<code>story.vn.json</code>, "The editable story document, including scenes, routes, variables, presentation, and asset references."],
          ["Adjacent asset folders", "Imported artwork, audio, fonts, models, rig data, and other files required by the document."],
          [<code>story.vn.json.bak</code>, "The previous complete project revision, opened through Project → Open project… for recovery."],
          ["Recovery snapshot", "A delayed recovery copy of committed edits, offered after an interrupted session."]
        ]}
        caption="Use a descriptive name in place of story.vn.json."
      />
      <h3>Inspect the asset manifest</h3>
      <p><strong>Project → Asset manifest…</strong> searches files by name, authored path, or usage. Each entry shows its resolved path, byte size, SHA-256, and owning records. <strong>Needs attention</strong> identifies missing, empty, unreadable, incompatible, or oversized files. The index fingerprints files up to 32 MiB.</p>
      <p>After replacing an asset on disk, choose <strong>Refresh files</strong>. Studio compares file contents and reloads affected textures, fonts, and composed artwork without creating an Undo entry. Play and Publish also validate that assets decode in their expected formats.</p>
      <h3>Recover an interrupted project</h3>
      <p>Recovery runs two seconds after a committed edit. Text still being typed in a focused field is not yet committed or crash-recovered. Use <strong>Project → Restore recovery</strong> or accept the startup recovery prompt. Saving a project clears its recovery snapshot.</p>
      <p>To return to the previous saved revision, open the project's <code>.vn.json.bak</code> file. Studio then opens Save As so you can choose a safe destination rather than overwriting the current project.</p>
      <Callout title="Your work stays local">
        <p>Authoring and preview require no account, telemetry, cloud service, or network connection after the toolchain is installed. Player saves and preferences live in local application-data locations. Published Web saves instead belong to the browser profile and site origin.</p>
      </Callout>
    </>
  ),
  section(
    "publish",
    "Publishing & reference",
    "Publish for Windows and Web",
    "Build verified, relocatable games from an isolated project snapshot, inspect build history, and package only the content your players need.",
    "publish export windows web browser godot template build game exe pck webassembly webgl",
    <>
      <h3>Prepare the verified export templates</h3>
      <p>Install each target template once on the authoring machine after setting up Godot. The Windows archive is approximately 1.3 GB; setup verifies its official SHA-512 checksum and extracts only the required release template. Subsequent builds are offline.</p>
      <CodeBlock code=".\scripts\setup-export.ps1" label="PowerShell — Windows template" />
      <CodeBlock code=".\scripts\setup-export.ps1 -Target Web" label="PowerShell — Web template" />
      <h3>Build a standalone Windows game</h3>
      <DocSteps items={[
        { title: "Save and validate", text: <>Resolve missing destinations, broken assets, incomplete encounters, and other diagnostics reported by Play or Publish.</> },
        { title: "Choose the package scope", text: <>Use a full build for every scene and character, or enable <strong>Package only reachable scenes and their assets</strong> for a focused build. Keep the same mode when republishing for existing saves.</> },
        { title: "Build Windows game", text: <>Choose <strong>Publish → Build Windows game</strong> and a destination. Studio exports from an isolated snapshot, then runs the packaged game in verification mode.</> },
        { title: "Share the whole folder", text: <>Distribute <code>Game.exe</code>, <code>Game.pck</code>, <code>README.txt</code>, <code>THIRD-PARTY-NOTICES.txt</code>, and <code>build-info.json</code> together. Players do not need Godot or VN Studio.</> }
      ]} />
      <Callout title="Windows executables are unsigned" tone="warning">
        <p>The generated Windows x64 executable is currently unsigned. Players and distribution systems may display an unknown-publisher warning. Do not describe the build as code-signed.</p>
      </Callout>
      <h3>Build a browser game</h3>
      <p>Choose <strong>Publish → Web · Browser game → Build Web game</strong>. Upload the entire output folder to a static HTTP(S) host and keep every generated filename together. The browser needs WebAssembly and WebGL 2. Do not open the export through a <code>file://</code> URL; use a host or localhost server.</p>
      <p>Click inside the game to unlock browser audio. Saves belong to that browser profile and site origin, so clearing site data removes them. For source verification, <code>./scripts/test-web.ps1</code> builds through the Studio controls, relocates the output, and checks the exact package in headless Chromium using Node.js 22 or later and Chrome.</p>
      <DocFigure src="./images/game-title.png" alt="The Last Light title screen in a published VN Studio game" caption="A published game presents its own title screen and shared story player." />
      <h3>Build safety, cancellation, and history</h3>
      <ul>
        <li>Every build receives a unique directory; existing games are never overwritten.</li>
        <li>Incomplete builds keep a <code>.building</code> suffix and diagnostics rather than appearing successful.</li>
        <li>Cancel build requests a cooperative stop. The current tool may finish first, and no partial game folder is published.</li>
        <li>Publish → Inspect build reopens completed, failed, cancelled, or interrupted records and their logs.</li>
        <li>Build again starts from a fresh verified snapshot; it never resumes an old partial export.</li>
        <li>Cleanup uses an ownership manifest and explicit confirmation. Published-game deletion is a separate opt-in, and source projects and saves are preserved.</li>
      </ul>
    </>
  ),
  section(
    "reference",
    "Publishing & reference",
    "Shortcuts and troubleshooting",
    "Use the essential keyboard commands, validate a source checkout, and resolve common setup, asset, save, preview, and publishing problems.",
    "keyboard shortcuts troubleshooting errors validation tests missing assets saves web build roadmap",
    <>
      <h3>Authoring shortcuts</h3>
      <DocTable
        headers={["Action", "Shortcut"]}
        rows={[
          ["Save project", <><kbd>Ctrl</kbd> + <kbd>S</kbd></>],
          ["Save As", <><kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>S</kbd></>],
          ["Play story", <kbd>F5</kbd>],
          ["Undo committed project edit", <><kbd>Ctrl</kbd> + <kbd>Z</kbd></>],
          ["Redo committed project edit", <><kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>Z</kbd></>],
          ["Reveal or continue dialogue", <><kbd>Space</kbd> or <kbd>Enter</kbd></>],
          ["Go back in the player", <kbd>←</kbd>],
          ["Return from embedded preview", <kbd>Esc</kbd>],
          ["Search this documentation", <><kbd>Ctrl</kbd> + <kbd>K</kbd> or <kbd>/</kbd></>]
        ]}
      />
      <h3>Common problems</h3>
      <DocTable
        headers={["Problem", "What to do"]}
        rows={[
          ["Godot is missing on a fresh checkout", <>Run <code>.\scripts\setup-godot.ps1</code>, or open the project with your own Godot 4.7.2 Standard installation.</>],
          ["Artwork or audio is missing", <>Restore the adjacent asset folder, then use Project → Asset manifest… → Refresh files. Check Needs attention for the exact path.</>],
          ["Play or Publish is blocked", <>Read the validation diagnostic. Common causes include missing scene destinations, incompatible values, incomplete encounters, and undecodable assets.</>],
          ["An older player save is rejected", <>The project identity or content fingerprint changed. Use the matching project revision or begin a new playthrough; VN Studio does not guess a continuation.</>],
          ["A Web export does not start", <>Serve the complete folder over HTTP(S), confirm WebAssembly and WebGL 2 support, and keep generated filenames together.</>],
          ["Browser audio is silent", <>Click inside the game to unlock audio, then check Playback master and channel volumes.</>],
          ["A build was cancelled or interrupted", <>Open Publish → Inspect build and read the log. Build again from a fresh snapshot; partial output is not finalized.</>],
          ["Windows reports an unknown publisher", <>The current Windows executable is unsigned. Review the build locally and distribute the complete verified folder.</>]
        ]}
      />
      <h3>Validate a source checkout</h3>
      <p>Contributors can run the project's own validation scripts from the source folder. The standard suite covers import, core behavior, and headless UI checks. Visual and export modes add rendered authoring, packaging, relocation, and packaged-game verification.</p>
      <CodeBlock code={String.raw`.\scripts\test.ps1
.\scripts\test.ps1 -Visual
.\scripts\test.ps1 -ExportOnly
.\scripts\test.ps1 -Visual -Export`} label="PowerShell — source validation" />
      <Callout title="Check the current roadmap">
        <p>VN Studio is evolving. Review the source project's tracked roadmap and implementation notes before relying on planned features such as broader UI composition, third-party rig formats, or live role-play integration. <a href={PROJECT_URL} target="_blank" rel="noopener noreferrer">Open the VN Studio project</a>.</p>
      </Callout>
    </>
  )
];
