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
  bullets?: Array<{ title: string; text: string }>;
  pullQuote?: string;
  image?: string;
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
    fullWidthImage: "",
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
        image: "",
        layout: "right",
      },
      {
        id: "the-research",
        label: "The Research",
        heading: "Seven stakeholder groups, twelve schools, one insight",
        body: "Early usability sessions surfaced a counterintuitive finding: students don't engage with skills, they engage with content. Even skilled 6th graders couldn't articulate that they were 'identifying problem and solution,' despite being told repeatedly. The instructional language simply didn't register as meaningful to them.\n\nA parallel finding reshaped the whole motivation model: when ranked by what actually made students feel accomplished, progress bars came in last. Students cared about content mastery and forward movement through a story, not an abstract fill-meter.",
        pullQuote: "This you actually learn.",
        image: "",
        layout: "left",
      },
      {
        id: "the-process",
        label: "The Process",
        heading: "Twenty-five dashboards, two navigation patterns, one winner",
        body: "Research pointed at a clear problem: progress bars weren't landing, and instructional language wasn't registering. But the path from insight to interface took real iteration. Early dashboard concepts went through 25 rounds before the current structure held up in testing. Navigation was one of the harder calls: should students scroll through a long passage, or move through discrete pages? We prototyped both and tested pill-based pagination against continuous scroll directly with students. Pagination won, keeping cognitive load lower for readers already working independently for the first time.\n\nNot every idea survived contact with real students. Early sketches for the 'My Page' progress hub included a badge-collection system, sketched out on paper before being deprioritized in favor of the simpler star-tracking model that better matched what testing showed students actually responded to.",
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
          },
          {
            title: "The color-band system survived, restructured for solo use.",
            text: "Progress still moves through the same familiar bands, but now surfaces through stars, earned only at a real proficiency threshold, not for simply finishing, so advancement still reads as forward movement rather than a hollow checkbox.",
          },
          {
            title: "Motivation got built into the moments themselves.",
            text: "Small celebration interstitials mark each transition, standing in for the encouragement a teacher would normally give in real time, present whether a student is working independently or alongside a class.",
          },
          {
            title: "My Page made progress visible again.",
            text: "The old system let students see a physical stack of completed cards, tangible proof of progress. My Page rebuilds that same feeling digitally: a personal view of stats, levels completed, and stories finished, so progress stays visible even without a teacher tracking it for them.",
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
        label: "Three things I'd carry into the next project",
        heading: "What I'd do differently",
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
    subtitle: "Placeholder — update with real New Lit case study description.",
    company: "New Lit",
    year: "2023",
    role: "Senior UX Designer",
    timeline: "TBD",
    team: "TBD",
    heroImage: "/case-studies/New%20Lit%20Thumbnail.png",
    heroBackground: "#4B6BF5",
    metrics: [
      { value: "TBD", label: "Metric 1" },
      { value: "TBD", label: "Metric 2" },
      { value: "TBD", label: "Metric 3" },
    ],
    fullWidthImage: "",
    framingHeading: "Placeholder heading",
    framingBody: "Placeholder framing body — update with real content.",
    sections: [
      { id: "the-problem",         label: "The Problem",                           heading: "Placeholder heading", body: "Placeholder body — update with real content.", layout: "right" },
      { id: "the-research",        label: "The Research",                          heading: "Placeholder heading", body: "Placeholder body — update with real content.", layout: "left"  },
      { id: "the-solution",        label: "The Solution",                          heading: "Placeholder heading", body: "Placeholder body — update with real content.", layout: "dark"  },
      { id: "what-didnt-make-it",  label: "What didn't make it and why",           heading: "Placeholder heading", body: "Placeholder body — update with real content.", layout: "full"  },
      { id: "three-things",        label: "Three things I'd carry into the next project", heading: "Placeholder heading", body: "Placeholder body — update with real content.", layout: "full"  },
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
      { id: "the-research",        label: "The Research",                          heading: "Placeholder heading", body: "Placeholder body — update with real content.", layout: "left"  },
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
