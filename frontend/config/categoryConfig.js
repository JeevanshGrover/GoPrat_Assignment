export const EVENT_TYPES = [
  "Corporate",
  "Wedding",
  "Festival",
  "Concert",
  "College Fest",
  "Conference",
  "Birthday Party",
  "Exhibition",
  "Private Gathering",
  "Other",
];

export const CATEGORIES = {
  planner: {
    id: "planner",
    name: "Event Planner",
    shortName: "Planner",
    tagline: "End-to-end planning, coordination & vendor management",
    description:
      "Hire professional event management experts to handle budgeting, vendors, decor, scheduling and seamless execution.",
    badgeColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    accentColor: "indigo",
    step2Title: "Planning Budget & Scale",
    step2Description: "Define the scale of your event and financial expectations.",
    step3Title: "Services & Scope",
    step3Description: "Choose specific coordination services and provide special instructions.",
    steps: {
      2: [
        {
          name: "expectedGuests",
          label: "Expected Number of Guests",
          type: "number",
          placeholder: "e.g. 250",
          helperText: "Approximate guest headcount (minimum 1)",
          validation: {
            required: "Please enter the expected number of guests",
            min: { value: 1, message: "Expected guests must be at least 1" },
            valueAsNumber: true,
          },
        },
        {
          name: "budgetMin",
          label: "Minimum Budget (INR ₹)",
          type: "number",
          placeholder: "e.g. 100000",
          helperText: "Lower bound of your planned expenditure",
          validation: {
            required: "Please specify a minimum budget",
            min: { value: 0, message: "Minimum budget cannot be negative" },
            valueAsNumber: true,
          },
        },
        {
          name: "budgetMax",
          label: "Maximum Budget (INR ₹)",
          type: "number",
          placeholder: "e.g. 300000",
          helperText: "Upper limit of your planned budget",
          validation: {
            required: "Please specify a maximum budget",
            min: { value: 0, message: "Maximum budget cannot be negative" },
            valueAsNumber: true,
            validate: (value, formValues) => {
              const min = Number(formValues.budgetMin);
              if (!isNaN(min) && Number(value) < min) {
                return "Maximum budget cannot be less than minimum budget";
              }
              return true;
            },
          },
        },
      ],
      3: [
        {
          name: "services",
          label: "Required Planning Services",
          type: "multiselect",
          options: [
            "Full planning",
            "Decor",
            "Catering coordination",
            "Vendor management",
            "Logistics",
            "On-day coordination",
          ],
          helperText: "Select at least one service required from the planner",
          validation: {
            required: "Select at least one planning service",
            validate: (val) =>
              (Array.isArray(val) && val.length > 0) ||
              "Please select at least one planning service",
          },
        },
        {
          name: "notes",
          label: "Special Notes & Theme Preferences",
          type: "textarea",
          placeholder:
            "Share details regarding theme preferences, venue constraints, timeline, special arrangements...",
          helperText: "Optional brief (up to 500 characters)",
          validation: {
            maxLength: {
              value: 500,
              message: "Notes must not exceed 500 characters",
            },
          },
        },
      ],
    },
  },

  performer: {
    id: "performer",
    name: "Performer / Artist",
    shortName: "Performer",
    tagline: "Live singers, DJs, musical bands, dancers & entertainers",
    description:
      "Book talented artists, stage performers, DJs, or hosts to keep your audience engaged and entertained.",
    badgeColor: "bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20",
    accentColor: "fuchsia",
    step2Title: "Artist Profile & Lineup",
    step2Description: "Specify artist type, genre, and ensemble size required.",
    step3Title: "Performance & Technical Rider",
    step3Description: "Detail set duration and venue equipment requirements.",
    steps: {
      2: [
        {
          name: "performerType",
          label: "Performer Type",
          type: "select",
          placeholder: "Select performer type...",
          options: [
            "Singer",
            "DJ",
            "Band",
            "Dancer",
            "Comedian",
            "Anchor/MC",
            "Other",
          ],
          helperText: "Primary performance discipline needed",
          validation: {
            required: "Please select a performer category",
          },
        },
        {
          name: "genre",
          label: "Genre / Style",
          type: "text",
          placeholder: "e.g. Rock, Bollywood, Sufi, EDM, Standup, Classical",
          helperText: "Specific genre or vibe preferred for the act (optional)",
          validation: {
            maxLength: {
              value: 100,
              message: "Genre must be under 100 characters",
            },
          },
        },
        {
          name: "numberOfPerformers",
          label: "Number of Performers / Artists",
          type: "number",
          placeholder: "e.g. 4",
          helperText: "Total performers taking the stage (minimum 1)",
          validation: {
            required: "Please enter the number of performers",
            min: { value: 1, message: "Must have at least 1 performer" },
            valueAsNumber: true,
          },
        },
      ],
      3: [
        {
          name: "durationMinutes",
          label: "Performance Duration (Minutes)",
          type: "number",
          placeholder: "e.g. 60",
          helperText: "Expected stage performance duration in minutes (min 15 mins)",
          validation: {
            required: "Please enter the performance duration in minutes",
            min: {
              value: 15,
              message: "Performance duration must be at least 15 minutes",
            },
            valueAsNumber: true,
          },
        },
        {
          name: "equipmentRequired",
          label: "Equipment Venue Must Provide",
          type: "multiselect",
          options: [
            "Microphone",
            "Speakers",
            "Lighting",
            "Instruments",
            "Other",
          ],
          helperText: "Audio, lighting, or instrument gear expected from the organizer",
          validation: {
            required: false,
          },
        },
        {
          name: "notes",
          label: "Artist Rider Notes & Song Preferences",
          type: "textarea",
          placeholder:
            "Include soundcheck timings, specific song lists, stage dimensions, hospitality requirements...",
          helperText: "Optional instructions (up to 500 characters)",
          validation: {
            maxLength: {
              value: 500,
              message: "Notes must not exceed 500 characters",
            },
          },
        },
      ],
    },
  },

  crew: {
    id: "crew",
    name: "Event Crew & Staff",
    shortName: "Crew",
    tagline: "Sound, lighting, stage hands, security & support personnel",
    description:
      "Mobilize dependable on-ground operational crew, technicians, security personnel, and event assistants.",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    accentColor: "emerald",
    step2Title: "Roles & Crew Size",
    step2Description: "Select crew responsibilities and the headcount needed.",
    step3Title: "Work Schedule & Instructions",
    step3Description: "Set event duration, shift hours, and operational details.",
    steps: {
      2: [
        {
          name: "roles",
          label: "Crew Roles Required",
          type: "multiselect",
          options: [
            "Sound",
            "Lighting",
            "Stage hands",
            "Security",
            "Photographer",
            "Videographer",
            "Catering staff",
          ],
          helperText: "Select all operational roles you need staffed",
          validation: {
            required: "Select at least one crew role",
            validate: (val) =>
              (Array.isArray(val) && val.length > 0) ||
              "Please select at least one crew role",
          },
        },
        {
          name: "crewCount",
          label: "Total Crew Headcount",
          type: "number",
          placeholder: "e.g. 6",
          helperText: "Total number of crew members required (minimum 1)",
          validation: {
            required: "Please specify the total crew count",
            min: { value: 1, message: "Crew count must be at least 1" },
            valueAsNumber: true,
          },
        },
      ],
      3: [
        {
          name: "numberOfDays",
          label: "Number of Days Required",
          type: "number",
          placeholder: "e.g. 2",
          helperText: "Total working days on site (minimum 1)",
          validation: {
            required: "Please specify the number of days",
            min: { value: 1, message: "Number of days must be at least 1" },
            valueAsNumber: true,
          },
        },
        {
          name: "shiftHours",
          label: "Shift Hours Per Day",
          type: "number",
          placeholder: "e.g. 8",
          helperText: "Working hours per shift (1 to 24 hours)",
          validation: {
            required: "Please enter shift hours per day",
            min: { value: 1, message: "Shift must be at least 1 hour" },
            max: { value: 24, message: "Shift cannot exceed 24 hours" },
            valueAsNumber: true,
          },
        },
        {
          name: "notes",
          label: "Operational Notes & Dress Code",
          type: "textarea",
          placeholder:
            "Reporting time, point of contact on site, uniform or dress code, meals provided, access passes...",
          helperText: "Optional instructions (up to 500 characters)",
          validation: {
            maxLength: {
              value: 500,
              message: "Notes must not exceed 500 characters",
            },
          },
        },
      ],
    },
  },
};
