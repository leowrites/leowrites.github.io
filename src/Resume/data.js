import { StructuredVisual } from "./StructuredDetails";
import { Box, Typography } from "@mui/material";
import BugReportIcon from "@mui/icons-material/BugReport";
import { TooltipLink, CodeBlock } from "./Components";

const personalInfo = {
  description: [
    <span>
      I'm a final year Computer Science student at the{" "}
      <TooltipLink
        href="https://web.cs.toronto.edu/"
        tooltipText="My alma mater, where I study Computer Science"
      >
        University of Toronto
      </TooltipLink>
      .
    </span>,
    `I have an interest in systems, performance optimization and machine learning. 
      At school, I have taken courses such as Compilers, Computer Architecture, Operating Systems, 
      and Deep Learning.`,
    <span>
      Some of the most exciting projects I've worked on include contributing to
      the{" "}
      <TooltipLink
        href="https://github.com/openai/triton"
        tooltipText="A ML compiler for deep learning"
      >
        Triton
      </TooltipLink>{" "}
      language and compiler for GPU programming, and enhancing{" "}
      <TooltipLink
        href="https://www.mozilla.org/en-US/firefox/"
        tooltipText="A free and open-source web browser developed by Mozilla"
      >
        Firefox
      </TooltipLink>{" "}
      Privacy at Mozilla.
    </span>,
  ],
  email: "leo@liuwork.ca",
  phone: "(778) 990-6015",
  github: "github.com/leowrites",
  linkedin: "linkedin.com/in/leowrites/",
};

const education = [
  {
    institution: "University of Toronto",
    degree: "Bachelor of Science in Computer Science",
    dates: "Sep 2021 - May 2026",
    details: [
      {
        title: "Systems",
        content:
          "Compilers & Interpreters, Operating Systems, Computer Architecture, Parallel Programming, Databases, Computer Networks, Computer Organization",
      },
      {
        title: "AI & ML",
        content: "Deep Learning, Intro to ML, Intro to AI",
      },
      {
        title: "Software Engineering & Theory",
        content:
          "Algorithms Design and Complexity, Software Engineering, Software Design, Functional Programming, Data Structures & Analysis, Web Development, Computer Graphics",
      },
      {
        title: "Math",
        content: "Probability, Multivariable Calculus, Linear Algebra",
      },
    ],
  },
];

const experience = [
  {
    title: "Undergraduate Researcher",
    organization: "ParaMathics Lab, University of Toronto",
    url: "http://paramathic.com",
    tooltipText:
      "A research group at the University of Toronto focusing on large-scale parallel and cloud systems",
    location: "Toronto, ON",
    dates: "May 2025 - Present",
    caption:
      "Adding support for structured sparsity matrix multiplication to Triton",
    details: [
      {
        title: "Overview",
        content: (
          <span>
            Matrix multiplication is one of the most expensive operations in
            machine learning. While GPUs are optimized for dense data,
            exploiting sparsity (zeros) can lead to massive speedups. I worked
            on extending the{" "}
            <TooltipLink
              href="https://github.com/openai/triton"
              tooltipText="A ML compiler for deep learning"
            >
              Triton compiler
            </TooltipLink>{" "}
            to support these sparse operations efficiently.
            <StructuredVisual
              src="/triton/matrix_decomposition.png"
              alt="Matrix Decomposition"
            ></StructuredVisual>
          </span>
        ),
      },
    ],
    projects: [
      {
        projectName: "Sparse Matrix Multiplication Support",
        caption:
          "Adding block-sparse support to Triton via decoupled scheduling",
        details: [
          {
            title: "Sparse Kernels",
            content:
              "Defining sparsity at the block level introduces complex scheduling problems—like a factory line where some parts are heavy and some are light. Simple sequential schedules lead to load imbalance and poor GPU utilization as threads stall waiting for others to finish dense blocks.",
          },
          {
            title: "Schedules",
            content:
              "I implemented block-sparse matrix multiplication support in Triton using K-dimension block iteration. To solve the load balancing issue, I developed a decoupled dual-program scheduling strategy. This approach launches distinct programs that specialize threads for either sparse or dense blocks, optimizing instruction cache usage and keeping execution units saturated.",
          },
          {
            title: "Autotuning API",
            content: (
              <>
                I built a robust user-facing API featuring an automated tuning
                engine. The system automates the search for optimal kernel
                configurations, caches results to amortize tuning costs, and
                enforces a strict verification pipeline. This pipeline validates
                results against reference implementations on smaller matrices
                before scaling up, ensuring mathematical precision. The
                autotuning subsystem contributed an additional 8% performance
                boost by discovering non-obvious optimal configurations,
                providing a 'fast path' to high performance that users could
                trust for production workloads.
                <StructuredVisual
                  src="/triton/inspector.png"
                  alt="Insepctor"
                ></StructuredVisual>
              </>
            ),
          },
        ],
      },
      {
        projectName: "Fused matmul-compress kernel",
        details: [
          {
            title: "Minimizing Data Movement",
            content: (
              <>
                <Typography sx={{ display: "block" }}>
                  Often, data movement is the most significant constraint on
                  computation performance as opposed to the raw compute
                  capabilities. In a deep learning model, data is moved to and
                  from shared memory many times in each layer. For example for
                  one MLP layer, we need to load the input matrix, the weights
                  and the biases. We may then have some activation function that
                  operates on the dot product. After the activation function,
                  the output is sparse and we want to compress the data into 2:4
                  sparsity. The current workflow looks like this:
                </Typography>
                <StructuredVisual
                  src="/triton/ref_compress.png"
                  alt="Reference compression workflow"
                ></StructuredVisual>
                <Typography>
                  If we can performance the pruning and compression step
                  directly within the Triton kernel, we can avoid the costly
                  step of moving data.
                </Typography>
                <StructuredVisual
                  src="/triton/compress_kernel.png"
                  alt="Compress kernel"
                ></StructuredVisual>
              </>
            ),
          },
          {
            title: "Kernel Implementation",
            content: (
              <>
                <CodeBlock
                  language="python"
                  code={`@triton.jit
def compress_kernel(
    dense_ptr,
    sparse_ptr,
    meta_ptr,
    M, K,
    stride_dm, stride_dk,
    stride_sm, stride_sk,
    BLOCK_M: tl.constexpr,
    BLOCK_N: tl.constexpr,
):
    """Compression kernel using 2D grid to tile over M and K.
    
    Simplified assuming M == BLOCK_M and K == BLOCK_N.
    """
    k_start = 0
    offs_m = tl.arange(0, BLOCK_M)
    quad_offs = tl.arange(0, BLOCK_N // 4)
    
    # Dense column offsets for each position within quads
    offs_v0 = k_start + quad_offs * 4 + 0
    offs_v1 = k_start + quad_offs * 4 + 1
    offs_v2 = k_start + quad_offs * 4 + 2
    offs_v3 = k_start + quad_offs * 4 + 3
    
    ptrs_v0 = dense_ptr + offs_m[:, None] * stride_dm + offs_v0[None, :] * stride_dk
    ptrs_v1 = dense_ptr + offs_m[:, None] * stride_dm + offs_v1[None, :] * stride_dk
    ptrs_v2 = dense_ptr + offs_m[:, None] * stride_dm + offs_v2[None, :] * stride_dk
    ptrs_v3 = dense_ptr + offs_m[:, None] * stride_dm + offs_v3[None, :] * stride_dk
    
    v0 = tl.load(ptrs_v0)
    v1 = tl.load(ptrs_v1)
    v2 = tl.load(ptrs_v2)
    v3 = tl.load(ptrs_v3)
    
    compress_store_block(
        v0, v1, v2, v3,
        sparse_ptr, meta_ptr,
        stride_sm, stride_sk,
        M, K,
        BLOCK_M, BLOCK_N,
        0, 0 # Single block kernel, pid (0, 0)
    )
    `}
                />
              </>
            ),
          },
        ],
      },
    ],
    tags: ["Research", "Compiler", "LLVM", "MLIR", "Machine Learning", "C++"],
  },
  {
    title: "Software Engineer Intern",
    organization: "Mozilla",
    url: "https://www.mozilla.org",
    tooltipText: "A non-profit organization behind the Firefox web browser",
    location: "Toronto, ON",
    dates: "May 2025 - Sep 2025",
    caption: "Firefox Privacy",
    details: [
      {
        title: "Overview",
        content: (
          <span>
            <TooltipLink
              href="https://www.mozilla.org/en-US/firefox/new/"
              tooltipText="A free and open-source web browser developed by Mozilla"
            >
              Firefox
            </TooltipLink>{" "}
            is one of the world's most popular browsers, known for its strong
            privacy protections. As part of the Firefox Privacy team, I worked
            on enhancing user control over their privacy settings, specifically
            addressing the balance between strict tracking protection and web
            compatibility.
          </span>
        ),
      },
    ],
    projects: [
      {
        projectName: "Enhanced Tracking Protection",
        caption: "Granular configuration options for ETP-Strict users",
        details: [
          {
            title: "The Problem",
            content:
              "Enhanced Tracking Protection (ETP) is great for privacy, but 'Strict' mode often breaks websites that rely on trackers for functionality (e.g., login flows, payment gateways). Users would enable Strict mode, encounter broken sites, and confusingly disable ETP entirely, leaving them unprotected.",
          },
          {
            title: "Implementation",
            content: (
              <>
                <Typography variant="body1" color="text.secondary" paragraph>
                  I implemented granular controls for Enhanced Tracking
                  Protection (ETP), adding configuration options to 'Strict' and
                  'Custom' modes. This feature enables users to manage automatic
                  exception levels, choosing between applying exceptions list
                  entries for major website breakage or extending them to fix
                  minor convenience issues, giving them precise control over the
                  privacy-compatibility balance.
                </Typography>
                <Box sx={{ mt: 1, display: "flex", flexWrap: "wrap", gap: 1 }}>
                  <TooltipLink
                    variant="button"
                    href="https://bugzilla.mozilla.org/show_bug.cgi?id=1970632"
                    icon={<BugReportIcon />}
                    tooltipText="Bugzilla issue tracking the UX implementation for ETP-Strict exceptions"
                  >
                    Tracking Protection exceptions UX for ETP-Strict users
                  </TooltipLink>
                  <TooltipLink
                    variant="button"
                    href="https://bugzilla.mozilla.org/show_bug.cgi?id=1975478"
                    icon={<BugReportIcon />}
                    tooltipText="Bugzilla issue tracking the onboarding experience for ETP-Strict users"
                  >
                    Add anti-tracking exceptions onboarding for existing
                    ETP-Strict users
                  </TooltipLink>
                </Box>
              </>
            ),
          },
          {
            title: "Result",
            content: (
              <>
                <span>
                  In FX144, The feature was shipped to over 1.5 million{" "}
                  <TooltipLink
                    href="https://www.mozilla.org/en-US/firefox/new/"
                    tooltipText="A free and open-source web browser developed by Mozilla"
                  >
                    Firefox
                  </TooltipLink>{" "}
                  users. It successfully resolved over 1,000 reported
                  site-breaking issues, significantly reducing support tickets.
                  More importantly, it increased the adoption of Strict Tracking
                  Protection by giving users the tool to manage exceptions
                  granularly rather than disabling protection globally.
                </span>
                <StructuredVisual
                  src="/fx/fx_privacy.png"
                  alt="Firefox Privacy Settings"
                ></StructuredVisual>
              </>
            ),
          },
        ],
      },
    ],
    tags: ["C++", "JavaScript"],
    logo: "/mozilla.svg",
  },
  {
    title: "Software Engineer Intern",
    organization: "Seismic",
    url: "https://seismic.com",
    tooltipText: "A global leader in sales enablement and marketing automation",
    location: "Toronto, ON",
    dates: "Sep 2024 - Dec 2024",
    caption: (
      <span>
        Full-Stack developer for{" "}
        <TooltipLink
          href="https://www.seismic.com/customer-stories/seismic-livesocial/"
          tooltipText="A platform for curating and distributing personalized content"
        >
          Seismic LiveSocial
        </TooltipLink>{" "}
      </span>
    ),
    details: [
      {
        title: "Overview",
        content:
          "During my internship at Seismic, I worked as a Full-Stack developer on LiveSocial, a platform dedicated to curating and distributing personalized content for enterprise sales teams. I collaborated with product, customer success, and core engineering to improve platform stability and expand customization capabilities for our clients.",
      },
    ],
    projects: [
      {
        projectName: "LiveSocial",
        caption:
          "Full-Stack developer on LiveSocial, a platform for curating personalized content for sales teams.",
        details: [
          {
            title: "Feature Development",
            content:
              "Delivered a highly requested full-stack feature (React, Express) giving admins greater access control over platform-specific content sharing, enhancing customization for over 2,000 client companies.",
          },
          {
            title: "Process Improvement",
            content:
              "Transformed a client configuration update process to self-service, reducing configuration update time by 99% by migrating legacy configurations for 9 clients from file-based storage to MongoDB.",
          },
          {
            title: "Engineering Excellence",
            content:
              "Resolved 20+ bugs through systematic root cause analysis, reducing recurring support tickets by 5% and eliminating several months-old persistent issues through collaborations with customer success and product team.",
          },
        ],
      },
    ],
    tags: [
      "Fullstack",
      "TypeScript",
      "MongoDB",
      "React",
      "Express",
      "Frontend",
      "Backend",
      "Node.js",
    ],
    logo: "/seismic.svg",
  },
  {
    title: "Software Development Intern",
    organization: "Konrad",
    url: "https://www.konrad.com",
    tooltipText:
      "A digital innovation consultancy specializing in digital strategy, design, and execution",
    location: "Toronto, ON",
    dates: "May 2024 - Aug 2024",
    caption: "",
    details: [
      {
        title: "Overview",
        content:
          "During my time at Konrad Group, I worked as a backend developer focusing on internal tooling. My primary contribution was developing a robust data ingestion pipeline to support an internal gaming analytics platform used by the entire company.",
      },
    ],
    projects: [
      {
        projectName: "Internal Gaming Analytics Tool",
        caption:
          "Backend development for scraping, processing, and serving game statistics.",
        details: [
          {
            title: "Data Pipeline",
            content:
              "Developed a daily data ingestion pipeline integrating 4 gaming platform APIs to automatically fetch and aggregate game statistics for over 500 employees, enabling real-time leaderboard functionality.",
          },
          {
            title: "Performance Optimization",
            content:
              "Optimized API efficiency by implementing GraphQL resolvers with Apollo Express, reducing complex nested query latency from 600ms to 150ms by eliminating request waterfalls, achieving 75% faster data fetching.",
          },
        ],
      },
    ],
    tags: [
      "Backend",
      "GraphQL",
      "Apollo",
      "Express",
      "TypeScript",
      "React",
      "Node.js",
      "Express",
    ],
    logo: "/kg.svg",
  },
  {
    title: "Software Developer Intern",
    organization: "SKYTRAC",
    url: "https://www.skytrac.ca",
    tooltipText:
      "A leader in aerospace satellite communications and intelligent connectivity",
    location: "Ottawa, ON",
    dates: "May 2023 - Aug 2023",
    details: [
      {
        title: "Overview",
        content:
          "During my internship at SKYTRAC, I developed full-stack solutions to improve the efficiency and accuracy of flight data analysis for aviation analysts.",
      },
    ],
    projects: [
      {
        projectName: "Flight Data Systems",
        caption: "Automated tooling and visualization for flight logs.",
        details: [
          {
            title: "Flight Data Dashboard",
            content: `Reduced flight analysts' workflows by 15% by building a web dashboard with BackboneJS, automatically retrieving flight data from the MySQL database to allow efficient viewing and annotation of flight events.`,
          },
          {
            title: "Data Integrity",
            content:
              "Identified 1 critical data inconsistency with an automated Python data verification script across flight log databases.",
          },
        ],
      },
    ],
    tags: ["Backend", "Python", "MySQL", "BackboneJS"],
  },
];

const projects = [
  {
    title: "Minicc Compiler",
    caption: "A toy compiler for minicc, a subset of C",
    technologies: "C++, Antlr4, LLVM",
    details: [
      {
        title: "Summary",
        content:
          "Implemented a compiler capable of parsing and translating minicc code into LLVM IR, featuring an alloca2reg optimization pass that reduces stack allocation overhead, achieving a 23% reduction in runtime.",
      },
    ],
    tags: ["Compiler", "C++", "LLVM"],
  },
  {
    title: "Accelerating Particle Collision Simulation",
    caption:
      "Leveraging multi-threading and distributed computing for performance",
    technologies: "C++, OpenMP, OpenMPI",
    details: [
      {
        title: "Summary",
        content:
          "Optimized particle simulation using binning, static arrays, and bucket sort, improving sequential runtime from 53s to 18s (2.94x) for 160k particles on SciNet. Further reduced runtime to 2s (9x) by parallelizing 90% of the code with OpenMP using static decomposition and uniform partitioning.",
      },
    ],
    tags: ["C++", "OpenMP", "OpenMPI"],
  },
  {
    title: "Food Item Classifier",
    caption: "A machine learning experiment to classify food items",
    technologies: "Python, sklearn",
    details: [
      {
        title: "Summary",
        content:
          "Developed a model to classify food items based on text questions using random forest, neural networks and linear regression models, achieving an accuracy of over 85% on the validation dataset and 80% on the test dataset.",
      },
    ],
    tags: ["Machine Learning", "Python", "sklearn"],
  },
  {
    title: "Cloud-based Pandemic Simulation Service",
    caption:
      "Collaboration with morLab to build a cloud-based simulation service",
    technologies: "Python, Django, AWS",
    dates: "Jan 2023 - May 2023",
    details: [
      {
        title: "Summary",
        content:
          "Built a user-friendly web platform using React and Django to make a C++ pandemic simulation model accessible to epidemiologists. Implemented 10+ RESTful endpoints and architected an AWS SQS/Batch pipeline for scalable, concurrent simulations with automated PostgreSQL output.",
      },
    ],
    tags: ["Backend", "Python", "Django", "AWS", "PostgreSQL"],
  },
  {
    title: "MemoryViz & PythonTA",
    caption: "Visualizing Memory Management in Python",
    technologies: "Python, TypeScript",
    dates: "Sept 2021 - Dec 2021",
    details: [
      {
        title: "Summary",
        content:
          "Spearheaded the development of Webstepper, an interactive Python memory visualization tool adopted by 900+ students each semester in CS fundamentals courses at UofT to teach memory and reference concepts.",
      },
    ],
    tags: ["Python", "TypeScript", "React"],
  },
  {
    title: "Campfire",
    caption:
      "An internship review platform to connect recruiters and job-seekers",
    technologies: "React, Java, SprintBoot, PostgreSQL",
    details: [
      {
        title: "Summary",
        content:
          "Developed scalable Spring Boot endpoints following SOLID principles and achieved 80% code coverage with over 50 automated unit/integration tests in a Docker CI/CD pipeline on Github Actions.",
      },
    ],
    tags: [
      "Fullstack",
      "Frontend",
      "Backend",
      "Java",
      "SpringBoot",
      "PostgreSQL",
      "React",
      "TypeScript",
    ],
  },
  {
    title: "Pacman Game with AI",
    caption: "Computer Game with Custom AI Algorithms",
    technologies: "Python, Pygame",
    dates: "Sept 2022 - Dec 2022",
    details: [
      {
        title: "Summary",
        content:
          "Implemented A* pathfinding algorithm for ghost movement with customized behavior patterns, creating a multi-level game with enhanced sound effects and user experience.",
      },
    ],
  },
  {
    title: "Model Rocket with Vectored Thrust",
    caption: "Engineering Project",
    technologies: "Arduino, 3D Printing",
    dates: "May 2022 - Aug 2022",
    details: [
      {
        title: "Summary",
        content:
          "Designed a custom thrust vectoring mechanism for enhanced flight control and programmed an Arduino-based flight controller with a telemetry system.",
      },
    ],
  },
];

const volunteering = [
  {
    title: "President",
    organization: "UofT Blueprint",
    url: "https://uoftblueprint.org",
    tooltipText:
      "A student-led group that builds technology and software for social good",
    location: "Toronto, ON",
    dates: "Aug 2023 - May 2024",
    details: [
      {
        title: "Leadership & Strategy",
        content: `Led 40+ members in delivering pro-bono software solutions to 3 nonprofits, while establishing corporate partnerships with Manulife and Guidewire to facilitate internship preparation events for 100+ students.`,
      },
      {
        title: "Operational Excellence",
        content: `Established Project Lead Hub and comprehensive Handbook to standardize project management methodologies, client requirement scoping, and team engagement best practices.`,
      },
    ],
    tags: ["Leadership", "Club", "Project Management"],
    logo: "/bp.svg",
  },
  {
    title: "Project Lead",
    organization: "UofT Blueprint",
    url: "https://www.uoftblueprint.org",
    tooltipText:
      "A student-led group that builds technology and software for social good",
    location: "Toronto, ON",
    dates: "Aug 2023 - Aug 2024",
    details: [
      {
        title: "Overview",
        content:
          "As a Project Lead for UofT Blueprint, I helped manage student teams dedicated to building technology for social good, collaborating with non-profit organizations to deliver high-impact software solutions.",
      },
    ],
    projects: [
      {
        projectName: "Period Purse",
        caption: "Educational Android period tracker for Canadian youth",
        details: [
          {
            title: "Impact",
            content: (
              <span>
                Increased menstruation awareness by partnering with{" "}
                <TooltipLink
                  href="https://theperiodpurse.com/"
                  tooltipText="A non-profit organization aiming to achieve menstrual equity"
                >
                  The Period Purse
                </TooltipLink>{" "}
                and developing an educational Android period tracker for
                Canadian youth, available on Google Play Store with over 50
                downloads.
              </span>
            ),
          },
          {
            title: "Team Management",
            content: `Managed a 7-people development team through backlog refinement, prioritization and modularization, implementing all 8 use-cases as specified and completing 90+ tickets over 1 year.`,
          },
        ],
      },
    ],
    tags: ["Leadership", "Project Management", "Kotlin", "Android"],
    logo: "/bp.svg",
  },
];

export { personalInfo, education, experience, projects, volunteering };
