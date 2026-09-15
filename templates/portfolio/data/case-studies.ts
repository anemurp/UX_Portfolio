// ────────────────────────────────────────────────────────────────
// CASE STUDY DATA
// Each entry becomes a page at /case-studies/[slug].
//
// layout options:
//   'right' — text left, phone mockup right
//   'left'  — phone mockup left, text right
//   'full'  — full-width text block, optional browser mockup below
//   'dark'  — full-width dark panel with light text
//
// Set image to a path in /public (e.g. "/cs/tide-step2.png") or
// leave as "" to show a labelled placeholder.
// ────────────────────────────────────────────────────────────────

export type Section = {
  id: string;
  label: string;
  heading: string;
  body: string; // separate paragraphs with a blank line (\n\n)
  bullets?: Array<{
    title: string;
    text: string;
    image?: string;
    imageSize?: "sm" | "md"; // cap the bullet image width: sm ≈ half, md ≈ two-thirds
    images?: string[];
  }>;
  pullQuote?: string;
  // Paragraph indices (0-based) rendered with a decorative left accent border,
  // like a pull quote — use for standalone emphasis lines.
  calloutParagraphs?: number[];
  // Image shown directly under the heading, before the body text starts.
  headingImage?: string;
  // Images inside the text flow: entry 1 appears after paragraph 1, entry 2
  // after paragraph 2, etc. Use null to skip a paragraph; an entry can also
  // be a list of images to stack after that paragraph (capped to a readable
  // text width). Pass { src, side: true } to instead render that paragraph in
  // a 2-column grid, text left, image right. Pass { images, full: true } to
  // stack images at the full width of the section instead of the text column.
  bodyImages?: Array<
    | string
    | string[]
    | { src: string; side?: boolean }
    | { images: string[]; full?: boolean; center?: boolean }
    | null
  >;
  image?: string;
  // Stacked gallery — takes priority over image. Set removeBg: true on an
  // entry to visually blend a white background into the page.
  images?: Array<{ src: string; removeBg?: boolean }>;
  layout: "left" | "right" | "full" | "dark";
};

export type CaseStudy = {
  slug: string;
  title: string;
  subtitle: string;
  company: string;
  year: string;
  role: string;
  timeline: string;
  team: string;
  heroImage: string;
  heroBackground: string;
  metrics: Array<{ value: string; label: string }>;
  fullWidthImage?: string;
  framingHeading: string;
  framingBody: string;
  sections: Section[];
  nextProject?: { slug: string; title: string };
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "sra-reading-labs",
    title: "From physical to digital: gamifying independent learning",
    subtitle:
      "SRA Reading Labs had delivered reading for 60 years as a physical product. I redesigned it for independent student learning — a research-grounded motivation system that increased engagement by 68%.",
    company: "McGraw Hill",
    year: "2024",
    role: "Senior UX Designer",
    timeline: "14 months",
    team: "1 designer · 4 engineers · 2 PMs · 7 stakeholder groups",
    heroImage: "/case-studies/Reading%20Labs%20Thumbnail%20%281%29.png",
    heroBackground: "#D4256B",
    metrics: [
      { value: "1.5M+", label: "Students impacted across 22 levels" },
      { value: "68%", label: "Increase in student engagement" },
      { value: "16", label: "Prototypes tested across K–8" },
    ],
    fullWidthImage: "/case-studies/ReadingLabs_CaseStudy_Assets/solution.avif",
    framingHeading:
      "What does motivation look like when the teacher isn't in the room?",
    framingBody:
      "SRA Reading Labs had worked for 60 years because teachers orchestrated the experience — handing out cards, tracking progress, celebrating wins. Moving to a digital product meant that scaffolding disappeared overnight. Students were left with a task, no context, and no reason to care. This project started by asking what intrinsic motivation actually looks like for a 9-year-old.",
    sections: [
      {
        id: "the-problem",
        label: "The Problem",
        heading: "A 60-year-old product built around teacher motivation",
        body: "SRA Reading Labs began as a box of color-coded reading cards used by teachers for 60 years. Students might use it in the classroom with a teacher guiding them, or independently at home, and the physical product had always assumed the former. Digitizing it meant designing motivation, pacing, and encouragement into the product itself, so the experience held up whether or not a teacher was in the room.\n\nThree tensions shaped every decision that followed:",
        bullets: [
          {
            title: "Faithful to what already worked.",
            text: "Teachers and students already knew and trusted the color-band system. The challenge wasn't inventing something new, it was translating an experience people loved into a digital interface without losing what made it recognizable and trustworthy in the first place.",
            image: "/case-studies/ReadingLabs_CaseStudy_Assets/readinglabschart.png",
            imageSize: "sm",
          },
          {
            title: "One interface, opposite audiences.",
            text: "The experience spanned K–8. A pagination pattern that felt right to a 3rd grader risked feeling babyish to an 8th grader, and this had to be resolved with testing, not intuition.",
          },
          {
            title: "Motivation that can't assume a teacher is watching.",
            text: "The interface had to supply its own encouraging moments, like noticing progress or marking a milestone, for students using it independently, without becoming redundant or hollow for students still working alongside a teacher.",
          },
        ],
        bodyImages: ["/case-studies/ReadingLabs_CaseStudy_Assets/physical-sra.png"],
        image: "",
        layout: "full",
      },
      {
        id: "the-research",
        label: "The Research",
        heading: "Seven stakeholder groups, twelve schools, one insight",
        body: "Early usability sessions surfaced a counterintuitive finding: students don't engage with skills, they engage with content. Even skilled 6th graders couldn't articulate that they were 'identifying problem and solution,' despite being told repeatedly. The instructional language simply didn't register as meaningful to them.\n\nA parallel finding reshaped the whole motivation model: when ranked by what actually made students feel accomplished, progress bars came in last. Students cared about content mastery and forward movement through a story, not an abstract fill-meter.",
        pullQuote: "This you actually learn.",
        images: [
          { src: "/case-studies/ReadingLabs_CaseStudy_Assets/gamification-taxonomy.avif", removeBg: true },
          { src: "/case-studies/ReadingLabs_CaseStudy_Assets/goal-setting-theory.avif" },
        ],
        layout: "left",
      },
      {
        id: "the-process",
        label: "The Process",
        heading: "Twenty-five dashboards, two navigation patterns, one winner",
        body: "Research pointed at a clear problem: progress bars weren't landing, and instructional language wasn't registering. But the path from insight to interface took real iteration. Early dashboard concepts went through 25 rounds before the current structure held up in testing.\n\nNavigation was one of the harder calls: should students scroll through a long passage, or move through discrete pages? We prototyped both and tested pill-based pagination against continuous scroll directly with students. Pagination won, keeping cognitive load lower for readers already working independently for the first time.\n\nNot every idea survived contact with real students. Early sketches for the 'My Page' progress hub included a badge-collection system, sketched out on paper before being deprioritized in favor of the simpler star-tracking model that better matched what testing showed students actually responded to.",
        bodyImages: [
          "/case-studies/ReadingLabs_CaseStudy_Assets/dashboard-exploration.avif",
          "/case-studies/ReadingLabs_CaseStudy_Assets/question.jpg",
          [
            "/case-studies/ReadingLabs_CaseStudy_Assets/mypagesketches.avif",
            "/case-studies/ReadingLabs_CaseStudy_Assets/mypageiterations.avif",
          ],
        ],
        image: "",
        layout: "full",
      },
      {
        id: "the-solution",
        label: "The Solution",
        heading: "A motivation system grounded in self-determination theory",
        body: "The answer took shape as a full student experience, built around four connected moves: an interest-selection step at onboarding, a library that personalizes around those interests, a set of motivational moments woven through the reading itself, and a personal stats page that made progress visible at a glance.",
        bullets: [
          {
            title: "Ownership replaced the old ritual.",
            text: "Instead of a teacher handing a student the next card, students choose their own interests at onboarding, populating a library of readings selected specifically for them. That sense of choice became the digital stand-in for the trust the physical system used to carry.",
            image: "/case-studies/ReadingLabs_CaseStudy_Assets/interests.avif",
          },
          {
            title: "The color-band system survived, restructured for solo use.",
            text: "Progress still moves through the same familiar bands, but now surfaces through stars, earned only at a real proficiency threshold, not for simply finishing, so advancement still reads as forward movement rather than a hollow checkbox.",
            images: [
              "/case-studies/ReadingLabs_CaseStudy_Assets/stars.avif",
              "/case-studies/ReadingLabs_CaseStudy_Assets/library.avif",
            ],
          },
          {
            title: "Motivation got built into the moments themselves.",
            text: "Small celebration interstitials mark each transition, standing in for the encouragement a teacher would normally give in real time, present whether a student is working independently or alongside a class.",
            images: [
              "/case-studies/ReadingLabs_CaseStudy_Assets/interstitial2.avif",
              "/case-studies/ReadingLabs_CaseStudy_Assets/interstial-nobg.png",
            ],
          },
          {
            title: "My Page made progress visible again.",
            text: "The old system let students see a physical stack of completed cards, tangible proof of progress. My Page rebuilds that same feeling digitally: a personal view of stats, levels completed, and stories finished, so progress stays visible even without a teacher tracking it for them.",
            image: "/case-studies/ReadingLabs_CaseStudy_Assets/my-page.png",
            imageSize: "md",
          },
        ],
        image: "",
        layout: "dark",
      },
      {
        id: "what-didnt-make-it",
        label: "What didn't make it and why",
        heading: "The social features we chose not to build",
        body: "Early explorations considered peer-comparison features: leaderboards, shared achievements, class challenges. They tested well with competitive students and poorly with everyone else. Students already behind found them demoralizing, and teachers worried about classroom dynamics. These were replaced with personal-record comparisons, you versus your past self rather than you versus the class. A harder design problem, but a more defensible product decision.",
        layout: "full",
      },
      {
        id: "three-things",
        label: "Key learnings",
        heading: "What I took away from this project",
        body: "",
        bullets: [
          {
            title: "Legacy products are a different kind of design challenge.",
            text: "The color-band system, the self-selection mechanic, the self-checking model: all pedagogically intentional, developed over decades of classroom use. My task was understanding it well enough to know which parts were worth preserving, which were limited only by the physical medium, and which could go further in digital. Interest selection was the clearest example of that last category. A card box couldn't adapt to who a student was; a digital product could, and making that the first meaningful interaction changed what motivation looked like throughout the entire experience.",
          },
          {
            title: "Student motivation is ownership-based.",
            text: "Designing for motivation with no teacher in the room is one of the hardest problems in EdTech, and most products solve it by borrowing game mechanics that don't actually work for learning. This pushed me back to the research: self-efficacy, goal-setting theory, what makes students persist. The finding: motivation follows ownership. When a student chooses what they read, sees only the goal directly in front of them, and gets a clear moment of 'I did it' rather than incremental progress, they keep going. That became the design principle behind every major decision, and it's also what kept stakeholders aligned when priorities competed.",
          },
          {
            title: "Structured alignment matters as much as the design itself.",
            text: "Working across seven stakeholder groups with competing priorities required a decision log of screenshots, notes, and videos, plus regular checkpoints, so the team stayed aligned without slowing the work down.",
          },
        ],
        layout: "full",
      },
    ],
    nextProject: {
      slug: "new-lit",
      title: "Annotate, listen, respond, unlock: designing reading that moves students forward",
    },
  },
  {
    slug: "new-lit",
    title: "Annotate, listen, respond, unlock: designing reading that moves students forward",
    subtitle:
      "A digital split-screen reading experience for grades 6-12 that brings the familiar classroom dynamic of a book and an activity sheet into a digital environment.",
    company: "McGraw Hill",
    year: "2023",
    role: "Lead UX Designer",
    timeline: "TBD",
    team: "TPM, 6 Engineers, Academic Designers, Accessibility",
    heroImage: "/case-studies/New%20Lit%20Thumbnail.png",
    heroBackground: "#4B6BF5",
    metrics: [
      { value: "100%", label: "students understood the split-screen layout without instruction" },
      { value: "83%", label: "expected direct text selection for annotation, validating the interaction model" },
      { value: "3", label: "targeted design iterations shipped from a single round of research" },
    ],
    fullWidthImage: "/case-studies/Emerge/FinalMockup_NL.avif",
    framingHeading:
      "What does it take to rebuild the feeling of a book and a worksheet side by side, without ever letting a student lose their place?",
    framingBody: "",
    sections: [
      {
        id: "the-problem",
        label: "The Problem",
        heading: "Designing without a complete picture",
        body: "McGraw-Hill needed a digital reading experience for grades 6-12 that kept a rhythm teachers already trusted: a book on one side, a worksheet on the other, moving between thinking and responding without breaking focus. Translating that to a screen wasn't just a matter of copying the layout. It meant figuring out why that back-and-forth worked in print, and rebuilding it on purpose instead of by accident.\n\nThree things made that harder:",
        bullets: [
          {
            title: "External vendors started building before the interface existed.",
            text: "Authoring and student design had to move in parallel, with neither side able to fully anchor to the other, so a lot of early decisions were made without a stable reference point.",
          },
          {
            title: "Annotation, organizers, and writing were all being scoped at the same time.",
            text: "That meant the ground could shift under any decision I made, sometimes mid-project.",
          },
          {
            title: "The 6-12 and K-5 experiences had to share an interaction model.",
            text: "They were structurally different products, but shared features had to hold up identically across both. Accessibility support, including WCAG AA compliance and full keyboard navigation, had to be built in from day one.",
          },
        ],
        layout: "full",
      },
      {
        id: "my-role-context",
        label: "My Role & Context",
        heading: "One of two designers, three overlapping experiences",
        body: "I was one of two designers on this project. I worked closely with the other designer on the 6-12 split-screen experience while also owning UX for the K-5 product, the authoring tool, and the teacher experience. My scope covered the student reading interface, annotation system, panel control logic, and accessibility. There wasn't a dedicated researcher on this phase, so I co-moderated usability sessions with the PM and a fellow designer as well.",
        layout: "full",
      },
      {
        id: "the-research",
        label: "The Research",
        heading: "Teachers had already validated a split-screen experience, but students hadn't yet",
        body: "I took over this project after teacher research had already validated the core concept. Teachers described the side-by-side book-and-worksheet layout not as a preference but as a pedagogical necessity: a student who has to close a book to answer a question, or loses their place every time they switch tabs, is a student whose attention is working against them. That's what shaped the layout for everything that came after: passage on the left, activity on the right, with nothing blocking the switch between them.\n\nTo sharpen that direction, I looked at eight competing reading platforms. Most defaulted to inline questions embedded right in the text, which broke up the reading with constant interruptions. **Few used a split-screen layout, and annotation support was inconsistent from one product to the next,** so there wasn't much of a pattern to borrow. A lot of these decisions had to be made from scratch.\n\nWe still wanted to test the design with students directly, not just teachers, but the research team didn't have the bandwidth to moderate sessions themselves. So we split the work: research handled recruitment, and the PM, a fellow designer, and I ran six moderated sessions ourselves with 6th and 8th graders, to see where comprehension started to diverge across that age range.\n\n**The main question we were testing**_: does the split-screen activity make sense to students on its own, without anyone explaining the layout, the navigation, or how progress works?_\n\n**A secondary goal**_: Surface student mental models around annotation so the feature could be designed around existing expectations, not against them._\n\nThe results were reassuring on the decisions that mattered most. Every student understood the split-screen layout without being told how it worked, and every student understood the gating mechanic and moved through the activity correctly. 83% expected to select text directly to start annotating, which matched the interaction model we'd already landed on.\n\nNot everything worked as well. Only 2 of the 6 students recognized the 'Hide Panel' icon right away. That led to three fixes: anchoring backward navigation to the correct passage, redesigning the icon, and adding tooltip labels to the controls.",
        headingImage: "/case-studies/Emerge/uxr-asset_NL%20Small.jpeg",
        calloutParagraphs: [3, 4],
        bodyImages: [null, { src: "/case-studies/Emerge/Comparative%20Research.jpeg", side: true }],
        layout: "full",
      },
      {
        id: "the-process",
        label: "The Process",
        heading: "Designing for the shape of the problem, before every answer existed",
        body: "A lot of what sat downstream of the core layout was still undefined while I was designing it: the toolbar between panels, the annotation features it would eventually hold, the graphic organizer, the long-form writing experience. Other teams were building those in parallel, so instead of waiting for answers, I designed around the shape of the problem I already understood.\n\nI started with user flows, turning a page of requirements into something engineering and I could use to work through technical feasibility and edge cases before a single wireframe existed.\n\nFrom there, low-fidelity exploration worked out the structural logic: how the two panels related to each other, how a student would move between reading and responding. I kept it loose enough to flex as the other workstreams caught up, since at this project's size, that kind of ambiguity was closer to the normal state than the exception.\n\nOnce we moved into mid-fidelity, the controls moved to the center gutter, a narrow strip between the two panels that didn't belong to either side. It showed up when a student needed it and stayed out of the way otherwise.",
        bodyImages: [
          null,
          null,
          {
            images: [
              "/case-studies/Emerge/low-fidelity%20mockups.jpeg",
              "/case-studies/Emerge/Ideation%20%20Small.jpeg",
            ],
            full: true,
          },
          { images: ["/case-studies/Emerge/midfidelity-newlit%20Small.jpeg"], center: true },
        ],
        layout: "full",
      },
      {
        id: "the-solution",
        label: "The Solution",
        heading: "A reading system built to hold up under real classroom use",
        body: "",
        bullets: [
          {
            title: "The split-screen stayed, with a few changes from testing.",
            text: "Passage on the left, activity on the right, the same layout teachers had already validated. Testing pointed to a few specific fixes: anchored backward navigation, clearer iconography, and tooltip labels, which closed the small gaps between what students expected and what the interface actually showed them.",
            image: "/case-studies/Emerge/PostUXR-Mockup_NL%20Small.jpeg",
          },
          {
            title: "The annotation tool became its own system.",
            text: "A floating palette students can reposition anywhere on screen. When activated, it shows the available annotation styles: highlight, underline, box, circle, comment. It works the same way across both panels, so an instruction like 'circle all the nouns in the passage' behaves identically no matter where the student is working. Authors decide which styles are available for a given activity, so the tool stays focused on what that activity is actually asking for. The interaction model, selecting text first and then applying a style, came directly out of the 83% research finding rather than being assumed.",
            images: [
              "/case-studies/Emerge/AnnotationTool-NL%20Small.jpeg",
              "/case-studies/Emerge/AnnotationStudentFlow_NL%20Small.jpeg",
            ],
          },
          {
            title: "Structure served two grade bands from one foundation.",
            text: "Annotations, audio, and formatting all had to work the same way across the 6-12 and K-5 products, so every decision on one track got checked against the other. What came out of that was one interaction model and one component foundation, shared by both, instead of two systems drifting apart from each other.",
          },
        ],
        layout: "dark",
      },
      {
        id: "what-didnt-make-it",
        label: "What didn't make it and why",
        heading: "Placeholder heading",
        body: "[TODO: Anna to provide real example]",
        layout: "full",
      },
      // TODO: Anna to review this section before publishing.
      {
        id: "three-things",
        label: "Three things I'd carry into the next project",
        heading: "Three things I'd carry into the next project",
        body: "",
        bullets: [
          {
            title: "Designing under ambiguity is its own skill.",
            text: "Authoring, annotation, and content were all being built at the same time, so waiting for certainty wasn't really an option. Working from flows and structural logic before pixels kept the project moving instead of stalling on things that hadn't been decided yet.",
          },
          {
            title: "Moderating sessions myself changed what I noticed.",
            text: "Co-moderating the sessions myself, instead of just reading a summary afterward, let me catch comprehension gaps as they happened, and it changed how I talked through the activity with 6th and 8th graders.",
          },
          {
            title: "Shared systems need shared discipline.",
            text: "Every decision I made for the 6-12 experience had to hold up against the K-5 model too. That back-and-forth is what produced a component foundation engineering could build from without guessing.",
          },
        ],
        layout: "full",
      },
    ],
    nextProject: {
      slug: "teacher-reports",
      title: "Giving teachers a window into every moment of learning",
    },
  },
  {
    slug: "teacher-reports",
    title: "Giving teachers a window into every moment of learning",
    subtitle: "Placeholder — update with real Teacher Reports case study description.",
    company: "McGraw Hill",
    year: "2023",
    role: "Senior UX Designer",
    timeline: "TBD",
    team: "TBD",
    heroImage: "",
    heroBackground: "#16A34A",
    metrics: [
      { value: "0 → 1", label: "Discovery to dev handoff in one month" },
      { value: "100%", label: "WCAG AA accessible" },
      { value: "6", label: "Student statuses designed" },
    ],
    fullWidthImage: "",
    framingHeading: "Placeholder heading",
    framingBody: "Placeholder framing body — update with real content.",
    sections: [
      { id: "the-problem",         label: "The Problem",                           heading: "Placeholder heading", body: "Placeholder body — update with real content.", layout: "right" },
      { id: "my-role-context",     label: "My Role & Context",                     heading: "Placeholder heading", body: "Placeholder body — update with real content.", layout: "full"  },
      { id: "the-research",        label: "The Research",                          heading: "Placeholder heading", body: "Placeholder body — update with real content.", layout: "left"  },
      { id: "the-process",         label: "The Process",                           heading: "Placeholder heading", body: "Placeholder body — update with real content.", layout: "full"  },
      { id: "the-solution",        label: "The Solution",                          heading: "Placeholder heading", body: "Placeholder body — update with real content.", layout: "dark"  },
      { id: "what-didnt-make-it",  label: "What didn't make it and why",           heading: "Placeholder heading", body: "Placeholder body — update with real content.", layout: "full"  },
      { id: "three-things",        label: "Three things I'd carry into the next project", heading: "Placeholder heading", body: "Placeholder body — update with real content.", layout: "full"  },
    ],
    nextProject: {
      slug: "sra-reading-labs",
      title: "From physical to digital: gamifying independent learning",
    },
  },
];
